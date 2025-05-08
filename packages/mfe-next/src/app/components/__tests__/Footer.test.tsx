// __tests__/Footer.test.tsx
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('shows copyright text', () => {
    render(<Footer />)
    expect(
      screen.getByText(/© 2023 Felipe Basilio\. All rights reserved\./)
    ).toBeInTheDocument()
  })

  it('renders social links with correct hrefs', () => {
    render(<Footer />)
    const socials = [
      { name: /GitHub/i,   href: 'https://github.com/Felipebasilio' },
      { name: /LinkedIn/i, href: 'https://www.linkedin.com/in/felipe-basilio-9a65a6154/' },
    ]
    socials.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
    })
  })
})
