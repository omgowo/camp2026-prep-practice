# profiles 資料夾

這裡放公開展示頁會讀取的 profile JSON。

檔名請使用：

```text
profiles/<GitHub 帳號>.json
```

例如：

```text
profiles/octocat.json
```

## 建議流程

1. 在 `notes/` 寫自然語言草稿。
2. 請 Coding Agent 產生 JSON。
3. 執行 `pnpm validate`。
4. 在 Source Control 檢查 diff。
5. 確認內容可以公開後再 commit。

## 格式範例

```json
{
  "$schema": "../schemas/profile.schema.json",
  "github": "octocat",
  "displayName": "小火龍",
  "tagline": "想把點子做成可以互動的網頁",
  "interests": ["AI", "前端", "開放資料"],
  "faction": {
    "os": "linux",
    "browser": "firefox",
    "editor": "vscode"
  }
}
```

## faction 代號

`faction` 請使用 `data/faction-options.json` 裡的固定代號。

例如請寫：

```json
"editor": "vscode"
```

不要寫：

```text
VS Code
```

## 公開資料

這個資料夾的內容可能會出現在公開網頁上。不要放電話、Email、LINE、Discord、學校、班級、住址、生日、年齡或其他不想公開的資訊。
