# Coding Agent Prompt 範例

這些 prompt 可以直接複製後替換 `<我的 GitHub 帳號>`。

## 建立 profile

```text
請閱讀 notes/<我的 GitHub 帳號>.md，根據 schemas/profile.schema.json 和 data/faction-options.json，建立 profiles/<我的 GitHub 帳號>.json。

請注意：
- faction 欄位要使用固定代號，不要使用顯示名稱。
- 不要加入電話、Email、學校、班級、生日、年齡或其他個人資料。
- 如果我的描述不明確，請選最接近的代號並說明你的判斷。
- 建立完成後請告訴我改了哪些檔案，以及我應該檢查哪些欄位。
```

## 修正 validate 錯誤

```text
pnpm validate 顯示 profiles/<我的 GitHub 帳號>.json 有錯誤。請根據錯誤訊息修正，但不要改動其他人的 profile。

修正後請說明：
- 錯誤原因
- 修改了哪些欄位
- 我應該重新檢查哪些地方
```

## 改善 Showcase

```text
請改善 Showcase 頁面，但保留主輪播、成員卡片牆、faction 統計與點擊展開卡片。

限制：
- 不要新增大型框架。
- 不要用 innerHTML 插入學員提供的文字。
- 不要破壞 pnpm validate、pnpm stats、pnpm build。
- 修改後請列出我應該手動測試的互動。
```

## 請 Agent 解釋 diff

```text
請根據目前 git diff，說明你剛剛做了哪些修改。

請分成：
- 新增或修改的檔案
- 每個檔案修改目的
- 需要我人工確認的地方
- 不確定的假設
```
