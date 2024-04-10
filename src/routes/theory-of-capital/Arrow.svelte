<script lang="ts">
	import { onMount } from 'svelte';
	import type { Position } from './types';
	let innerWidth = 0;
	let innerHeight = 0;
	$: ratio = innerHeight / innerWidth;
	$: console.log(toPosition.y);

	export let fromPosition: Position;
	export let toPosition: Position;

	$: slope = (toPosition.y - fromPosition.y) / (toPosition.x - fromPosition.x);
	$: angle = Math.atan(slope) + Math.PI / 2;

	$: newFromX = fromPosition.x + 10 * Math.cos(angle) * ratio;
	$: newFromY = fromPosition.y + 10 * Math.sin(angle);
	$: newToX = toPosition.x + 10 * Math.cos(angle) * ratio;
	$: newToY = toPosition.y + 10 * Math.sin(angle);
	// $: newFromX = fromPosition.x;
	// $: newFromY = fromPosition.y;
	// $: newToX = toPosition.x;
	// $: newToY = toPosition.y;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<svg class="fill-token absolute -z-10" height="100%" width="100%">
	<defs>
		<marker id="head" orient="auto" markerWidth="4" markerHeight="6" refX="1" refY="3">
			<path
				id="arrow-head"
				class="stroke-surface-900"
				fill="none"
				stroke-linecap="round"
				d="M1,3 L3,5 M1,3 L3,1"
			/>
		</marker>
		<marker>
			<path id="arrow-body" />
		</marker>
	</defs>

	<line
		id="arrow"
		class="stroke-surface-500"
		marker-start="url(#head)"
		stroke-width="4"
		fill="none"
		stroke-linecap="round"
		x2="{fromPosition.x}%"
		y2="{fromPosition.y}%"
		x1="{toPosition.x}%"
		y1="{toPosition.y}%"
	/>
	<line
		id="arrow"
		class="stroke-surface-900"
		marker-start="url(#head)"
		stroke-width="4"
		fill="none"
		stroke-linecap="round"
		x2="{newFromX}%"
		y2="{newFromY}%"
		x1="{newToX}%"
		y1="{newToY}%"
	/>
</svg>
