import { useState } from 'react'
import { PlusCircle, MessageSquarePlus, CheckCircle2, Loader } from 'lucide-react'
import { useCreateTicket } from '../../hooks/useCreateTicket' 

export default function CreateTicket({ refreshDashboard }) {
  const [formData, setFormData] = useState({ conversationRef: '', subject: '' })
  
  const { createTicket, isLoading, submitted } = useCreateTicket(() => {
    setFormData({ conversationRef: '', subject: '' }) 
    if (refreshDashboard) refreshDashboard()
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTicket(formData.conversationRef, formData.subject)
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#e5e7eb] pb-4">
        <div>
          <h1 className="text-lg font-extrabold text-[#111]">Abrir Novo Chamado</h1>
          <p className="text-xs text-[#6b7280]">
            Simulação de entrada de mensagens de clientes recebidas pelo sistema.
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
            <p className="text-xs text-[#6b7280]">Insira a mensagem enviada pelo cliente</p>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 p-6 text-center text-green-800">
            <CheckCircle2 className="size-8 text-green-600" />
            <p className="text-sm font-bold">Chamado registrado com sucesso!</p>
            <p className="text-xs text-green-700">Encaminhado para o roteamento inteligente.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Campo: Chat Ref */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#374151]">
                Referência da Conversa (Chat Ref)
              </label>
              <input
                type="text"
                name="conversationRef"
                required
                placeholder="Ex: WHATS-16"
                value={formData.conversationRef}
                onChange={handleInputChange}
                disabled={isLoading}
                className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3 font-mono text-sm text-[#111] outline-none focus:border-[#111] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#374151]">
                Mensagem do Cliente (Assunto)
              </label>
              <textarea
                name="subject"
                required
                rows={3}
                placeholder="Ex: Preciso de ajuda com meus cartões de crédito"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={isLoading}
                className="resize-none rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#111] outline-none focus:border-[#111] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#facc15] py-3 text-sm font-bold text-[#111] transition-all hover:bg-[#eab308] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className="size-4 animate-spin" strokeWidth={2.5} />
                  Analisando e Criando...
                </>
              ) : (
                <>
                  <PlusCircle className="size-4" strokeWidth={2.5} />
                  Criar e Roteá-lo Automaticamente
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}