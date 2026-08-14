import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary capturou um erro:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="rounded-full bg-red-100 p-3 text-red-600 mb-3">⚠️</div>
          <h3 className="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-4">
            Não foi possível carregar esta visão. Verifique se o serviço está disponível.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false })
              window.location.reload()
            }}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Recarregar Página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}