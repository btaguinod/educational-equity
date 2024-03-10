<script lang="ts">
	export let x1: number;
	export let y1: number;
	export let x2: number;
	export let y2: number;
</script>

<svg class="fill-token">
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

	<path
		id="arrow-line"
		class="stroke-surface-900"
		marker-start="url(#head)"
		stroke-width="4"
		fill="none"
		stroke-linecap="round"
		d="M {x2},{y2} {x1},{y1}"
	/>
</svg>
