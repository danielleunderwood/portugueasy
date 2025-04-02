import type { Subentry } from './Subentry.js';

export type Entry = {
  canonicalForm: string;

  senses: Subentry[];
};
