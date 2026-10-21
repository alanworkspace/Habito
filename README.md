# Habito · 官方網站 (Landing Page)

Habito 的官方行銷網站與法律文件託管點，可部署至 **Cloudflare Pages** 或 **GitHub Pages**。同時作為 App Store / Google Play 上架審核所需的隱私權政策與服務條款網址。

## 技術選型

- **純靜態 HTML5 + CSS + JavaScript**（無需建置步驟，載入極快）。
- **Tailwind CSS**（透過 CDN，設定已內嵌於各頁面）。
- **Google Fonts**：Inter、Plus Jakarta Sans、Noto Sans TC。
- 響應式（RWD），支援手機與桌面；採用與 Habito App 一致的柔和暗色系主題。

## 目錄結構

```
habito_website/
├── index.html          # Landing Page（Header / Hero / Features 四大核心 / Pricing + 方案對比表 / Download / Footer）
├── privacy.html        # 隱私權政策（PII 清單、Firebase / RevenueCat 宣告）
├── terms.html          # 服務條款（Premium 自動續訂、UGC、免責聲明）
├── assets/
│   ├── css/
│   │   └── style.css   # 自訂樣式、滾動動畫、無障礙與 reduced-motion
│   └── js/
│       └── main.js     # 行動選單、滾動顯影、商店連結預留、動態年份
├── .gitignore
└── README.md
```

## 本機預覽

不建議直接用 `file://` 開啟（部分功能如平滑捲動仍可運作，但用本機伺服器更接近正式環境）。

**使用 Python：**

```bash
python -m http.server 5173
# 開啟 http://localhost:5173
```

**使用 Node.js（npx）：**

```bash
npx serve .
# 或
npx http-server -p 5173
```

**使用 VS Code：** 安裝 Live Server 擴充套件，右鍵 `index.html` → Open with Live Server。

---

## 部署說明

### 方法一：Cloudflare Pages（推薦）

1. 將本專案推送到 GitHub / GitLab 儲存庫。
2. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
3. 選擇你的儲存庫，設定如下：
   - **Framework preset**：`None`
   - **Build command**：*（留空）*
   - **Build output directory**：`/`（若專案位於子目錄，例如 `web_landing/`，請填該資料夾）
4. 點擊 **Save and Deploy**，完成後即可用 `https://<project>.pages.dev` 存取。
5. 於 **Custom domains** 綁定自有網域（例如 `habitoapp.com`）。

> Cloudflare Pages 會自動提供免費 HTTPS 與全球 CDN。

### 方法二：GitHub Pages

1. 將專案推送到 GitHub 儲存庫（假設分支為 `main`）。
2. 進入儲存庫 **Settings → Pages**。
3. **Source** 選擇 `Deploy from a branch`，**Branch** 選擇 `main`、資料夾選 `/ (root)`，儲存。
4. 稍候即可透過 `https://<username>.github.io/<repo>/` 存取。
5. 若使用自有網域，新增根目錄檔案 `CNAME`，內容為你的網域（例如 `www.habitoapp.com`），並於 DNS 設定 CNAME 記錄指向 `<username>.github.io`。

> **注意**：若部署於子路徑（`https://user.github.io/repo/`），頁面內使用相對路徑（`privacy.html`、`assets/...`），因此可正常運作，無需修改。

### 部署後建議

- 將 App Store / Google Play 上架審核所需的網址填入：
  - **Privacy Policy URL**：`https://<你的網域>/privacy.html`
  - **Terms of Service URL**：`https://<你的網域>/terms.html`
- 於 App 內「設定 / 關於」頁面加入相同連結。

---

## 需要替換的佔位內容

| 位置 | 目前內容 | 說明 |
| --- | --- | --- |
| `index.html` 商店按鈕 | `href="#"` | 將 `data-store="appstore"` / `data-store="googleplay"` 的連結換成實際商店網址。 |
| 訂閱價格 | HK$28 / 月、HK$238 / 年（首月 HK$18）| 免費版 + Premium 兩方案（位於 `#pricing` 區塊），依實際方案調整。 |
| 免費版使用上限 | 行事曆 20 筆、私人賬簿 20 本、共享賬本 AA/家庭各 1 本、備忘錄 100 篇 | Premium 全部無上限，依實際產品設定調整。 |
| 支援信箱 | `support@habitoapp.com` | 如使用不同信箱請全域取代。 |
| 生效日期 | 2026 年 1 月 1 日 | 更新 `privacy.html`、`terms.html` 頂端日期。 |
| 公司 / 負責人資訊 | 未填 | 依上架要求可於法律頁補上公司名稱與地址。 |

替換商店連結後，`assets/js/main.js` 中的「即將上架」提示會自動停用（僅在 `href="#"` 時觸發）。

---

## Deep Link 驗證檔（App Links / Universal Links）

App 的邀請連結有兩種形式，兩種都會帶著邀請碼：

| 形式 | 範例 | 需要伺服器設定嗎 |
|---|---|---|
| 自訂 scheme | `habito://join?code=FRQ9MT` | **不需要**，已安裝 App 的裝置一定打得開 |
| 網址（App Link / Universal Link） | `https://<網域>/Habito/join?code=FRQ9MT` | 需要網域根目錄放驗證檔 |

### ★ 驗證檔必須在「網域根目錄」

Android 的 `assetlinks.json` 與 iOS 的 `apple-app-site-association` 都**只**在
**網域根目錄**被查詢：

- `https://<網域>/.well-known/assetlinks.json`
- `https://<網域>/apple-app-site-association`（iOS 也接受 `/.well-known/` 版本）

放在子路徑（例如 `/Habito/.well-known/assetlinks.json`）**不會**被找到。

所以：

- **綁自訂網域**（例如 `habitoapp.com`）時：本倉庫的 `.well-known/` 與
  `apple-app-site-association` 就是網域根目錄，**直接可用**。
- **用 GitHub Pages 專案站**（`alanworkspace.github.io/Habito/`）時：專案站的
  路徑不等於網域根目錄，必須另外在 **`alanworkspace.github.io` 使用者網站
  倉庫**放一份（同一個檔案內容 + 一個空的 `.nojekyll`）。

### `.nojekyll` 為什麼在這裡

GitHub Pages 預設會用 Jekyll 編譯，而 Jekyll **會略過開頭是點的資料夾**
（`.well-known/` 就這樣被吃掉）。根目錄放一個空的 `.nojekyll` 就能關閉 Jekyll，
讓 GitHub Pages 原樣發布這些檔案。

### 憑證指紋怎麼取得

指紋必須是「**實際簽署這個 App 的那把金鑰**」的 SHA-256。在 App 專案執行：

```sh
cd android && ./gradlew printSigningFingerprints
```

會印出 `release`（`android/key.properties` 指定的那把）與 `debug` 兩組指紋，
輸出格式可以直接貼進 `assetlinks.json` 的 `sha256_cert_fingerprints` 陣列。

> ★ 這個任務會讀**建置實際會用到的**金鑰，所以它不可能跟打包結果對不上 ——
>   不像手抄 `keytool` 輸出那樣會抄到舊金鑰或抄成 SHA-1。

### ★ 上架前一定要補上「Play App Signing 金鑰」的指紋

Google Play 會用**自己的 App Signing 金鑰**重新簽署上架的 APK，所以使用者
裝到的手機上，簽章指紋是 **Play App Signing 金鑰**的，不是 `android/app/key.jks`
的。

要拿它的指紋：Play Console → **Setup** → **App integrity** → **App signing key**
（畫面上會直接顯示 SHA-256 指紋）。把它加進 `assetlinks.json` 的陣列裡。

`assetlinks.json` 可以同時放**多組**指紋（除錯金鑰 + 上傳金鑰 + Play App
Signing 金鑰），Android 會逐一比對。

---
## 設計與無障礙

- 深色主題：`ink`（背景）搭配 `brand`（紫）與 `warm`（橙）點綴。
- 所有互動元件具備 `:focus-visible` 外框；支援 `prefers-reduced-motion`。
- 區塊使用 `IntersectionObserver` 滾動顯影，提升質感且不影響效能。

## 授權

© 2026 Habito. All rights reserved.
