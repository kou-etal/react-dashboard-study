import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Search } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { StatusBadge } from '../components/ui/StatusBadge'
import { Pagination } from '../components/ui/Pagination'
import { mockOrders } from '../mocks/orders'
import { useDebounce } from '../hooks/useDebounce'
import { usePagination } from '../hooks/usePagination'
import { formatCurrency, formatDate } from '../utils/format'
import type { OrderStatus } from '../types'

const STATUS_OPTIONS: { value: OrderStatus | ''; label: string }[] = [
  { value: '', label: 'すべて' },
  { value: 'pending', label: '未処理' },
  { value: 'processing', label: '処理中' },
  { value: 'shipped', label: '発送済み' },
  { value: 'delivered', label: '配達完了' },
  { value: 'cancelled', label: 'キャンセル' },
]

export function Orders() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('')
  const debouncedSearch = useDebounce(search, 300)

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch =
        !debouncedSearch ||
        order.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        order.customerName.includes(debouncedSearch)

      const matchesStatus = !statusFilter || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [debouncedSearch, statusFilter])

  const { currentPage, totalPages, startIndex, endIndex, goToPage, hasNext, hasPrev, reset } =
    usePagination({ totalItems: filteredOrders.length, itemsPerPage: 8 })

  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    reset()
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as OrderStatus | '')
    reset()
  }

  return (
    <>
      <Header title="注文管理" />
      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="注文ID・顧客名で検索"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  注文ID
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  顧客
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日付
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
              {paginatedOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-sm text-gray-500"
                  >
                    該当する注文がありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </div>
      </div>
    </>
  )
}
