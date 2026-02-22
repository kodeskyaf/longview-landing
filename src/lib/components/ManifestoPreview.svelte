<script lang="ts">
  import { t } from '$lib/stores/lang';
</script>

<section id="manifesto" class="relative py-24 lg:py-36 overflow-hidden" style="background: var(--color-bg);">

  <!-- Decorative vertical line -->
  <div class="absolute left-1/2 top-0 bottom-0 w-px hidden xl:block" style="background: var(--color-border); transform: translateX(-50%);"></div>

  <div class="max-w-7xl mx-auto px-6 lg:px-10">

    <!-- Label -->
    <div class="mb-12 lg:mb-16">
      <span class="font-mono text-[11px] uppercase tracking-[0.2em]" style="color: var(--color-accent);">
        {$t.manifesto.label}
      </span>
    </div>

    <!-- Split layout -->
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20">

      <!-- Left: Title + Excerpt -->
      <div class="flex flex-col justify-between gap-10">
        <div>
          <h2 class="font-display font-bold mb-8 leading-[0.93]"
            style="font-size: clamp(36px, 5vw, 60px); letter-spacing: -0.04em; color: var(--color-ink);">
            {$t.manifesto.title}
          </h2>

          <!-- Pull quote -->
          <blockquote class="relative pl-6 py-1" style="border-left: 2px solid var(--color-accent);">
            <p class="font-sans text-base lg:text-lg leading-relaxed italic"
              style="color: var(--color-muted); letter-spacing: -0.01em;">
              "{$t.manifesto.excerpt}"
            </p>
          </blockquote>
        </div>

        <!-- CTA -->
        <div>
          <a
            href="/manifesto"
            class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border font-sans font-medium text-[15px] transition-all duration-200 group"
            style="border-color: var(--color-border-2); color: var(--color-ink); letter-spacing: -0.01em;"
          >
            {$t.manifesto.read_full}
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Right: Principles -->
      <div class="flex flex-col gap-0" style="border-top: 1px solid var(--color-border);">
        {#each $t.manifesto.principles as principle, i}
          <div
            class="group flex gap-6 py-8 transition-all duration-300 cursor-default"
            style="border-bottom: 1px solid var(--color-border);"
          >
            <!-- Number -->
            <div class="shrink-0 pt-0.5">
              <span class="font-mono text-[11px]" style="color: var(--color-subtle);">
                {principle.number}
              </span>
            </div>

            <!-- Content -->
            <div class="flex flex-col gap-2.5">
              <h3 class="font-display font-bold text-lg leading-tight transition-colors duration-200"
                style="letter-spacing: -0.03em; color: var(--color-ink);">
                {principle.title}
                <!-- Accent dot appears on hover -->
                <span class="inline-block w-1.5 h-1.5 rounded-full ml-2 align-middle opacity-0 group-hover:opacity-100 transition-opacity duration-200" style="background: var(--color-accent);"></span>
              </h3>
              <p class="font-sans text-sm leading-relaxed transition-colors duration-200"
                style="color: var(--color-muted);">
                {principle.body}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>