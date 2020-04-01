import { writable } from 'svelte/store';

export const lastStep = writable(0);
export const cookiesAllowed = writable(null);
export const taxyView = writable(false);