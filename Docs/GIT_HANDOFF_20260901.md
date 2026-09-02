# Git引渡し票 2026-09-01

## 結論

- 正本: この `Docs` フォルダーの親にあるポートフォリオリポジトリ
- ブランチ: `main`
- ローカル保存点: この票を含む最新commit。IDは `git log -1 --oneline` で確認
- 公開基準: ローカルの `origin/main`、`522fd93`
- 差: 最新ローカルcommitは公開基準より2コミット先。未push
- 実施していない操作: 永続Git設定変更、push、外部公開

2026-09-02の低負荷再開点:

- コミット開始時は25件（変更7、削除3、新規15）、ステージ済み0件。既存変更を破棄せず継続
- コミット開始時のローカルHEADは`origin/main`より1コミット先
- 復帰点はローカルHEAD `6cba0d5a1780fd36cc6ca1f7e6fbfe83ec5a09e7`、公開基準 `522fd932c37f0bb25e7d9ddc4be0fb5b63159e08`
- Gitロック、別ライター、ローカル確認サーバーは0件
- 高確度の秘密情報、`git diff --check`違反、Markdownローカルリンク欠落は0件
- 追加した`Docs/RELEASE_DECISION_JA.md`で、公開前に人が権利・プライバシー・外部リンク・公開先を判断できる
- Git所有者安全確認は、このリポジトリを対象にした各Gitコマンドへの一時指定で通過させた。PC全体のGit設定は変更していない

この票の「公開版」は、ネットワーク更新を行わず、ローカルに保存された `origin/main` を基準にしています。GitHub Pagesの実表示との最終一致はpush前に別途確認します。

## 公開版との差

ローカルの `origin/main` に保存された公開基準と、現在の作業フォルダーを比較しました。

- 公開基準: 日本語固定、プライバシーリンクなし、YouTube iframe 1件、`og.png` と `block-breaker.png` を参照
- 現在の候補: 日本語 / English切替、プライバシーリンクと `privacy.html`、iframe 0件、旧画像参照0件、第一者記録付きOG画像とSHIFT BREAKER画像を参照
- 現在の候補はローカルcommitとして保存済み・未pushのため、公開ページへはまだ反映されていない

`og-industrial.png` は `origin/main` にはなく、直前のローカルHEADで追加された後に参照を外し、現在のローカル保存点では削除されています。

## 公開基準からローカルHEADまで

10ファイル、1449行追加、218行削除です。

- レトロ工場風の表示と読みやすさを調整
- 日記アプリとUnity作品の説明・リンクを更新
- 日本語 / English切替と翻訳表を追加
- 静的検査、Git除外設定、素材来歴台帳を追加

## 直前のローカルHEADから今回の保存点まで

変更済み:

- `Docs/THIRD_PARTY_NOTICES.md`
- `README.md`
- `assets/css/style.css`
- `assets/images/favicon.svg`
- `assets/js/localization.js`
- `index.html`
- `scripts/validate-site.js`

削除として保存:

- `assets/images/og-industrial.png`
- `assets/images/og.png`
- `assets/images/block-breaker.png`

3点は公開HTMLから参照を外した後、以前の作業でごみ箱へ移動済みです。現在の作業フォルダーにはなく、今回の引渡し確認では削除・移動を行っていません。

新規追加:

- `Docs/Licenses/PixelMplus/` 3ファイル
- `Docs/Provenance/` 3ファイル
- `Docs/VALIDATION_20260901.md`
- `Docs/RELEASE_DECISION_JA.md`
- `assets/fonts/PixelMplus12-Regular.ttf`
- `assets/images/og-portfolio-2026.png`
- `assets/images/shift-breaker-2026.png`
- `assets/sources/og-portfolio-2026.svg`
- `assets/sources/roulette-portfolio-2026.svg`
- `privacy.html`
- この引渡し票

主な効果:

- Google Fontsをやめ、許諾文付きPixelMplusをローカル配信
- 来歴不明のOG画像を、編集可能な第一者SVG原本付き画像へ差し替え
- SHIFT BREAKERの不一致画像を、現在の作品スクリーンショットへ差し替え
- 権利確認前のYouTube動画ID・iframe・外部通信を無効化
- 日本語 / English併記のプライバシーページを追加
- 旧画像3点は公開HTMLからの参照を外した後、ごみ箱へ移動済み。ローカルcommitで削除を保存

## 検査結果

環境: Node.js `v24.19.0`

実行:

```powershell
node scripts/validate-site.js
```

結果:

```text
ローカライズ検査OK: 66キー / 日本語・English / 欠落0 / 未使用0
サイト静的検査OK: 6作品 / 参照欠落0 / 重複ID 0 / 安全属性OK
```

`git diff --check` も合格しています。

READMEとDocsのローカルMarkdownリンク5件も欠落0です。今回は既存のレスポンシブ証拠を再利用し、ブラウザーの大量検査を行っていません。実行ファイル9点の構造ハッシュは `379FAA63D6575E18F41227E578278351E219903683FF91B3C5A47675D2091E82` です。

## 外部リンク

- GitHubプロフィール
- Spring Boot日記アプリの公開ページとソース
- unityroomの4作品: タワーディフェンス、SHIFT BREAKER、ハイターチャレンジ、30秒！草かりチャレンジ

YouTubeは権利確認が終わるまで接続しません。ゲームソース、Unityプロジェクト、内部資料は掲載対象へ混ぜていません。

## push前の確認

1. `git show --stat --oneline HEAD` と `git diff origin/main...HEAD` で、削除3ファイルを含む最新ローカルcommitを人が内容確認する。
2. 新しいルーレットSVGとfaviconの制作記録・ハッシュを確認する。
3. PC・スマートフォンで日英、プライバシー、主要リンクを最終確認する。
4. 80台実機、30 FPS相当、20秒以内、クラッシュ後復帰、必須画面幅、200%文字、人の快適性確認を公開判断記録で確認する。
5. push対象、公開先、影響を再提示し、その操作直前に人の明示確認を得る。

## 公開候補ファイル

権利確認後に公開対象とする候補として、最新ローカルcommitに含めた内容は次のとおりです。

- 公開画面: `index.html`、`privacy.html`、`assets/css/style.css`、`assets/js/localization.js`
- 公開素材: `assets/fonts/PixelMplus12-Regular.ttf`、`assets/images/favicon.svg`、`assets/sources/roulette-portfolio-2026.svg`、`assets/images/og-portfolio-2026.png`、`assets/images/shift-breaker-2026.png`
- 人向け保守情報: `.gitattributes`、`.gitignore`、`AGENTS.md`、`README.md`、`Docs/THIRD_PARTY_NOTICES.md`、`Docs/GIT_HANDOFF_20260901.md`、`Docs/VALIDATION_20260901.md`、`Docs/Licenses/PixelMplus/`、`Docs/Provenance/`
- 編集原本と検査: `assets/sources/og-portfolio-2026.svg`、`scripts/validate-localization.js`、`scripts/validate-site.js`

`assets/images/og-industrial.png`、`assets/images/og.png`、`assets/images/block-breaker.png` は公開対象外です。現在の作業フォルダーにはなく、最新ローカルcommitで削除されています。未pushの公開基準 `origin/main` には旧ファイルが残る点に注意してください。旧`assets/images/roulette.png`も公開参照から外し、新しい制作記録付きSVGを公開候補にします。

## 復元

- `origin/main` の公開基準は `522fd93`、今回の変更前のローカルcommitは `6cba0d5`、現在の保存点は `git log -1 --oneline` で確認する。
- 現在のローカル保存点や別作業を失わないよう、`reset`、`clean`、一括復元を行わない。
- 旧画像3点だけを戻す必要がある場合は、ごみ箱またはローカルHEAD `6cba0d5` を確認し、対象パスを限定して復元する。
- 比較や復元が必要な場合は、別のローカルフォルダーへ基準コミットを展開し、必要なファイルだけを照合する。
