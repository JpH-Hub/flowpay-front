import {
  LayoutDashboard,
  PlusCircle,
  CheckCircle,
} from 'lucide-react'

const navItems = [
  { id: 'visao-geral', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'abrir-chamado', label: 'Abrir Chamado', icon: PlusCircle },
  { id: 'fechar-chamado', label: 'Fechar Chamado', icon: CheckCircle },
]

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="flex w-full shrink-0 flex-col justify-between border-b border-[#e5e7eb] bg-[#f9fafb] p-4 md:w-[230px] md:self-stretch md:border-b-0 md:border-r md:p-5">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex items-center gap-1.5">
          <span className="text-[22px] font-black text-[#111]">FlowPay</span>
          <span className="size-1.5 rounded-sm bg-[#facc15]" />
        </div>

        <nav className="grid grid-cols-3 gap-1 md:flex md:flex-col">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs transition-colors md:justify-start md:gap-3 md:px-4 md:py-3 md:text-sm ${
                  isActive
                    ? 'border border-[#111] bg-[#111] font-semibold text-[#facc15]'
                    : 'border border-transparent font-medium text-[#4b5563] hover:bg-white/60'
                }`}
              >
                <Icon className="size-[18px] shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                <span className="flex-1 text-center md:text-left">{item.label}</span>
                {isActive && <span className="size-1.5 shrink-0 rounded-sm bg-[#facc15]" />}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}