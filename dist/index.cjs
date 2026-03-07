"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  copyHtml: () => copyHtml,
  copyImage: () => copyImage,
  copyText: () => copyText,
  copyWithFallback: () => copyWithFallback,
  pasteText: () => pasteText,
  readClipboard: () => readClipboard
});
module.exports = __toCommonJS(index_exports);
async function copyText(text) {
  await navigator.clipboard.writeText(text);
}
async function pasteText() {
  return navigator.clipboard.readText();
}
async function copyHtml(html) {
  const blob = new Blob([html], { type: "text/html" });
  const item = new ClipboardItem({
    "text/html": blob,
    "text/plain": new Blob([html], { type: "text/plain" })
  });
  await navigator.clipboard.write([item]);
}
async function copyImage(blob) {
  const item = new ClipboardItem({
    [blob.type]: blob
  });
  await navigator.clipboard.write([item]);
}
async function readClipboard() {
  return navigator.clipboard.read();
}
function copyWithFallback(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch (err) {
    success = false;
  }
  document.body.removeChild(textArea);
  return success;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyHtml,
  copyImage,
  copyText,
  copyWithFallback,
  pasteText,
  readClipboard
});
