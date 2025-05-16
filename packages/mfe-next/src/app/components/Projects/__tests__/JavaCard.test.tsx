import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }));

import JavaCard from '../CardsComponents/JavaCard';

describe('JavaCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    pushMock.mockClear();
  });

  it('renders the Java icon and title', () => {
    render(<JavaCard fadeTimeInterval={700} />);
    expect(screen.getByText('☕️')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Java Project/i })).toBeInTheDocument();
  });

  it('navigates on click after delay', () => {
    render(<JavaCard fadeTimeInterval={700} />);
    
    // Click the wrapper div using the data-testid
    const wrapper = screen.getByTestId('java-card-wrapper');
    fireEvent.click(wrapper);
    
    expect(pushMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(700);
    expect(pushMock).toHaveBeenCalledWith("/java");
  });
}); 