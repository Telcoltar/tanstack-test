import { createFileRoute } from '@tanstack/react-router'
import { CreateUserForm } from '../components/CreateUserForm'
import { useUsers } from '../hooks/useUsers'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { data: queryUsers, isLoading, error } = useUsers()

  // Use query data (React Query handles the data fetching)
  const users = queryUsers || []

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Modern Next.js Stack
        </h1>
        <p className="text-lg text-center text-muted-foreground mb-12">
          Built with Next.js, TanStack Router, ORPC, Prisma, and more
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Create User Form */}
          <div className="flex justify-center">
            <CreateUserForm />
          </div>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                All registered users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-muted-foreground">
                  Loading users...
                </p>
              ) : error ? (
                <p className="text-center text-red-500">Error loading users</p>
              ) : users && users.length > 0 ? (
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No users yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
