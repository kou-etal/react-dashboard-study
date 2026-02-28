import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { Header } from '../components/layout/Header'
import { mockDailySales, mockKpi } from '../mocks/dashboard'
import { formatCurrency } from '../utils/format'

type KpiCardProps = {
  title: string
  value: string
  change: number
  icon: LucideIcon
}

function KpiCard({ title, value, change, icon: Icon }: KpiCardProps) {
  const isPositive = change >= 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon size={20} className="text-blue-600" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
      <p
        className={`mt-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {isPositive ? '+' : ''}
        {change}% <span className="text-gray-400 font-normal">前月比</span>
      </p>
    </div>
  )
}

export function Dashboard() {
  return (
    <>
      <Header title="ダッシュボード" />
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-4 gap-6">
          <KpiCard
            title="月間売上"
            value={formatCurrency(mockKpi.totalRevenue)}
            change={mockKpi.revenueChange}
            icon={DollarSign}
          />
          <KpiCard
            title="注文数"
            value={`${mockKpi.totalOrders}件`}
            change={mockKpi.ordersChange}
            icon={ShoppingCart}
          />
          <KpiCard
            title="顧客数"
            value={`${mockKpi.totalCustomers}人`}
            change={mockKpi.customersChange}
            icon={Users}
          />
          <KpiCard
            title="客単価"
            value={formatCurrency(mockKpi.averageOrderValue)}
            change={mockKpi.averageOrderValueChange}
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              売上推移
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockDailySales}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(v) => `¥${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), '売上']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              日別注文数
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockDailySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} />
                <YAxis fontSize={12} tickLine={false} />
                <Tooltip
                  formatter={(value) => [`${value}件`, '注文数']}
                />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}
