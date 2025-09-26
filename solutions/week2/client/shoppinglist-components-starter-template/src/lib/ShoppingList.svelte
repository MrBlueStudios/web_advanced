<script>
  import AddIngredient from './AddIngredient.svelte';
  import IngredientList from './IngredientList.svelte';

  let ingredients = $state([]);
  let draft = $state('');

  const addIngredient = (event) => {
    const { name } = event.detail;
    if (!name) {
      return;
    }
    ingredients.push(name);
    draft = '';
  };

  const deleteIngredient = (event) => {
    const index = event.detail.index;
    if (index < 0 || index >= ingredients.length) {
      return;
    }
    ingredients.splice(index, 1);
  };
</script>

<section class="shopping-list">
  <h1>Shopping list</h1>
  <AddIngredient bind:value={draft} on:add={addIngredient} />
  <IngredientList items={ingredients} on:delete={deleteIngredient} />
</section>

<style>
  .shopping-list {
    max-width: 32rem;
    margin: 3rem auto;
    padding: 2.5rem;
    border-radius: 1rem;
    background-color: #ffffff;
    box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
  }

  h1 {
    margin: 0 0 1.5rem;
    font-size: 2rem;
    color: #111827;
    text-align: center;
  }
</style>
