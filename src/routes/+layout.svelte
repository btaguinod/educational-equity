<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, popup } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/solid.css';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar
			shadow="shadow-xl"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<a href="/">
					<div class="text-xl font-black">Educational Equity Info Center</div>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="relative hidden lg:block btn-group variant-soft">
					<button
						class="hover:variant-soft-primary"
						use:popup={{ event: 'click', target: 'theory' }}
					>
						<span>Theory</span>
						<i class="fa-solid fa-caret-down opacity-50" />
					</button>
					<button
						class="hover:variant-soft-primary"
						use:popup={{ event: 'click', target: 'application' }}
					>
						<span>Application</span>
						<i class="fa-solid fa-caret-down opacity-50" />
					</button>
				</div>
				<div class="card p-4 w-60 shadown-xl" data-popup="theory">
					<nav class="list-nav">
						<ul>
							<li>
								<a class="flex-auto" href="/theory/bourdieus-theory-of-capital">
									Bourdieu's Theory of Capital
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<div class="card p-4 w-60 shadown-xl" data-popup="application">
					<nav class="list-nav">
						<ul>
							<li>
								<a class="flex-auto" href="/application/high-school-data-chart">
									High School Data Chart
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<a class="btn hover:variant-soft-primary" href="/"> About </a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
