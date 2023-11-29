export type NavListItem = {
  id: string
  name: string
  icon: string
  activeIcon: string
  route: string
}
export type WalletType = {
  balance: number
  total_payout: number
  total_revenue: number
  pending_payout: number
  ledger_balance: number
}
export type UserType = {
  first_name: string
  last_name: string
  email: string
}
export type TransactionType = {
  amount: number
  metadata?: {
    name?: string
    type?: string
    email?: string
    quantity?: number
    country?: string
    product_name?: string
  }
  payment_reference: string
  status: string
  type: string
  date: string
}

export interface FormattedDataType {
  date: string
  deposit: number
  withdrawal: number
}
