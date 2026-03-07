import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  copyText,
  pasteText,
  copyHtml,
  copyImage,
  readClipboard,
  copyWithFallback
} from '../index';

describe('clipboard', () => {
  let mockClipboard: {
    writeText: ReturnType<typeof vi.fn>;
    readText: ReturnType<typeof vi.fn>;
    write: ReturnType<typeof vi.fn>;
    read: ReturnType<typeof vi.fn>;
  };

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
  });

  describe('pasteText', () => {
    it('should read text from clipboard', async () => {
      const text = await pasteText();
      expect(text).toBe('test text');
      expect(mockClipboard.readText).toHaveBeenCalled();
    });
  });

  describe('copyHtml', () => {
    it('should copy HTML to clipboard', async () => {
      vi.stubGlobal('ClipboardItem', class {
        constructor(public items: Record<string, Blob>) {}
      });
      
      await copyHtml('<b>test</b>');
      expect(mockClipboard.write).toHaveBeenCalled();
    });
  });

  describe('copyImage', () => {
    it('should copy image blob to clipboard', async () => {
      vi.stubGlobal('ClipboardItem', class {
        constructor(public items: Record<string, Blob>) {}
      });
      
      const mockBlob = new Blob(['image data'], { type: 'image/png' });
      await copyImage(mockBlob);
      expect(mockClipboard.write).toHaveBeenCalled();
    });
  });

  describe('readClipboard', () => {
    it('should read all clipboard items', async () => {
      const items = await readClipboard();
      expect(items).toEqual([]);
      expect(mockClipboard.read).toHaveBeenCalled();
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
  });
});
