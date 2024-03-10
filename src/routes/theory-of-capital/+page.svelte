<script lang="ts">
	import type { CardInfo, ArrowInfo, Position } from './types';
	import Card from './Card.svelte';
	import Papa from 'papaparse';
	import { onMount } from 'svelte';

	// retreiving card info
	// TODO: create type for and arrow info
	// TODO: move this to server loading
	let cards: CardInfo[] = [];
	let arrows: ArrowInfo[] = [];
	onMount(() => {
		Papa.parse<CardInfo>('/capital-data/definitions.csv', {
			complete: (results) => (cards = results.data),
			download: true,
			dynamicTyping: true,
			header: true
		});
		Papa.parse<ArrowInfo>('/capital-data/connections.csv', {
			complete: (results) => (arrows = results.data),
			download: true,
			dynamicTyping: true,
			header: true
		});
	});

	// Focus Mode is when a card is clicked and more details are shown
	let focusedCardIndex: number = -1;
	$: isFocusingOnCard = focusedCardIndex !== -1;
	function updateFocusMode(i: number) {
		if (isFocusingOnCard && focusedCardIndex != i) {
			focusedCardIndex = i;
		} else if (isFocusingOnCard && focusedCardIndex == i) {
			isFocusingOnCard = false;
		} else {
			isFocusingOnCard = true;
			focusedCardIndex = i;
		}
	}

	// calculating card position
	const radiusPercent: number = 25;
	$: calcXPos = (i: number) => {
		let percent;
		if (isFocusingOnCard && focusedCardIndex === i) {
			return 50;
		} else if (isFocusingOnCard && i < focusedCardIndex) {
			percent = i / (cards.length - 1);
		} else if (isFocusingOnCard && i > focusedCardIndex) {
			percent = (i - 1) / (cards.length - 1);
		} else {
			percent = i / cards.length;
		}
		let angle = percent * 2 * Math.PI;
		let x = Math.cos(angle);
		x = x * radiusPercent + 50;
		return x;
	};
	$: calcYPos = (i: number) => {
		let percent = i / cards.length;
		if (isFocusingOnCard && focusedCardIndex == i) {
			return 50;
		} else if (isFocusingOnCard && i < focusedCardIndex) {
			percent = i / (cards.length - 1);
		} else if (isFocusingOnCard && i > focusedCardIndex) {
			percent = (i - 1) / (cards.length - 1);
		} else {
			percent = i / cards.length;
		}
		let angle = percent * 2 * Math.PI;
		let y = Math.sin(angle);
		y = y * radiusPercent + 50;
		return y;
	};
</script>

{#each cards as card, i (card.id)}
	<Card
		{...card}
		isFocus={isFocusingOnCard && focusedCardIndex == i}
		position={{ x: calcXPos(i), y: calcYPos(i) }}
		on:mouseover
		on:click={() => updateFocusMode(i)}
	/>
{/each}
