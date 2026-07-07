import process from 'node:process';

const userAgent = process.env.npm_config_user_agent ?? '';

if (!userAgent.startsWith('pnpm/')) {
  console.error('');
  console.error('請使用 pnpm 安裝這個專案。');
  console.error('');
  console.error('建議執行：');
  console.error('');
  console.error('  pnpm install');
  console.error('');
  console.error('這個 repo 使用 pnpm-lock.yaml；請不要混用 npm、yarn 或 bun。');
  console.error('');
  process.exit(1);
}
