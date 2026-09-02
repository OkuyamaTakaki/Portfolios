"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

const projectRoot = path.resolve(__dirname, "..");
const html = readProjectFile("index.html");
const privacyHtml = readProjectFile("privacy.html");
const css = readProjectFile("assets/css/style.css");
const htmlDocuments = [html, privacyHtml];

// 翻訳表、HTMLの翻訳キー、初期言語、保存処理を先に確認する。
require("./validate-localization.js");

function readProjectFile(relativePath) {
    return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function getAttribute(tag, attributeName) {
    const match = tag.match(new RegExp(`\\b${attributeName}="([^"]*)"`));
    return match ? match[1] : null;
}

function getTags(source, tagName) {
    return [...source.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "g"))].map((match) => match[0]);
}

const ids = getTags(html, "[a-z][a-z0-9-]*")
    .map((tag) => getAttribute(tag, "id"))
    .filter(Boolean);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepEqual([...new Set(duplicateIds)], [], "重複したidがあります。");

const internalLinks = getTags(html, "a")
    .map((tag) => getAttribute(tag, "href"))
    .filter((href) => href && href.startsWith("#") && href.length > 1)
    .map((href) => href.slice(1));
const missingAnchors = internalLinks.filter((anchor) => !ids.includes(anchor));
assert.deepEqual(missingAnchors, [], "移動先が存在しないページ内リンクがあります。");

const unsafeExternalLinks = htmlDocuments.flatMap((document) => getTags(document, "a"))
    .filter((tag) => getAttribute(tag, "target") === "_blank")
    .filter((tag) => {
        const rel = new Set((getAttribute(tag, "rel") || "").split(/\s+/));
        return !rel.has("noopener") || !rel.has("noreferrer");
    });
assert.deepEqual(unsafeExternalLinks, [], "新しいタブで開くリンクのrel属性が不足しています。");

const missingLocalFiles = [];
for (const tag of htmlDocuments.flatMap((document) => getTags(document, "(?:link|script|img)"))) {
    const reference = getAttribute(tag, "href") || getAttribute(tag, "src");
    if (!reference || /^(?:https?:|data:|#)/.test(reference)) {
        continue;
    }

    const localPath = reference.split(/[?#]/, 1)[0];
    if (!fs.existsSync(path.join(projectRoot, localPath))) {
        missingLocalFiles.push(localPath);
    }
}

const publicSiteRoot = "https://okuyamatakaki.github.io/Portfolios/";
for (const meta of getTags(html, "meta")) {
    const content = getAttribute(meta, "content");
    if (!content || !content.startsWith(publicSiteRoot)) {
        continue;
    }

    const localPath = content.slice(publicSiteRoot.length).split(/[?#]/, 1)[0];
    if (localPath && !fs.existsSync(path.join(projectRoot, localPath))) {
        missingLocalFiles.push(localPath);
    }
}
assert.deepEqual(missingLocalFiles, [], "参照先が存在しないローカルファイルがあります。");

for (const image of getTags(html, "img")) {
    assert.ok(getAttribute(image, "alt"), "altが空の画像があります。");
    assert.ok(getAttribute(image, "width") && getAttribute(image, "height"), "画像のwidthまたはheightがありません。");
}

for (const iframe of getTags(html, "iframe")) {
    assert.ok(getAttribute(iframe, "title"), "titleが空のiframeがあります。");
    assert.equal(getAttribute(iframe, "referrerpolicy"), "strict-origin-when-cross-origin", "iframeのreferrerpolicyを確認してください。");
}

for (const button of getTags(html, "button")) {
    assert.equal(getAttribute(button, "type"), "button", "buttonのtype属性を明示してください。");
}

assert.match(html, /data-video-pending/, "権利確認前の動画を無効化した案内がありません。");
assert.doesNotMatch(html, /data-youtube-video-id=/, "権利確認前のYouTube動画IDを有効化しないでください。");
assert.doesNotMatch(html, /<iframe\b[^>]*youtube-nocookie\.com/, "YouTube iframeを初期表示で読み込まないでください。");

const projectArticles = getTags(html, "article").filter((tag) => {
    const classes = new Set((getAttribute(tag, "class") || "").split(/\s+/));
    return ["project-featured", "project-media", "project-card", "compact-card"].some((name) => classes.has(name));
});
const heroProjectCount = Number(html.match(/class="hero-number">(\d+)</)?.[1]);
assert.equal(heroProjectCount, projectArticles.length, "画面上部の作品数と掲載作品数が一致しません。");

const inlineScripts = getTags(html, "script").filter((tag) => !getAttribute(tag, "src"));
assert.deepEqual(inlineScripts, [], "インラインスクリプトは使用しません。");
assert.match(html, /Content-Security-Policy/, "Content Security Policyがありません。");
assert.match(html, /<details\b[\s\S]*?<summary\b/, "詳細表示のsummaryがありません。");
assert.match(html, /data-language-option="ja"/, "日本語ボタンがありません。");
assert.match(html, /data-language-option="en"/, "Englishボタンがありません。");

const openingBraces = (css.match(/{/g) || []).length;
const closingBraces = (css.match(/}/g) || []).length;
assert.equal(openingBraces, closingBraces, "CSSの波括弧が対応していません。");
assert.match(css, /min-height:\s*44px/, "44px以上の操作領域ルールがありません。");
assert.match(css, /gap:\s*8px/, "操作要素の8px間隔ルールがありません。");
assert.match(css, /@media \(max-width:\s*900px\)/, "タブレット用表示ルールがありません。");
assert.match(css, /@media \(max-width:\s*680px\)/, "モバイル用表示ルールがありません。");
assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/, "動きを抑える表示ルールがありません。");

const sourceText = [
    html,
    css,
    readProjectFile("assets/js/localization.js"),
    privacyHtml,
    readProjectFile("README.md")
].join("\n");
assert.doesNotMatch(sourceText, /[A-Za-z]:\\Users\\/i, "個人PCの絶対パスがソースに含まれています。");

console.log(`サイト静的検査OK: ${projectArticles.length}作品 / 参照欠落0 / 重複ID 0 / 安全属性OK`);
