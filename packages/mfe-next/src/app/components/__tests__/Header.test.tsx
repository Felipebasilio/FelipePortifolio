// __tests__/Header.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

describe('Header', () => {
  it('renders all nav links with correct hrefs and accessibility roles', () => {
    render(<Header />)
    const links = [
      { name: /About/i,    href: '/about' },
      { name: /Projects/i, href: '/projects' },
      { name: /Skills/i,   href: '/skills' },
      { name: /Blog/i,     href: '/blog' },
      { name: /Contact/i,  href: '/contact' },
      { name: /Resume/i,   href: '/resume' },
    ]
    links.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveClass('hover:text-white', 'transition-colors')
      expect(link).toHaveAttribute('aria-label', name.toString().replace(/[/\\]/g, '').replace(/i$/, ''))
    })
  })

  it('renders the center logo linking to home with correct styling', () => {
    render(<Header />)
    const logo = screen.getByRole('link', { name: /FB/i })
    expect(logo).toHaveAttribute('href', '/')
    const logoContainer = logo.firstChild
    expect(logoContainer).toHaveClass(
      'w-10',
      'h-10',
      'bg-gray-800',
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'hover:bg-gray-700',
      'transition-colors'
    )
  })

  it('has proper header layout and positioning', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'w-full',
      'bg-[#121212]',
      'text-gray-200',
      'fixed',
      'top-0',
      'z-50'
    )
  })

  it('maintains responsive navigation structure', () => {
    render(<Header />)
    const leftNav = screen.getByRole('navigation', { name: /left/i })
    const rightNav = screen.getByRole('navigation', { name: /right/i })
    
    expect(leftNav).toHaveClass('flex', 'space-x-6')
    expect(rightNav).toHaveClass('flex', 'space-x-6')
  })
})
