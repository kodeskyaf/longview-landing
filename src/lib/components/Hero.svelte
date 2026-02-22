<script lang="ts">
  import { t } from '$lib/stores/lang';
</script>

<section
  id="hero"
  class="relative min-h-screen flex flex-col justify-center overflow-hidden"
  style="padding-top: 100px; padding-bottom: 80px;"
>
  <!-- Grid bg -->
  <div class="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
    <div class="absolute inset-0" style="
      background-image:
        linear-gradient(var(--color-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
      background-size: 48px 48px;
      opacity: 0.35;
    "></div>
    <!-- Radial vignette -->
    <div class="absolute inset-0" style="
      background: radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, var(--color-bg) 75%);
    "></div>
    <!-- Accent glow top-right -->
    <div class="absolute" style="
      top: 15%; right: 8%; width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(184,224,74,0.07) 0%, transparent 70%);
      pointer-events: none;
    "></div>
    <!-- Subtle bottom glow -->
    <div class="absolute bottom-0 left-0 right-0 h-64" style="
      background: linear-gradient(to top, var(--color-bg) 0%, transparent 100%);
    "></div>
  </div>

  <!-- Corner decoration top-right -->
  <div class="absolute top-20 right-8 lg:right-16 hidden lg:block" aria-hidden="true">
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" opacity="0.12">
      <circle cx="80" cy="80" r="70" stroke="#B8E04A" stroke-width="0.75"/>
      <circle cx="80" cy="80" r="50" stroke="#B8E04A" stroke-width="0.5"/>
      <circle cx="80" cy="80" r="30" stroke="#B8E04A" stroke-width="0.5"/>
      <circle cx="80" cy="80" r="6" fill="#B8E04A" opacity="0.5"/>
      <line x1="80" y1="10" x2="80" y2="150" stroke="#B8E04A" stroke-width="0.4"/>
      <line x1="10" y1="80" x2="150" y2="80" stroke="#B8E04A" stroke-width="0.4"/>
    </svg>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">

    <!-- Badge -->
    <div class="animate-fade-up" style="animation-delay: 50ms;">
      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[11px] uppercase tracking-widest mb-8"
        style="border-color: var(--color-border-2); color: var(--color-muted);">
        <span class="w-1.5 h-1.5 rounded-full" style="background: var(--color-accent); animation: pulse-subtle 2s infinite;"></span>
        {$t.hero.badge}
      </span>
    </div>

    <!-- Headline -->
    <div class="animate-fade-up delay-100">
      <h1 class="font-display font-bold leading-[0.92] mb-6"
        style="font-size: clamp(52px, 9vw, 120px); letter-spacing: -0.04em; color: var(--color-ink);">
        <span class="block">{$t.hero.headline_1}</span>
        <span class="block" style="color: var(--color-accent);">{$t.hero.headline_2}</span>
      </h1>
    </div>

    <!-- Subheadline + CTA row -->
    <div class="animate-fade-up delay-200 max-w-2xl">
      <p class="font-sans text-base lg:text-lg mb-10 leading-relaxed" style="color: var(--color-muted); letter-spacing: -0.01em;">
        {$t.hero.subheadline}
      </p>

      <div class="flex flex-wrap items-center gap-3">
        <a href="#join"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-semibold text-[15px] transition-all duration-200 active:scale-95 hover:opacity-90"
          style="background: var(--color-accent); color: var(--color-bg); letter-spacing: -0.02em;">
          {$t.hero.cta_primary}
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="#manifesto"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border font-sans font-medium text-[15px] transition-all duration-200 hover:border-muted"
          style="border-color: var(--color-border-2); color: var(--color-muted); letter-spacing: -0.02em;">
          {$t.hero.cta_secondary}
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Stats -->
    <div class="animate-fade-up delay-400 mt-16 pt-8 flex flex-wrap gap-8 lg:gap-12"
      style="border-top: 1px solid var(--color-border);">
      {#each [
        { num: $t.hero.stat_1_num, label: $t.hero.stat_1_label },
        { num: $t.hero.stat_2_num, label: $t.hero.stat_2_label },
        { num: $t.hero.stat_3_num, label: $t.hero.stat_3_label },
      ] as stat, i}
        <div class="flex flex-col gap-1">
          <span class="font-display font-bold" style="font-size: clamp(28px, 4vw, 40px); letter-spacing: -0.04em; color: var(--color-ink);">
            {stat.num}
          </span>
          <span class="font-mono text-[11px] uppercase tracking-widest" style="color: var(--color-muted);">
            {stat.label}
          </span>
        </div>
        {#if i < 2}
          <div class="hidden sm:block self-stretch w-px" style="background: var(--color-border);"></div>
        {/if}
      {/each}
    </div>
  </div>
</section>