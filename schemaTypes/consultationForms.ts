import AutoTotalInput from '../components/AutoTotalInput'

export default {
  name: 'consultationForms',
  title: 'Consultation Form',
  type: 'document',
  fields: [
    {name: 'name', type: 'string', title: 'Name', readOnly: true},
    {name: 'phone', type: 'string', title: 'Phone', readOnly: true},
    {name: 'email', type: 'string', title: 'Email', readOnly: true},
    {name: 'serviceName', type: 'string', title: 'Service Name', readOnly: true},
    {name: 'serviceType', type: 'string', title: 'Service Type', readOnly: true},
    {name: 'description', type: 'text', title: 'Description', readOnly: true},
    {name: 'submittedAt', type: 'datetime', title: 'Submitted At', readOnly: true},
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {list: ['Pending', 'Contacted']},
      initialValue: 'Pending',
    },
    {
      name: 'invoiceDetails',
      title: 'Invoice Details',
      type: 'object',
      fields: [
        {
          name: 'billingInfo',
          type: 'text',
          title: 'Billing Information',
          validation: (Rule: any): any => Rule.required(),
        },
        {
          name: 'items',
          title: 'Items / Products',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'description',
                  type: 'string',
                  title: 'Description',
                  validation: (Rule: any): any => Rule.required(),
                },
                {
                  name: 'quantity',
                  type: 'number',
                  title: 'Quantity',
                  initialValue: 1,
                  validation: (Rule: any): any => Rule.required(),
                },
                {
                  name: 'gstPercent',
                  type: 'number',
                  title: 'GST %',
                  initialValue: 0,
                  validation: (Rule: any): any => Rule.required(),
                },
                {
                  name: 'amount',
                  type: 'number',
                  title: 'Amount',
                  validation: (Rule: any): any => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'description',
                  amount: 'amount',
                  quantity: 'quantity',
                  gstPercent: 'gstPercent',
                },
                prepare(selection: {
                  title: string
                  amount: number
                  quantity: number
                  gstPercent: number
                }) {
                  const {title, amount, quantity, gstPercent} = selection
                  const total = amount * quantity * (1 + (gstPercent || 0) / 100)
                  return {
                    title,
                    subtitle: `Product amount: ${amount} (Qty: ${quantity}) with GST: ${gstPercent}% = Total: $${total.toFixed(2)}`,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'totalAmount',
          type: 'number',
          title: 'Total Amount',
          components: {
            input: AutoTotalInput,
          },
        },
      ],
    },
    {
      name: 'invoiceSent',
      type: 'boolean',
      title: 'Invoice Sent',
      description: 'Mark this to send the invoice email',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
    },
  },
}
