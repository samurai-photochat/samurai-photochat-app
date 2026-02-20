"use client"

import s from "./PaymentsTable.module.scss"
import { Payment } from "@/features/settings/api/settingsApi.types"
import { useState } from "react"
import { PaymentsSlider } from "@/shared/ui/PaymentsSlider"

export type PaymentsTableProps = {
  payments: Payment[]
  isLoading: boolean
}

export const PaymentsTable = ({ payments, isLoading }: PaymentsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  if (isLoading) {
    return <div>Loading...</div>
  }
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPayments = payments.slice(startIndex, endIndex)

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Date of Payment</th>
            <th>End date of subscription</th>
            <th>Price</th>
            <th>Subscription Type</th>
            <th>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPayments.map((payment: Payment) => (
            <tr key={payment.subscriptionId}>
              <td>{new Date(payment.dateOfPayment).toLocaleDateString()}</td>
              <td>{new Date(payment.endDateOfSubscription).toLocaleDateString()}</td>
              <td>${payment.price}</td>
              <td>{payment.subscriptionType}</td>
              <td>{payment.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaymentsSlider
        totalItems={payments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage)
          setCurrentPage(1)
        }}
      />
    </div>
  )
}
