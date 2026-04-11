"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(data.error ?? "Erro ao autenticar.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-body)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "360px",
        padding: "0 16px",
      }}>
        {/* Logo / título */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img
            src="/logo.png"
            alt="INTELLBUSINESS"
            style={{ height: "32px", width: "auto", objectFit: "contain", margin: "0 auto 16px" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <p style={{
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            marginTop: "4px",
          }}>
            Mission Control
          </p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "32px",
        }}>
          <h1 style={{
            fontSize: "15px",
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "24px",
          }}>
            Acesso ao painel
          </h1>

          <form onSubmit={handleSubmit}>
            <label style={{
              display: "block",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                backgroundColor: "var(--card-elevated)",
                border: `1px solid ${error ? "var(--negative)" : "var(--border-strong)"}`,
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
                fontFamily: "var(--font-mono)",
                color: "var(--text-primary)",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "var(--accent)";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "var(--border-strong)";
              }}
            />

            {/* Erro */}
            {error && (
              <p style={{
                marginTop: "10px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                color: "var(--negative)",
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "11px",
                backgroundColor: loading || !password ? "var(--surface-elevated)" : "var(--accent)",
                color: loading || !password ? "var(--text-muted)" : "#000",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                cursor: loading || !password ? "not-allowed" : "pointer",
                transition: "background-color 0.15s, color 0.15s",
              }}
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "11px",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
        }}>
          5 tentativas erradas bloqueiam por 15 min
        </p>
      </div>
    </div>
  );
}
