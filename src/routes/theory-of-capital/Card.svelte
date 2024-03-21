<script lang="ts">
	import type { Position } from './types';

	export let title: string;
	export let description: string;
	export let examples: string;
	export let position: Position;
	export let isFocus: boolean;
</script>

<button
	class="card card-hover variant-filled-surface p-4 absolute text-left font-thin appearance-none"
	style="transform: translate(calc({position.x}cqw - 50%),calc({position.y}cqh - 50%));"
	on:click
>
	<p class="text-xl font-bold">{title}</p>
	{#if isFocus}
		<p class="font-normal">{description}</p>
		<p class="font-bold">Examples: {examples}</p>
	{/if}
</button>
