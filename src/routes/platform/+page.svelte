<script lang="ts">
  import { t } from '$lib/stores/lang';
  import Navbar   from '$lib/components/Navbar.svelte';
  import Platform from '$lib/components/Platform.svelte';
  import Footer   from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>{$t.platform.page_title}</title>
  <meta name="description" content={$t.platform.page_desc} />
</svelte:head>

<Navbar />
<main>
  <Platform />
</main>
<Footer />