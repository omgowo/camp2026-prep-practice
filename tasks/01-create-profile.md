# 任務一：建立我的 profile JSON

目標：請 Coding Agent 把你的自然語言草稿轉成 `profiles/<GitHub 帳號>.json`，再由你檢查 diff。

```text
notes/<GitHub 帳號>.md
→ profiles/<GitHub 帳號>.json
→ pnpm validate
→ 檢查 diff
```

## 先準備草稿

1. 複製 `notes/profile-note.template.md`。
2. 改名為 `notes/<你的 GitHub 帳號>.md`。
3. 填入你願意公開的內容。

不要填電話、Email、學校、班級、生日、年齡或不想公開的社群帳號。

## 可以貼給 Coding Agent 的 prompt

```text
請閱讀 notes/<我的 GitHub 帳號>.md，並根據 schemas/profile.schema.json 和 data/faction-options.json，建立 profiles/<我的 GitHub 帳號>.json。

要求：
- github 使用我的 GitHub 帳號。
- displayName 使用我想公開顯示的名稱。
- tagline 壓成一句話，40 字以內。
- interests 保留 1 到 3 個主題。
- faction.os、faction.browser、faction.editor 必須使用 data/faction-options.json 裡的代號。
- 如果我的描述不明確，請選最接近的代號，並在回覆中說明你的判斷。
- 如果真的無法判斷，請使用 other。
- 不要新增電話、Email、學校、班級、年齡、生日或其他個人資料。
- 完成後請列出建立的檔案，以及我需要檢查的欄位。
```

## 建立後檢查

在 VS Code Source Control 裡確認：

- GitHub 帳號正確
- 顯示名稱是你想公開的名稱
- 一句話介紹沒有被改得不像你
- interests 只有 1 到 3 個
- faction 符合你的偏好
- 沒有出現不想公開的個人資料

## 驗證

```bash
pnpm validate
```

通過後，這個任務就完成。
