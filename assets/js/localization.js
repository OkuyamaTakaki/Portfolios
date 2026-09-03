(() => {
    "use strict";

    const fallbackLanguage = "ja";
    const supportedLanguages = Object.freeze(["ja", "en"]);
    const storageKey = "portfolio.language";

    // 表示文言を1か所に集約し、HTMLへ日本語の安全な初期表示だけを残す。
    const translations = Object.freeze({
        ja: Object.freeze({
            "meta.description": "奥山貴希のポートフォリオ。Java・Spring BootによるWebアプリケーションと、Unity・JavaScriptによるゲーム作品を紹介しています。",
            "meta.locale": "ja_JP",
            "meta.ogTitle": "奥山貴希 | Portfolio",
            "meta.ogDescription": "Webアプリケーションとゲームの制作ポートフォリオ。",
            "meta.imageAlt": "黒鉄の工場パネルをイメージした奥山貴希 Portfolio 2026",
            "meta.title": "奥山貴希 | ポートフォリオ",
            "skip.toContent": "本文へ移動",
            "a11y.siteTop": "奥山貴希 ポートフォリオ トップへ",
            "a11y.primaryNav": "メインナビゲーション",
            "a11y.languageSwitcher": "表示言語",
            "a11y.features": "主な実装機能",
            "a11y.technologies": "使用技術",
            "language.status": "日本語で表示中",
            "nav.works": "制作物",
            "nav.skills": "スキル",
            "hero.name": "奥山 貴希",
            "hero.copy": "Webアプリケーションとゲームを、学びながら、動く形へ。",
            "hero.description": "Java / Spring BootのWebアプリと、Unity・JavaScriptのゲーム作品を紹介します。",
            "hero.viewWorks": "制作物を見る",
            "hero.viewGitHub": "GitHubを見る",
            "hero.projectsLabel": "作品",
            "works.eyebrow": "制作物",
            "works.title": "制作物",
            "works.description": "作品の目的・主な機能・使用技術を短くまとめています。",
            "diary.title": "奥山貴希のありがとう日記",
            "diary.lead": "アカウントごとに日記を登録・編集し、日付で検索できるWebアプリです。並べ替えとページ分割にも対応しています。",
            "diary.detailsSummary": "主な機能を見る",
            "diary.featureAccount": "アカウント登録・ログイン",
            "diary.featureEdit": "日記の登録・編集",
            "diary.featureSearch": "日付検索・並べ替え",
            "diary.featureDatabase": "DBへの永続保存",
            "action.openApp": "公開サイト",
            "action.viewSource": "ソースコードを見る",
            "action.playGame": "ゲームをプレイ",
            "tower.videoTitle": "2Dタワーディフェンスゲームの紹介動画",
            "tower.videoPending": "紹介動画は権利確認後に公開します。ゲーム本体は下のリンクから遊べます。",
            "tower.videoPendingButton": "動画は確認中",
            "tower.devices": "PC / スマホ横対応",
            "tower.title": "2D タワーディフェンスゲーム",
            "tower.lead": "3種類のユニットを出撃させ、敵の拠点を攻め落とす2Dタワーディフェンスです。",
            "tower.note": "スマートフォンは横向きで遊べます。",
            "mini.title": "ミニゲーム作品",
            "mini.description": "ブラウザで短時間から遊べる2つの作品です。",
            "roulette.alt": "1から16までの数字を配置したルーレット画面",
            "roulette.title": "ルーレット",
            "roulette.description": "スタート・ストップで数字を選ぶ、JavaScript製のルーレットです。",
            "shift.title": "30秒！ファクトリーブレイク",
            "shift.alt": "30秒！ファクトリーブレイクの英語タイトル画面。難易度と開始・遊び方の操作を表示",
            "shift.description": "30秒で全ブロックを壊す工場風ゲーム。3段階の難易度と、反射で加速するボールが特徴です。",
            "more.title": "その他のUnity作品",
            "more.description": "ルールがひと目で分かるUnityゲームです。",
            "haita.title": "注ぐ！止める！タイミングチャレンジ",
            "haita.description": "振り向く合図を見て注ぐ・止めるを切り替え、メーターを満たすレトロ風タイミングゲームです。",
            "haita.playLabel": "注ぐ！止める！タイミングチャレンジをプレイ",
            "grass.title": "30秒！草かりチャレンジ",
            "grass.description": "草を集め、とげを避けて高得点を狙うゲーム。3段階の難易度を選べます。",
            "grass.playLabel": "30秒！草かりチャレンジをプレイ",
            "skills.eyebrow": "技術",
            "skills.title": "使用技術",
            "skills.description": "Web開発とゲーム制作で使用した技術です。",
            "skills.backend": "バックエンド",
            "skills.frontend": "フロントエンド",
            "skills.game": "ゲーム",
            "footer.name": "奥山 貴希",
            "footer.tagline": "Webアプリケーション / ゲーム開発",
            "footer.privacy": "プライバシー",
            "footer.toTop": "ページ上部へ"
        }),
        en: Object.freeze({
            "meta.description": "Takaki Okuyama's portfolio featuring Java and Spring Boot web applications, Unity games, and JavaScript projects.",
            "meta.locale": "en_US",
            "meta.ogTitle": "Takaki Okuyama | Portfolio",
            "meta.ogDescription": "A portfolio of web applications and game development projects.",
            "meta.imageAlt": "Takaki Okuyama Portfolio 2026 on an industrial black-metal panel",
            "meta.title": "Takaki Okuyama | Portfolio",
            "skip.toContent": "Skip to main content",
            "a11y.siteTop": "Go to the top of Takaki Okuyama's portfolio",
            "a11y.primaryNav": "Primary navigation",
            "a11y.languageSwitcher": "Display language",
            "a11y.features": "Key features",
            "a11y.technologies": "Technologies used",
            "language.status": "Viewing in English",
            "nav.works": "Works",
            "nav.skills": "Skills",
            "hero.name": "Takaki Okuyama",
            "hero.copy": "Turning what I learn into working web apps and games.",
            "hero.description": "Explore my Java / Spring Boot web applications and Unity / JavaScript game projects.",
            "hero.viewWorks": "View my work",
            "hero.viewGitHub": "View GitHub",
            "hero.projectsLabel": "Projects",
            "works.eyebrow": "Selected Works",
            "works.title": "Works",
            "works.description": "A concise overview of each project's purpose, main features, and technologies.",
            "diary.title": "Takaki Okuyama’s Gratitude Diary",
            "diary.lead": "A personal diary app with account-based entries, editing, date search, sorting, and pagination.",
            "diary.detailsSummary": "View key features",
            "diary.featureAccount": "Account registration and sign-in",
            "diary.featureEdit": "Create and edit diary entries",
            "diary.featureSearch": "Date search and sorting",
            "diary.featureDatabase": "Persistent database storage",
            "action.openApp": "Open live app",
            "action.viewSource": "View source code",
            "action.playGame": "Play game",
            "tower.videoTitle": "Introduction video for the 2D tower defense game",
            "tower.videoPending": "The introduction video will be available after its rights review. You can play the game from the link below.",
            "tower.videoPendingButton": "Video under review",
            "tower.devices": "PC / LANDSCAPE MOBILE",
            "tower.title": "2D Tower Defense Game",
            "tower.lead": "Deploy three unit types and break through the enemy base in this 2D tower defense game.",
            "tower.note": "On smartphones, play in landscape orientation.",
            "mini.title": "Mini Game Works",
            "mini.description": "Two browser games designed for quick play sessions.",
            "roulette.alt": "Roulette screen with numbers 1 through 16 arranged in a grid",
            "roulette.title": "Roulette",
            "roulette.description": "A JavaScript roulette that selects a number with start and stop controls.",
            "shift.title": "FACTORY BREAK: 30 SECONDS",
            "shift.alt": "English title screen for FACTORY BREAK: 30 SECONDS with difficulty, start, and how-to controls",
            "shift.description": "An industrial-style game where you break every block in 30 seconds, with three difficulty levels and a ball that speeds up after each bounce.",
            "more.title": "More Unity Works",
            "more.description": "Unity games with rules that are easy to understand at a glance.",
            "haita.title": "POUR & STOP: TIMING CHALLENGE",
            "haita.description": "A retro timing game: watch the turning cue, switch between POUR and STOP, and fill the meter.",
            "haita.playLabel": "Play POUR & STOP: TIMING CHALLENGE",
            "grass.title": "30-Second Grass-Cutting Challenge",
            "grass.description": "Collect grass, avoid spikes, and aim for a high score across three difficulty levels.",
            "grass.playLabel": "Play 30-Second Grass-Cutting Challenge",
            "skills.eyebrow": "Technology",
            "skills.title": "Skills",
            "skills.description": "Technologies used across my web and game development projects.",
            "skills.backend": "Backend",
            "skills.frontend": "Frontend",
            "skills.game": "Game",
            "footer.name": "Takaki Okuyama",
            "footer.tagline": "Web Application / Game Development",
            "footer.privacy": "Privacy",
            "footer.toTop": "Back to top"
        })
    });

    const bindingAttributes = Object.freeze({
        "data-i18n": null,
        "data-i18n-aria": "aria-label",
        "data-i18n-alt": "alt",
        "data-i18n-title": "title",
        "data-i18n-content": "content"
    });

    function validateCatalog(catalog) {
        const allKeys = new Set(Object.values(catalog).flatMap((messages) => Object.keys(messages)));
        const missingByLanguage = {};

        for (const language of supportedLanguages) {
            const messages = catalog[language] ?? {};
            missingByLanguage[language] = [...allKeys].filter((key) => !(key in messages));
        }

        return { allKeys: [...allKeys], missingByLanguage };
    }

    function normalizeLanguage(locale) {
        if (typeof locale !== "string") {
            return null;
        }

        const normalized = locale.trim().toLowerCase();
        if (normalized === "ja" || normalized.startsWith("ja-")) {
            return "ja";
        }
        if (normalized === "en" || normalized.startsWith("en-")) {
            return "en";
        }
        return null;
    }

    function selectInitialLanguage(storedLanguage, browserLanguages = []) {
        if (supportedLanguages.includes(storedLanguage)) {
            return storedLanguage;
        }

        for (const locale of browserLanguages) {
            const language = normalizeLanguage(locale);
            if (language) {
                return language;
            }
        }

        return browserLanguages.length > 0 ? "en" : fallbackLanguage;
    }

    const api = Object.freeze({
        fallbackLanguage,
        supportedLanguages,
        translations,
        bindingAttributes,
        validateCatalog,
        normalizeLanguage,
        selectInitialLanguage
    });

    // Node.jsの静的検査ではカタログと選択ロジックだけを公開する。
    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }

    if (typeof document === "undefined" || typeof window === "undefined") {
        return;
    }

    const fallbackEvents = new Set();

    function getMessage(language, key) {
        if (translations[language] && Object.prototype.hasOwnProperty.call(translations[language], key)) {
            return translations[language][key];
        }

        if (Object.prototype.hasOwnProperty.call(translations[fallbackLanguage], key)) {
            fallbackEvents.add(`${language}:${key}`);
            return translations[fallbackLanguage][key];
        }

        fallbackEvents.add(`missing:${key}`);
        return key;
    }

    function collectUsedKeys(root) {
        const keys = new Set();
        for (const attribute of Object.keys(bindingAttributes)) {
            root.querySelectorAll(`[${attribute}]`).forEach((element) => {
                const key = element.getAttribute(attribute);
                if (key) {
                    keys.add(key);
                }
            });
        }
        return keys;
    }

    function applyLanguage(requestedLanguage) {
        const language = supportedLanguages.includes(requestedLanguage) ? requestedLanguage : fallbackLanguage;

        for (const [bindingAttribute, targetAttribute] of Object.entries(bindingAttributes)) {
            document.querySelectorAll(`[${bindingAttribute}]`).forEach((element) => {
                const key = element.getAttribute(bindingAttribute);
                const message = getMessage(language, key);
                if (targetAttribute) {
                    element.setAttribute(targetAttribute, message);
                } else {
                    element.textContent = message;
                }
            });
        }

        document.documentElement.lang = language;
        document.documentElement.dataset.language = language;
        document.querySelectorAll("[data-language-option]").forEach((button) => {
            const isActive = button.dataset.languageOption === language;
            button.setAttribute("aria-pressed", String(isActive));
            button.classList.toggle("is-active", isActive);
        });

        return language;
    }

    function readStoredLanguage() {
        try {
            return window.localStorage.getItem(storageKey);
        } catch {
            return null;
        }
    }

    function storeLanguage(language) {
        try {
            window.localStorage.setItem(storageKey, language);
        } catch {
            // プライベートモードなどで保存できなくても、現在の表示切替は継続する。
        }
    }

    const catalogDiagnostics = validateCatalog(translations);
    const usedKeys = collectUsedKeys(document);
    const knownKeys = new Set(catalogDiagnostics.allKeys);
    const missingDomKeys = [...usedKeys].filter((key) => !knownKeys.has(key));
    const unusedKeys = [...knownKeys].filter((key) => !usedKeys.has(key));
    const missingCatalogKeys = Object.values(catalogDiagnostics.missingByLanguage).flat();

    if (missingCatalogKeys.length > 0 || missingDomKeys.length > 0) {
        console.error("[i18n] Missing translation keys detected.", {
            missingByLanguage: catalogDiagnostics.missingByLanguage,
            missingDomKeys
        });
    }
    if (unusedKeys.length > 0) {
        console.warn("[i18n] Unused translation keys detected.", unusedKeys);
    }

    const browserLanguages = Array.isArray(window.navigator.languages)
        ? window.navigator.languages
        : [window.navigator.language].filter(Boolean);
    const initialLanguage = selectInitialLanguage(readStoredLanguage(), browserLanguages);
    applyLanguage(initialLanguage);

    document.querySelectorAll("[data-language-option]").forEach((button) => {
        button.addEventListener("click", () => {
            const language = applyLanguage(button.dataset.languageOption);
            storeLanguage(language);
        });
    });

    window.__portfolioI18nDiagnostics = Object.freeze({
        missingByLanguage: catalogDiagnostics.missingByLanguage,
        missingDomKeys,
        unusedKeys,
        fallbackEvents
    });
})();
