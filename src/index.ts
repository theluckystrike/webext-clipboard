/**
 * Typed clipboard helpers for Chrome extensions
 */

/**
 * Copy plain text to clipboard via navigator.clipboard.writeText
 * @param text - The text to copy
 */
export async function copyText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

/**
 * Read plain text from clipboard via navigator.clipboard.readText
 * @returns The text content from clipboard
 */
export async function pasteText(): Promise<string> {
  return navigator.clipboard.readText();
}

/**
 * Copy HTML content to clipboard via ClipboardItem
 * @param html - The HTML string to copy
 */
export async function copyHtml(html: string): Promise<void> {
  const blob = new Blob([html], { type: 'text/html' });
  const item = new ClipboardItem({
    'text/html': blob,
    'text/plain': new Blob([html], { type: 'text/plain' })
  });
  await navigator.clipboard.write([item]);
}

/**
 * Copy an image to clipboard via ClipboardItem
 * @param blob - The image blob to copy
 */
export async function copyImage(blob: Blob): Promise<void> {
  const item = new ClipboardItem({
    [blob.type]: blob
  });
  await navigator.clipboard.write([item]);
}

/**
 * Read all clipboard items
 * @returns Array of ClipboardItem objects
 */
export async function readClipboard(): Promise<ClipboardItem[]> {
  return navigator.clipboard.read();
}

/**
 * Copy text using document.execCommand fallback for content scripts
 * where navigator.clipboard may not be available
 * @param text - The text to copy
 * @returns true if copy was successful, false otherwise
 */
export function copyWithFallback(text: string): boolean {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {
    success = false;
  }
  
  document.body.removeChild(textArea);
  return success;
}
