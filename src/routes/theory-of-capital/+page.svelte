<script lang="ts">
	import type { CardInfo } from './types';
	import Card from './Card.svelte';
	import Papa from 'papaparse';
	import { onMount } from 'svelte';

	// retreiving card info
	// TODO: create type for and arrow info
	// TODO: move this to server loading
	let cards: CardInfo[] = [];
	let arrows: any[] = [];
	onMount(() => {
		Papa.parse<CardInfo>('/capital-data/definitions.csv', {
			complete: function (results) {
				cards = results.data;
			},
			download: true,
			dynamicTyping: true,
			header: true
		});
		Papa.parse('/capital-data/connections.csv', {
			complete: function (results) {
				arrows = results.data;
			},
			download: true,
			dynamicTyping: true,
			header: true
		});
	});

	// Focus Mode is when a card is clicked and more details are shown
	let focusedCardIndex: number = -1;
	$: isFocusMode = focusedCardIndex !== -1;
	function updateFocusMode(i: number) {
		if (isFocusMode && focusedCardIndex != i) {
			focusedCardIndex = i;
		} else if (isFocusMode && focusedCardIndex == i) {
			isFocusMode = false;
		} else {
			isFocusMode = true;
			focusedCardIndex = i;
		}
	}

	$: console.log(isFocusMode);

	// calculating card position
	const radiusPercent: number = 25;
	$: xPos = (i: number) => {
		let percent;
		if (isFocusMode && focusedCardIndex === i) {
			return 50;
		} else if (isFocusMode && i < focusedCardIndex) {
			percent = i / (cards.length - 1);
		} else if (isFocusMode && i > focusedCardIndex) {
			percent = (i - 1) / (cards.length - 1);
		} else {
			percent = i / cards.length;
		}
		let angle = percent * 2 * Math.PI;
		let x = Math.cos(angle);
		x = x * radiusPercent + 50;
		return x;
	};
	$: yPos = (i: number) => {
		let percent = i / cards.length;
		if (isFocusMode && focusedCardIndex == i) {
			return 50;
		} else if (isFocusMode && i < focusedCardIndex) {
			percent = i / (cards.length - 1);
		} else if (isFocusMode && i > focusedCardIndex) {
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
		position={[xPos(i), yPos(i)]}
		isFocus={isFocusMode && focusedCardIndex == i}
		on:mouseover
		on:click={() => updateFocusMode(i)}
	/>
{/each}
