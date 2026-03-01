<script lang="ts">
  import { t } from '$lib/stores/lang';
  import { onMount } from 'svelte';

  let activeId = $state('lens');

  function statusColor(status: string) {
    const s = status.toLowerCase();
    if (s === 'beta')                               return { bg: 'rgba(184,224,74,0.08)',  border: 'rgba(184,224,74,0.22)', text: 'var(--color-accent)' };
    if (s === 'early access' || s === 'akses awal') return { bg: 'rgba(184,224,74,0.05)',  border: 'rgba(184,224,74,0.15)', text: 'var(--color-accent)' };
    if (s === 'pilot')                              return { bg: 'rgba(45,106,79,0.1)',    border: 'rgba(45,106,79,0.25)', text: '#5DBF8A' };
    if (s === 'coming soon' || s === 'segera')      return { bg: 'rgba(110,106,99,0.08)', border: 'var(--color-border)',   text: 'var(--color-muted)' };
    return                                               { bg: 'rgba(57,53,48,0.12)',    border: 'var(--color-border)',   text: 'var(--color-subtle)' };
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onMount(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.05 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    const spy = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) activeId = e.target.id; }),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    document.querySelectorAll('[data-tool]').forEach(el => spy.observe(el));

    return () => { io.disconnect(); spy.disconnect(); };
  });
</script>

<style>
  :global(.reveal) {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  :global(.reveal.revealed)  { opacity: 1; transform: none; }
  :global(.reveal.d1) { transition-delay: 70ms; }
  :global(.reveal.d2) { transition-delay: 140ms; }
  :global(.reveal.d3) { transition-delay: 210ms; }

  .side-nav {
    position: sticky;
    top: 88px;
    height: fit-content;
  }

  .side-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--color-border-2);
    flex-shrink: 0;
    transition: background 0.2s, transform 0.2s;
  }
  .side-dot.active {
    background: var(--color-accent);
    transform: scale(1.5);
  }

  .cap-row {
    position: relative;
  }
  .cap-row::after {
    content: '';
    position: absolute;
    left: 0; bottom: 0; right: 0;
    height: 1px;
    background: var(--color-border);
  }

  [data-tool] {
    scroll-margin-top: 88px;
  }
</style>


<!-- HERO ─────────────────────────────────────────────────── -->
<section class="relative overflow-hidden"
  style="background: var(--color-bg); padding-top: 110px; padding-bottom: 72px;">

  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute inset-0" style="
      background-image:
        linear-gradient(var(--color-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
      background-size: 48px 48px; opacity: 0.28;"></div>
    <div class="absolute inset-0" style="
      background: radial-gradient(ellipse 80% 60% at 50% 35%, transparent 0%, var(--color-bg) 72%);"></div>
    <div class="absolute" style="top:6%; right:4%; width:440px; height:440px;
      background: radial-gradient(circle, rgba(184,224,74,0.055) 0%, transparent 65%);"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

    <span class="font-mono text-[11px] uppercase tracking-[0.22em] block mb-7 animate-fade-up"
      style="color: var(--color-accent);">{$t.platform.hero.label}</span>

    <h1 class="font-display font-bold leading-[0.9] mb-10 animate-fade-up delay-100"
      style="font-size: clamp(60px, 10vw, 128px); letter-spacing: -0.05em; color: var(--color-ink);">
      {$t.platform.hero.headline_1}<br>
      <span style="color: var(--color-accent);">{$t.platform.hero.headline_2}</span>
    </h1>

    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start animate-fade-up delay-200">

      <p class="font-sans leading-relaxed"
        style="font-size: clamp(15px,1.35vw,17px); color: var(--color-muted); letter-spacing: -0.01em; max-width: 480px;">
        {$t.platform.hero.body}
      </p>

      <!-- Layer index — clean table style -->
      <div class="flex flex-col" style="border-top: 1px solid var(--color-border);">
        {#each $t.platform.tools as tool}
          {@const sc = statusColor(tool.status)}
          <button
            onclick={() => scrollTo(tool.id)}
            class="group flex items-center justify-between py-3.5 cursor-pointer text-left"
            style="border-bottom: 1px solid var(--color-border);"
          >
            <div class="flex items-center gap-4">
              <span class="font-mono text-[9px] uppercase tracking-[0.2em] w-14 shrink-0"
                style="color: var(--color-subtle);">{tool.tag}</span>
              <span class="font-sans text-[13px] font-medium transition-colors duration-150 group-hover:text-ink"
                style="color: var(--color-muted);">{tool.name}</span>
            </div>
            <span class="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-sm shrink-0"
              style="background:{sc.bg}; color:{sc.text}; border: 1px solid {sc.border};">
              {tool.status}
            </span>
          </button>
        {/each}
      </div>
    </div>

    <div class="mt-12 flex items-center gap-3 animate-fade-up delay-300">
      <span class="font-mono text-[10px] uppercase tracking-[0.2em]"
        style="color: var(--color-subtle);">{$t.platform.hero.nav_label}</span>
      <div class="flex-1 max-w-24 h-px" style="background: var(--color-border);"></div>
      <svg class="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" style="color: var(--color-subtle);">
        <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</section>


<!-- MAIN ─────────────────────────────────────────────────── -->
<div style="background: var(--color-bg); border-top: 1px solid var(--color-border);">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">
    <div class="lg:grid lg:grid-cols-[200px_1fr] lg:gap-20 xl:gap-28">

      <!-- Sticky sidebar -->
      <aside class="side-nav hidden lg:block py-16">
        <ul class="flex flex-col gap-0.5">
          {#each $t.platform.tools as tool}
            <li>
              <button
                onclick={() => scrollTo(tool.id)}
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all duration-200 cursor-pointer"
                style="background: {activeId === tool.id ? 'var(--color-surface)' : 'transparent'};
                       border: 1px solid {activeId === tool.id ? 'var(--color-border)' : 'transparent'};"
              >
                <span class="side-dot" class:active={activeId === tool.id}></span>
                <div class="flex flex-col gap-0.5 min-w-0">
                  <span class="font-mono text-[8px] uppercase tracking-[0.18em]"
                    style="color: var(--color-subtle);">{tool.tag}</span>
                  <span class="font-sans text-[12px] font-medium truncate"
                    style="color: {activeId === tool.id ? 'var(--color-ink)' : 'var(--color-muted)'};">
                    {tool.name}
                  </span>
                </div>
              </button>
            </li>
          {/each}
        </ul>

        <div class="mt-8 p-4 rounded-lg" style="border: 1px solid var(--color-border); background: var(--color-surface);">
          <p class="font-sans text-[11px] leading-relaxed mb-3" style="color: var(--color-muted);">
            {$t.platform.cta.body}
          </p>
          <a href="/#join"
            class="flex items-center justify-center gap-1.5 w-full py-2 rounded-md font-sans font-semibold text-[11px] transition-all duration-200 active:scale-95"
            style="background: var(--color-accent); color: var(--color-bg);">
            {$t.platform.cta.btn_access}
            <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </aside>

      <!-- Tool sections -->
      <div class="py-12 lg:py-16">
        {#each $t.platform.tools as tool, idx}
          {@const sc = statusColor(tool.status)}

          <section
            id={tool.id}
            data-tool
            class="relative"
            style="padding: 56px 0; {idx > 0 ? 'border-top: 1px solid var(--color-border);' : ''}"
          >

            <!-- Header: tag + status chip -->
            <div class="reveal flex flex-col gap-4 mb-8">

              <div class="flex items-center gap-3">
                <span class="font-mono text-[9px] uppercase tracking-[0.22em]"
                  style="color: var(--color-subtle);">{tool.tag}</span>
                <span class="h-px w-6" style="background: var(--color-border);"></span>
                <span class="font-mono text-[8px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-sm"
                  style="background:{sc.bg}; color:{sc.text}; border:1px solid {sc.border};">
                  {tool.status}
                </span>
              </div>

              <!-- Icon + Name + tagline -->
              <div class="flex items-start gap-4">
                <div class="w-11 h-11 rounded-lg border shrink-0 flex items-center justify-center mt-0.5"
                  style="border-color: var(--color-border-2); background: var(--color-surface);">
                  {#if tool.id === 'lens'}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="9" cy="9" r="6" stroke="#B8E04A" stroke-width="1.4"/>
                      <circle cx="9" cy="9" r="2" fill="#B8E04A"/>
                      <line x1="14" y1="14" x2="18" y2="18" stroke="#B8E04A" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  {:else if tool.id === 'commonspace'}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="4"   r="2.2" fill="#B8E04A"/>
                      <circle cx="3.5" cy="15" r="2.2" fill="#B8E04A"/>
                      <circle cx="16.5" cy="15" r="2.2" fill="#B8E04A"/>
                      <line x1="10" y1="6.2" x2="4.8"  y2="12.8" stroke="#6E6A63" stroke-width="1"/>
                      <line x1="10" y1="6.2" x2="15.2" y2="12.8" stroke="#6E6A63" stroke-width="1"/>
                      <line x1="5.7" y1="15" x2="14.3" y2="15"   stroke="#6E6A63" stroke-width="1"/>
                    </svg>
                  {:else if tool.id === 'chain'}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="1.5" y="8" width="6.5" height="4" rx="2" stroke="#B8E04A" stroke-width="1.3"/>
                      <rect x="12"  y="8" width="6.5" height="4" rx="2" stroke="#B8E04A" stroke-width="1.3"/>
                      <line x1="8" y1="10" x2="12" y2="10" stroke="#B8E04A" stroke-width="1.3"/>
                    </svg>
                  {:else if tool.id === 'exchange'}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2 6h16M14 3l3 3-3 3"  stroke="#B8E04A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18 14H2M6 11l-3 3 3 3" stroke="#B8E04A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  {:else if tool.id === 'hubs'}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2a5.5 5.5 0 0 1 5.5 5.5c0 4-5.5 10.5-5.5 10.5S4.5 11.5 4.5 7.5A5.5 5.5 0 0 1 10 2Z" stroke="#B8E04A" stroke-width="1.3"/>
                      <circle cx="10" cy="7.5" r="1.8" fill="#B8E04A"/>
                    </svg>
                  {:else}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2v3M10 15v3M2 10h3M15 10h3" stroke="#B8E04A" stroke-width="1.3" stroke-linecap="round"/>
                      <circle cx="10" cy="10" r="3.5" stroke="#B8E04A" stroke-width="1.3"/>
                      <path d="M5 5l1.8 1.8M13.2 13.2l1.8 1.8M13.2 6.8l1.8-1.8M5 15l1.8-1.8" stroke="#6E6A63" stroke-width="1" stroke-linecap="round"/>
                    </svg>
                  {/if}
                </div>

                <div>
                  <h2 class="font-display font-bold leading-[0.95]"
                    style="font-size: clamp(26px, 3.2vw, 40px); letter-spacing: -0.04em; color: var(--color-ink);">
                    {tool.name}
                  </h2>
                  <p class="font-sans text-sm mt-1.5 italic"
                    style="color: var(--color-muted); letter-spacing: -0.01em;">
                    {tool.tagline}
                  </p>
                </div>
              </div>
            </div>

            <!-- Headline + 2 body paragraphs -->
            <div class="reveal d1 grid lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
              <h3 class="font-display font-bold leading-[0.95]"
                style="font-size: clamp(18px, 2.2vw, 28px); letter-spacing: -0.035em; color: var(--color-ink); white-space: pre-line;">
                {tool.headline}
              </h3>
              <div class="flex flex-col gap-4">
                <p class="font-sans text-[14px] leading-relaxed"
                  style="color: var(--color-muted); letter-spacing: -0.01em;">{tool.body_1}</p>
                <p class="font-sans text-[14px] leading-relaxed"
                  style="color: var(--color-muted); letter-spacing: -0.01em;">{tool.body_2}</p>
              </div>
            </div>

            <!-- Capabilities — clean row list, not card grid -->
            <div class="reveal d2 mb-8">
              <span class="font-mono text-[9px] uppercase tracking-[0.22em] block mb-4"
                style="color: var(--color-subtle);">Capabilities</span>
              <div style="border-top: 1px solid var(--color-border);">
                {#each tool.capabilities.slice(0, 4) as cap, ci}
                  <div class="cap-row flex items-start gap-6 py-4">
                    <span class="font-mono text-[8px] shrink-0 mt-0.5 w-4"
                      style="color: var(--color-subtle);">{String(ci+1).padStart(2,'0')}</span>
                    <div class="grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 flex-1 min-w-0">
                      <h4 class="font-sans text-[13px] font-semibold leading-snug"
                        style="color: var(--color-ink); letter-spacing: -0.02em;">{cap.title}</h4>
                      <p class="font-sans text-[13px] leading-relaxed"
                        style="color: var(--color-muted);">{cap.body}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Footer: who-for + CTA -->
            <div class="reveal d3 flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-5"
              style="border-top: 1px solid var(--color-border);">
              <p class="font-sans text-[12px] leading-relaxed max-w-sm"
                style="color: var(--color-subtle);">
                <span class="font-semibold" style="color: var(--color-muted);">For: </span>{tool.who_for}
              </p>
              <a href="/#join"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-[13px] transition-all duration-200 active:scale-95 hover:opacity-90 shrink-0"
                style="background: var(--color-accent); color: var(--color-bg); letter-spacing: -0.02em;">
                {$t.platform.cta.btn_access}
                <svg class="w-3 h-3" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>

          </section>
        {/each}
      </div>

    </div>
  </div>
</div>


<!-- CLOSING CTA ────────────────────────────────────────────── -->
<section class="relative overflow-hidden"
  style="background: var(--color-surface); border-top: 1px solid var(--color-border);">

  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-100"
      style="background: radial-gradient(ellipse at center bottom, rgba(184,224,74,0.05) 0%, transparent 68%);"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
    <div class="max-w-2xl reveal">
      <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-6"
        style="color: var(--color-accent);">{$t.platform.cta.label}</span>
      <h2 class="font-display font-bold leading-[0.92] mb-7"
        style="font-size: clamp(36px, 5vw, 64px); letter-spacing: -0.045em; color: var(--color-ink); white-space: pre-line;">
        {$t.platform.cta.title}
      </h2>
      <p class="font-sans text-base leading-relaxed mb-9"
        style="color: var(--color-muted); letter-spacing: -0.01em; max-width: 480px;">
        {$t.platform.cta.body}
      </p>
      <div class="flex flex-wrap gap-3">
        <a href="/#join"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-semibold text-[15px] transition-all duration-200 active:scale-95 hover:opacity-90"
          style="background: var(--color-accent); color: var(--color-bg); letter-spacing: -0.02em;">
          {$t.platform.cta.btn_access}
          <svg class="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="/about"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-medium text-[15px] border transition-all duration-200 hover:border-border-2"
          style="border-color: var(--color-border-2); color: var(--color-muted); letter-spacing: -0.02em;">
          {$t.platform.cta.btn_about}
        </a>
      </div>
    </div>
  </div>
</section>