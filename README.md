[![CI](https://github.com/theluckystrike/webext-clipboard/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-clipboard/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-clipboard)](https://www.npmjs.com/package/@theluckystrike/webext-clipboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

# @theluckystrike/webext-clipboard

Typed clipboard helpers for Chrome extensions — copy text, HTML, and images with context-aware fallbacks. Part of [@zovo/webext](https://github.com/theluckystrike/webext).

## Features

- **Copy text** — Plain text with full TypeScript typing
- **Copy HTML** — Rich HTML content with automatic plain text fallback
- **Copy images** — Blob-based image copying with type detection
- **Paste/Read** — Read clipboard contents as text or raw ClipboardItems
- **Context fallbacks** — `copyWithFallback()` for content scripts where `navigator.clipboard` is unavailable
- **Canvas support** — Copy canvas elements directly as images

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
import { copyText, pasteText, copyHtml, copyImage, readClipboard } from '@theluckystrike/webext-clipboard';

// Copy plain text
await copyText('Hello, World!');

// Read plain text
const text = await pasteText();

// Copy HTML content
await copyHtml('<h1>Hello</h1><p>World</p>');

// Copy an image from URL
const response = await fetch('https://example.com/image.png');
const blob = await response.blob();
await copyImage(blob);

// Read all clipboard items
const items = await readClipboard();
```

## Advanced Usage

### Copying from Canvas Elements

```typescript
import { copyImage } from '@theluckystrike/webext-clipboard';

const canvas = document.querySelector('canvas');
if (canvas) {
  canvas.toBlob((blob) => {
    if (blob) copyImage(blob);
  }, 'image/png');
}
```

### Monitoring Clipboard Changes

```typescript
// Poll for clipboard changes (extension context only)
async function monitorClipboard(callback: (text: string) => void) {
  let lastText = '';
  
  setInterval(async () => {
    try {
      const text = await pasteText();
      if (text !== lastText) {
        lastText = text;
        callback(text);
      }
    } catch {
      // Clipboard access denied or empty
    }
  }, 1000);
}
```

### Using Fallback in Content Scripts

The `navigator.clipboard` API is only available in extension pages (background, popup, options) and requires user permission in content scripts. Use `copyWithFallback()` for content script compatibility:

```typescript
import { copyWithFallback } from '@theluckystrike/webext-clipboard';

// Works in content scripts where navigator.clipboard may be unavailable
const success = copyWithFallback('Fallback copy');

if (success) {
  console.log('Copied successfully!');
} else {
  console.log('Copy failed - user may have denied permission');
}
```

## Context & Limitations

### Where APIs Work

| Context | `navigator.clipboard` | `copyWithFallback()` |
|---------|----------------------|----------------------|
| Background script | ✅ | ❌ (no DOM) |
| Popup/Options page | ✅ | ❌ (no DOM) |
| Content script | ⚠️ Requires permission | ✅ |
| Regular web page | ⚠️ Requires permission | ✅ |

### Required Permissions

Add the appropriate permissions to your `manifest.json`:

```json
{
  "permissions": [
    "clipboardRead",
    "clipboardWrite"
  ]
}
```

For content script clipboard access, you may also need to request permission at runtime:

```typescript
// Request clipboard permission (popup/background context)
async function requestClipboardPermission() {
  try {
    const result = await navigator.permissions.query({ name: 'clipboard-read' });
    return result.state === 'granted';
  } catch {
    // Permission API not supported
    return false;
  }
}
```

> **Note:** The Clipboard API requires a secure context (HTTPS) in modern browsers. Local development with `localhost` is allowed.

## API Reference

| Function | Signature | Description |
|----------|-----------|-------------|
| `copyText` | `(text: string) => Promise<void>` | Copy plain text to clipboard |
| `pasteText` | `() => Promise<string>` | Read plain text from clipboard |
| `copyHtml` | `(html: string) => Promise<void>` | Copy HTML with plain text fallback |
| `copyImage` | `(blob: Blob) => Promise<void>` | Copy image blob to clipboard |
| `readClipboard` | `() => Promise<ClipboardItem[]>` | Read all clipboard items |
| `copyWithFallback` | `(text: string) => boolean` | Fallback using `document.execCommand` |

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
