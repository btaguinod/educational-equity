<script>
	import Card from './card.svelte';
	let testCards = [
		{
			title: 'title1',
			description: 'description1',
			examples: 'example1, example2',
			position: [40, 40]
		},
		{
			title: 'title2',
			description: 'description2',
			examples: 'example1, example2',
			position: [50, 50]
		}
	];
</script>

{#each testCards as card (card.title)}
	<Card {...card} />
{/each}
