<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { backInOut } from 'svelte/easing';
    import { MusicBox } from '../utils/musicbox/music-box';
    import { RICK_SHEET } from '../utils/sheets/rick.sheets';

    const dispatch = createEventDispatcher();
    let refresh = {};

    function wiggle(_: HTMLElement) {
      return {
        duration: 200,
        css: (t: number) => {
          const time: number = Math.sin(t * Math.PI) * 0.5;
          const eased: number = backInOut(time) * 0.1;
          return `transform: rotate(${eased * 360}deg);`;
        }
      };
    }

    const musicbox: MusicBox = new MusicBox(RICK_SHEET);

    function clickHandler(): void {
      refresh = {};
      const finish: boolean = musicbox.play('sine');
      if (finish) dispatch('trigger');
    }

  const currentLocation: Location = window.location;
</script>

<div class="p-6 h-full w-full bg-white 
  md:w-auto md:h-auto md:p-12
  md:rounded-lg md:shadow-2xl md:ring-1 md:ring-slate-100
  dark:bg-slate-900 dark:md:ring-slate-800
  flex justify-center items-center flex-col">
  <h1 class="text-6xl text-center font-bold text-gradian select-none">
    {#key refresh}
      4<button class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gradian to-gradian-2" in:wiggle on:mousedown={clickHandler}>0</button>4
    {/key}
  </h1>
  <p class="text-lg p-3 dark:text-white">
    Sorry, we couldn't find this page.
  </p>
  <span class="italic text-base text-gradian">{currentLocation}</span>
</div>