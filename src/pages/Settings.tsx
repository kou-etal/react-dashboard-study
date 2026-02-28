import { useState, type FormEvent } from 'react'
import { Header } from '../components/layout/Header'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Check } from 'lucide-react'

type SettingsForm = {
  shopName: string
  shopDescription: string
  notificationEmail: string
  emailNotifications: boolean
  orderAlerts: boolean
  stockAlerts: boolean
}

export function Settings() {
  const [form, setForm] = useState<SettingsForm>({
    shopName: 'URBAN STYLE',
    shopDescription: 'カジュアルからビジネスまで、ライフスタイルを彩るアパレルブランド。',
    notificationEmail: 'admin@example.com',
    emailNotifications: true,
    orderAlerts: true,
    stockAlerts: false,
  })
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 600))

    setIsLoading(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <>
      <Header title="設定" />
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              ショップ情報
            </h3>
            <div className="space-y-4">
              <Input
                id="shop-name"
                label="ショップ名"
                value={form.shopName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, shopName: e.target.value }))
                }
                required
              />
              <div>
                <label
                  htmlFor="shop-desc"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ショップ説明
                </label>
                <textarea
                  id="shop-desc"
                  value={form.shopDescription}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      shopDescription: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              通知設定
            </h3>
            <div className="space-y-4">
              <Input
                id="notification-email"
                label="通知先メールアドレス"
                type="email"
                value={form.notificationEmail}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    notificationEmail: e.target.value,
                  }))
                }
                required
              />
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.emailNotifications}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        emailNotifications: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    メール通知を受け取る
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.orderAlerts}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        orderAlerts: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    新規注文のアラート
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.stockAlerts}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        stockAlerts: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    在庫切れアラート
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" isLoading={isLoading}>
              保存
            </Button>
            {isSaved && (
              <span className="inline-flex items-center gap-1 text-sm text-green-600">
                <Check size={16} />
                保存しました
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
