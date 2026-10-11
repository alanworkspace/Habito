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
├── index.html          # Landing Page（Header / Hero / Features / Pricing / Download / Footer）
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
| 訂閱價格 | NT$90 / NT$890 / NT$290 | 依實際方案調整（位於 `#pricing` 區塊）。 |
| 支援信箱 | `support@habitoapp.com` | 如使用不同信箱請全域取代。 |
| 生效日期 | 2026 年 1 月 1 日 | 更新 `privacy.html`、`terms.html` 頂端日期。 |
| 公司 / 負責人資訊 | 未填 | 依上架要求可於法律頁補上公司名稱與地址。 |

替換商店連結後，`assets/js/main.js` 中的「即將上架」提示會自動停用（僅在 `href="#"` 時觸發）。

---

## 設計與無障礙

- 深色主題：`ink`（背景）搭配 `brand`（紫）與 `warm`（橙）點綴。
- 所有互動元件具備 `:focus-visible` 外框；支援 `prefers-reduced-motion`。
- 區塊使用 `IntersectionObserver` 滾動顯影，提升質感且不影響效能。

## 授權

© 2026 Habito. All rights reserved.
