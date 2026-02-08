# QA Playwright TypeScript MCP Boilerplate

A production-ready template for QA Automation Engineers (JR/SR) to jumpstart UI and API test automation with **Playwright**, **TypeScript**, and **MCP** (Model Context Protocol) support.

## Features

- **UI Automation** — Playwright Test with Page Object Model, custom fixtures, and cross-browser support
- **API Automation** — Playwright `request` API for HTTP testing, plus optional Postman/Newman skeleton
- **MCP Integration** — Pre-configured for `@playwright/mcp` (browser tools) and Playwright Test MCP (test runner tools)
- **AI Agents & Skills** — Claude Code agents for test design, PR hygiene, security scanning, flake triage, and more
- **Documentation** — QA conventions, prompt library, PR workflow, and security sanitization guides

## Quick Start

```bash
# 1. Use this template on GitHub → "Use this template" button
# 2. Clone your new repo
git clone https://github.com/<your-org>/<your-repo>.git
cd <your-repo>

# 3. Install dependencies
npm install

# 4. Set up environment
cp .env.example .env
# Edit .env with your application's base URL

# 5. Install browsers
npx playwright install

# 6. Run tests
npm test
```

## Project Structure

```
├── .claude/
│   ├── agents/          # AI agents for QA workflows
│   │   ├── qa-orchestrator.md
│   │   ├── ui-test-designer.md
│   │   ├── api-coverage-planner.md
│   │   ├── pr-hygiene.md
│   │   ├── security-scout.md
│   │   ├── coverage-hunter.md
│   │   ├── flake-triage.md
│   │   ├── ci-reporter.md
│   │   ├── docs-writer.md
│   │   ├── mcp-explorer.md
│   │   └── seed-data-manager.md
│   └── skills/          # Reusable prompt skills
│       ├── mcp-scout.md
│       └── prompt-library.md
├── docs/
│   ├── QA_CONTEXT.md           # Scope, selectors, waits, PR slicing
│   ├── PROMPT_LIBRARY.md       # Copy-paste prompts for common tasks
│   ├── PR_WORKFLOW.md          # Standard PR flow guide
│   ├── SECURITY_SANITIZATION.md # What to check before publishing
│   └── MCP_SETUP.md            # MCP server configuration guide
├── pages/                # Page Object Models
│   ├── base.page.ts
│   └── login.page.ts
├── tests/
│   ├── fixtures/         # Custom Playwright fixtures
│   │   └── base.fixture.ts
│   ├── ui/               # UI test specs
│   │   └── smoke.spec.ts
│   └── api/              # API test specs
│       └── health.spec.ts
├── utils/                # Shared helpers
│   ├── env.ts
│   └── api-helpers.ts
├── postman/              # Optional Newman/Postman skeleton
├── .mcp.json.example     # MCP server config template
├── playwright.config.ts  # Playwright configuration
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:ui` | Run UI tests only (`@ui` tag) |
| `npm run test:api` | Run API tests only (`@api` tag) |
| `npm run test:debug` | Run tests with Playwright Inspector |
| `npm run report` | Open the HTML test report |
| `npm run lint` | Lint TypeScript files |

## MCP Setup

This boilerplate supports two MCP servers for Claude Code integration:

1. **`playwright`** — Browser automation (navigate, click, fill, screenshot)
2. **`playwright-test`** — Test runner (run tests, view results, manage execution)

```bash
cp .mcp.json.example .mcp.json
```

See [docs/MCP_SETUP.md](docs/MCP_SETUP.md) for full setup instructions.

## Writing Tests

### UI Tests (Page Object Model)

```typescript
import { test, expect } from '../fixtures/base.fixture';
import { LoginPage } from '../../pages/login.page';

test('user can log in @ui @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login('testuser', 'password123');
  await expect(page).toHaveURL(/dashboard/);
});
```

### API Tests (Playwright Request)

```typescript
import { test, expect } from '../fixtures/base.fixture';

test('GET /api/users returns 200 @api', async ({ apiContext }) => {
  const response = await apiContext.get('/api/users');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
});
```

### Selector Priority

1. **Role-based** (preferred): `page.getByRole('button', { name: 'Submit' })`
2. **Test ID**: `page.getByTestId('login-form')`
3. **Text**: `page.getByText('Welcome')` — for assertions
4. **CSS**: Avoid — fragile
5. **XPath**: Never unless no alternative

See [docs/QA_CONTEXT.md](docs/QA_CONTEXT.md) for full conventions.

## AI Agents

Use Claude Code agents to accelerate QA workflows:

| Agent | Purpose |
|-------|---------|
| `qa-orchestrator` | Coordinates all specialist agents |
| `ui-test-designer` | Designs UI test cases from user stories |
| `api-coverage-planner` | Plans API test coverage |
| `pr-hygiene` | Checks PR quality and standards |
| `security-scout` | Scans for secrets and vulnerabilities |
| `coverage-hunter` | Finds test coverage gaps |
| `flake-triage` | Diagnoses and fixes flaky tests |
| `ci-reporter` | Parses CI output into summaries |
| `docs-writer` | Generates and updates documentation |
| `mcp-explorer` | Discovers MCP server capabilities |
| `seed-data-manager` | Manages test data and fixtures |

## Documentation

- [QA Context & Conventions](docs/QA_CONTEXT.md)
- [Prompt Library](docs/PROMPT_LIBRARY.md)
- [PR Workflow](docs/PR_WORKFLOW.md)
- [Security Sanitization](docs/SECURITY_SANITIZATION.md)
- [MCP Setup](docs/MCP_SETUP.md)

## Contributing

1. Create a feature branch from `main`
2. Follow the [PR Workflow](docs/PR_WORKFLOW.md)
3. Ensure all tests pass: `npm test`
4. Ensure no lint errors: `npm run lint`
5. Submit a PR using the template

## License

MIT
