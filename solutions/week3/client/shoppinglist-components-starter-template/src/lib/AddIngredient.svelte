<script>
  import { createEventDispatcher } from 'svelte';

  export let value = '';

  const dispatch = createEventDispatcher();

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    dispatch('add', { name: trimmed });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };
</script>

<form class="add-ingredient" on:submit={handleSubmit}>
  <label class="visually-hidden" for="ingredient-name">Ingredient name</label>
  <input
    id="ingredient-name"
    type="text"
    bind:value
    placeholder="Add a new ingredient"
    aria-label="Ingredient name"
  />
  <button type="submit">Add</button>
</form>

<style>
  .add-ingredient {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  input {
    padding: 0.85rem 1rem;
    border: 1px solid #dbeafe;
    border-radius: 0.75rem;
    font-size: 1rem;
    box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.08);
  }

  button {
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  button:hover {
    filter: brightness(1.05);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
