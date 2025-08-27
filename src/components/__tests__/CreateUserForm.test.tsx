import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CreateUserForm } from '../CreateUserForm'

// Mock the useCreateUser hook
jest.mock('../../hooks/useUsers', () => ({
  useCreateUser: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
}))

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )
}

describe('CreateUserForm', () => {
  it('renders the form correctly', () => {
    renderWithProviders(<CreateUserForm />)

    // Check for the card title (should be unique within the card)
    expect(screen.getAllByText('Create User')).toHaveLength(2) // title and button
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create User' })
    ).toBeInTheDocument()
  })

  it('allows input changes', () => {
    renderWithProviders(<CreateUserForm />)

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
  })
})
