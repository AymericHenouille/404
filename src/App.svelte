<script lang="ts">
  import Card from './components/Card.svelte';
  import Rick from './components/Rick.svelte';
  import { background } from './utils/store/backgroud.store';
  let style: string = `background-image: url(${$background})`;
  let enableRick: boolean = false;
</script>

<main class="h-screen w-screen bg-fixed bg-cover bg-center bg-no-repeat" {style}>
  <div class="h-full w-full flex flex-col justify-center items-center bg-white dark:bg-slate-900 md:bg-transparent md:backdrop-blur-sm overflow-hidden">
    {#if !enableRick}
      <Card on:trigger={() => enableRick = true}/>
    {:else}
      <Rick />
    {/if}
  </div>
</main>