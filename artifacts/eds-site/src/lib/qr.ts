import QRCode from "qrcode";

export async function makeQrSvg(payload: string, opts?: { darkMode?: boolean }): Promise<string> {
  return QRCode.toString(payload, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: {
      dark: opts?.darkMode ? "#FAF6EC" : "#1A1714",
      light: "#00000000",
    },
  });
}
