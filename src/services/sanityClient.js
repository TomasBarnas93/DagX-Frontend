import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '97evmjrm',
  dataset: 'production',
  apiVersion: '2025-06-05',
  useCdn: true,        
});

export const urlFor = (source) => {
  if (!source?.asset?._ref) return '';

  let imageUrl = source.asset._ref
    .replace('image-', '')
    .replace(/-([a-z0-9]+)-([a-z0-9]+)$/, '.$2');

  return `https://cdn.sanity.io/images/97evmjrm/production/${imageUrl}`;
};