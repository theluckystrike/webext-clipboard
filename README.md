<div align="center">

# @theluckystrike/webext-clipboard

Typed clipboard helpers for Chrome extensions. Read and write text to the clipboard with proper permission handling.

[![npm version](https://img.shields.io/npm/v/@theluckystrike/webext-clipboard)](https://www.npmjs.com/package/@theluckystrike/webext-clipboard)
[![npm downloads](https://img.shields.io/npm/dm/@theluckystrike/webext-clipboard)](https://www.npmjs.com/package/@theluckystrike/webext-clipboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@theluckystrike/webext-clipboard)

[Installation](#installation) · [Quick Start](#quick-start) · [API](#api) · [License](#license)

</div>

---

## Features

- **Read + write** -- copy to and paste from the clipboard
- **Permission handling** -- works with `clipboardRead` and `clipboardWrite` permissions
- **Typed** -- full TypeScript support
- **Promise-based** -- async/await for all operations
- **Offscreen fallback** -- handles MV3 clipboard restrictions via offscreen documents
- **Zero dependencies** -- just TypeScript and Chrome APIs

## Installation

```bash
npm install @theluckystrike/webext-clipboard
```

<details>
<summary>Other package managers</summary>

```bash
pnpm add @theluckystrike/webext-clipboard
# or
yarn add @theluckystrike/webext-clipboard
```

</details>

## Quick Start

```typescript
import { Clipboard } from "@theluckystrike/webext-clipboard";

await Clipboard.writeText("Hello, world!");
const text = await Clipboard.readText();
```

## API

| Method | Description |
|--------|-------------|
| `writeText(text)` | Write text to the clipboard |
| `readText()` | Read text from the clipboard |

## Permissions

```json
{ "permissions": ["clipboardRead", "clipboardWrite"] }
```

## Part of @zovo/webext

This package is part of the [@zovo/webext](https://github.com/theluckystrike) family -- typed, modular utilities for Chrome extension development:

| Package | Description |
|---------|-------------|
| [webext-storage](https://github.com/theluckystrike/webext-storage) | Typed storage with schema validation |
| [webext-messaging](https://github.com/theluckystrike/webext-messaging) | Type-safe message passing |
| [webext-tabs](https://github.com/theluckystrike/webext-tabs) | Tab query helpers |
| [webext-cookies](https://github.com/theluckystrike/webext-cookies) | Promise-based cookies API |
| [webext-i18n](https://github.com/theluckystrike/webext-i18n) | Internationalization toolkit |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [theluckystrike](https://github.com/theluckystrike) · [zovo.one](https://zovo.one)

</div>
