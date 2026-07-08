import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hian Chang — Product Engineer with AI";

// Imagen Open Graph generada al vuelo (se ve al compartir el link)
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E0F10",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#151618",
              border: "2px solid #2A2B30",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7983F5",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            HC
          </div>
          <div style={{ color: "#DBDEE1", fontSize: "26px" }}>hian.dev</div>
        </div>

        {/* Título */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              color: "#7983F5",
              fontSize: "26px",
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
          >
            Product Engineer with AI
          </div>
          <div
            style={{
              color: "white",
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Hian Chang
          </div>
          <div style={{ color: "#949BA4", fontSize: "30px" }}>
            Full Stack · Cloud · LLM agents · AWS · GCP · Kubernetes
          </div>
        </div>

        {/* Puntos de color de marca */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["#5865F2", "#7C3AED", "#4D6BFE", "#D97757", "#4285F4"].map((c) => (
            <div
              key={c}
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
