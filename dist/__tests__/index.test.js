import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyText, pasteText, copyHtml, copyImage, readClipboard, copyWithFallback } from '../index';
describe('clipboard', () => {
    let mockClipboard;
    beforeEach(() => {
        mockClipboard = {
            writeText: vi.fn().mockResolvedValue(undefined),
            readText: vi.fn().mockResolvedValue('test text'),
            write: vi.fn().mockResolvedValue(undefined),
            read: vi.fn().mockResolvedValue([])
        };
        vi.stubGlobal('navigator', {
            clipboard: mockClipboard
        });
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.resetAllMocks();
    });
    describe('copyText', () => {
        it('should copy text to clipboard', async () => {
            await copyText('hello world');
            expect(mockClipboard.writeText).toHaveBeenCalledWith('hello world');
        });
        it('should throw error when writeText fails', async () => {
            mockClipboard.writeText.mockRejectedValue(new Error('Copy failed'));
            await expect(copyText('fail')).rejects.toThrow('Copy failed');
        });
    });
    describe('pasteText', () => {
        it('should read text from clipboard', async () => {
            const text = await pasteText();
            expect(text).toBe('test text');
            expect(mockClipboard.readText).toHaveBeenCalled();
        });
        it('should return empty string when clipboard is empty', async () => {
            mockClipboard.readText.mockResolvedValue('');
            const text = await pasteText();
            expect(text).toBe('');
        });
    });
    describe('copyHtml', () => {
        it('should copy HTML to clipboard', async () => {
            vi.stubGlobal('ClipboardItem', class {
                constructor(items) {
                    this.items = items;
                }
            });
            await copyHtml('<b>test</b>');
            expect(mockClipboard.write).toHaveBeenCalled();
        });
        it('should use correct types for HTML copy', async () => {
            let createdItems = [];
            vi.stubGlobal('ClipboardItem', class {
                constructor(items) {
                    this.items = items;
                    createdItems.push(items);
                }
            });
            await copyHtml('<div>test</div>');
            expect(createdItems[0]).toHaveProperty('text/html');
            expect(createdItems[0]).toHaveProperty('text/plain');
        });
    });
    describe('copyImage', () => {
        it('should copy image blob to clipboard', async () => {
            vi.stubGlobal('ClipboardItem', class {
                constructor(items) {
                    this.items = items;
                }
            });
            const mockBlob = new Blob(['image data'], { type: 'image/png' });
            await copyImage(mockBlob);
            expect(mockClipboard.write).toHaveBeenCalled();
        });
        it('should throw error when image copy fails', async () => {
            vi.stubGlobal('ClipboardItem', class {
                constructor(items) {
                    this.items = items;
                }
            });
            mockClipboard.write.mockRejectedValue(new Error('Image copy failed'));
            const mockBlob = new Blob(['data'], { type: 'image/png' });
            await expect(copyImage(mockBlob)).rejects.toThrow('Image copy failed');
        });
    });
    describe('readClipboard', () => {
        it('should read all clipboard items', async () => {
            const items = await readClipboard();
            expect(items).toEqual([]);
            expect(mockClipboard.read).toHaveBeenCalled();
        });
        it('should return multiple items if available', async () => {
            const mockItem = {};
            mockClipboard.read.mockResolvedValue([mockItem, mockItem]);
            const items = await readClipboard();
            expect(items).toHaveLength(2);
        });
    });
    describe('copyWithFallback', () => {
        it('should use execCommand fallback', () => {
            const mockStyle = {
                position: '',
                left: '',
                top: ''
            };
            const mockElement = {
                focus: vi.fn(),
                select: vi.fn(),
                value: 'test text',
                style: mockStyle
            };
            const mockBody = {
                appendChild: vi.fn(),
                removeChild: vi.fn()
            };
            vi.stubGlobal('document', {
                createElement: vi.fn().mockReturnValue(mockElement),
                execCommand: vi.fn().mockReturnValue(true),
                body: mockBody
            });
            const result = copyWithFallback('test text');
            expect(result).toBe(true);
            expect(mockElement.focus).toHaveBeenCalled();
            expect(mockElement.select).toHaveBeenCalled();
            expect(mockBody.appendChild).toHaveBeenCalled();
            expect(mockBody.removeChild).toHaveBeenCalled();
        });
        it('should return false when execCommand fails', () => {
            const mockStyle = {
                position: '',
                left: '',
                top: ''
            };
            const mockElement = {
                focus: vi.fn(),
                select: vi.fn(),
                value: 'test text',
                style: mockStyle
            };
            const mockBody = {
                appendChild: vi.fn(),
                removeChild: vi.fn()
            };
            vi.stubGlobal('document', {
                createElement: vi.fn().mockReturnValue(mockElement),
                execCommand: vi.fn().mockReturnValue(false),
                body: mockBody
            });
            const result = copyWithFallback('test text');
            expect(result).toBe(false);
            expect(mockBody.removeChild).toHaveBeenCalled();
        });
        it('should handle document.body being null gracefully', () => {
            vi.stubGlobal('document', {
                createElement: vi.fn(),
                body: null
            });
            expect(() => copyWithFallback('test')).toThrow();
        });
    });
});
