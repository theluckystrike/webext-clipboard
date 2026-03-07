# @anthropic/webext-clipboard

Typed clipboard helpers for Chrome extensions. Part of @zovo/webext.

## Installation

```bash
npm install @anthropic/webext-clipboard
# or
pnpm add @anthropic/webext-clipboard
# or
yarn add @anthropic/webext-clipboard
```

## Usage

```typescript
import { copyText, pasteText, copyHtml, copyImage, readClipboard, copyWithFallback } from '@anthropic/webext-clipboard';

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

### `pasteText(): Promise<string>`

Reads plain text from the clipboard using `navigator.clipboard.readText`.

**Returns:** The text content from the clipboard

### `copyHtml(html: string): Promise<void>`

Copies HTML content to the clipboard using `ClipboardItem`. Also sets plain text fallback.

**Parameters:**
- `html` - The HTML string to copy

### `copyImage(blob: Blob): Promise<void>`

Copies an image to the clipboard using `ClipboardItem`.

**Parameters:**
- `blob` - The image blob to copy

### `readClipboard(): Promise<ClipboardItem[]>`

Reads all items from the clipboard.

**Returns:** Array of `ClipboardItem` objects

### `copyWithFallback(text: string): boolean`

Copies text using `document.execCommand('copy')` fallback. Use this in content scripts where `navigator.clipboard` may not be available.

**Parameters:**
- `text` - The text string to copy

**Returns:** `true` if copy was successful, `false` otherwise

## License

MIT

---

Built with ❤️ by [zovo.one](https://zovo.one)
