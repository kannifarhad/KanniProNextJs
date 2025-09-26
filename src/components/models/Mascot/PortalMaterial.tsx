/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { shaderMaterial } from "@react-three/drei";

// ---- Portal visual shader (keeps it pretty) ----
export const PortalMaterial = shaderMaterial(
  { uRadius: 0.0, uColor: [0.0, 1.0, 0.2], time: 0 },
  // vertex
  `
  varying vec2 vUv;
  void main() {
    vUv = uv * 2.0 - 1.0; // center uv
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment
  `
  uniform float uRadius;
  uniform vec3 uColor;
  uniform float time;
  varying vec2 vUv;

  void main() {
    float dist = length(vUv);
    float angle = atan(vUv.y, vUv.x);

    float wave1 = 0.06 * sin(6.0 * angle + time * 3.5);
    float wave2 = 0.04 * sin(12.0 * angle + time * 2.0);
    float radiusWithWave = uRadius + wave1 + wave2;

    if (dist < radiusWithWave) {
      float flow = 0.08 * sin(8.0 * vUv.x + time * 3.0) * cos(8.0 * vUv.y + time * 2.0);
      float edge = smoothstep(radiusWithWave, radiusWithWave - 0.06, dist);
      vec3 col = uColor + vec3(flow * 0.5) + vec3(edge * 0.6);
      gl_FragColor = vec4(col, 1.0);
    } else {
      discard;
    }
  }
  `
);

export default PortalMaterial;
