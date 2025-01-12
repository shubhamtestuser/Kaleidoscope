Getting Started

These instructions will guide you to set up and run the tests on your local machine.

Prerequisites

Node.js
npm or yarn
Git

Installation

Follow these steps to set up the project locally:

Clone the repository:

```git clone https://github.com/shubhamtestuser/Kaleidoscope.git
cd Kaleidoscope
```
Install dependencies:

```npm install
```

Install Playwright browsers:

```npx playwright install
```

Running Tests

Run All Tests
```npx playwright test
```

Run Tests in a Specific File

```npx playwright test tests/example.spec.ts
```

Run Tests in a Specific Browser

```npx playwright test --project=chromium
```

Debug Tests

```npx playwright test --debug
```