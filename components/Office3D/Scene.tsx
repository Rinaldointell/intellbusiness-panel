"use client";
import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Text, Environment } from "@react-three/drei";
import { supabase } from "@/lib/supabase";
import { AgentDesk } from "./AgentDesk";
import { AGENTS, SQUAD_ZONES } from "./agentsConfig";

function SceneContent({ statuses }: { statuses: Record<string, string> }) {
  return (
    <>
      {/* ── Lighting ──────────────────────────────────────────── */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[10, 12, 5]}  intensity={0.9} castShadow />
      <pointLight position={[-6, 5, 0]}  intensity={0.8} color="#EC4899" />
      <pointLight position={[ 6, 5, 0]}  intensity={0.8} color="#F5A800" />
      <pointLight position={[ 0, 5, 6]}  intensity={0.4} color="#3B82F6" />

      {/* ── Floor grid ────────────────────────────────────────── */}
      <Grid
        args={[24, 24]}
        cellSize={1}
        cellThickness={0.4}
        cellColor="#1a1a3a"
        sectionSize={5}
        sectionThickness={0.8}
        sectionColor="#2a2a5a"
        fadeDistance={35}
        position={[0, 0, 0]}
      />

      {/* ── Squad zone labels ─────────────────────────────────── */}
      {SQUAD_ZONES.map((zone) => (
        <Text
          key={zone.id}
          position={zone.position}
          fontSize={0.38}
          color={zone.color}
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
          outlineWidth={0.01}
          outlineColor="#000"
        >
          {zone.label}
        </Text>
      ))}

      {/* ── Central divider ───────────────────────────────────── */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.04, 1.2, 12]} />
        <meshStandardMaterial color="#1e1e3f" transparent opacity={0.6} />
      </mesh>

      {/* ── Title ─────────────────────────────────────────────── */}
      <Text
        position={[0, 0.05, -6.5]}
        fontSize={0.45}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
        outlineWidth={0.015}
        outlineColor="#000033"
      >
        🏢 INTELLBUSINESS HQ
      </Text>

      {/* ── Agent desks ───────────────────────────────────────── */}
      {AGENTS.map((agent) => (
        <AgentDesk
          key={agent.id}
          agent={agent}
          status={(statuses[agent.id] as "idle" | "busy" | "offline") ?? "offline"}
        />
      ))}
    </>
  );
}

export function OfficeScene() {
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    // Carga inicial
    supabase.from("agents").select("id, status").then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((a: any) => { map[a.id] = a.status; });
        setStatuses(map);
      }
    });

    // Realtime — atualiza status instantaneamente
    const channel = supabase
      .channel("office-scene-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "agents" }, (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          const row = payload.new as any;
          setStatuses((prev) => ({ ...prev, [row.id]: row.status }));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 10, 14], fov: 48 }}
      shadows
      style={{ background: "linear-gradient(180deg, #080818 0%, #0d0d2a 100%)" }}
    >
      <Suspense fallback={null}>
        <SceneContent statuses={statuses} />
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={6}
          maxDistance={28}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 0, 0]}
        />
      </Suspense>
    </Canvas>
  );
}
