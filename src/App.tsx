import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRoutes from './routes/AppRoutes'
import '@/App.css'
import { Toaster } from './components/ui/toaster'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster />
    </QueryClientProvider>
  )
}

export default App
