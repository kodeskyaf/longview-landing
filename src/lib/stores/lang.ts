import { writable, derived } from 'svelte/store';
import { translations, type Lang } from '$lib/i18n';

// ── Persist language choice in localStorage ─────────────────────
function getInitialLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('lv_lang') as Lang | null;
    if (saved === 'en' || saved === 'id') return saved;
  }
  // Detect browser language preference
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en') return 'en';
  }
  return 'id'; // Default
}

export const lang = writable<Lang>(getInitialLang());

// Sync to localStorage whenever it changes
lang.subscribe((value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lv_lang', value);
  }
});

export const t = derived(lang, ($lang) => translations[$lang]);

export function toggleLang() {
  lang.update((l) => (l === 'id' ? 'en' : 'id'));
}

export function setLang(l: Lang) {
  lang.set(l);
}