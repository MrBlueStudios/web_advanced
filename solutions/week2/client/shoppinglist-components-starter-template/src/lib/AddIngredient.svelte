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
    placeholder="Add ingredient"
    aria-label="Ingredient name"
  />
  <button type="submit">Add</button>
</form>

<style>
  .add-ingredient {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #cbd5f5;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #2563eb;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  button:hover {
    background-color: #1d4ed8;
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
