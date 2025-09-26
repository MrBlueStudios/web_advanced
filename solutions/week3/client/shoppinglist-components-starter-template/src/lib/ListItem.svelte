<script>
  import { createEventDispatcher } from 'svelte';
  import NumericUpDown from './NumericUpDown.svelte';

  export let ingredient;
  export let index;

  const dispatch = createEventDispatcher();

  const handleQuantityChange = (event) => {
    dispatch('changeQuantity', { index, quantity: event.detail.value });
  };

  const handleDelete = () => {
    dispatch('remove', { index });
  };
</script>

<li>
  <div class="left">
    <h2>{ingredient.name}</h2>
    <p class="subtitle">Keep your pantry stocked</p>
  </div>
  <div class="right">
    <NumericUpDown value={ingredient.quantity} min={0} on:change={handleQuantityChange} />
    <button type="button" class="delete" on:click={handleDelete} aria-label={`Delete ${ingredient.name}`}>
      Remove
    </button>
  </div>
</li>

<style>
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    background: white;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
    gap: 1rem;
  }

  .left h2 {
    margin: 0;
    font-size: 1.1rem;
    color: #1f2937;
  }

  .subtitle {
    margin: 0.15rem 0 0;
    font-size: 0.85rem;
    color: #6b7280;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .delete {
    border: none;
    border-radius: 0.75rem;
    padding: 0.5rem 1rem;
    background: #ef4444;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .delete:hover {
    background: #dc2626;
  }
</style>
