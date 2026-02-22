<script lang="ts">
  import { t, lang, toggleLang } from '$lib/stores/lang';

  let menuOpen = $state(false);
  let scrolled = $state(false);

  $effect(() => {
    const onScroll = () => { scrolled = window.scrollY > 20; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function closeMenu() { menuOpen = false; }
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  style:background={scrolled ? 'rgba(8,8,8,0.92)' : 'transparent'}
  style:backdrop-filter={scrolled ? 'blur(16px)' : 'none'}
  style:border-bottom={scrolled ? '1px solid var(--color-border)' : '1px solid transparent'}
>
  <nav class="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-17">

    <!-- Logo -->
    <a href="/" class="flex items-center gap-2.5 group" onclick={closeMenu}>
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7">
        <circle cx="12" cy="14" r="6" stroke="#B8E04A" stroke-width="1.5"/>
        <circle cx="12" cy="14" r="2.2" fill="#B8E04A"/>
        <line x1="16.8" y1="18.8" x2="23" y2="25" stroke="#B8E04A" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
      <span class="font-display font-bold text-[17px] text-ink tracking-[-0.04em] transition-opacity group-hover:opacity-75">
        LONGVIEW
      </span>
    </a>

    <!-- Desktop Nav -->
    <ul class="hidden md:flex items-center gap-8">
      {#each ['features','manifesto','about'] as key}
        <li>
          <a
            href={`#${key}`}
            class="font-sans text-sm text-muted hover:text-ink transition-colors duration-200"
          >{$t.nav[key as keyof typeof $t.nav]}</a>
        </li>
      {/each}
    </ul>

    <!-- Right Controls -->
    <div class="flex items-center gap-3">
      <button
        onclick={toggleLang}
        class="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border font-mono text-[11px] transition-all duration-200 cursor-pointer"
        style="border-color: var(--color-border-2); color: var(--color-muted);"
      >
        <span style={$lang === 'id' ? 'color: var(--color-accent)' : ''}>ID</span>
        <span style="color: var(--color-subtle); padding: 0 2px">/</span>
        <span style={$lang === 'en' ? 'color: var(--color-accent)' : ''}>EN</span>
      </button>

      <a
        href="#join"
        class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-sans font-semibold text-sm transition-all duration-200 active:scale-95"
        style="background: var(--color-accent); color: var(--color-bg); letter-spacing: -0.01em;"
      >
        {$t.nav.join}
        <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>

      <button
        class="md:hidden flex flex-col justify-center gap-1.25 w-8 h-8 cursor-pointer"
        onclick={() => (menuOpen = !menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span class="block h-px bg-ink transition-all duration-300 origin-center"
          style:width="20px"
          style:transform={menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none'}></span>
        <span class="block h-px bg-ink transition-all duration-300"
          style:width="14px"
          style:opacity={menuOpen ? '0' : '1'}></span>
        <span class="block h-px bg-ink transition-all duration-300 origin-center"
          style:width="20px"
          style:transform={menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none'}></span>
      </button>
    </div>
  </nav>

  {#if menuOpen}
    <div class="md:hidden border-t px-6 py-6 flex flex-col gap-5"
      style="border-color: var(--color-border); background: rgba(8,8,8,0.98); backdrop-filter: blur(20px);">
      {#each ['features','manifesto','about'] as key}
        <a href={`#${key}`} onclick={closeMenu}
          class="font-sans text-base text-muted hover:text-ink transition-colors">
          {$t.nav[key as keyof typeof $t.nav]}
        </a>
      {/each}
      <div class="flex items-center justify-between pt-4" style="border-top: 1px solid var(--color-border);">
        <button onclick={toggleLang}
          class="flex items-center gap-1 px-3 py-1.5 rounded-full border font-mono text-[11px] cursor-pointer"
          style="border-color: var(--color-border-2); color: var(--color-muted);">
          <span style={$lang === 'id' ? 'color: var(--color-accent)' : ''}>ID</span>
          <span style="color: var(--color-subtle); padding: 0 2px">/</span>
          <span style={$lang === 'en' ? 'color: var(--color-accent)' : ''}>EN</span>
        </button>
        <a href="#join" onclick={closeMenu}
          class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold text-sm"
          style="background: var(--color-accent); color: var(--color-bg);">
          {$t.nav.join}
        </a>
      </div>
    </div>
  {/if}
</header>