=== ShowCase ===

ShowCase is a web application that allows users to showcase their projects.

## E2E Testing

- Playwright is used for E2E testing.
- Add `-- --ui` for test with live UI.
- Example: `pnpm run e2e -- --ui`

### Running E2E Tests

```txt
// Run headless e2e tests
// Development server will be started automatically (i.e. pnpm run dev)

$ pnpm run e2e
```

### Running E2E Tests with Custom Target URL

```txt
// Run headless e2e tests against the custom target URL

$ TARGET_URL=https://exmple.com; pnpm run e2e
```
