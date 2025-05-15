import React from 'react';
import { render } from '@testing-library/react';
import { projectCard } from '../projectCard';
import '@testing-library/jest-dom';

describe('projectCard HOC', () => {
  it('wraps a component and applies hoverClasses', () => {
    const Dummy: React.FC<{ text: string }> = ({ text }) => <div>{text}</div>;
    const Wrapped = projectCard(Dummy, 'hover:myclass');
    const { container } = render(<Wrapped text="hello" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(
      'bg-gray-800',
      'rounded-lg',
      'overflow-hidden',
      'transform',
      'transition-transform',
      'duration-200',
      'hover:scale-102',
      'hover:myclass'
    );
    expect(wrapper.textContent).toBe('hello');
  });
}); 