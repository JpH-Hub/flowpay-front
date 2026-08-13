export default function StatusTag({ status = 'IN_SERVICE' }) {
  return (
    <span className="inline-flex shrink-0 rounded bg-[#111] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
      {status}
    </span>
  )
}
