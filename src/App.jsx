import { CheckCircle } from 'lucide-react'
import { Toaster, toast } from 'sonner'

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
      <Toaster position="top-right" richColors />

      <h1 className="flex items-center gap-2 text-4xl font-bold text-blue-600">
        <CheckCircle className="h-10 w-10 text-green-500" />
        FlowPay Front-end Funciona! 🚀
      </h1>

      <button
        onClick={() => toast.success('Tudo funcionando perfeitamente!')}
        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
      >
        Testar Notificação (Toast)
      </button>
    </div>
  )
}

export default App