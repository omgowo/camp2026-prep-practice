# 任務二：檢查 Showcase 頁面

目標：確認 `profiles/*.json` 會正確變成小隊展示頁。

前端會自動讀取 profile，產生：

- 主視覺輪播
- 成員卡片牆
- faction 統計
- 點擊展開的 profile dialog

## 可以貼給 Coding Agent 的 prompt

```text
請閱讀 src/main.js、src/styles.css、data/faction-options.json 和 profiles/*.json，協助改善 Showcase 頁面。

請保留：
- 主輪播
- 成員卡片牆
- faction 統計
- 點擊展開卡片

限制：
- 不要新增大型框架。
- 不要使用 innerHTML 插入學員提供的文字。
- 保持動畫清楚但不干擾閱讀。
- 修改後請說明改了哪些檔案，以及我應該檢查哪些互動。
```

## 手動檢查

- `pnpm dev` 可以正常啟動
- 每位成員都有顯示
- GitHub 頭貼正常載入
- faction 統計合理
- 輪播會自動播放
- hover 和 click 互動正常
- 手機尺寸不會爆版

## 完成標準

```bash
pnpm validate
pnpm stats
pnpm build
```
