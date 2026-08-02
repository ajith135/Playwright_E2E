# Playwright E2E Test Suite

End-to-end testing framework for the SauceDemo application using Playwright v1.62.1, TypeScript, Page Object Model pattern, and Docker-based CI/CD.

## Prerequisites

- Node.js LTS (18.x or higher)
- npm

## Installation

```bash
npm install
```

## Project Structure

```
Playwright_E2E/
├── .github/workflows/
│   └── playwright.yml              # GitHub Actions CI/CD
├── tests/
│   ├── e2e/checkout.spec.ts        # E2E checkout tests
│   ├── example.spec.ts             # Example tests
│   ├── fixtures/page-fixtures.ts   # Test fixtures
│   ├── pages/                      # Page objects
│   │   ├── auth.setup.ts
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutStepOnePage.ts
│   │   └── CheckoutStepTwoPage.ts
│   └── playwright/                 # Auth state storage
├── playwright.config.ts            # Configuration
├── package.json
└── README.md
```

## Configuration

**Key settings in `playwright.config.ts`:**
- **baseURL**: `https://www.saucedemo.com`
- **fullyParallel**: `true` (runs tests in parallel)
- **Storage State**: Authenticated sessions saved to `playwright/.auth/user.json`
- **Projects**: Setup (authentication) + Chromium (E2E tests)

## Running Tests

```bash
# Run all tests
npm test

# Run with browser visible
npx playwright test --headed

# Run specific test file
npx playwright test tests/e2e/checkout.spec.ts

# Debug mode
npx playwright test --debug

# UI mode (interactive)
npx playwright test --ui
```

## Tests

**E2E Checkout Tests** (`tests/e2e/checkout.spec.ts`):
1. **Complete purchase flow** - Full checkout workflow with pre-authenticated session
2. **Sort items alphabetically** - Verify product sorting functionality

**Example Tests** (`tests/example.spec.ts`):
- Test Playwright documentation page
- Navigate through get started flow

## Page Object Model

Uses `BasePage` as base class. All page objects extend it:
- `LoginPage` - Login functionality
- `InventoryPage` - Product listing
- `CartPage` - Shopping cart
- `CheckoutStepOnePage` - Customer information
- `CheckoutStepTwoPage` - Order review

## Authentication

- Credentials: `standard_user` / `secret_sauce`
- `auth.setup.ts` runs first and saves session to `playwright/.auth/user.json`
- All subsequent tests reuse authenticated session (no re-login needed)

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/playwright.yml`):
- **Triggers**: On push to any branch or manual run (`workflow_dispatch`)
- **Does NOT trigger** on pull requests
- **Container**: `mcr.microsoft.com/playwright:v1.62.1-noble` (pre-installed browsers)
- **Timeout**: 60 minutes
- **Artifacts**: Test reports retained for 7 days

## View Test Report

```bash
npx playwright show-report
```

---

**Playwright Version**: 1.62.1 | **Node.js**: LTS (18.x+) | **Base URL**: https://www.saucedemo.com