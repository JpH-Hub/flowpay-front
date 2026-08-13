import { useState } from 'react'
import { PlusCircle, MessageSquarePlus, CheckCircle2 } from 'lucide-react'

export default function AbrirChamado() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#e5e7eb] pb-4">
        <div>
          <h1 className="text-lg font-extrabold text-[#111]">Abrir Novo Chamado</h1>
          <p className="text-xs text-[#6b7280]">
            Simulação de entrada de chamados recebidos pelo sistema.
          </p>
        </div>
      </header>

      <div className="mx-auto mt-4 w-full max-w-xl rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3 border-b border-[#e5e7eb] pb-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#facc15] text-[#111]">
            <MessageSquarePlus className="size-5" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111]">Formulário de Ticket</h2>
            <p className="text-xs text-[#6b7280]">Insira as informações básicas da conversa</p>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 p-6 text-center text-green-800">
            <CheckCircle2 className="size-8 text-green-600" />
            <p className="text-sm font-bold">Chamado registrado com sucesso!</p>
            <p className="text-xs text-green-700">Encaminhado para a fila de atendimento.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#374151]">
                Referência da Conversa (Chat Ref)
              </label>
              <input
                type="text"
                required
                placeholder="Ex: chat_982b189a"
                defaultValue="chat_982b189a"
                className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3 font-mono text-sm text-[#111] outline-none focus:border-[#111] focus:bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#374151]">
                Assunto / Departamento
              </label>
              <select
                defaultValue="Cartões"
                className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#111] outline-none focus:border-[#111] focus:bg-white"
              >
                <option value="Cartões">Cartões</option>
                <option value="Empréstimos">Empréstimos</option>
                <option value="Outros Assuntos">Outros Assuntos</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#facc15] py-3 text-sm font-bold text-[#111] transition-all hover:bg-[#eab308]"
            >
              <PlusCircle className="size-4" strokeWidth={2.5} />
              Criar e Enviar para Fila
            </button>
          </form>
        )}
      </div>
    </div>
  )
}