# Portfolio

奥山貴希のポートフォリオサイトです。公開先は <https://okuyamatakaki.github.io/Portfolios/> です。

## フォルダ構成

```text
Portfolios/
├─ index.html              # ページ本文、作品情報、外部リンク、SEO設定
├─ README.md               # 更新・確認手順
└─ assets/
   ├─ css/
   │  └─ style.css         # デザイン、レスポンシブ、アクセシビリティ
   └─ images/
      ├─ block-breaker.png # ブロック崩しゲーム画面
      ├─ favicon.svg       # ブラウザタブ用のOTロゴ
      ├─ og.png            # SNS共有画像
      └─ roulette.png      # ルーレット画面
```

## 更新時の要点

- 作品名、説明、リンク、技術一覧は `index.html` を更新する。
- 作品数を変更したら、ヒーロー右側の `06 PROJECTS` も更新する。
- 画像は `assets/images/` に英小文字とハイフンのファイル名で追加し、`alt`、`width`、`height` を設定する。
- デザイン変更は `assets/css/style.css` にまとめ、既存のCSS変数とレスポンシブ指定を優先して使う。
- 外部リンクを新しいタブで開く場合は、`target="_blank"` と `rel="noopener noreferrer"` をセットで指定する。
- パスワード、APIキー、個人情報、開発用の設定ファイルは配置しない。

## ローカル確認

プロジェクト直下でローカルサーバーを起動し、`http://localhost:8000/` を開きます。

```powershell
python -m http.server 8000
```

公開前に以下を確認します。

1. PC幅とスマートフォン幅で横スクロールや文字切れがない。
2. ページ内リンク、GitHub、Render、unityroom、YouTubeのリンクが開く。
3. 画像とYouTube埋め込みが表示され、ブラウザのコンソールにエラーがない。
4. キーボードのTabキーで「本文へ移動」と主要リンクを操作できる。
5. HTML内の公開URL、OGP画像URL、掲載作品数が最新になっている。

## セキュリティ方針

- HTML内のContent Security Policyで、読み込める外部リソースをGoogle FontsとYouTubeに限定しています。
- YouTubeはプライバシー強化モードを使用しています。
- 公開サーバー側でも `Content-Security-Policy`、`X-Content-Type-Options: nosniff`、`Referrer-Policy`、`Permissions-Policy` を設定すると、より確実です。
- 新しい外部サービスを追加した場合は、必要な送信先だけContent Security Policyへ追加します。`*` は使用しません。

## バックアップ

作業完了時は、iCloud Drive内の「(制作中)2026年 奥山貴希ポートフォリオ」へ公開ファイルを上書きします。Git管理情報の `.git/` はバックアップ対象外とし、変更履歴はGitHubリポジトリで管理します。

## 最終確認記録

2026-08-27に以下を確認しました。

- HTML/CSS、画像・ファビコン参照、ページ内リンクに欠落なし
- 外部公開リンク7件が到達可能
- 375px幅で横方向のはみ出しなし
- `target="_blank"` のリンクに `rel="noopener noreferrer"` を設定済み
- 秘密情報、不要なスクリプト、フォーム送信処理なし
