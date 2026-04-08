export function handleDownload() {
  // Create a dummy file download (replace URL with actual installer)
  const link = document.createElement("a");
  link.href = "/CLYVORA-Setup-v1.0.exe";
  link.download = "CLYVORA-Setup-v1.0.exe";
  link.click();

  // Redirect to thank you page after a short delay
  setTimeout(() => {
    window.location.href = "/thank-you";
  }, 1500);
}
