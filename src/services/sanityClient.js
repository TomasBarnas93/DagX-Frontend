import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: '97evmjrm',
  dataset: 'production',
  apiVersion: '2025-06-05',
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source) => {
  if (!source?.asset?._ref) {
    return '';
  }

  const url = builder
    .image(source)
    .width(1400)
    .format('jpg')
    .quality(85)
    .url();

  return url;
};