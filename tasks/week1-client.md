# Week 1 Client Checklist

## Setup
- [ ] Install dependencies with `npm install` so the XMLHttpRequest library is available.

## Fetch Library Implementations
- [ ] Build `fetchWithCallbacks(url, cb)` to issue GET requests and invoke the callback with the error-first signature.
- [ ] Test `fetchWithCallbacks` with both a valid URL and an invalid URL.
- [ ] Build `fetchWithPromise(url)` to return a promise that resolves or rejects based on the request outcome.
- [ ] Test `fetchWithPromise` with both a valid URL and an invalid URL.
- [ ] Demonstrate that the promise-based functions can be consumed via `async`/`await`.

## Sources
- `learning-tasks/1st-week/client/callbacks-starter-template/README.md`
