import { BrowserRouter, Routes, Route } from 'react-router'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { AppLayout } from './components/layout/AppLayout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Orders } from './pages/Orders'
import { OrderDetail } from './pages/OrderDetail'
import { Products } from './pages/Products'
import { Settings } from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="products" element={<Products />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
