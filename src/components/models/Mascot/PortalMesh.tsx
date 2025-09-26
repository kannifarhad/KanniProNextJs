/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
  useEffect,
} from "react";
import { Mesh, Vector3, Plane, Color, Euler } from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

// Portal shader
const PortalMaterial = shaderMaterial(
  { uRadius: 0.0, uColor: [0.29, 0.0, 0.51], time: 0 },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv * 2.0 - 1.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float uRadius;
  uniform vec3 uColor;
  uniform float time;
  varying vec2 vUv;

  void main() {
    float dist = length(vUv);
    float angle = atan(vUv.y, vUv.x);

    float wave1 = 0.08 * sin(6.0 * angle + time * 4.0);
    float wave2 = 0.05 * sin(12.0 * angle + time * 2.5);
    float wave3 = 0.03 * sin(20.0 * angle - time * 3.0);
    float radiusWithWave = uRadius + wave1 + wave2 + wave3;

    if (dist < radiusWithWave) {
      float flow = 0.2 * sin(10.0 * vUv.x + time * 3.0) 
                 * cos(10.0 * vUv.y + time * 2.5);

      float glow = smoothstep(uRadius, uRadius - 0.3, dist);

      vec3 finalColor = uColor + vec3(flow * 0.6) + vec3(glow * 0.5);
      gl_FragColor = vec4(finalColor, 1.0);
    } else {
      discard;
    }
  }
  `
);

extend({ PortalMaterial });

export interface MeshPortalRef {
  open: (config?: MeshPortalProps) => void;
  close: () => void;
}

interface MeshPortalProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
  color?: string;
  hide?: "above" | "below";
}

const defaultProps: MeshPortalProps = {
  position: [0, 0, -3.5],
  rotation: [-Math.PI / 2, 0, 0],
  size: 7,
  color: "#00ff04",
};

export const MeshPortal = forwardRef<MeshPortalRef>((_, ref) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<any>(null);
  const { gl } = useThree();

  const [config, setConfig] = useState<MeshPortalProps>(defaultProps);
  const animTime = useRef(0);
  const duration = 0.6;
  const animating = useRef<"opening" | "closing" | null>(null);

  const clippingPlane = useRef<Plane | null>(null);

  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  useImperativeHandle(ref, () => ({
    open: (customConfig: MeshPortalProps = {}) => {
      const merged = { ...defaultProps, ...customConfig };
      setConfig(merged);
      animating.current = "opening";
      animTime.current = 0;
      if (meshRef.current) meshRef.current.visible = true;

      // --- setup clipping plane ---
      const normal = new Vector3(0, 0, 1);
      const euler = new Euler(...(merged.rotation ?? defaultProps.rotation));
      normal.applyEuler(euler);

      if (merged.hide === "above") {
        normal.negate();
      }

      clippingPlane.current = new Plane(normal, 0).translate(
        new Vector3(...(merged.position ?? defaultProps.position))
      );

      gl.clippingPlanes = clippingPlane.current ? [clippingPlane.current] : [];
    },
    close: () => {
      animating.current = "closing";
      animTime.current = 0;
    },
  }));

  useFrame((_, delta) => {
    if (!materialRef.current || !animating.current) return;

    animTime.current += delta;
    materialRef.current.time += delta;

    const t = Math.min(animTime.current / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    if (animating.current === "opening") {
      let bounce = 0;
      if (t > 0.7) bounce = Math.sin((t - 0.7) * 10) * 0.05 * (1 - t);
      materialRef.current.uRadius = ease * 0.8 + bounce;
      if (t >= 1) animating.current = null;
    } else if (animating.current === "closing") {
      materialRef.current.uRadius = (1 - ease) * 0.8;
      if (t >= 1) {
        animating.current = null;
        if (meshRef.current) meshRef.current.visible = false;
        gl.clippingPlanes = []; // reset planes
      }
    }

    if (config?.color) {
      const c = new Color(config.color);
      materialRef.current.uColor = [c.r, c.g, c.b];
    }
  });

  return (
    <mesh
      ref={meshRef}
      visible={false}
      position={config.position}
      rotation={config.rotation}
    >
      <planeGeometry args={[config.size ?? 4, config.size ?? 4, 64, 64]} />
      {/* @ts-expect-error extended shader material */}
      <portalMaterial ref={materialRef} uRadius={0.0} />
    </mesh>
  );
});

MeshPortal.displayName = "MeshPortal";
export default memo(MeshPortal);