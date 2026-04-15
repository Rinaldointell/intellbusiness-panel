"use client";
import { useRef, useState } from "react";
import { Text, Box, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import type { AgentConfig } from "./agentsConfig";

interface Props {
  agent: AgentConfig;
  status: "idle" | "busy" | "offline";
}

const STATUS_COLORS = {
  idle:    "#4ade80",
  busy:    "#F5A800",
  offline: "#6b7280",
};

const STATUS_LABELS = {
  idle:    "ativo",
  busy:    "ocupado",
  offline: "offline",
};

export function AgentDesk({ agent, status }: Props) {
  const indicatorRef = useRef<Mesh>(null);
  const [hovered, setHovered]   = useState(false);
  const [x, , z]                = agent.position;
  const statusColor             = STATUS_COLORS[status] ?? STATUS_COLORS.offline;

  useFrame((state) => {
    if (!indicatorRef.current) return;
    if (status === "busy") {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.25;
      indicatorRef.current.scale.setScalar(s);
    } else {
      indicatorRef.current.scale.setScalar(1);
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* ── Desk surface ───────────────────────────────────── */}
      <Box
        args={[1.8, 0.07, 1]}
        radius={0.04}
        position={[0, 0.76, 0]}
        onPointerEnter={() => { setHovered(true);  document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "auto";    }}
      >
        <meshStandardMaterial color={hovered ? "#252540" : "#1a1a30"} roughness={0.3} metalness={0.2} />
      </Box>

      {/* ── Desk legs ──────────────────────────────────────── */}
      {([ [-0.82, -0.42], [0.82, -0.42], [-0.82, 0.42], [0.82, 0.42] ] as [number,number][]).map(([lx, lz], i) => (
        <Box key={i} args={[0.05, 0.76, 0.05]} position={[lx, 0.38, lz]}>
          <meshStandardMaterial color="#0f0f20" />
        </Box>
      ))}

      {/* ── Monitor ────────────────────────────────────────── */}
      <Box args={[0.9, 0.55, 0.04]} position={[0, 1.3, -0.38]}>
        <meshStandardMaterial
          color="#080818"
          emissive={agent.color}
          emissiveIntensity={hovered ? 0.6 : 0.25}
        />
      </Box>
      {/* Monitor stand */}
      <Box args={[0.04, 0.18, 0.04]} position={[0, 0.98, -0.38]}>
        <meshStandardMaterial color="#0f0f20" />
      </Box>
      {/* Monitor base */}
      <Box args={[0.28, 0.025, 0.14]} position={[0, 0.895, -0.38]}>
        <meshStandardMaterial color="#0f0f20" />
      </Box>

      {/* ── Chair seat ─────────────────────────────────────── */}
      <Box args={[0.72, 0.07, 0.72]} radius={0.03} position={[0, 0.45, 0.85]}>
        <meshStandardMaterial color={`${agent.color}22`} />
      </Box>
      {/* Chair back */}
      <Box args={[0.7, 0.55, 0.06]} radius={0.03} position={[0, 0.75, 1.17]}>
        <meshStandardMaterial color={`${agent.color}22`} />
      </Box>

      {/* ── Status indicator (pulsing sphere) ──────────────── */}
      <Sphere ref={indicatorRef} args={[0.09, 16, 16]} position={[0.82, 1.55, 0]}>
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={status === "busy" ? 1.5 : status === "idle" ? 0.7 : 0.2}
        />
      </Sphere>

      {/* ── Labels ─────────────────────────────────────────── */}
      <Text position={[0, 2.05, 0]} fontSize={0.17} color="white" anchorX="center" anchorY="middle" outlineWidth={0.005} outlineColor="#000">
        {agent.emoji} {agent.name}
      </Text>
      <Text position={[0, 1.82, 0]} fontSize={0.1} color={agent.color} anchorX="center" anchorY="middle">
        {agent.role}
      </Text>
      <Text position={[0, 1.62, 0]} fontSize={0.09} color={statusColor} anchorX="center" anchorY="middle">
        ● {STATUS_LABELS[status] ?? "offline"}
      </Text>
    </group>
  );
}
