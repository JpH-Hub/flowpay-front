import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import CapacityBadge from '../CapacityBadge'

describe('Componente: <CapacityBadge />', () => {
  it('deve formatar e exibir a capacidade no padrão current/max', () => {
    render(<CapacityBadge current={3} max={5} />)

    expect(screen.getByText('3/5')).toBeInTheDocument()
  })

  it('deve aplicar a cor de destaque (amarela) quando o variant for active e current > 0', () => {
    render(<CapacityBadge current={2} max={5} variant="active" />)

    const badge = screen.getByText('2/5')
    expect(badge).toHaveClass('bg-[#facc15]')
  })

  it('deve aplicar a cor neutra quando current for 0 ou o variant for diferente de active', () => {
    const { rerender } = render(<CapacityBadge current={0} max={5} variant="active" />)
    expect(screen.getByText('0/5')).toHaveClass('bg-[#f9fafb]')

    rerender(<CapacityBadge current={3} max={5} variant="inactive" />)
    expect(screen.getByText('3/5')).toHaveClass('bg-[#f9fafb]')
  })
})