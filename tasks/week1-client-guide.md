# Week 1 Client Task Guide

## Goal
Build callback-, promise-, and async/await-based helpers for issuing GET requests so you understand how each asynchronous style works in Node.js.

## 1. Prepare the Demo Project
1. Navigate to `learning-tasks/1st-week/client/callbacks-starter-template`.
2. Run `npm install` to pull in the `xmlhttprequest` dependency mentioned in the README so `XMLHttpRequest` is available in Node.
3. Review `index.js` to see how the starter currently performs requests; you will generalize that logic.

## 2. Implement `fetchWithCallbacks`
1. Create a new module (or reuse the provided stub) that exports `fetchWithCallbacks(url, cb)`.
2. Use `XMLHttpRequest` to open a GET request, register `onload` and `onerror` handlers, and send the request.
3. Follow the error-first callback convention:
   * On non-2xx status codes or network errors, call `cb(new Error(message))`.
   * On success, parse the JSON (if desired) and call `cb(null, data)`.
4. Test it by calling the function with a known good URL (e.g., `https://jsonplaceholder.typicode.com/todos/1`) and with an invalid domain to verify the error path, logging the results to the console.

## 3. Implement `fetchWithPromise`
1. Wrap the same XMLHttpRequest logic in a `Promise` and resolve or reject accordingly.
2. Verify the function by invoking `.then()`/`.catch()` with both a valid and an invalid URL, mirroring the callback tests.

## 4. Demonstrate Async/Await Usage
1. Write an `async` function that calls `await fetchWithPromise(validUrl)` inside a try/catch block so errors are surfaced cleanly.
2. Show the failure mode by awaiting the promise with an invalid URL and catching the thrown error.

## 5. Document Usage Examples
Update the README or a notes file with short code snippets that demonstrate each approach so you can reference them when checking off tasks.

## 6. Final Review
* Ensure both helper functions are exported and accessible where you plan to demonstrate them.
* Confirm your examples prove success and failure scenarios for each helper, matching the checklist expectations.

## Sources
- `learning-tasks/1st-week/client/callbacks-starter-template/README.md`
