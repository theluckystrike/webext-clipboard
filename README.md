[![CI](https://github.com/theluckystrike/webext-clipboard/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-clipboard/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Last Commit](https://img.shields.io/github/last-commit/theluckystrike/webext-clipboard)](https://github.com/theluckystrike/webext-clipboard/commits/main)
[![Stars](https://img.shields.io/github/stars/theluckystrike/webext-clipboard)](https://github.com/theluckystrike/webext-clipboard/stargazers)

# @theluckystrike/webext-clipboard

Typed clipboard helpers for Chrome extensions. Part of the zovo.webext ecosystem.

## Description

A TypeScript-first library that provides type-safe clipboard operations for Chrome extensions. Supports copying text, HTML, and images, with a fallback method for content scripts where `navigator.clipboard` may not be available.

## Installation

```bash
npm install @theluckystrike/webext-clipboard
# or
pnpm add @theluckystrike/webext-clipboard
# or
yarn add @theluckystrike/webext-clipboard
```

## Usage

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

Copies HTML content to the clipboard using `ClipboardItem`. Also sets plain text fallback.

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
├── LICENSE               # MIT license
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Requirements

- TypeScript 5.0+
- Chrome 99+ (for ClipboardItem API)
- Extension must have clipboard permissions where needed

## License

MIT

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
