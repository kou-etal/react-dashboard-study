export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'staff'
}
//まず方から作る->サーバーサイドと同様
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type OrderItem = {
  productId: string
  productName: string
  quantity: number
  price: number
}

export type Order = {
  id: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  createdAt: string
}

export type DailySales = {
  date: string
  revenue: number
  orders: number
}

export type KpiData = {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  averageOrderValue: number
  revenueChange: number
  ordersChange: number
  customersChange: number
  averageOrderValueChange: number
}
