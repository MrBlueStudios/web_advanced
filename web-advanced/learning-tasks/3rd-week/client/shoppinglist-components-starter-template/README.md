# Shopping list App

This project is the result of the client exercise from last week. We have added a quantity adjustment feature.
The shopping list is only a single component. It is up to you to split it up into smaller, working components. 

Make sure to install the dependencies with `npm install` or `npm i`.
You can then start the development server from the terminal with `npm run dev`.

Split the application into components. All components should be stored in the `lib` folder. The following components should be built:
- `ShoppingList.svelte`: should store all the data.
- `AddIngredient.svelte`: component used to add ingredients to the shopping list.
- `ListItem.svelte`: renders an ingredient list item, with the name of the ingredient, the quantity adjuster and the delete button.
- `NumericUpDown.svelte`: component for changing the quantity of an item.

## Extra
Once you completed these instruction you can try to
- Add items when pressing the `Enter` key instead of pressing the add button.
- Make the item editable in place when double clicked.
