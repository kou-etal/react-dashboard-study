import type { DailySales, KpiData } from '../types'

export const mockDailySales: DailySales[] = [
  { date: '2/1', revenue: 125000, orders: 12 },
  { date: '2/2', revenue: 98000, orders: 9 },
  { date: '2/3', revenue: 142000, orders: 15 },
  { date: '2/4', revenue: 88000, orders: 8 },
  { date: '2/5', revenue: 115000, orders: 11 },
  { date: '2/6', revenue: 135000, orders: 14 },
  { date: '2/7', revenue: 178000, orders: 18 },
  { date: '2/8', revenue: 92000, orders: 10 },
  { date: '2/9', revenue: 110000, orders: 12 },
  { date: '2/10', revenue: 156000, orders: 16 },
  { date: '2/11', revenue: 145000, orders: 13 },
  { date: '2/12', revenue: 168000, orders: 17 },
  { date: '2/13', revenue: 132000, orders: 14 },
  { date: '2/14', revenue: 195000, orders: 21 },
]

export const mockKpi: KpiData = {
  totalRevenue: 2845000,
  totalOrders: 234,
  totalCustomers: 189,
  averageOrderValue: 12158,
  revenueChange: 12.5,
  ordersChange: 8.3,
  customersChange: 15.2,
  averageOrderValueChange: 3.9,
}
