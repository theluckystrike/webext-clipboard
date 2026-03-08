[![CI](https://github.com/theluckystrike/webext-clipboard/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-clipboard/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-clipboard)](https://www.npmjs.com/package/@theluckystrike/webext-clipboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# @theluckystrike/webext-clipboard

Typed clipboard helpers for Chrome extensions. Part of @zovo/webext.

## Features

- **Copy plain text** — Simple text-to-clipboard using the modern Clipboard API
- **Copy rich HTML** — Copy formatted HTML with automatic plain text fallback
- **Copy images** — Copy images from Blob data to the system clipboard
- **Read clipboard contents** — Read text, HTML, or images from the clipboard
- **Paste detection** — Read current clipboard content as plain text
- **Fallback strategies** — Works in content scripts where `navigator.clipboard` may be restricted

## Installation

```bash
npm install @theluckystrike/webext-clipboard
# or
pnpm add @theluckystrike/webext-clipboard
# or
yarn add @theluckystrike/webext-clipboard
```

## Quick Start

### Copy Text

```typescript
import { copyText } from '@theluckystrike/webext-clipboard';

await copyText('Hello, World!');
```

### Copy HTML

```typescript
import { copyHtml } from '@theluckystrike/webext-clipboard';

await copyHtml('<h1>Hello</h1><p>World</p>');
```

### Read Clipboard Contents

```typescript
import { pasteText, readClipboard } from '@theluckystrike/webext-clipboard';

const text = await pasteText();
const items = await readClipboard();
```

## Advanced Usage

### Copy Images from Canvas

```typescript
import { copyImage } from '@theluckystrike/webext-clipboard';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
canvas.toBlob(async (blob) => {
  if (blob) await copyImage(blob);
});

// From URL
const response = await fetch('https://example.com/image.png');
await copyImage(await response.blob());
```

### Fallback Strategy for Content Scripts

The modern `navigator.clipboard` API may not be available in all extension contexts. Use `copyWithFallback` for content scripts:

```typescript
import { copyWithFallback } from '@theluckystrike/webext-clipboard';

const success = copyWithFallback('Fallback copy');
```

### Context-Specific Recommendations

| Context | Recommended API |
|---------|----------------|
| Background | `copyText`, `copyHtml`, `copyImage` |
| Popup | `copyText`, `copyHtml`, `copyImage` |
| Content script | `copyWithFallback` |

## API Reference

| Export | Signature | Description |
|--------|-----------|-------------|
| `copyText` | `(text: string) => Promise<void>` | Copy plain text |
| `pasteText` | `() => Promise<string>` | Read plain text |
| `copyHtml` | `(html: string) => Promise<void>` | Copy HTML with fallback |
| `copyImage` | `(blob: Blob) => Promise<void>` | Copy image |
| `readClipboard` | `() => Promise<ClipboardItem[]>` | Read all items |
| `copyWithFallback` | `(text: string) => boolean` | Fallback via `execCommand` |

### copyText

Copies plain text using `navigator.clipboard.writeText`.

### pasteText

Reads plain text using `navigator.clipboard.readText`.

### copyHtml

Copies HTML using `ClipboardItem` with automatic plain text fallback.

### copyImage

Copies an image blob to clipboard. Supports PNG, JPEG, and other formats.

### readClipboard

Reads all clipboard items as `ClipboardItem[]`.

### copyWithFallback

Fallback using `document.execCommand('copy')` for restricted contexts.

## Required Permissions

Add to your `manifest.json`:

```json
{
  "manifest_version": 3,
  "permissions": ["clipboardWrite"]
}
```

For read access:

```json
{
  "permissions": ["clipboardRead"]
}
```

> **Note**: `clipboardRead` requires a user action to trigger. See [Chrome's clipboard docs](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/).

## Context Limitations

| Context | Clipboard Access |
|---------|-----------------|
| Background | Full `navigator.clipboard` |
| Popup | Full `navigator.clipboard` |
| Content script | Restricted — use `copyWithFallback` |

## Part of @zovo/webext

`@theluckystrike/webext-clipboard` is part of @zovo/webext — typed utilities for Chrome extensions.

Other packages:
- [webext-storage](https://github.com/theluckystrike/webext-storage)
- [webext-messaging](https://github.com/theluckystrike/webext-messaging)

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
