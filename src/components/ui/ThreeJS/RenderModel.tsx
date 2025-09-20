"use client";

import { Environment, EnvironmentProps } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import React, { Suspense, ReactNode } from "react";

interface RenderModelProps {
  children: ReactNode; // Represents the model(s) to render
  className?: string; // Optional className for the Canvas element
  ligtpreset?: EnvironmentProps["preset"]; // Light preset for the Environment
  canvasProps?: Omit<CanvasProps, "children">; // Optional props for the Canvas component
}

const RenderModel: React.FC<RenderModelProps> = ({
  children,
  className,
  ligtpreset = "dawn",
  canvasProps = {},
}) => {
  return (
    <Canvas className={className} shadows={true} dpr={[1, 2]} {...canvasProps}>
      <Suspense fallback={null}>{children}</Suspense>
      <Environment preset={ligtpreset} />
    </Canvas>
  );
};

export default RenderModel;
