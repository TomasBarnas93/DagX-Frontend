import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'painting',
  title: 'Painting',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size (e.g. 70x100 cm)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order (lower = appears first)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailImages',
      title: 'Detail Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'width',
              title: 'Width Type',
              type: 'string',
              options: {
                list: ['small', 'normal'],
              },
              initialValue: 'normal',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'descriptions',
      title: 'Descriptions',
      type: 'object',
      fields: [
        defineField({ name: 'sv', title: 'Swedish', type: 'text' }),
        defineField({ name: 'en', title: 'English', type: 'text' }),
        defineField({ name: 'pl', title: 'Polish', type: 'text' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        media: selection.media,
      };
    },
  },
});