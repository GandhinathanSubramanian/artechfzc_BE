interface HomePageTypes {
  title?: string
  subtitle?: string
}

export default {
  name: 'HomePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Section',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              description: 'e.g. Banner, About Us, Overview',
              validation: (Rule: any): any => Rule.required(),
            },
            {
              name: 'subtitle',
              type: 'string',
              title: 'Subtitle',
              description: 'A short subtitle or tagline for the section',
              validation: (Rule: any): any => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Detailed text content of the section',
              validation: (Rule: any): any => Rule.required(),
            },
            {name: 'image', type: 'image', title: 'Image'},
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
            },
            prepare({title, subtitle}: HomePageTypes): HomePageTypes {
              return {
                title: title,
                subtitle: subtitle ? subtitle : 'No subtitle',
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'sections.0.title',
      subtitle: 'sections.0.subtitle',
    },
    prepare(selection: HomePageTypes): HomePageTypes {
      const {title, subtitle} = selection
      return {
        title: title || 'Home Page',
        subtitle: title ? `${title} - ${subtitle}` : 'No sections added',
      }
    },
  },
}
