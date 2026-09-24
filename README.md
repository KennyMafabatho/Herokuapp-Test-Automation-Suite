# Herokuapp Test Automation Suite

Automated UI and API test scripts for the login flow on
[the-internet.herokuapp.com](https://the-internet.herokuapp.com/login)
and the [reqres.in](https://reqres.in) mock REST API.

## Project Structure

```
herokuapp/
├── node_modules/
├── package.json
├── package-lock.json
├── README.md
└── tests/
    ├── ui/
    │   ├── login-page.spec.js       # Successful login test
    │   └── login-failed.spec.js     # Failed login (invalid credentials) test
    └── api/
        ├── post-Method-User.spec.js     # POST /users test cases
        └── get-User-method.spec.js      # GET /users/2 test cases
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (tested on v22.19.0)
- Google Chrome installed (required for the UI/Selenium tests)

## Setup

1. Clone or download the repository.
2. Install dependencies from the project root:

   ```bash
   npm install
   ```

   This installs `selenium-webdriver` (used by the UI tests). The API tests
   use Node's built-in `fetch` and `assert` modules — no extra install needed.

## Running the UI Tests (Selenium)

UI tests automate a real Chrome browser against the login page, assert on
the result, and save a screenshot as evidence.

```bash
cd tests/ui
node login-page.spec.js
node login-failed.spec.js
```

**What each test does:**

| File | Scenario | Credentials Used | Expected Outcome |
|---|---|---|---|
| `login-page.spec.js` | Successful login | `tomsmith` / `SuperSecretPassword!` | Flash message confirms login; screenshot saved as `login-success.png` |
| `login-failed.spec.js` | Failed login | `wronguser` / `wrongpassword` | Flash message confirms rejection; screenshot saved as `login-failure.png` |

**Notes:**

- Each script launches its own Chrome window and closes it automatically when finished.
- The `--remote-allow-origins=*` Chrome option is required for Chrome 111+ to avoid connection errors.
- Screenshots are saved in the same folder the command was run from.

## Running the API Tests

API tests hit the reqres.in mock API directly over HTTP — no browser involved, so they run much faster than the UI tests.

```bash
cd tests/api
node post-Method-User.spec.js
node get-User-method.spec.js
```

**What each test does:**

| File | Endpoint | Test Cases Covered |
|---|---|---|
| `post-Method-User.spec.js` | `POST /api/users` | Status code is 201; response includes a generated `id`; response includes a `createdAt` field; response includes both `name` and `job` fields |
| `get-User-method.spec.js` | `GET /api/users/2` | Status code is 200; correct `id` returned; correct `email` returned; `Content-Type` header is `application/json` |

**Note:** reqres.in is a public mock API used for practice/testing purposes. It does not perform real server-side validation on POST requests (e.g. it will still return `201` even if required fields are missing).

## Test Output

Run one file at a time for the clearest view of results, or scroll up in the terminal if running multiple scripts back to back.

## Notes for Future Work

- Consider migrating to Mocha (`describe`/`it`) once more test cases are added, for structured pass/fail reporting instead of console logs.