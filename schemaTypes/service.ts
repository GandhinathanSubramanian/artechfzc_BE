import {defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any): any => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: any): any => Rule.required(),
    },
    {name: 'image', type: 'image', title: 'Image', validation: (Rule: any): any => Rule.required()},

    {
      name: 'items',
      type: 'array',
      title: 'Sub-services',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule: any): any => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              validation: (Rule: any): any => Rule.required(),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              validation: (Rule: any): any => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
})
