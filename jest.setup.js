import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock TanStack Router
jest.mock('@tanstack/react-router', () => ({
  createFileRoute: jest.fn(),
  useNavigate: jest.fn(),
  useSearch: jest.fn(),
}))
