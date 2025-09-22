"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MascotGroup = ({ gltf }: any) => {
  const { nodes, materials } = gltf;
  return (
    <group name="Scene">
      <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
        <group name="backpack">
          <skinnedMesh name="model_47002" geometry={nodes.model_47002.geometry} material={materials["Material.001"]} skeleton={nodes.model_47002.skeleton} />
          <skinnedMesh name="model_47002_1" geometry={nodes.model_47002_1.geometry} material={materials["Material.002"]} skeleton={nodes.model_47002_1.skeleton} />
          <skinnedMesh name="model_47002_2" geometry={nodes.model_47002_2.geometry} material={materials["Material.003"]} skeleton={nodes.model_47002_2.skeleton} />
          <skinnedMesh name="model_47002_3" geometry={nodes.model_47002_3.geometry} material={materials.backpabbot} skeleton={nodes.model_47002_3.skeleton} />
        </group>
        <skinnedMesh name="chest" geometry={nodes.chest.geometry} material={materials["chest.001"]} skeleton={nodes.chest.skeleton} />
        <skinnedMesh name="chestplate" geometry={nodes.chestplate.geometry} material={materials.chest} skeleton={nodes.chestplate.skeleton} />
        <skinnedMesh name="head" geometry={nodes.head.geometry} material={materials.skin} skeleton={nodes.head.skeleton} />
        <skinnedMesh name="head001" geometry={nodes.head001.geometry} material={materials.armband} skeleton={nodes.head001.skeleton} />
        <skinnedMesh name="heart" geometry={nodes.heart.geometry} material={materials.button} skeleton={nodes.heart.skeleton} />
        <skinnedMesh name="heart2" geometry={nodes.heart2.geometry} material={materials.shiny} skeleton={nodes.heart2.skeleton} />
        <skinnedMesh name="leftleg" geometry={nodes.leftleg.geometry} material={materials["Material.003"]} skeleton={nodes.leftleg.skeleton} />
        <group name="model_47">
          <skinnedMesh name="model_47_1" geometry={nodes.model_47_1.geometry} material={materials["Material.003"]} skeleton={nodes.model_47_1.skeleton} />
          <skinnedMesh name="model_47_2" geometry={nodes.model_47_2.geometry} material={materials.backpack2} skeleton={nodes.model_47_2.skeleton} />
          <skinnedMesh name="model_47_3" geometry={nodes.model_47_3.geometry} material={materials.glove} skeleton={nodes.model_47_3.skeleton} />
          <skinnedMesh name="model_47_4" geometry={nodes.model_47_4.geometry} material={materials.shoew} skeleton={nodes.model_47_4.skeleton} />
          <skinnedMesh name="model_47_5" geometry={nodes.model_47_5.geometry} material={materials.shoe1} skeleton={nodes.model_47_5.skeleton} />
        </group>
        <group name="model_47001">
          <skinnedMesh name="model_47014" geometry={nodes.model_47014.geometry} material={materials["Material.003"]} skeleton={nodes.model_47014.skeleton} />
          <skinnedMesh name="model_47014_1" geometry={nodes.model_47014_1.geometry} material={materials.backpack2} skeleton={nodes.model_47014_1.skeleton} />
          <skinnedMesh name="model_47014_2" geometry={nodes.model_47014_2.geometry} material={materials.glove} skeleton={nodes.model_47014_2.skeleton} />
        </group>
        <skinnedMesh name="model_58001" geometry={nodes.model_58001.geometry} material={materials.shiny} skeleton={nodes.model_58001.skeleton} />
        <skinnedMesh name="model_59001" geometry={nodes.model_59001.geometry} material={materials.face} skeleton={nodes.model_59001.skeleton} />
        <skinnedMesh name="model_61001" geometry={nodes.model_61001.geometry} material={materials.face} skeleton={nodes.model_61001.skeleton} />
        <skinnedMesh name="model_63001" geometry={nodes.model_63001.geometry} material={materials.shoew} skeleton={nodes.model_63001.skeleton} />
        <skinnedMesh name="model_64001" geometry={nodes.model_64001.geometry} material={materials.shoe1} skeleton={nodes.model_64001.skeleton} />
        <skinnedMesh name="rightarm001" geometry={nodes.rightarm001.geometry} material={materials.skin} skeleton={nodes.rightarm001.skeleton} />
        <skinnedMesh name="rightarm002" geometry={nodes.rightarm002.geometry} material={materials.skin} skeleton={nodes.rightarm002.skeleton} />
        <skinnedMesh name="rightarmband" geometry={nodes.rightarmband.geometry} material={materials.armband} skeleton={nodes.rightarmband.skeleton} />
        <skinnedMesh name="rightarmband001" geometry={nodes.rightarmband001.geometry} material={materials.armband} skeleton={nodes.rightarmband001.skeleton} />
        <skinnedMesh name="righthand" geometry={nodes.righthand.geometry} material={materials.glove} skeleton={nodes.righthand.skeleton} />
        <skinnedMesh name="righthand001" geometry={nodes.righthand001.geometry} material={materials.glove} skeleton={nodes.righthand001.skeleton} />
        <skinnedMesh name="rightleg" geometry={nodes.rightleg.geometry} material={materials["Material.003"]} skeleton={nodes.rightleg.skeleton} />
        <skinnedMesh name="straps" geometry={nodes.straps.geometry} material={materials["Material.004"]} skeleton={nodes.straps.skeleton} />
        <skinnedMesh name="torse" geometry={nodes.torse.geometry} material={materials["Material.003"]} skeleton={nodes.torse.skeleton} />
        <primitive object={nodes.mixamorigHips} />
      </group>
    </group>
  );
};
