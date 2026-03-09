[![CI](https://github.com/theluckystrike/webext-clipboard/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-clipboard/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-clipboard)](https://www.npmjs.com/package/@theluckystrike/webext-clipboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# @theluckystrike/webext-clipboard

Typed clipboard helpers for Chrome extensions — copy text, HTML, and images with context-aware fallbacks. Part of [@zovo/webext](https://github.com/theluckystrike/webext).

## Features

- **Copy Text** — Plain text copy via `navigator.clipboard.writeText`
- **Paste Text** — Read clipboard text via `navigator.clipboard.readText`
- **Copy HTML** — Rich HTML content with automatic plain-text fallback
- **Copy Images** — Copy images from Blob objects to clipboard
- **Read Clipboard** — Read all clipboard items as `ClipboardItem[]`
- **Content Script Fallback** — `document.execCommand` fallback when `navigator.clipboard` is unavailable
- **Full TypeScript** — Complete type definitions included

## Installation

```bash
npm install @theluckystrike/webext-clipboard
# or
pnpm add @theluckystrike/webext-clipboard
# or
yarn add @theluckystrike/webext-clipboard
```

## Quick Start

```typescript
import { copyText, pasteText, copyHtml, copyImage, readClipboard, copyWithFallback } from '@theluckystrike/webext-clipboard';

// Copy plain text
await copyText('Hello, World!');

// Read plain text
const text = await pasteText();

// Copy HTML content
await copyHtml('<h1>Hello</h1><p>World</p>');

// Copy an image
const response = await fetch('https://example.com/image.png');
const blob = await response.blob();
await copyImage(blob);

// Read all clipboard items
const items = await readClipboard();

// Fallback for content scripts (when navigator.clipboard is unavailable)
const success = copyWithFallback('Fallback copy');
```

## Advanced Usage

### Copying Canvas Content

```typescript
// Copy a canvas element to clipboard as an image
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
canvas.toBlob(async (blob) => {
  if (blob) {
    await copyImage(blob);
  }
});
```

### Monitoring Clipboard Changes

The Clipboard API doesn't provide native change events. Use polling for monitoring:

```typescript
let lastClipboard = await pasteText();

setInterval(async () => {
  const current = await pasteText();
  if (current !== lastClipboard) {
    console.log('Clipboard changed:', current);
    lastClipboard = current;
  }
}, 1000);
```

### Using Fallback in Content Scripts

When running in Chrome extension content scripts, `navigator.clipboard` may be restricted. Use the fallback:

```typescript
// In content script
function handleCopyButtonClick() {
  const success = copyWithFallback(selectedText);
  if (success) {
    showNotification('Copied!');
  } else {
    showNotification('Copy failed. Try selecting manually.');
  }
}
```

## Context Limitations

The Clipboard API has different availability depending on execution context:

| Context | `navigator.clipboard` | Fallback Required |
|---------|----------------------|------------------|
| Popup/BG Script | ✅ Available | No |
| Content Script | ⚠️ May be restricted | Use `copyWithFallback` |
| Web Page | ⚠️ Requires permission | Handle errors |

### Required Permissions

Add the appropriate permissions to your `manifest.json`:

```json
{
  "permissions": [
    "clipboardWrite"
  ],
  "optional_permissions": [
    "clipboardRead"
  ]
}
```

- **`clipboardWrite`** — Required for all copy operations
- **`clipboardRead`** — Required for read/paste operations (user must grant)

> **Note:** In content scripts, prefer `copyWithFallback` for write operations to avoid permission issues.

## API Reference

### `copyText(text: string): Promise<void>`

Copies plain text to the clipboard using `navigator.clipboard.writeText`.

**Parameters:**
- `text` — The text string to copy

**Throws:** If clipboard write fails

---

### `pasteText(): Promise<string>`

Reads plain text from the clipboard using `navigator.clipboard.readText`.

**Returns:** The text content from the clipboard

**Requires:** `clipboardRead` permission

---

### `copyHtml(html: string): Promise<void>`

Copies HTML content to the clipboard using `ClipboardItem`. Automatically includes plain-text fallback.

**Parameters:**
- `html` — The HTML string to copy

**Note:** Sets both `text/html` and `text/plain` MIME types for maximum compatibility

---

### `copyImage(blob: Blob): Promise<void>`

Copies an image to the clipboard using `ClipboardItem`.

**Parameters:**
- `blob` — The image blob to copy (PNG, JPEG, GIF, etc.)

**Example:**
```typescript
// From fetch
const res = await fetch(url);
const blob = await res.blob();
await copyImage(blob);

// From canvas
canvas.toBlob(blob => copyImage(blob!), 'image/png');
```

---

### `readClipboard(): Promise<ClipboardItem[]>`

Reads all items from the clipboard as an array of `ClipboardItem` objects.

**Returns:** Array of `ClipboardItem` objects containing all clipboard data

**Requires:** `clipboardRead` permission

---

### `copyWithFallback(text: string): boolean`

Copies text using `document.execCommand('copy')` fallback. Designed for content scripts where `navigator.clipboard` may not be available.

**Parameters:**
- `text` — The text string to copy

**Returns:** `true` if copy was successful, `false` otherwise

**Use case:** Use this function in content scripts to ensure reliable copy behavior across all contexts.

---

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
