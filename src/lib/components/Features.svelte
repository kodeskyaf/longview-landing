<script lang="ts">
  import { t } from '$lib/stores/lang';
</script>

<section id="features" class="relative py-24 lg:py-36" style="background: var(--color-surface);">
  <!-- Top edge -->
  <div class="absolute top-0 left-0 right-0 h-px" style="background: var(--color-border);"></div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10">

    <!-- Section Header -->
    <div class="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div>
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] mb-4 block" style="color: var(--color-accent);">
          {$t.features.label}
        </span>
        <h2 class="font-display font-bold leading-[0.95]"
          style="font-size: clamp(36px, 5vw, 64px); letter-spacing: -0.04em; color: var(--color-ink);">
          {$t.features.title}
        </h2>
      </div>
      <p class="font-sans text-base max-w-sm leading-relaxed lg:text-right" style="color: var(--color-muted); letter-spacing: -0.01em;">
        {$t.features.subtitle}
      </p>
    </div>

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style="background: var(--color-border);">
      {#each $t.features.items as feature, i}
        <div
          class="group relative flex flex-col gap-5 p-7 lg:p-8 transition-all duration-300"
          style="background: var(--color-surface);"
        >
          <!-- Hover accent line top -->
          <div class="absolute top-0 left-0 right-0 h-px transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
            style="background: var(--color-accent);"></div>

          <!-- Tag -->
          <span class="font-mono text-[10px] uppercase tracking-[0.2em]" style="color: var(--color-subtle);">
            {feature.tag}
          </span>

          <!-- Icon area (abstract geometric) -->
          <div class="w-10 h-10 flex items-center justify-center rounded border transition-all duration-300 group-hover:border-accent/50"
            style="border-color: var(--color-border-2);">
            {#if i === 0}
              <!-- Lens -->
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.2" style="color: var(--color-accent);"/>
                <circle cx="8" cy="8" r="1.8" fill="currentColor" style="color: var(--color-accent);"/>
                <line x1="12.5" y1="12.5" x2="16" y2="16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" style="color: var(--color-accent);"/>
              </svg>
            {:else if i === 1}
              <!-- Network nodes -->
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="4" r="2" fill="currentColor" style="color: var(--color-accent);"/>
                <circle cx="4" cy="13" r="2" fill="currentColor" style="color: var(--color-accent);"/>
                <circle cx="14" cy="13" r="2" fill="currentColor" style="color: var(--color-accent);"/>
                <line x1="9" y1="6" x2="5" y2="11.5" stroke="currentColor" stroke-width="1" style="color: var(--color-muted);"/>
                <line x1="9" y1="6" x2="13" y2="11.5" stroke="currentColor" stroke-width="1" style="color: var(--color-muted);"/>
                <line x1="6" y1="13" x2="12" y2="13" stroke="currentColor" stroke-width="1" style="color: var(--color-muted);"/>
              </svg>
            {:else if i === 2}
              <!-- Chain links -->
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="7" width="6" height="4" rx="2" stroke="currentColor" stroke-width="1.2" style="color: var(--color-accent);"/>
                <rect x="10" y="7" width="6" height="4" rx="2" stroke="currentColor" stroke-width="1.2" style="color: var(--color-accent);"/>
                <line x1="8" y1="9" x2="10" y2="9" stroke="currentColor" stroke-width="1.2" style="color: var(--color-accent);"/>
              </svg>
            {:else if i === 3}
              <!-- Exchange arrows -->
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 6h12M12 3l3 3-3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);"/>
                <path d="M15 12H3M6 9l-3 3 3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);"/>
              </svg>
            {:else if i === 4}
              <!-- Map pin -->
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2a5 5 0 0 1 5 5c0 3.5-5 9-5 9S4 10.5 4 7a5 5 0 0 1 5-5Z" stroke="currentColor" stroke-width="1.2" style="color: var(--color-accent);"/>
                <circle cx="9" cy="7" r="1.5" fill="currentColor" style="color: var(--color-accent);"/>
              </svg>
            {:else}
              <!-- AI sparkle -->
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2v3M9 13v3M2 9h3M13 9h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" style="color: var(--color-accent);"/>
                <circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.2" style="color: var(--color-accent);"/>
                <path d="M4.5 4.5l1.5 1.5M12 12l1.5 1.5M12 6l1.5-1.5M4.5 13.5l1.5-1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round" style="color: var(--color-muted);"/>
              </svg>
            {/if}
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-2.5 flex-1">
            <h3 class="font-display font-bold text-xl leading-tight" style="letter-spacing: -0.03em; color: var(--color-ink);">
              {feature.title}
            </h3>
            <p class="font-sans text-sm leading-relaxed" style="color: var(--color-muted);">
              {feature.description}
            </p>
          </div>

          <!-- Bottom arrow (appears on hover) -->
          <div class="flex items-center gap-1.5 transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0">
            <span class="font-mono text-[11px] uppercase tracking-widest" style="color: var(--color-accent);">Learn more</span>
            <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none" style="color: var(--color-accent);">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Bottom edge -->
  <div class="absolute bottom-0 left-0 right-0 h-px" style="background: var(--color-border);"></div>
</section>