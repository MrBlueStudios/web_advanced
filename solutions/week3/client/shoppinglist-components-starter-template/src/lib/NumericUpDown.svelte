<script>
  import { createEventDispatcher } from 'svelte';

  export let value = 1;
  export let min = 0;
  export let max = Number.POSITIVE_INFINITY;

  const dispatch = createEventDispatcher();

  const emitChange = (nextValue) => {
    if (nextValue < min || nextValue > max) {
      return;
    }
    dispatch('change', { value: nextValue });
  };

  const decrease = () => emitChange(value - 1);
  const increase = () => emitChange(value + 1);
</script>

<div class="numeric-up-down" role="group" aria-label="Adjust quantity">
  <button type="button" on:click={decrease} disabled={value <= min} aria-label="Decrease quantity">
    −
  </button>
  <span class="value" aria-live="polite">{value}</span>
  <button type="button" on:click={increase} aria-label="Increase quantity">
    +
  </button>
</div>

<style>
  .numeric-up-down {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #eef2ff;
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
  }

  button {
    border: none;
    background-color: #2563eb;
    color: white;
    font-size: 1.1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }

  .value {
    min-width: 1.5rem;
    text-align: center;
    font-weight: 600;
    color: #1f2937;
  }
</style>
