<script lang="ts">
  import { t } from '$lib/stores/lang';
  import Navbar  from '$lib/components/Navbar.svelte';
  import About   from '$lib/components/About.svelte';
  import Footer  from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>{$t.about.page_title}</title>
  <meta name="description" content={$t.about.page_desc} />
</svelte:head>

<Navbar />
<main>
  <About />
</main>
<Footer />