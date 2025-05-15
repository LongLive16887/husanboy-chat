import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 512,
  height: 512,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        background: "#0ea5e9",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        color: "white",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70%"
        height="70%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>,
    {
      ...size,
    },
  )
}
