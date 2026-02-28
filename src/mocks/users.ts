import type { User } from '../types'

export const mockUser: User = {
  id: '1',
  name: '田中 太郎',
  email: 'admin@example.com',
  role: 'admin',
}

export const MOCK_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'password123',
} as const
