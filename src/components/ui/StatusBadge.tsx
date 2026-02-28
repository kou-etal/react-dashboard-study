import type { OrderStatus } from '../../types'
import { Badge, type BadgeVariant } from './Badge'

const statusConfig: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
  pending: { label: '未処理', variant: 'gray' },
  processing: { label: '処理中', variant: 'blue' },
  shipped: { label: '発送済み', variant: 'yellow' },
  delivered: { label: '配達完了', variant: 'green' },
  cancelled: { label: 'キャンセル', variant: 'red' },
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, variant } = statusConfig[status]
  return <Badge variant={variant}>{label}</Badge>
}
