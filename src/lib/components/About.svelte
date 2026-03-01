<script lang="ts">
  import { t } from '$lib/stores/lang';
  import { onMount } from 'svelte';

  let mounted = $state(false);

  // ── Type-safe helper for `open` field ───────────────────────────
  // i18n uses `as const` which creates a union of narrow readonly types.
  // The first member (Aditya) has no `open` field, so TypeScript errors
  // when accessing it directly. Use runtime `in` check instead.
  function isOpenPosition(member: unknown): boolean {
    return typeof member === 'object' && member !== null && 'open' in member;
  }

  onMount(() => {
    mounted = true;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  });
</script>

<style>
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal.revealed { opacity: 1; transform: none; }
  .reveal.d1       { transition-delay: 80ms; }
  .reveal.d2       { transition-delay: 160ms; }
  .reveal.d3       { transition-delay: 240ms; }
  .reveal.d4       { transition-delay: 320ms; }

  /* .revealed is added by JS at runtime → must use :global to avoid
     Svelte scoped-CSS stripping the rule as "unused"               */
  .accent-line {
    display: block;
    width: 0;
    height: 1px;
    background: var(--color-accent);
    transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  :global(.reveal.revealed) .accent-line { width: 100%; }

  .timeline-dot::before {
    content: '';
    position: absolute;
    left: -1px;
    top: 6px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1px solid var(--color-border-2);
    background: var(--color-bg);
    transition: background 0.3s, border-color 0.3s;
  }
  .timeline-active .timeline-dot::before {
    background: var(--color-accent);
    border-color: var(--color-accent);
    box-shadow: 0 0 10px rgba(184,224,74,0.3);
  }
  .value-card:hover .value-number {
    color: var(--color-accent);
    transition: color 0.2s;
  }
</style>


<!-- ═══════════════════════════════════════════════════════════
     HERO
════════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden"
  style="background: var(--color-bg); padding-top: 110px; padding-bottom: 88px;">

  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute inset-0" style="
      background-image:
        linear-gradient(var(--color-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
      background-size: 48px 48px; opacity: 0.28;
    "></div>
    <div class="absolute inset-0" style="
      background: radial-gradient(ellipse 75% 65% at 50% 35%, transparent 0%, var(--color-bg) 72%);
    "></div>
    <div class="absolute" style="
      top:10%; right:6%; width:360px; height:360px;
      background: radial-gradient(circle, rgba(184,224,74,0.065) 0%, transparent 68%);
    "></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

    <div class="animate-fade-up" class:opacity-0={!mounted}>
      <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-8"
        style="color: var(--color-accent);">{$t.about.hero.label}</span>
    </div>

    <div class="animate-fade-up delay-100" class:opacity-0={!mounted}>
      <h1 class="font-display font-bold mb-8 leading-[0.92]"
        style="font-size:clamp(52px,9vw,112px); letter-spacing:-0.045em; color:var(--color-ink);">
        {$t.about.hero.headline_1}<br>
        <span style="color:var(--color-accent);">{$t.about.hero.headline_2}</span>
      </h1>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
      <div class="animate-fade-up delay-200" class:opacity-0={!mounted}>
        <p class="font-sans leading-relaxed max-w-xl"
          style="font-size:clamp(15px,1.4vw,17px); color:var(--color-muted); letter-spacing:-0.01em;">
          {$t.about.hero.body}
        </p>
      </div>

      <div class="flex flex-wrap gap-3 animate-fade-up delay-300" class:opacity-0={!mounted}>
        {#each [
          { d: 'M8 2v4M8 18v4M2 8h4M18 8h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83', label: $t.about.hero.since + ' ' + $t.about.hero.since_year },
          { d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: $t.about.hero.license },
          { d: 'M13 10V3L4 14h7v7l9-11h-7z', label: $t.about.hero.status },
        ] as chip}
          <div class="flex items-center gap-2 px-4 py-2.5 rounded-full border"
            style="border-color:var(--color-border-2); background:var(--color-surface);">
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none"
              style="color:var(--color-accent);">
              <path d={chip.d} stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="font-mono text-[11px] uppercase tracking-[0.12em]"
              style="color:var(--color-muted);">{chip.label}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════
     ORIGIN
════════════════════════════════════════════════════════════ -->
<section style="background:var(--color-surface); border-top:1px solid var(--color-border); border-bottom:1px solid var(--color-border);">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
    <div class="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">

      <div class="reveal">
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-10"
          style="color:var(--color-accent);">{$t.about.origin.label}</span>
        <h2 class="font-display font-bold leading-[0.94]"
          style="font-size:clamp(30px,4vw,52px); letter-spacing:-0.04em; color:var(--color-ink);">
          {$t.about.origin.title}
        </h2>
        <span class="accent-line mt-6"></span>
      </div>

      <div class="flex flex-col gap-7">
        {#each [$t.about.origin.body_1, $t.about.origin.body_2, $t.about.origin.body_3] as para, i}
          <p class="reveal d{i+1} font-sans text-base leading-relaxed"
            style="color:var(--color-muted); letter-spacing:-0.01em;">{para}</p>
        {/each}
        <blockquote class="reveal d3 mt-4 pl-5 border-l-2"
          style="border-color:var(--color-accent);">
          <p class="font-sans text-base leading-relaxed italic"
            style="color:var(--color-ink); letter-spacing:-0.01em;">
            "{$t.about.origin.quote}"
          </p>
        </blockquote>
      </div>
    </div>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════
     VALUES
════════════════════════════════════════════════════════════ -->
<section style="background:var(--color-bg);">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">

    <div class="mb-16 lg:mb-20 reveal">
      <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-5"
        style="color:var(--color-accent);">{$t.about.values.label}</span>
      <h2 class="font-display font-bold leading-[0.94]"
        style="font-size:clamp(32px,4.5vw,58px); letter-spacing:-0.04em; color:var(--color-ink); white-space:pre-line;">
        {$t.about.values.title}
      </h2>
    </div>

    <div class="grid md:grid-cols-2 gap-px" style="background:var(--color-border);">
      {#each $t.about.values.items as item, i}
        <div class="value-card group reveal d{(i % 2) + 1} relative flex flex-col gap-5 p-8 lg:p-10 transition-colors duration-300"
          style="background:var(--color-surface);">
          <div class="absolute top-0 left-0 right-0 h-px transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
            style="background:var(--color-accent);"></div>

          <div class="flex items-start justify-between gap-4">
            <span class="value-number font-display font-bold text-5xl leading-none"
              style="letter-spacing:-0.05em; color:var(--color-subtle);">{item.number}</span>
            <svg class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 shrink-0"
              viewBox="0 0 16 16" fill="none" style="color:var(--color-accent);">
              <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <div>
            <h3 class="font-display font-bold text-2xl mb-3 leading-tight"
              style="letter-spacing:-0.035em; color:var(--color-ink);">{item.title}</h3>
            <p class="font-sans text-sm leading-relaxed"
              style="color:var(--color-muted);">{item.body}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════
     OPERATING MODEL
════════════════════════════════════════════════════════════ -->
<section style="background:var(--color-surface); border-top:1px solid var(--color-border); border-bottom:1px solid var(--color-border);">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">

    <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 reveal">
      <div>
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-5"
          style="color:var(--color-accent);">{$t.about.model.label}</span>
        <h2 class="font-display font-bold leading-[0.94]"
          style="font-size:clamp(30px,4.5vw,56px); letter-spacing:-0.04em; color:var(--color-ink); white-space:pre-line;">
          {$t.about.model.title}
        </h2>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-px" style="background:var(--color-border);">
      {#each $t.about.model.items as item, i}
        <div class="group reveal d{i+1} relative flex flex-col gap-6 p-8 transition-colors duration-300"
          style="background:var(--color-surface-2);">
          <div class="absolute top-0 left-0 right-0 h-px transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
            style="background:var(--color-accent);"></div>
          <span class="font-mono text-[10px] uppercase tracking-[0.2em]"
            style="color:var(--color-subtle);">{item.tag}</span>
          <div>
            <h3 class="font-display font-bold text-xl mb-4 leading-tight"
              style="letter-spacing:-0.03em; color:var(--color-ink);">{item.title}</h3>
            <p class="font-sans text-sm leading-relaxed"
              style="color:var(--color-muted);">{item.body}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════
     TEAM
════════════════════════════════════════════════════════════ -->
<section style="background:var(--color-bg);">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">

    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 items-end">
      <div class="reveal">
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-5"
          style="color:var(--color-accent);">{$t.about.team.label}</span>
        <h2 class="font-display font-bold leading-[0.94]"
          style="font-size:clamp(30px,4.5vw,56px); letter-spacing:-0.04em; color:var(--color-ink); white-space:pre-line;">
          {$t.about.team.title}
        </h2>
      </div>
      <p class="reveal d2 font-sans text-base leading-relaxed max-w-md"
        style="color:var(--color-muted); letter-spacing:-0.01em;">{$t.about.team.body}</p>
    </div>

    <div class="grid md:grid-cols-3 gap-px" style="background:var(--color-border);">
      {#each $t.about.team.members as member, i}
        <!--
          FIX (TS2339): `open` only exists on 2 of 3 member objects in the
          `as const` union. Direct access `member.open` errors because the
          first member type doesn't have that key. Use a runtime `in` check
          via the helper function instead.
        -->
        {@const isOpen = isOpenPosition(member)}

        <div class="group reveal d{i+1} relative flex flex-col gap-7 p-8 transition-colors duration-300"
          style="background:var(--color-surface);">
          <div class="absolute top-0 left-0 right-0 h-px transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
            style="background:{isOpen ? 'var(--color-border-2)' : 'var(--color-accent)'};"></div>

          <!-- Avatar -->
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-base shrink-0"
              style="
                background:{isOpen ? 'var(--color-surface-2)' : 'rgba(184,224,74,0.1)'};
                border:1px solid {isOpen ? 'var(--color-border-2)' : 'rgba(184,224,74,0.2)'};
                color:{isOpen ? 'var(--color-subtle)' : 'var(--color-accent)'};
                letter-spacing:-0.03em;
              ">{member.init}</div>
            <div>
              <p class="font-display font-bold text-base leading-tight"
                style="letter-spacing:-0.03em; color:{isOpen ? 'var(--color-muted)' : 'var(--color-ink)'};">
                {member.name}
              </p>
              <p class="font-mono text-[10px] uppercase tracking-[0.14em] mt-1"
                style="color:var(--color-subtle);">{member.role}</p>
            </div>
          </div>

          <!-- Bio -->
          <p class="font-sans text-sm leading-relaxed flex-1"
            style="color:{isOpen ? 'var(--color-subtle)' : 'var(--color-muted)'};">
            {member.bio}
          </p>

          {#if isOpen}
            <a href="/#join"
              class="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 hover:text-ink"
              style="color:var(--color-muted);">
              {$t.about.team.join_cta}
              <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          {/if}
        </div>
      {/each}
    </div>

    <div class="reveal mt-8 flex items-center gap-3">
      <span class="font-mono text-[11px] uppercase tracking-[0.15em]"
        style="color:var(--color-subtle);">{$t.about.team.join_label}</span>
      <span style="height:1px; flex:1; background:var(--color-border);"></span>
      <a href="/#join"
        class="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 hover:text-ink"
        style="color:var(--color-muted);">{$t.about.team.join_cta} →</a>
    </div>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════
     TIMELINE
════════════════════════════════════════════════════════════ -->
<section style="background:var(--color-surface); border-top:1px solid var(--color-border); border-bottom:1px solid var(--color-border);">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">

    <div class="mb-16 reveal">
      <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-5"
        style="color:var(--color-accent);">{$t.about.timeline.label}</span>
      <h2 class="font-display font-bold leading-[0.94]"
        style="font-size:clamp(30px,4.5vw,56px); letter-spacing:-0.04em; color:var(--color-ink);">
        {$t.about.timeline.title}
      </h2>
    </div>

    <div class="max-w-3xl">
      {#each $t.about.timeline.items as item}
        {@const isActive = item.label === 'Active' || item.label === 'Aktif'}
        {@const isDone   = item.label === 'Complete' || item.label === 'Selesai'}
        {@const isVision = item.label === 'Vision' || item.label === 'Visi'}

        <div class="reveal d1 relative pl-10 pb-10 last:pb-0"
          style="border-left:1px solid {isActive ? 'var(--color-accent)' : 'var(--color-border)'};"
          class:timeline-active={isActive}>

          <div class="timeline-dot absolute -left-px top-0"
            class:timeline-active={isActive}></div>

          <div class="group p-6 rounded-xl border transition-all duration-300 hover:border-border-2"
            style="background:var(--color-surface-2); border-color:var(--color-border);">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <span class="font-mono text-[11px] uppercase tracking-[0.14em]"
                style="color:var(--color-muted);">{item.period}</span>
              <span class="font-mono text-[9px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full"
                style="
                  background:{isDone   ? 'rgba(184,224,74,0.08)' :
                               isActive ? 'rgba(184,224,74,0.12)' :
                               isVision ? 'rgba(110,106,99,0.1)'  : 'rgba(57,53,48,0.15)'};
                  color:{isDone || isActive ? 'var(--color-accent)' : 'var(--color-subtle)'};
                  border:1px solid {isDone   ? 'rgba(184,224,74,0.2)' :
                                    isActive ? 'rgba(184,224,74,0.3)' : 'var(--color-border)'};
                ">{item.label}</span>
            </div>
            <h3 class="font-display font-bold text-lg mb-2 leading-tight"
              style="letter-spacing:-0.03em; color:{isVision ? 'var(--color-muted)' : 'var(--color-ink)'};">
              {item.title}
            </h3>
            <p class="font-sans text-sm leading-relaxed"
              style="color:var(--color-subtle);">{item.body}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════
     CTA
════════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden" style="background:var(--color-bg);">

  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <!-- w-175 = 700px, h-100 = 400px (Tailwind v4 canonical) -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-100"
      style="background:radial-gradient(ellipse at center bottom, rgba(184,224,74,0.055) 0%, transparent 68%);"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
    <div class="max-w-2xl mb-12 reveal">
      <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-6"
        style="color:var(--color-accent);">{$t.about.cta.label}</span>
      <h2 class="font-display font-bold leading-[0.93]"
        style="font-size:clamp(40px,6vw,80px); letter-spacing:-0.045em; color:var(--color-ink); white-space:pre-line;">
        {$t.about.cta.title}
      </h2>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <p class="reveal d1 font-sans text-base leading-relaxed"
        style="color:var(--color-muted); letter-spacing:-0.01em; max-width:480px;">
        {$t.about.cta.body}
      </p>

      <div class="reveal d2 flex flex-wrap gap-3">
        <a href="/#join"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-200 active:scale-95 hover:opacity-90"
          style="background:var(--color-accent); color:var(--color-bg); letter-spacing:-0.02em;">
          {$t.about.cta.btn_access}
          <svg class="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>

        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-medium text-sm border transition-all duration-200 hover:border-border-2 hover:text-ink"
          style="border-color:var(--color-border-2); color:var(--color-muted); letter-spacing:-0.02em;">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10Z"/>
          </svg>
          {$t.about.cta.btn_github}
        </a>

        <a href="/#join"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-medium text-sm border transition-all duration-200 hover:border-border-2 hover:text-ink"
          style="border-color:var(--color-border); color:var(--color-muted); letter-spacing:-0.02em;">
          {$t.about.cta.btn_contact}
        </a>
      </div>
    </div>
  </div>
</section>