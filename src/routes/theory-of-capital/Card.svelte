<script lang="ts">
	import type { Position } from './types';

	export let title: string;
	export let description: string;
	export let examples: string;
	export let position: Position;
	export let isFocus: boolean;
</script>

<button
	class="card card-hover variant-filled-surface p-4 absolute -translate-x-1/2 -translate-y-1/2 text-left font-thin appearance-none"
	style="left:{position.x}%;top:{position.y}%"
	on:click
>
	<p class="text-xl font-bold">{title}</p>
	{#if isFocus}
		<p class="font-normal">{description}</p>
		<p class="font-bold">Examples: {examples}</p>
	{/if}
</button>
