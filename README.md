Getting Started

These instructions will guide you to set up and run the tests on your local machine or a CI/CD pipeline.

Prerequisites

```
Node.js
npm or yarn
Git
```

Project Structure

Kaleidoscope-Playwright-Project
├── tests/                   # Test scripts organized by features/modules
├── configs/                 # Configuration files (e.g., test environment, timeouts)
├── reports/                 # Test execution reports
├── utils/                   # Helper utilities and custom functions
├── playwright.config.js     # Global Playwright configuration
├── package.json             # Project metadata and dependencies
├── README.md                # Project documentation
└── .gitignore               # Ignored files and directories


Installation

Follow these steps to set up the project locally:

Clone the repository:

```
git clone https://github.com/shubhamtestuser/Kaleidoscope.git
cd Kaleidoscope
```
Install dependencies:

```
npm install
```

Install Playwright browsers:

```
npx playwright install
```


Running Tests

Run All Tests
````
npx playwright test
```
Run Tests in a Specific File
````
npx playwright test tests/example.spec.ts
```
Run Tests in a Specific Browser
```
npx playwright test --project=chromium
```
Debug Tests
```
npx playwright test --debug
```