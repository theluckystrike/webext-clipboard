[![CI](https://github.com/theluckystrike/webext-clipboard/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-clipboard/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-clipboard)](https://www.npmjs.com/package/@theluckystrike/webext-clipboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# @theluckystrike/webext-clipboard

Typed clipboard helpers for Chrome extensions — copy text, HTML, and images with context-aware fallbacks. Part of [@zovo/webext](https://github.com/theluckystrike/webext).

## Features

- **Copy Text** — Copy plain text to clipboard using `navigator.clipboard.writeText`
- **Copy HTML** — Copy rich HTML content with automatic plain text fallback
- **Copy Images** — Copy images (PNG, JPEG, etc.) directly to clipboard
- **Read Clipboard** — Read clipboard contents as `ClipboardItem` array
- **Paste Text** — Read plain text from clipboard
- **Fallback Support** — Works in content scripts where `navigator.clipboard` may be unavailable
- **Event Monitoring** — Track clipboard changes (with permissions)
- **TypeScript** — Full type safety out of the box

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
import { 
  copyText, 
  pasteText, 
  copyHtml, 
  copyImage, 
  readClipboard, 
  copyWithFallback 
} from '@theluckystrike/webext-clipboard';

// Copy plain text
await copyText('Hello, World!');

// Read plain text
const text = await pasteText();

// Copy HTML content (rich text)
await copyHtml('<h1>Hello</h1><p>World</p>');

// Copy an image from URL
const response = await fetch('https://example.com/image.png');
const blob = await response.blob();
await copyImage(blob);

// Read all clipboard items
const items = await readClipboard();
```

## Advanced Usage

### Canvas Copy

Copy canvas elements directly as images:

```typescript
import { copyImage } from '@theluckystrike/webext-clipboard';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

canvas.toBlob(async (blob) => {
  if (blob) {
    await copyImage(blob);
  }
}, 'image/png');
```

### Clipboard Monitoring

Monitor clipboard changes using the Clipboard API (Chrome 86+):

```typescript
async function monitorClipboard(callback: (items: ClipboardItem[]) => void) {
  // Check if clipboard API is available
  if (!navigator.clipboard.read) {
    console.warn('Clipboard read not supported');
    return;
  }

  // Read clipboard periodically or on user action
  setInterval(async () => {
    try {
      const items = await navigator.clipboard.read();
      callback(items);
    } catch (err) {
      // May fail due to permissions or context
      console.debug('Clipboard read failed:', err);
    }
  }, 2000);
}
```

### Context Fallbacks

In content scripts, `navigator.clipboard` may not be available due to extension context isolation. Use `copyWithFallback` for reliable text copying:

```typescript
import { copyWithFallback } from '@theluckystrike/webext-clipboard';

// Use fallback in content scripts
const success = copyWithFallback('This works in all contexts!');

if (!success) {
  console.error('Copy failed');
}
```

The fallback creates a temporary textarea element, selects the text, and uses `document.execCommand('copy')` — a reliable technique that works in content script contexts.

## Context Limitations

The Clipboard API has different availability depending on extension context:

| Context | `navigator.clipboard` | `document.execCommand` |
|---------|----------------------|----------------------|
| Popup | ✅ Available | ⚠️ May work |
| Background | ✅ Available | ❌ Unavailable |
| Content Script | ⚠️ Depends on Chrome version | ✅ Available |

**Recommendations:**

- **Popup/Background scripts:** Use `copyText`, `copyHtml`, `copyImage` (modern Clipboard API)
- **Content scripts:** Use `copyWithFallback` for text, or handle permissions carefully
- **Cross-extension copy:** Use `ClipboardItem` with proper MIME types

### Permissions Required

Add these permissions to your `manifest.json` based on your needs:

```json
{
  "permissions": [
    "clipboardRead",
    "clipboardWrite"
  ]
}
```

- `clipboardWrite` — Required for copying text, HTML, or images
- `clipboardRead` — Required for reading clipboard contents

**Note:** As of Chrome 86, `clipboardRead` requires user gesture and may show a permission prompt. The `clipboardWrite` permission is typically granted automatically.

## API Reference

| Function | Description | Returns |
|----------|-------------|---------|
| `copyText(text)` | Copy plain text to clipboard | `Promise<void>` |
| `pasteText()` | Read plain text from clipboard | `Promise<string>` |
| `copyHtml(html)` | Copy HTML with plain text fallback | `Promise<void>` |
| `copyImage(blob)` | Copy image blob to clipboard | `Promise<void>` |
| `readClipboard()` | Read all clipboard items | `Promise<ClipboardItem[]>` |
| `copyWithFallback(text)` | Copy with execCommand fallback | `boolean` |

### copyText

```typescript
function copyText(text: string): Promise<void>
```

Copies plain text to the clipboard using `navigator.clipboard.writeText`.

**Parameters:**
- `text` — The text string to copy

### pasteText

```typescript
function pasteText(): Promise<string>
```

Reads plain text from the clipboard using `navigator.clipboard.readText`.

**Returns:** The text content from the clipboard

### copyHtml

```typescript
function copyHtml(html: string): Promise<void>
```

Copies HTML content to the clipboard using `ClipboardItem`. Also sets plain text fallback for applications that don't support HTML.

**Parameters:**
- `html` — The HTML string to copy

### copyImage

```typescript
function copyImage(blob: Blob): Promise<void>
```

Copies an image to the clipboard using `ClipboardItem`. Supports PNG, JPEG, and other image formats.

**Parameters:**
- `blob` — The image blob to copy

### readClipboard

```typescript
function readClipboard(): Promise<ClipboardItem[]>
```

Reads all items from the clipboard. Returns an array of `ClipboardItem` objects that can be processed to extract different MIME types.

**Returns:** Array of `ClipboardItem` objects

### copyWithFallback

```typescript
function copyWithFallback(text: string): boolean
```

Copies text using `document.execCommand('copy')` fallback. Use this in content scripts where `navigator.clipboard` may not be available.

**Parameters:**
- `text` — The text string to copy

**Returns:** `true` if copy was successful, `false` otherwise

## Related Packages

This package is part of the @zovo/webext ecosystem:

- [@theluckystrike/webext-storage](https://github.com/theluckystrike/webext-storage) — Typed storage helpers
- [@theluckystrike/webext-tabs](https://github.com/theluckystrike/webext-tabs) — Tab management utilities
- [@theluckystrike/webext-messaging](https://github.com/theluckystrike/webext-messaging) — Type-safe messaging

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
