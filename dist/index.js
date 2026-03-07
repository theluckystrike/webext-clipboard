// src/index.ts
async function copyText(text) {
  await navigator.clipboard.writeText(text);
}
async function pasteText() {
  return navigator.clipboard.readText();
}
async function copyHtml(html) {
  const blob = new Blob([html], { type: "text/html" });
  const item = new ClipboardItem({
    "text/html": blob,
    "text/plain": new Blob([html], { type: "text/plain" })
  });
  await navigator.clipboard.write([item]);
}
async function copyImage(blob) {
  const item = new ClipboardItem({
    [blob.type]: blob
  });
  await navigator.clipboard.write([item]);
}
async function readClipboard() {
  return navigator.clipboard.read();
}
function copyWithFallback(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch (err) {
    success = false;
  }
  document.body.removeChild(textArea);
  return success;
}
export {
  copyHtml,
  copyImage,
  copyText,
  copyWithFallback,
  pasteText,
  readClipboard
};
