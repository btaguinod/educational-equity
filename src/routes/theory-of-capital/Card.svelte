<script lang="ts">
	export let title: string;
	export let description: string;
	export let examples: string;
	export let position: number[];
	// TODO: set to false by default
	export let isFocus: boolean = true;
</script>

<button
	class="card card-hover variant-filled-surface p-4 absolute -translate-x-1/2 translate-y-1/2 text-left font-thin appearance-none"
	style="left:{position[0]}%;bottom:{position[1]}%"
	on:click
>
	<div class="text-xl font-bold">{title}</div>
	{#if isFocus}
		<div class="font-normal">{description}</div>
		<div class="font-bold"><strong>Examples: {examples}</strong></div>
	{/if}
</button>
