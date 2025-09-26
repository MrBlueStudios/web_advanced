# Week 2 Client Task Guide

## Goal
Refactor the single-component shopping list Svelte app into smaller components that preserve all baseline behaviors from the assignment.

## 1. Project Setup
1. Navigate to `learning-tasks/2nd-week/client/shoppinglist-components-starter-template/shoppinglist-components-starter-template`.
2. Install dependencies with `npm install` (or `npm i`).
3. Verify the dev server works with `npm run dev` so you can test refactors in the browser.

## 2. Plan the Component Structure
1. Review `src/App.svelte` to understand the existing list logic.
2. Identify sub-components that encapsulate UI responsibilities: a form for adding items, a list display, and empty-state messaging.

## 3. Break Down the UI
1. Create new Svelte files (e.g., inside `src/lib`) for the components you plan to extract.
2. Move markup and stateful logic from `App.svelte` into these components, passing props and dispatching events to keep data flowing upward.
3. Ensure the ability to add items is preserved by wiring the form submission back to the parent state.

## 4. Handle Required Behaviors
1. Show a helpful empty-list message by checking the array length and conditionally rendering a placeholder component or block.
2. Support deleting items by emitting an event from each item component (e.g., with `createEventDispatcher`) and handling it in the parent to splice the array.
3. Confirm the add, empty-state, and delete interactions continue working in the running app.

## 5. Optional Enhancements
1. Add an `on:keydown` handler for the form input to trigger submission when `Enter` is pressed.
2. Implement an editable item interface (e.g., toggling between text and input on double-click) if you want to complete the bonus items.

## 6. Final Review
* Run `npm run lint` or the dev server once more to ensure no Svelte warnings are emitted.
* Check off each requirement in `tasks/week2-client.md` after confirming it matches the README instructions.

## Sources
- `learning-tasks/2nd-week/client/shoppinglist-components-starter-template/shoppinglist-components-starter-template/README.md`
