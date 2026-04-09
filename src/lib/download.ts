import { getActiveDownload } from "./download.functions";

export async function handleDownload() {
  try {
    const { file } = await getActiveDownload();

    if (!file) {
      alert("No download file available yet. Please check back later.");
      return;
    }

    const link = document.createElement("a");
    link.href = file.download_url;
    link.download = file.display_name;
    link.click();

    setTimeout(() => {
      window.location.href = "/thank-you";
    }, 1500);
  } catch (err) {
    console.error("Download error:", err);
    alert("Download failed. Please try again.");
  }
}
