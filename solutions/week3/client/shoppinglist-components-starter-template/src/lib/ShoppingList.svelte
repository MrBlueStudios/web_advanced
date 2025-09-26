<script>
  import AddIngredient from './AddIngredient.svelte';
  import ListItem from './ListItem.svelte';

  let draft = $state('');
  let ingredients = $state([
    { name: 'Apple', quantity: 1 },
  ]);

  const addIngredient = (event) => {
    const { name } = event.detail;
    if (!name) {
      return;
    }

    const existing = ingredients.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.quantity += 1;
    } else {
      ingredients.push({ name, quantity: 1 });
    }

    draft = '';
  };

  const updateQuantity = (event) => {
    const { index, quantity } = event.detail;
    if (index < 0 || index >= ingredients.length) {
      return;
    }
    ingredients[index].quantity = quantity;
  };

  const removeIngredient = (event) => {
    const { index } = event.detail;
    if (index < 0 || index >= ingredients.length) {
      return;
    }
    ingredients.splice(index, 1);
  };
</script>

<section class="shopping-list">
  <header>
    <h1>Smart shopping list</h1>
    <p class="intro">Add items, adjust their quantities and stay organised for your next grocery run.</p>
  </header>

  <AddIngredient bind:value={draft} on:add={addIngredient} />

  {#if ingredients.length === 0}
    <p class="empty">Your list is empty. Start by adding your favourite ingredients.</p>
  {:else}
    <ul class="list">
      {#each ingredients as ingredient, index}
        <ListItem
          {ingredient}
          {index}
          on:changeQuantity={updateQuantity}
          on:remove={removeIngredient}
        />
      {/each}
    </ul>
  {/if}
</section>

<style>
  .shopping-list {
    max-width: 42rem;
    margin: 3rem auto;
    padding: 3rem;
    border-radius: 1.5rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    box-shadow: 0 25px 55px rgba(15, 23, 42, 0.12);
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 0;
    font-size: 2.25rem;
    color: #0f172a;
  }

  .intro {
    margin: 0.75rem 0 0;
    color: #64748b;
    font-size: 1rem;
  }

  .empty {
    text-align: center;
    color: #94a3b8;
    padding: 2rem 1rem;
    background: #f8fafc;
    border-radius: 1rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
