"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const i18n = require("../assets/js/localization.js");

const projectRoot = path.resolve(__dirname, "..");
const htmlPath = path.join(projectRoot, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const source = fs.readFileSync(path.join(projectRoot, "assets/js/localization.js"), "utf8");
const usedKeys = new Set();

for (const attribute of Object.keys(i18n.bindingAttributes)) {
    const pattern = new RegExp(`${attribute}="([^"]+)"`, "g");
    for (const match of html.matchAll(pattern)) {
        usedKeys.add(match[1]);
    }
}

const catalogDiagnostics = i18n.validateCatalog(i18n.translations);
const knownKeys = new Set(catalogDiagnostics.allKeys);
const missingDomKeys = [...usedKeys].filter((key) => !knownKeys.has(key));
const unusedKeys = [...knownKeys].filter((key) => !usedKeys.has(key));
const missingCatalogKeys = Object.values(catalogDiagnostics.missingByLanguage).flat();

assert.deepEqual(missingCatalogKeys, [], "言語カタログに欠落キーがあります。 ");
assert.deepEqual(missingDomKeys, [], "HTMLが未定義の翻訳キーを参照しています。 ");
assert.deepEqual(unusedKeys, [], "未使用の翻訳キーがあります。 ");
assert.match(html, /data-language-option="ja"/, "日本語ボタンがありません。 ");
assert.match(html, /data-language-option="en"/, "Englishボタンがありません。 ");
assert.match(html, /assets\/js\/localization\.js/, "翻訳スクリプトが読み込まれていません。 ");
assert.match(source, /localStorage\.getItem\(storageKey\)/, "保存済み言語の読み込み処理がありません。 ");
assert.match(source, /localStorage\.setItem\(storageKey, language\)/, "言語選択の保存処理がありません。 ");

assert.equal(i18n.selectInitialLanguage("en", ["ja-JP"]), "en", "保存済み言語を優先できません。 ");
assert.equal(i18n.selectInitialLanguage(null, ["ja-JP"]), "ja", "日本語環境を選択できません。 ");
assert.equal(i18n.selectInitialLanguage(null, ["en-US"]), "en", "英語環境を選択できません。 ");
assert.equal(i18n.selectInitialLanguage(null, ["fr-FR"]), "en", "日本語以外の環境で英語を選択できません。 ");
assert.equal(i18n.selectInitialLanguage(null, []), "ja", "言語情報がない場合のfallbackが不正です。 ");

console.log(`ローカライズ検査OK: ${usedKeys.size}キー / 日本語・English / 欠落0 / 未使用0`);
