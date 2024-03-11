<script lang="ts">
	import type { CardInfo, ArrowInfo, Position } from './types';
	import Card from './Card.svelte';
	import Papa from 'papaparse';
	import { onMount } from 'svelte';
	import Arrow from './Arrow.svelte';

	// retreiving card info
	// TODO: create type for and arrow info
	// TODO: move this to server loading
	let cards: CardInfo[] = [];
	let arrows: ArrowInfo[] = [];
	onMount(() => {
		let loadArrowData = () =>
			Papa.parse<ArrowInfo>('/capital-data/connections.csv', {
				complete: (results) => {
					arrows = results.data;
				},
				download: true,
				dynamicTyping: true,
				header: true
			});
		Papa.parse<CardInfo>('/capital-data/definitions.csv', {
			complete: (results) => {
				cards = results.data;
				loadArrowData();
			},
			download: true,
			dynamicTyping: true,
			header: true
		});
	});

	$: console.table(arrows);

	let focusedCardIndex: number = -1;
	$: isFocusingOnCard = focusedCardIndex !== -1;
	function focusOnCard(i: number) {
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
	const RADIUS_PERCENT: number = 25;
	$: calcCardXPos = (i: number) => {
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
		x = x * RADIUS_PERCENT + 50;
		return x;
	};
	$: calcCardYPos = (i: number) => {
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
		y = y * RADIUS_PERCENT + 50;
		return y;
	};

	// TODO: this is very inefficient
	$: cardIDToIndex = (id: string) => {
		return cards.findIndex((cardInfo) => cardInfo.id == id);
	};
</script>

<div class="h-full relative">
	{#each cards as card, i (card.id)}
		<Card
			{...card}
			position={{ x: calcCardXPos(i), y: calcCardYPos(i) }}
			isFocus={isFocusingOnCard && focusedCardIndex == i}
			on:click={() => focusOnCard(i)}
		/>
	{/each}
	{#each arrows as arrow}
		<Arrow
			fromPosition={{
				x: calcCardXPos(cardIDToIndex(arrow.from)),
				y: calcCardYPos(cardIDToIndex(arrow.from))
			}}
			toPosition={{
				x: calcCardXPos(cardIDToIndex(arrow.to)),
				y: calcCardYPos(cardIDToIndex(arrow.to))
			}}
		/>
	{/each}
</div>
