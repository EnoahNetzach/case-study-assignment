import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GlobalAlertStackProvider from './contexts/GlobalAlertStack'
import UserProvider from './contexts/User'
import ProductsView from './views/Products'

const queryClient = new QueryClient()

export default function App() {
  return (
    <ErrorBoundary fallback={null}>
      <GlobalAlertStackProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <ProductsView />
          </UserProvider>
        </QueryClientProvider>
      </GlobalAlertStackProvider>
    </ErrorBoundary>
  )
}
