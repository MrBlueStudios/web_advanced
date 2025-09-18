<script>
  let newIngredient = $state('');
  let ingredients = $state([{ name: 'Apple', quantity: 1}]);

  const addIngredient = () => {
      ingredients.push({
          name: newIngredient,
          quantity: 1
      });
      newIngredient = ''
  }

  const deleteIngredient = index => ingredients.splice(index, 1);
  const increaseQuantity = index => ingredients[index].quantity++;
  const decreaseQuantity = index => {
    if (ingredients[index].quantity > 0) {
      ingredients[index].quantity--;
    }
  }
</script>

<main>
<input type="text" bind:value={newIngredient} />
<button onclick={addIngredient}>Add</button>

<h2>Ingredients:</h2>
{#if ingredients.length > 0}
<ul>
  {#each ingredients as ingredient, index}
  <li>
    <div>
      {#if ingredient.quantity > 0}
        <button onclick={() => decreaseQuantity(index)}>-</button>
      {/if}
      <span class="quantity">{ ingredient.quantity }</span>
      <button onclick={() => increaseQuantity(index)}>+</button>
    </div>
    <span class="ingredient-name">{ingredient.name}</span>
    <button class="delete-button" onclick={() => deleteIngredient(index)}>X</button></li>
  {/each}
</ul>
{:else}
The shopping list is empty.
{/if}
</main>

<style>
.delete-button {
  background-color: red;
  margin: 5px;
}

li {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.quantity {
  background-color: gray;
  padding: 10px;
  border-radius: 10px;
}

.ingredient-name {
    margin: 0 1rem;
}
</style>
