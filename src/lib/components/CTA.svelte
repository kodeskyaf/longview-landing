<script lang="ts">
  import { t } from '$lib/stores/lang';

  // ── FormSubmit.co — zero backend, zero signup ───────────────────
  // First submission triggers a one-time activation email to
  // aditya.marv@gmail.com. Confirm once, all future sends are live.
  const ENDPOINT = 'https://formsubmit.co/ajax/aditya.marv@gmail.com';

  let name    = $state('');
  let email   = $state('');
  let role    = $state('');
  let message = $state('');
  let status: 'idle' | 'loading' | 'success' | 'error' = $state('idle');

  const MAX  = 600;
  let count      = $derived(message.length);
  let nearLimit  = $derived(count > MAX * 0.80);
  let overLimit  = $derived(count > MAX);
  let fillPct    = $derived(Math.min((count / MAX) * 100, 100));
  let fillColor  = $derived(overLimit ? '#FF6B6B' : nearLimit ? '#E5A825' : 'var(--color-accent)');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || overLimit) return;
    status = 'loading';
    try {
      const fd = new FormData();
      fd.append('name',      name.trim());
      fd.append('email',     email.trim());
      fd.append('role',      role || 'Not specified');
      fd.append('message',   message.trim() || '—');
      fd.append('_subject',  `[Longview] ${name.trim()} — ${role || 'Early Access Request'}`);
      fd.append('_captcha',  'false');
      fd.append('_template', 'table');
      const res  = await fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
      const data = await res.json();
      status = data.success ? 'success' : 'error';
    } catch {
      status = 'error';
    }
  }
</script>

<section id="join" class="relative py-24 lg:py-36 overflow-hidden" style="background: var(--color-surface);">
  <div class="absolute top-0 left-0 right-0 h-px" style="background: var(--color-border);"></div>

  <!-- Ambient glow -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100"
      style="background: radial-gradient(ellipse at center, rgba(184,224,74,0.05) 0%, transparent 70%);"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

      <!-- ── Left: Copy ─────────────────────────────────────────── -->
      <div>
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-6" style="color: var(--color-accent);">
          {$t.cta.label}
        </span>
        <h2 class="font-display font-bold mb-6 leading-[0.93]"
          style="font-size: clamp(36px, 4.5vw, 58px); letter-spacing: -0.04em; color: var(--color-ink); white-space: pre-line;">
          {$t.cta.title}
        </h2>
        <p class="font-sans text-base lg:text-[17px] leading-relaxed max-w-md"
          style="color: var(--color-muted); letter-spacing: -0.01em;">
          {$t.cta.subtitle}
        </p>

        <!-- Trust chips -->
        <div class="flex flex-wrap gap-3 mt-10">
          {#each ['GPLv3 Open Source', 'Community Owned', 'No Ads'] as badge}
            <span class="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border"
              style="border-color: var(--color-border-2); color: var(--color-muted);">
              <svg class="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);"/>
              </svg>
              {badge}
            </span>
          {/each}
        </div>
      </div>

      <!-- ── Right: Form ────────────────────────────────────────── -->
      <div class="rounded-2xl border overflow-hidden" style="background: var(--color-surface-2); border-color: var(--color-border);">

        {#if status === 'success'}
          <!-- ── Success state ──────────────────────────────────── -->
          <div class="flex flex-col items-center justify-center text-center p-10 lg:p-12 gap-6" style="min-height: 460px;">
            <div class="relative shrink-0">
              <div class="w-16 h-16 rounded-full flex items-center justify-center"
                style="background: rgba(184,224,74,0.10);">
                <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" style="color: var(--color-accent);">
                  <path d="M4 12.5L9 17.5L20 6.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                style="background: var(--color-accent); border-color: var(--color-surface-2);"></div>
            </div>
            <div class="flex flex-col gap-3 max-w-70">
              <p class="font-display font-bold text-2xl" style="letter-spacing: -0.04em; color: var(--color-ink);">
                {$t.cta.success_title}
              </p>
              <p class="font-sans text-sm leading-relaxed" style="color: var(--color-muted);">
                {$t.cta.success_body}
              </p>
            </div>
            <span class="font-mono text-[10px] uppercase tracking-widest" style="color: var(--color-subtle);">
              {$t.cta.privacy}
            </span>
          </div>

        {:else}
          <!-- ── Form ───────────────────────────────────────────── -->
          <form onsubmit={handleSubmit} novalidate class="flex flex-col p-8 lg:p-10 gap-5">

            <!-- Name -->
            <div class="flex flex-col gap-2">
              <label for="name" class="font-mono text-[10px] uppercase tracking-widest" style="color: var(--color-muted);">
                {$t.cta.name_label}
              </label>
              <input
                id="name"
                type="text" bind:value={name}
                placeholder={$t.cta.name_placeholder}
                required autocomplete="name"
                class="w-full px-4 py-3 rounded-xl border outline-none font-sans text-sm transition-all duration-200"
                style="background: var(--color-surface); border-color: var(--color-border-2); color: var(--color-ink);"
                onfocus={(e) => {(e.currentTarget as HTMLInputElement).style.borderColor ="rgba(184,224,74,0.5)";}}
                onblur={(e) => {(e.currentTarget as HTMLInputElement).style.borderColor ="var(--color-border-2)";}}
              />
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-2">
              <label for="email" class="font-mono text-[10px] uppercase tracking-widest" style="color: var(--color-muted);">
                {$t.cta.email_label}
              </label>
              <input
                id="email"
                type="email" bind:value={email}
                placeholder={$t.cta.email_placeholder}
                required autocomplete="email"
                class="w-full px-4 py-3 rounded-xl border outline-none font-sans text-sm transition-all duration-200"
                style="background: var(--color-surface); border-color: var(--color-border-2); color: var(--color-ink);"
                onfocus={(e) => {(e.currentTarget as HTMLInputElement).style.borderColor ="rgba(184,224,74,0.5)";}}
                onblur={(e) => {(e.currentTarget as HTMLInputElement).style.borderColor ="var(--color-border-2)";}}
              />
            </div>

            <!-- Role -->
            <div class="flex flex-col gap-2">
              <label for="role" class="font-mono text-[10px] uppercase tracking-widest" style="color: var(--color-muted);">
                {$t.cta.role_label}
              </label>
              <div class="relative">
                <select
                  id="role"
                  bind:value={role}
                  class="w-full px-4 py-3 rounded-xl border outline-none font-sans text-sm transition-all duration-200 cursor-pointer appearance-none"
                  style="background: var(--color-surface); border-color: var(--color-border-2); color: {role ? 'var(--color-ink)' : 'var(--color-muted)'};"
                  onfocus={(e) => {(e.currentTarget as HTMLSelectElement).style.borderColor ="rgba(184,224,74,0.5)";}}
                  onblur={(e) => {(e.currentTarget as HTMLSelectElement).style.borderColor ="var(--color-border-2)";}}
                >
                  <option value="" disabled selected style="color: var(--color-muted);">
                    {$t.cta.role_placeholder}
                  </option>
                  {#each $t.cta.roles as r}
                    <option value={r} style="background: var(--color-surface-2); color: var(--color-ink);">{r}</option>
                  {/each}
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" style="color: var(--color-muted);">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- ── Message box ─────────────────────────────────── -->
            <div class="flex flex-col gap-2">
              <div class="flex items-baseline justify-between gap-3">
                <label for="message" class="font-mono text-[10px] uppercase tracking-widest" style="color: var(--color-muted);">
                  {$t.cta.message_label}
                </label>
                <span class="font-mono text-[10px] tabular-nums shrink-0 transition-colors duration-200"
                  style="color: {overLimit ? '#FF6B6B' : nearLimit ? '#E5A825' : 'var(--color-subtle)'};">
                  {count}/{MAX}
                </span>
              </div>

              <div class="relative">
                <textarea
                id="message"
                bind:value={message}
                placeholder={$t.cta.message_placeholder}
                rows={5}
                class="w-full px-4 py-3 rounded-xl border outline-none font-sans text-sm transition-all duration-200 resize-none leading-relaxed"
                style="background: var(--color-surface);
                border-color: {overLimit
                ? 'rgba(255,107,107,0.5)'
                : 'var(--color-border-2)'};
                color: var(--color-ink);"
                onfocus={(e: FocusEvent) => {
                  (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  "rgba(184,224,74,0.5)";
                }}
                onblur={(e: FocusEvent) => {
                  (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  overLimit
                  ? "rgba(255,107,107,0.5)"
                  : "var(--color-border-2)";
                }}
                  ></textarea>

                <!-- Fill-progress bar along bottom edge -->
                {#if count > 0}
                  <div class="absolute bottom-0 left-0 h-0.5 rounded-b-xl transition-all duration-300 ease-out pointer-events-none"
                    style="width: {fillPct}%; background: {fillColor};"></div>
                {/if}
              </div>

              <div class="flex items-center justify-between">
                <p class="font-mono text-[10px]" style="color: var(--color-subtle);">
                  {$t.cta.message_optional}
                </p>
                {#if overLimit}
                  <p class="font-mono text-[10px]" style="color: #FF6B6B;">
                    {count - MAX} over limit
                  </p>
                {/if}
              </div>
            </div>

            <!-- Error banner -->
            {#if status === 'error'}
              <div class="flex items-start gap-3 px-4 py-3 rounded-xl border"
                style="border-color: rgba(255,107,107,0.25); background: rgba(255,107,107,0.06);">
                <svg class="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none" style="color:#FF6B6B;">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/>
                  <path d="M8 5v4M8 11v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <p class="font-sans text-sm" style="color: #FF6B6B;">{$t.cta.error}</p>
              </div>
            {/if}

            <!-- Submit -->
            <button
              type="submit"
              disabled={status === 'loading' || overLimit}
              class="w-full py-4 rounded-xl font-sans font-semibold text-[15px] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 mt-1"
              style="background: var(--color-accent); color: var(--color-bg); letter-spacing: -0.02em;"
            >
              {#if status === 'loading'}
                <span class="inline-flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  {$t.cta.submitting}
                </span>
              {:else}
                {$t.cta.submit}
              {/if}
            </button>

            <p class="font-sans text-[11px] text-center leading-relaxed" style="color: var(--color-subtle);">
              {$t.cta.privacy}
            </p>
          </form>
        {/if}
      </div>

    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0 h-px" style="background: var(--color-border);"></div>
</section>