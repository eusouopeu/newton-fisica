# Newton — Física por simulação

PWA de ensino de Física (Cinemática e Dinâmica) com simulações interativas, quizzes e progresso salvo localmente. React + TypeScript + Vite + Tailwind.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — typecheck + build de produção em `dist/`
- `npm run lint` — Oxlint
- `npm test` — testes (Vitest + Testing Library)
- `npm run preview` — serve o build de produção localmente

## Deploy

O app é publicado como site estático no GitHub Pages via GitHub Actions
(`.github/workflows/deploy.yml`), automaticamente a cada push em `main`.
O roteamento usa `HashRouter`, então não é preciso configurar rewrites no
servidor.

Se o repositório for renomeado ou movido para outra conta, atualize o
`base` em [vite.config.ts](vite.config.ts) para bater com o novo
`https://<usuário>.github.io/<repositório>/`.

## Testes

```bash
npm test
```

Cobre a lógica de progresso/streak/badges (`src/lib`) e o fluxo de uma
lição (`LessonRunner`, `QuizScreenView`).
