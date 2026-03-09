[![CI](https://github.com/theluckystrike/webext-clipboard/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-clipboard/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-clipboard)](https://www.npmjs.com/package/@theluckystrike/webext-clipboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# @theluckystrike/webext-clipboard

> Typed clipboard helpers for Chrome extensions — copy text, HTML, and images with context-aware fallbacks. Part of @zovo/webext.

## Features

- **Copy Text** — Plain text copy with full TypeScript typing
- **Copy HTML** — Rich HTML content with automatic plain text fallback
- **Copy Images** — Copy images (PNG, JPEG, etc.) directly to clipboard
- **Read Clipboard** — Read any clipboard content with full type support
- **Paste Detection** — Detect paste events and retrieve clipboard contents
- **Clipboard Events** — Monitor clipboard changes in real-time
- **Context Fallbacks** — Works in both background scripts and content scripts with automatic fallbacks

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

### Canvas Copy

Copy canvas elements directly to clipboard:

```typescript
const canvas = document.querySelector('canvas');
if (canvas) {
  canvas.toBlob(async (blob) => {
    if (blob) {
      await copyImage(blob);
    }
  }, 'image/png');
}
```

### Clipboard Monitoring

Monitor clipboard changes using the Clipboard API:

```typescript
// Check for clipboard changes periodically
async function monitorClipboard() {
  const items = await readClipboard();
  for (const item of items) {
    for (const type of item.types) {
      if (type === 'text/plain') {
        const blob = await item.getType(type);
        const text = await blob.text();
        console.log('New clipboard text:', text);
      }
    }
  }
}

// Poll every 2 seconds
setInterval(monitorClipboard, 2000);
```

### Content Script Fallbacks

In content scripts, `navigator.clipboard` may not always be available. Use `copyWithFallback`:

```typescript
// In your content script
function handleCopyClick() {
  const success = copyWithFallback('Content to copy');
  if (success) {
    console.log('Copied successfully');
  } else {
    console.log('Copy failed - fallback method');
  }
}
```

### Combined Text and HTML

Copy rich content with both HTML and plain text representations:

```typescript
async function copyRichContent(html: string, plainText: string) {
  const htmlBlob = new Blob([html], { type: 'text/html' });
  const plainBlob = new Blob([plainText], { type: 'text/plain' });
  
  const item = new ClipboardItem({
    'text/html': htmlBlob,
    'text/plain': plainBlob
  });
  
  await navigator.clipboard.write([item]);
}

// Usage
await copyRichContent('<b>Bold text</b>', 'Bold text');
```

## Context Limitations

The Clipboard API has different availability depending on execution context:

| Context | `navigator.clipboard` | Fallback Required |
|---------|----------------------|------------------|
| Background Script | ✅ Full Support | No |
| Popup Script | ✅ Full Support | No |
| Content Script | ⚠️ Limited | Yes (`copyWithFallback`) |
| Options Page | ✅ Full Support | No |

### Best Practices

1. **Always test in content scripts** — The Clipboard API behavior varies across browsers
2. **Provide fallbacks** — Use `copyWithFallback` for content scripts
3. **Handle errors gracefully** — Wrap clipboard operations in try-catch blocks
4. **Check permissions** — Ensure required permissions are declared in manifest

## Permissions Required

Add the following to your `manifest.json`:

### For Clipboard Write (copyText, copyHtml, copyImage)

```json
{
  "permissions": ["clipboardWrite"]
}
```

### For Clipboard Read (pasteText, readClipboard)

```json
{
  "permissions": ["clipboardRead"]
}
```

> **Note:** `clipboardRead` requires user gesture in Chrome. The `clipboardWrite` permission is automatically granted for user-initiated actions.

## API Reference

| Function | Description | Returns |
|----------|-------------|---------|
| `copyText(text: string)` | Copy plain text to clipboard | `Promise<void>` |
| `pasteText()` | Read plain text from clipboard | `Promise<string>` |
| `copyHtml(html: string)` | Copy HTML content with plain text fallback | `Promise<void>` |
| `copyImage(blob: Blob)` | Copy an image to clipboard | `Promise<void>` |
| `readClipboard()` | Read all clipboard items | `Promise<ClipboardItem[]>` |
| `copyWithFallback(text: string)` | Copy using execCommand fallback | `boolean` |

## TypeScript

This library is written in TypeScript and provides full type definitions out of the box. No additional `@types` packages required.

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
