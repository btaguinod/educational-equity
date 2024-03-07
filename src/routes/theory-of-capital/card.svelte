<script lang="ts">
	export let title: string;
	export let description: string;
	export let examples: string;
	export let position: number[];
</script>

<div
	class="card card-hover p-4 absolute -translate-x-1/2 translate-y-1/2"
	style="left:{position[0]}%;bottom:{position[1]}%"
>
	<div class="text-lg"><strong>{title}</strong></div>
	<div>{description}</div>
	<div><strong>Examples: {examples}</strong></div>
</div>
