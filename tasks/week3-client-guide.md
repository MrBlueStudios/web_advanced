# Week 3 Client Task Guide

## Goal
Expand the shopping list client with quantity controls by splitting the UI into multiple Svelte components stored under `src/lib`.

## 1. Setup
1. Navigate to `learning-tasks/3rd-week/client/shoppinglist-components-starter-template`.
2. Install dependencies (`npm install` or `npm i`).
3. Start the dev server with `npm run dev` to validate the project builds before refactoring.

## 2. Define the Component Modules
Create the following files in `src/lib`:
* `ShoppingList.svelte` – holds the central array of ingredients and coordinates child components.
* `AddIngredient.svelte` – renders the input form, emitting an event when the user submits a new item.
* `ListItem.svelte` – displays a single ingredient row with delete and quantity controls.
* `NumericUpDown.svelte` – encapsulates the increment/decrement UI for adjusting quantities.

## 3. Wire Component Interactions
1. Move the shared state (the array of ingredients) into `ShoppingList.svelte` and expose add, update, and delete handlers.
2. Import `AddIngredient` and `ListItem` into `ShoppingList` and pass the necessary props and callback functions.
3. Inside `ListItem`, use `createEventDispatcher` to bubble delete and quantity-change events back to `ShoppingList`.
4. Implement `NumericUpDown` so it emits new quantity values when the user clicks the buttons; consume it inside `ListItem`.

## 4. Implement Required Behaviors
1. Ensure `ShoppingList` displays an empty-state message when there are no items.
2. Maintain the ability to add ingredients, update quantities through the numeric control, and delete entries.
3. Re-export `ShoppingList` from `src/lib/index.js` if you want to simplify imports in `App.svelte`.
4. Update `App.svelte` to render `<ShoppingList />` and remove the old inline logic.

## 5. Optional Enhancements
1. Add an `on:keydown` handler in `AddIngredient` to submit on Enter.
2. Allow double-clicking an item to toggle an inline text input for editing the name, saving on blur or Enter.

## 6. Final Review
* Run `npm run dev` and interact with the app to confirm the required and optional behaviors.
* Mark tasks complete in `tasks/week3-client.md` once the app matches the README instructions.

## Sources
- `learning-tasks/3rd-week/client/shoppinglist-components-starter-template/README.md`
