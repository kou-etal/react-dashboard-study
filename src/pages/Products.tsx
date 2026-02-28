import { useState, useMemo, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { Pagination } from '../components/ui/Pagination'
import { mockProducts } from '../mocks/products'
import { useDebounce } from '../hooks/useDebounce'
import { usePagination } from '../hooks/usePagination'
import { formatCurrency } from '../utils/format'
import type { Product } from '../types'

type ProductFormData = {
  name: string
  description: string
  price: string
  stock: string
  category: string
}

const EMPTY_FORM: ProductFormData = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: 'トップス',
}

const CATEGORIES = ['トップス', 'ボトムス', 'アウター', 'シューズ', 'バッグ', 'アクセサリー']

export function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return products
    const q = debouncedSearch.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [products, debouncedSearch])

  const { currentPage, totalPages, startIndex, endIndex, goToPage, hasNext, hasPrev, reset } =
    usePagination({ totalItems: filteredProducts.length, itemsPerPage: 8 })

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const openAddModal = () => {
    setEditingProduct(null)
    setForm(EMPTY_FORM)
    setIsModalOpen(true)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      category: product.category,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('この商品を削除しますか？')) return
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                category: form.category,
              }
            : p,
        ),
      )
    } else {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        createdAt: new Date().toISOString(),
      }
      setProducts((prev) => [newProduct, ...prev])
    }

    setIsModalOpen(false)
  }

  const updateField = (field: keyof ProductFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Header title="商品管理" />
      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="商品名・カテゴリで検索"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  reset()
                }}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button onClick={openAddModal}>
              <Plus size={16} className="mr-1" />
              商品を追加
            </Button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  商品名
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  価格
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  在庫
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {product.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-sm font-medium ${
                        product.stock < 30
                          ? 'text-red-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-sm text-gray-500"
                  >
                    該当する商品がありません
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? '商品を編集' : '商品を追加'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="product-name"
            label="商品名"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
          <div>
            <label
              htmlFor="product-desc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              説明
            </label>
            <textarea
              id="product-desc"
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="product-price"
              label="価格（円）"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => updateField('price', e.target.value)}
              required
            />
            <Input
              id="product-stock"
              label="在庫数"
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => updateField('stock', e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="product-category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              カテゴリ
            </label>
            <select
              id="product-category"
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              キャンセル
            </Button>
            <Button type="submit">
              {editingProduct ? '保存' : '追加'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
