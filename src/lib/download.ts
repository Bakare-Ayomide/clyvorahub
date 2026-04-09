// ✅ OPTION 1: Local file — place your .exe in the public/ folder
// ✅ OPTION 2: External URL — paste a direct download link below
const DOWNLOAD_URL =
  "/CLYVORA-Setup-v1.0.exe"; // Local: put file in public/CLYVORA-Setup-v1.0.exe
  // "https://github.com/YourOrg/CLYVORA/releases/download/v1.0/CLYVORA-Setup-v1.0.exe"; // External: uncomment & use this instead

export function handleDownload() {
  const link = document.createElement("a");
  link.href = DOWNLOAD_URL;
  link.download = "CLYVORA-Setup-v1.0.exe";
  link.click();

  setTimeout(() => {
    window.location.href = "/thank-you";
  }, 1500);
}
