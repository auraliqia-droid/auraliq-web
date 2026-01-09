import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 30%, #2b5be9, #0a1538)",
          borderRadius: "28%",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 12px 24px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 6,
              borderRadius: 12,
              background: "rgba(5, 10, 26, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#8dd3ff",
                boxShadow: "0 0 8px #8dd3ff",
              }}
            />
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#c2e7ff",
                boxShadow: "0 0 8px #c2e7ff",
              }}
            />
          </div>
          <span
            style={{
              position: "absolute",
              bottom: 5,
              right: 8,
              fontSize: 11,
              fontWeight: 700,
              color: "#e7f0ff",
              letterSpacing: 0.5,
            }}
          >
            AI
          </span>
        </div>
      </div>
    ),
    size
  );
}

