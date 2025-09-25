/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, forwardRef, useImperativeHandle, memo, useEffect } from "react";
import { Mesh, VideoTexture } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface MeshPortalRef {
  open: (config?: MeshPortalProps) => void;
  close: () => void;
}

interface MeshPortalProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
  videoUrl?: string;
}

const defaultProps: MeshPortalProps = {
  position: [0, 0, -3.5],
  rotation: [-Math.PI / 2, 0, 0],
  size: 7,
  videoUrl: "/images/portal.webm", // make sure this is VP9 + alpha
};

export const MeshPortal = forwardRef<MeshPortalRef>((_, ref) => {
  const meshRef = useRef<Mesh>(null);
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const textureRef = useRef<VideoTexture | null>(null);

  const [config, setConfig] = useState<MeshPortalProps>(defaultProps);
  const animTime = useRef(0);
  const duration = 0.6;
  const animating = useRef<"opening" | "closing" | null>(null);
  const scaleRef = useRef(0);

  useImperativeHandle(ref, () => ({
    open: (customConfig: MeshPortalProps = {}) => {
      setConfig({ ...defaultProps, ...customConfig });
      animating.current = "opening";
      animTime.current = 0;
      if (meshRef.current) meshRef.current.visible = true;

      const video = videoRef.current;
      video.currentTime = 0;
      video.play().catch((err) => console.warn("Video play failed:", err));
    },
    close: () => {
      animating.current = "closing";
      animTime.current = 0;
    },
  }));

  // Setup video texture
  useEffect(() => {
    const video = videoRef.current;
    video.src = config.videoUrl!;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    textureRef.current = new VideoTexture(video);
    textureRef.current.minFilter = THREE.LinearFilter;
    textureRef.current.magFilter = THREE.LinearFilter;
    textureRef.current.format = THREE.RGBAFormat; // keep alpha
    textureRef.current.needsUpdate = true;
  }, [config.videoUrl]);

  // Animate portal scaling
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    animTime.current += delta;
    const t = Math.min(animTime.current / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    if (animating.current === "opening") {
      let bounce = 0;
      if (t > 0.7) bounce = Math.sin((t - 0.7) * 10) * 0.05 * (1 - t);
      scaleRef.current = ease * 1.0 + bounce;

      if (t >= 1) animating.current = null;
    } else if (animating.current === "closing") {
      scaleRef.current = (1 - ease) * 1.0;

      if (t >= 1) {
        animating.current = null;
        if (meshRef.current) meshRef.current.visible = false;
        videoRef.current.pause();
      }
    }

    meshRef.current.scale.set(scaleRef.current, scaleRef.current, 1);
  });

  return (
    <mesh ref={meshRef} visible={false} position={config.position} rotation={config.rotation}>
      <planeGeometry args={[config.size ?? 4, config.size ?? 4]} />
      <meshBasicMaterial
        map={textureRef.current || null}
        transparent
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
});

MeshPortal.displayName = "MeshPortal";
export default memo(MeshPortal);