# Day 1 Prep Course 流程

這份文件給講師與助教課前對齊使用。

兩小時內只追求一個結果：每位學員完成一份可公開檢查的 profile，並看到它出現在小隊 Showcase。

## 課程節奏

| 階段 | 目的 | 產出 |
|---|---|---|
| 開場 | 說明今天不是能力測驗，而是工具與協作暖機 | 學員知道目標 |
| 共編自我介紹 | 練習把想法寫成有結構的文字 | 一段可轉換的草稿 |
| 版本紀錄對照 | 從 Google Docs 帶到 Git diff | 理解「誰改了什麼」 |
| 開啟 repo | 熟悉 VS Code、Terminal、Source Control | 可以執行指令 |
| 建立 note | 填入願意公開的資料 | `notes/<github>.md` |
| Agent 轉 JSON | 讓 Agent 依規格產生資料 | `profiles/<github>.json` |
| 檢查 diff | 由人確認內容正確且可公開 | 可審查的修改 |
| 預覽 Showcase | 看見資料變成頁面 | 本機展示頁 |

## 開場要講清楚

今天的重點不是：

- 誰比較會寫程式
- 誰的工具比較厲害
- 一次理解完整 Git 流程

今天的重點是：

- 帳號與工具能不能用
- 你能不能給 Agent 清楚上下文
- 你能不能看懂 Agent 改了哪些檔案

## Google Docs 銜接 Git

可以用 Google Docs 版本紀錄建立直覺：

| Google Docs | 程式專案 |
|---|---|
| 文件 | repo 裡的檔案 |
| 版本紀錄 | commit history |
| 建議模式 | pull request |
| 誰改了哪裡 | diff |

先讓學員理解「修改要能被看見」，再進入 Git 指令。

## Repo 操作主線

學員實作時依序完成：

```text
notes/profile-note.template.md
→ notes/<GitHub 帳號>.md
→ profiles/<GitHub 帳號>.json
→ pnpm validate
→ pnpm stats
→ pnpm dev
```

助教協助時，優先看：

- `pnpm validate` 的錯誤訊息
- Source Control diff
- `profiles/<github>.json` 是否含有不該公開的資訊
- faction 是否使用固定代號

## 收束語方向

可以把今天收在這句話：

```text
你提供脈絡，Agent 修改 repo，前端展示結果，而你負責檢查 diff。
```

後續正式課程會更複雜，但核心習慣相同：把想法寫清楚，讓修改可檢查，讓成果能被團隊看見。
