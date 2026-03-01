<script lang="ts">
  import { t, lang, toggleLang } from '$lib/stores/lang';

  const year = new Date().getFullYear();
</script>

<footer style="background: var(--color-bg); border-top: 1px solid var(--color-border);">
  <div class="max-w-7xl mx-auto px-6 lg:px-10">

    <!-- Top row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 lg:py-20"
      style="border-bottom: 1px solid var(--color-border);">

      <!-- Brand column (takes 2/5) -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <a href="/" class="flex items-center gap-2.5 group w-fit">
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7">
            <circle cx="12" cy="14" r="6" stroke="#B8E04A" stroke-width="1.5"/>
            <circle cx="12" cy="14" r="2.2" fill="#B8E04A"/>
            <line x1="16.8" y1="18.8" x2="23" y2="25" stroke="#B8E04A" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span class="font-display font-bold text-[17px] text-ink tracking-[-0.04em] transition-opacity group-hover:opacity-75">
            LONGVIEW
          </span>
        </a>

        <p class="font-sans text-sm leading-relaxed max-w-xs" style="color: var(--color-muted); white-space: pre-line;">
          {$t.footer.tagline}
        </p>

        <div class="flex items-center gap-3 mt-2">
          <a href="https://github.com/longview" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-200 hover:border-border-2 hover:text-ink"
            style="border-color: var(--color-border); color: var(--color-muted);">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/>
            </svg>
            GitHub
          </a>
          <span class="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border"
            style="border-color: var(--color-border); color: var(--color-subtle);">GPLv3</span>
        </div>
      </div>

      <!-- Links: Platform -->
      <div class="flex flex-col gap-5">
        <span class="font-mono text-[10px] uppercase tracking-[0.2em]" style="color: var(--color-subtle);">
          {$t.footer.col_platform}
        </span>
        <ul class="flex flex-col gap-3">
          {#each $t.footer.platform_links as link}
            <li>
              <a href={link.href} class="font-sans text-sm transition-colors duration-200 hover:text-ink" style="color: var(--color-muted);">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links: Community -->
      <div class="flex flex-col gap-5">
        <span class="font-mono text-[10px] uppercase tracking-[0.2em]" style="color: var(--color-subtle);">
          {$t.footer.col_community}
        </span>
        <ul class="flex flex-col gap-3">
          {#each $t.footer.community_links as link}
            <li>
              <span class="font-sans text-sm cursor-default" style="color: var(--color-muted);">
                {link}
              </span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Links: Resources -->
      <div class="flex flex-col gap-5">
        <span class="font-mono text-[10px] uppercase tracking-[0.2em]" style="color: var(--color-subtle);">
          {$t.footer.col_resources}
        </span>
        <ul class="flex flex-col gap-3">
          {#each $t.footer.resource_links as link}
            <li>
              <span class="font-sans text-sm cursor-default" style="color: var(--color-muted);">
                {link}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-7">
      <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
        <span class="font-sans text-[12px]" style="color: var(--color-subtle);">
          © {year} {$t.footer.copyright}
        </span>
        <span class="hidden sm:block" style="color: var(--color-subtle);">·</span>
        <span class="font-sans text-[12px]" style="color: var(--color-subtle);">
          {$t.footer.built_with}
        </span>
      </div>

      <button
        onclick={toggleLang}
        class="flex items-center gap-1 px-3 py-1.5 rounded-full border font-mono text-[11px] transition-all duration-200 cursor-pointer hover:border-border-2"
        style="border-color: var(--color-border); color: var(--color-muted);"
        aria-label="Toggle language"
      >
        <span style={$lang === 'id' ? 'color: var(--color-accent)' : ''}>ID</span>
        <span style="color: var(--color-subtle); padding: 0 3px">/</span>
        <span style={$lang === 'en' ? 'color: var(--color-accent)' : ''}>EN</span>
      </button>
    </div>
  </div>
</footer>