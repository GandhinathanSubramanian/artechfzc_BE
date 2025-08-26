import React from 'react'
import {useFormValue} from 'sanity'

export default function AutoTotalInput() {
  const formValue = useFormValue(['invoiceDetails', 'items'])
  const items = Array.isArray(formValue) ? (formValue as any[]) : []

  const total = items.reduce(
    (sum: number, item: any) =>
      sum + (item?.amount ?? 0) * (item?.quantity ?? 0) * (1 + (item?.gstPercent ?? 0) / 100),
    0,
  )

  return (
    <div style={{margin: '1rem 0'}}>
      <label style={{display: 'block', fontWeight: 'bold'}}>Total Amount (readonly):</label>
      <input
        value={`$ ${total.toFixed(2)}`}
        readOnly
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1.1rem',
          background: '#f3f3f4',
          border: '1px solid #ccc',
        }}
      />
    </div>
  )
}
