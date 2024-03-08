<script lang="ts">
	import Card from './card.svelte';
	import Papa from 'papaparse';
	import { onMount } from 'svelte';
	import Arrow from './arrow.svelte';

	// retreiving card info
	// TODO: create type for card info
	let cards: any[] = [];
	onMount(() => {
		Papa.parse('/capital-data/definitions.csv', {
			complete: function (results, file) {
				cards = results.data;
			},
			download: true,
			dynamicTyping: true,
			header: true
		});
	});

	// calculating card position
	const radiusPercent: number = 25;
	function xPos(i: number) {
		let percent = i / cards.length;
		let angle = percent * 2 * Math.PI;
		let x = Math.cos(angle);
		x = x * radiusPercent + 50;
		return x;
	}
	function yPos(i: number) {
		let percent = i / cards.length;
		let angle = percent * 2 * Math.PI;
		let y = Math.sin(angle);
		y = y * radiusPercent + 50;
		return y;
	}

	// Focus Mode is when a card is clicked and more details are shown
	let isFocusMode: boolean = false;
	let focusedCardId: string = '';
	function updateFocusMode(id: string) {
		if (isFocusMode && focusedCardId != id) {
			focusedCardId = id;
		} else if (isFocusMode && focusedCardId == id) {
			isFocusMode = false;
		} else {
			isFocusMode = true;
			focusedCardId = id;
		}
	}
</script>

{#each cards as card, i (card.id)}
	<Card
		{...card}
		position={[xPos(i), yPos(i)]}
		isFocus={isFocusMode && focusedCardId == card.id}
		on:mouseover
		on:click={() => updateFocusMode(card.id)}
	/>
{/each}
