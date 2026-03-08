[![CI](https://github.com/theluckystrike/webext-clipboard/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-clipboard/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Last Commit](https://img.shields.io/github/last-commit/theluckystrike/webext-clipboard)](https://github.com/theluckystrike/webext-clipboard/commits/main)
[![Stars](https://img.shields.io/github/stars/theluckystrike/webext-clipboard)](https://github.com/theluckystrike/webext-clipboard/stargazers)

# @theluckystrike/webext-clipboard

Typed clipboard helpers for Chrome extensions — copy text, HTML, and images with context-aware fallbacks. Part of @zovo/webext.

## Description

A TypeScript-first library that provides type-safe clipboard operations for Chrome extensions. Supports copying text, HTML, and images, with a fallback method for content scripts where `navigator.clipboard` may not be available due to extension context isolation.

## Features

- **📝 Copy Text** — Copy plain text to clipboard with `copyText()`
- **📋 Read Text** — Paste text from clipboard with `pasteText()`
- **🌐 Copy HTML** — Copy rich HTML content with `copyHtml()` (preserves formatting)
- **🖼️ Copy Images** — Copy images directly to clipboard with `copyImage()`
- **📦 Read All Items** — Read any clipboard content with `readClipboard()`
- **🔄 Context Fallback** — Works in content scripts with `copyWithFallback()`

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

To copy a canvas element as an image:

```typescript
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
canvas.toBlob(async (blob) => {
  if (blob) {
    await copyImage(blob);
    console.log('Canvas copied to clipboard!');
  }
});
```

### Monitoring Clipboard Changes

Since the Clipboard API doesn't emit events, you can poll for changes in your extension:

```typescript
let lastClipboardText = '';

async function checkClipboard() {
  try {
    const text = await pasteText();
    if (text !== lastClipboardText) {
      console.log('Clipboard changed:', text);
      lastClipboardText = text;
    }
  } catch (e) {
    // Clipboard access denied or empty
  }
}

// Check every 2 seconds
setInterval(checkClipboard, 2000);
```

### Context Fallbacks

In Chrome extensions, `navigator.clipboard` is only available in certain contexts:

| Context | `navigator.clipboard` | Use Fallback |
|---------|---------------------|--------------|
| Popup | ✅ Available | Not needed |
| Options Page | ✅ Available | Not needed |
| Background Script | ✅ Available | Not needed |
| Content Script | ⚠️ Limited | Sometimes required |

The `copyWithFallback()` function uses `document.execCommand('copy')` as a reliable fallback for content scripts:

```typescript
// content-script.ts
import { copyWithFallback } from '@theluckystrike/webext-clipboard';

// This works in all contexts
document.addEventListener('mouseup', () => {
  const selection = window.getSelection()?.toString();
  if (selection) {
    copyWithFallback(selection);
  }
});
```

## Context Limitations

When working with clipboard in Chrome extensions, be aware of these limitations:

1. **Permissions Required** — Add `clipboardRead` and/or `clipboardWrite` to your manifest
2. **Context Isolation** — Content scripts may have limited clipboard access
3. **User Gesture** — Some browsers require user interaction before clipboard operations
4. **HTTPS Required** — Clipboard API requires secure contexts

### Manifest Permissions

Add the required permissions to your `manifest.json`:

```json
{
  "permissions": [
    "clipboardRead",
    "clipboardWrite"
  ]
}
```

For Manifest V3, you may also need to declare host permissions if reading from specific origins.

## API Reference

### `copyText(text: string): Promise<void>`

Copies plain text to the clipboard using `navigator.clipboard.writeText`.

**Parameters:**
- `text` - The text string to copy

**Example:**
```typescript
await copyText('Hello, World!');
```

---

### `pasteText(): Promise<string>`

Reads plain text from the clipboard using `navigator.clipboard.readText`.

**Returns:** The text content from the clipboard

**Example:**
```typescript
const text = await pasteText();
console.log(text); // "Hello, World!"
```

---

### `copyHtml(html: string): Promise<void>`

Copies HTML content to the clipboard using `ClipboardItem`. Also sets plain text fallback for compatibility.

**Parameters:**
- `html` - The HTML string to copy

**Example:**
```typescript
await copyHtml('<h1>Hello</h1><p>World</p>');
```

---

### `copyImage(blob: Blob): Promise<void>`

Copies an image to the clipboard using `ClipboardItem`.

**Parameters:**
- `blob` - The image blob to copy

**Example:**
```typescript
const response = await fetch('https://example.com/image.png');
const blob = await response.blob();
await copyImage(blob);
```

---

### `readClipboard(): Promise<ClipboardItem[]>`

Reads all items from the clipboard.

**Returns:** Array of `ClipboardItem` objects

**Example:**
```typescript
const items = await readClipboard();
for (const item of items) {
  for (const type of item.types) {
    const blob = await item.getType(type);
    console.log(`Type: ${type}, Size: ${blob.size}`);
  }
}
```

---

### `copyWithFallback(text: string): boolean`

Copies text using `document.execCommand('copy')` fallback. Use this in content scripts where `navigator.clipboard` may not be available due to extension context isolation.

**Parameters:**
- `text` - The text string to copy

**Returns:** `true` if copy was successful, `false` otherwise

**Example:**
```typescript
// Use in content scripts
const success = copyWithFallback('Fallback copy');
if (success) {
  console.log('Copied successfully');
}
```

---

## Permissions

This library requires the following manifest permissions:

| Permission | Required For |
|------------|--------------|
| `clipboardWrite` | `copyText`, `copyHtml`, `copyImage` |
| `clipboardRead` | `pasteText`, `readClipboard` |

Add to your `manifest.json`:

```json
{
  "permissions": [
    "clipboardRead",
    "clipboardWrite"
  ]
}
```

## Requirements

- TypeScript 5.0+
- Node.js 18+
- Chrome 99+ (for ClipboardItem API)
- Extension must have clipboard permissions where needed

## Project Structure

```
webext-clipboard/
├── src/
│   ├── index.ts          # Main library source
│   └── __tests__/
│       └── index.test.ts # Unit tests
├── .github/
│   └── workflows/
│       └── ci.yml        # CI workflow
├── CHANGELOG.md          # Version history
├── CONTRIBUTING.md       # Contribution guide
├── LICENSE               # MIT license
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Related Packages

This library is part of the @zovo/webext ecosystem:

- [@theluckystrike/webext-context-menu](/) — Typed context menu helpers
- [@theluckystrike/webext-storage](/) — Type-safe storage operations
- [@theluckystrike/webext-tabs](/] — Tab management utilities

## License

MIT

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
