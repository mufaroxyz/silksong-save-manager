<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<div class="grid h-svh grid-rows-[auto_1fr]">
	<main class="overflow-y-auto">
		{@render children()}
	</main>
</div>
