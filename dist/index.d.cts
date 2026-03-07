/**
 * Typed clipboard helpers for Chrome extensions
 */
/**
 * Copy plain text to clipboard via navigator.clipboard.writeText
 * @param text - The text to copy
 */
declare function copyText(text: string): Promise<void>;
/**
 * Read plain text from clipboard via navigator.clipboard.readText
 * @returns The text content from clipboard
 */
declare function pasteText(): Promise<string>;
/**
 * Copy HTML content to clipboard via ClipboardItem
 * @param html - The HTML string to copy
 */
declare function copyHtml(html: string): Promise<void>;
/**
 * Copy an image to clipboard via ClipboardItem
 * @param blob - The image blob to copy
 */
declare function copyImage(blob: Blob): Promise<void>;
/**
 * Read all clipboard items
 * @returns Array of ClipboardItem objects
 */
declare function readClipboard(): Promise<ClipboardItem[]>;
/**
 * Copy text using document.execCommand fallback for content scripts
 * where navigator.clipboard may not be available
 * @param text - The text to copy
 * @returns true if copy was successful, false otherwise
 */
declare function copyWithFallback(text: string): boolean;

export { copyHtml, copyImage, copyText, copyWithFallback, pasteText, readClipboard };
