<script lang="ts">
	import { onMount } from 'svelte';
	import type { Position } from './types';

	export let fromPosition: Position;
	export let toPosition: Position;
</script>

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
	</defs>

	<line
		id="arrow-line"
		class="stroke-surface-900"
		marker-start="url(#head)"
		stroke-width="4"
		fill="none"
		stroke-linecap="round"
		x1="{toPosition.x}%"
		y1="{toPosition.y}%"
		x2="{fromPosition.x}%"
		y2="{fromPosition.y}%"
	/>
</svg>
