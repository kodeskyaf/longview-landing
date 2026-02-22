<script lang="ts">
  import { t } from '$lib/stores/lang';

  // ── FormSubmit.co — no backend, no signup required ─────────────
  // Emails are delivered to aditya.marv@gmail.com
  // First submission triggers a one-time activation email.
  const ENDPOINT = 'https://formsubmit.co/ajax/aditya.marv@gmail.com';

  let name  = $state('');
  let email = $state('');
  let role  = $state('');
  let status: 'idle' | 'loading' | 'success' | 'error' = $state('idle');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!name || !email) return;
    status = 'loading';

    try {
      const formData = new FormData();
      formData.append('name',    name);
      formData.append('email',   email);
      formData.append('role',    role);
      formData.append('_subject', `[Longview] New Access Request — ${name}`);
      formData.append('_captcha', 'false'); // disable captcha for ajax
      formData.append('_template', 'table');

      const res = await fetch(ENDPOINT, {
        method:  'POST',
        headers: { Accept: 'application/json' },
        body:    formData,
      });
      const data = await res.json();
      status = data.success ? 'success' : 'error';
    } catch {
      status = 'error';
    }
  }
</script>

<section id="join" class="relative py-24 lg:py-36 overflow-hidden" style="background: var(--color-surface);">
  <div class="absolute top-0 left-0 right-0 h-px" style="background: var(--color-border);"></div>

  <!-- Background glow -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-87.5"
      style="background: radial-gradient(ellipse at center, rgba(184,224,74,0.06) 0%, transparent 70%);"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

      <!-- Left: Copy -->
      <div>
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] block mb-6" style="color: var(--color-accent);">
          {$t.cta.label}
        </span>
        <h2 class="font-display font-bold mb-6 leading-[0.93]"
          style="font-size: clamp(36px, 4.5vw, 58px); letter-spacing: -0.04em; color: var(--color-ink); white-space: pre-line;">
          {$t.cta.title}
        </h2>
        <p class="font-sans text-base lg:text-[17px] leading-relaxed max-w-md" style="color: var(--color-muted); letter-spacing: -0.01em;">
          {$t.cta.subtitle}
        </p>

        <!-- Trust marks -->
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

      <!-- Right: Form -->
      <div class="rounded-2xl p-8 lg:p-10 border" style="background: var(--color-surface-2); border-color: var(--color-border);">

        {#if status === 'success'}
          <div class="flex flex-col items-center justify-center text-center py-12 gap-5">
            <div class="w-14 h-14 rounded-full border-2 flex items-center justify-center" style="border-color: var(--color-accent);">
              <svg class="w-6 h-6" viewBox="0 0 20 20" fill="none" style="color: var(--color-accent);">
                <path d="M3 10.5L7.5 15L17 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <p class="font-display font-bold text-xl mb-2" style="letter-spacing: -0.03em; color: var(--color-ink);">
                {$t.cta.success}
              </p>
              <p class="font-sans text-sm" style="color: var(--color-muted);">{$t.cta.privacy}</p>
            </div>
          </div>

        {:else}
          <form onsubmit={handleSubmit} novalidate class="flex flex-col gap-5">

            <!-- Name -->
            <div class="flex flex-col gap-2">
              <label
                for="name"
                class="font-mono text-[10px] uppercase tracking-widest"
                style="color: var(--color-muted);"
              >
              {$t.cta.name_label}
              </label>
              <input
                type="text"
                bind:value={name}
                placeholder={$t.cta.name_placeholder}
                required
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
                type="email"
                bind:value={email}
                placeholder={$t.cta.email_placeholder}
                required
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
                  bind:value={role}
                  class="w-full px-4 py-3 rounded-xl border outline-none font-sans text-sm transition-all duration-200 cursor-pointer appearance-none"
                  style="background: var(--color-surface); border-color: var(--color-border-2); color: {role ? 'var(--color-ink)' : 'var(--color-muted)'};"
                  onfocus={(e) =>(e.currentTarget.style.borderColor = "rgba(184,224,74,0.5)")}
                  onblur={(e) =>(e.currentTarget.style.borderColor = "var(--color-border-2)")}
                >
                  <option value="" disabled selected style="color: var(--color-muted);">
                    {$t.cta.role_placeholder}
                  </option>
                  {#each $t.cta.roles as r}
                    <option value={r} style="background: var(--color-surface-2); color: var(--color-ink);">{r}</option>
                  {/each}
                </select>
                <!-- Custom chevron -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" style="color: var(--color-muted);">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Error -->
            {#if status === 'error'}
              <p class="font-sans text-sm rounded-xl px-4 py-3 border"
                style="color: #FF6B6B; border-color: rgba(255,107,107,0.2); background: rgba(255,107,107,0.05);">
                {$t.cta.error}
              </p>
            {/if}

            <!-- Submit -->
            <button
              type="submit"
              disabled={status === 'loading'}
              class="w-full py-3.5 rounded-xl font-sans font-semibold text-[15px] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-1 hover:opacity-90"
              style="background: var(--color-accent); color: var(--color-bg); letter-spacing: -0.02em;"
            >
              {#if status === 'loading'}
                <span class="inline-flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/>
                  </svg>
                  {$t.cta.submitting}
                </span>
              {:else}
                {$t.cta.submit}
              {/if}
            </button>

            <p class="font-sans text-[11px] text-center" style="color: var(--color-subtle);">
              {$t.cta.privacy}
            </p>
          </form>
        {/if}
      </div>
    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0 h-px" style="background: var(--color-border);"></div>
</section>