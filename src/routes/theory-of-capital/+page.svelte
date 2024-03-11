<script lang="ts">
	import type { RawCardInfo, CardInfo, RawArrowInfo, ArrowInfo, Position } from './types';
	import Card from './Card.svelte';
	import Papa from 'papaparse';
	import { onMount } from 'svelte';
	import Arrow from './Arrow.svelte';
	import { error } from '@sveltejs/kit';

	// retreiving card info
	// TODO: create type for and arrow info
	// TODO: move this to server loading
	// TODO: make this cleaner with defined async functions
	// TODO: combine arrow definitions if they have multiple examples for one type
	let cards: CardInfo[] = [];
	let arrows: ArrowInfo[] = [];
	onMount(() => {
		let loadArrowData = (cardIDToIndex: Map<string, number>) =>
			Papa.parse<RawArrowInfo>('/capital-data/connections.csv', {
				complete: (results) => {
					for (let rawArrowInfo of results.data) {
						let fromCardIndex = cardIDToIndex.get(rawArrowInfo.from);
						if (fromCardIndex === undefined) {
							error(500, `id ${rawArrowInfo.from} not found`);
						}
						let toCardIndex = cardIDToIndex.get(rawArrowInfo.to);
						if (toCardIndex === undefined) {
							error(500, `id ${rawArrowInfo.to} not found`);
						}
						let newArrowInfo: ArrowInfo = {
							fromCardIndex,
							toCardIndex,
							example: rawArrowInfo.example
						};
						arrows = [...arrows, newArrowInfo];
					}
				},
				download: true,
				dynamicTyping: true,
				header: true
			});
		Papa.parse<RawCardInfo>('/capital-data/definitions.csv', {
			complete: (results) => {
				let cardIDToIndex: Map<string, number> = new Map();
				for (let i = 0; i < results.data.length; i++) {
					cardIDToIndex.set(results.data[i].id, i);
				}
				cards = results.data;

				loadArrowData(cardIDToIndex);
			},
			download: true,
			dynamicTyping: true,
			header: true
		});
	});

	let focusedCardIndex: number = -1;
	$: isFocusingOnACard = focusedCardIndex !== -1;
	function focusOnCard(i: number) {
		if (isFocusingOnACard && focusedCardIndex != i) {
			focusedCardIndex = i;
		} else if (isFocusingOnACard && focusedCardIndex == i) {
			isFocusingOnACard = false;
		} else {
			isFocusingOnACard = true;
			focusedCardIndex = i;
		}
	}

	// calculating card position declaratively
	// TODO: find a way to cache this?
	const RADIUS_PERCENT: number = 25;
	$: getCardPos = (i: number): Position => {
		let percent = i / cards.length;
		if (isFocusingOnACard && focusedCardIndex == i) {
			return { x: 50, y: 50 };
		} else if (isFocusingOnACard && i < focusedCardIndex) {
			percent = i / (cards.length - 1);
		} else if (isFocusingOnACard && i > focusedCardIndex) {
			percent = (i - 1) / (cards.length - 1);
		} else {
			percent = i / cards.length;
		}
		let angle = percent * 2 * Math.PI;

		return {
			x: Math.cos(angle) * RADIUS_PERCENT + 50,
			y: Math.sin(angle) * RADIUS_PERCENT + 50
		};
	};

	$: console.log(arrows);
</script>

<div class="h-full relative">
	{#each cards as cardInfo, i (cardInfo.title)}
		<Card
			{...cardInfo}
			position={getCardPos(i)}
			isFocus={focusedCardIndex == i}
			on:click={() => focusOnCard(i)}
		/>
	{/each}
	{#each arrows as arrow (arrow.example)}
		<Arrow
			fromPosition={getCardPos(arrow.fromCardIndex)}
			toPosition={getCardPos(arrow.toCardIndex)}
		/>
	{/each}
</div>
