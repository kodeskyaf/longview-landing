<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>Longview — Transparent Economy Platform</title>
  <meta name="description" content="Longview is an open cooperative platform connecting communities, producers, and knowledge for a transparent, community-owned economy." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</svelte:head>

{@render children()}