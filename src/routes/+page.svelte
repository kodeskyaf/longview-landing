<script lang="ts">
  import Navbar           from '$lib/components/Navbar.svelte';
  import Hero             from '$lib/components/Hero.svelte';
  import Features         from '$lib/components/Features.svelte';
  import ManifestoPreview from '$lib/components/ManifestoPreview.svelte';
  import CTA              from '$lib/components/CTA.svelte';
  import Footer           from '$lib/components/Footer.svelte';
</script>

<Navbar />
<main>
  <Hero />
  <Features />
  <ManifestoPreview />
  <CTA />
</main>
<Footer />