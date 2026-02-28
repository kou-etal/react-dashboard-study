import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { StatusBadge } from '../components/ui/StatusBadge'
import { Button } from '../components/ui/Button'
import { mockOrders } from '../mocks/orders'
import { formatCurrency, formatDate } from '../utils/format'

export function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <>
        <Header title="注文詳細" />
        <div className="p-8">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">注文が見つかりません</p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => navigate('/orders')}
            >
              注文一覧に戻る
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header title={`注文詳細 - ${order.id}`} />
      <div className="p-8 space-y-6">
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={16} />
          注文一覧に戻る
        </button>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                注文商品
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase">
                      商品名
                    </th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase text-right">
                      単価
                    </th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase text-right">
                      数量
                    </th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase text-right">
                      小計
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <tr key={item.productId}>
                      <td className="py-3 text-sm text-gray-900">
                        {item.productName}
                      </td>
                      <td className="py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="py-3 text-sm text-gray-900 text-right">
                        {item.quantity}
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200">
                    <td
                      colSpan={3}
                      className="pt-3 text-sm font-semibold text-gray-900 text-right"
                    >
                      合計
                    </td>
                    <td className="pt-3 text-sm font-bold text-gray-900 text-right">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                注文情報
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-gray-500">注文ID</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {order.id}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">ステータス</dt>
                  <dd className="mt-1">
                    <StatusBadge status={order.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">注文日</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(order.createdAt)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                顧客情報
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-gray-500">名前</dt>
                  <dd className="text-sm text-gray-900">
                    {order.customerName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">メール</dt>
                  <dd className="text-sm text-gray-900">
                    {order.customerEmail}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
