export default function CapacityBadge({ current, max, variant = 'active' }) {
  const isActive = variant === 'active' && current > 0

  return (
    <span
      className={`inline-flex items-center justify-center rounded border border-[#111] px-2 py-0.5 font-mono text-[11px] font-bold text-[#111] ${
        isActive ? 'bg-[#facc15]' : 'bg-[#f9fafb]'
      }`}
    >
      {current}/{max}
    </span>
  )
}
