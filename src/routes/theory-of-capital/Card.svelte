<script lang="ts">
	import type { Position } from './types';

	export let title: string;
	export let description: string;
	export let examples: string;
	export let position: Position;
	// TODO: set to false by default
	export let isFocus: boolean = true;
</script>

<button
	class="card card-hover variant-filled-surface p-4 absolute -translate-x-1/2 translate-y-1/2 text-left font-thin appearance-none"
	style="left:{position.x}%;bottom:{position.y}%"
	on:click
>
	<div class="text-xl font-bold">{title}</div>
	{#if isFocus}
		<div class="font-normal">{description}</div>
		<div class="font-bold"><strong>Examples: {examples}</strong></div>
	{/if}
</button>
