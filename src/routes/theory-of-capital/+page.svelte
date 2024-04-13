<script lang="ts">
	import type { RawCardInfo, CardInfo, RawArrowInfo, ArrowInfo, Position } from './types';
	import Card from './Card.svelte';
	import Papa from 'papaparse';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';

	// retreiving card info
	// TODO: create type for and arrow info
	// TODO: move this to server loading
	// TODO: make this cleaner with defined async functions
	// TODO: combine arrow definitions if they have multiple examples for one type
	// TODO: consider using a store?, there are a ton of components that share state: https://www.reddit.com/r/sveltejs/comments/10rzap6/when_to_use_stores_vs_props_bubbling_up/
	// this is helpful too https://joyofcode.xyz/svelte-state-management, should probabl yuse module context
	let cards: CardInfo[] = [];
	$: cardPositions = cards.map((_, i) => getCardPos(i));
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
	function focusOnCard(i: number) {
		if (focusedCardIndex != i) {
			focusedCardIndex = i;
		} else if (focusedCardIndex == i) {
			focusedCardIndex = -1;
		} else {
			focusedCardIndex = i;
		}
	}

	// calculatcalculateing card position declaratively
	const RADIUS_PERCENT: number = 20;
	$: getCardPos = (cardIndex: number): Position => {
		let percent = cardIndex / cards.length;
		if (focusedCardIndex == cardIndex) {
			return { x: 50, y: 50 };
		} else if (focusedCardIndex != -1 && cardIndex < focusedCardIndex) {
			percent = cardIndex / (cards.length - 1);
		} else if (focusedCardIndex != -1 && cardIndex > focusedCardIndex) {
			percent = (cardIndex - 1) / (cards.length - 1);
		} else {
			percent = cardIndex / cards.length;
		}
		let angle = percent * 2 * Math.PI;

		return {
			x: Math.cos(angle) * RADIUS_PERCENT + 50,
			y: Math.sin(angle) * RADIUS_PERCENT + 50
		};
	};
</script>

<div class="h-full relative" style="container-type: size">
	{#each cards as cardInfo, i (cardInfo.title)}
		<Card
			{...cardInfo}
			position={cardPositions[i]}
			isFocus={focusedCardIndex == i}
			on:click={() => focusOnCard(i)}
		/>
	{/each}
</div>
