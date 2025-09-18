<script>
  let newIngredient = $state('');
  let ingredients = $state([]);

  function addIngredient() {
      ingredients.push(newIngredient);
      newIngredient = ''
  }

  function deleteIngredient(index) {
      ingredients.splice(index, 1);
  }
</script>

<main>
<input type="text" bind:value={newIngredient} />
<button onclick={addIngredient}>Add</button>

<h2>Ingredients:</h2>
{#if ingredients.length > 0}
<ul>
  {#each ingredients as ingredient, index}
  <li>{ingredient}<button class="delete-button" onclick={() => deleteIngredient(index)}>X</button></li>
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
</style>
