<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];

  const dispatch = createEventDispatcher();

  const remove = (index) => {
    dispatch('delete', { index });
  };
</script>

{#if items.length === 0}
  <p class="empty-state">The shopping list is empty.</p>
{:else}
  <ul class="ingredient-list">
    {#each items as ingredient, index}
      <li>
        <span>{ingredient}</span>
        <button type="button" class="delete-button" on:click={() => remove(index)} aria-label={`Delete ${ingredient}`}>
          ×
        </button>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .ingredient-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
  }

  .delete-button {
    border: none;
    background-color: #ef4444;
    color: white;
    border-radius: 9999px;
    width: 2rem;
    height: 2rem;
    font-size: 1.25rem;
    line-height: 2rem;
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: #dc2626;
  }

  .empty-state {
    text-align: center;
    color: #6b7280;
    padding: 2rem 0;
  }
</style>
