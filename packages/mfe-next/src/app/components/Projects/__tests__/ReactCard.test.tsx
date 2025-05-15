import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }));

import ReactCard from '../ReactCard';

describe('ReactCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    pushMock.mockClear();
  });

  it('renders the React icon and title', () => {
    render(<ReactCard fadeTimeInterval={300} />);
    expect(screen.getByText('⚛️')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /React Project/i })).toBeInTheDocument();
  });

  it('navigates on click after delay', () => {
    render(<ReactCard fadeTimeInterval={300} />);
    
    // Click the wrapper div using the data-testid
    const wrapper = screen.getByTestId('react-card-wrapper');
    fireEvent.click(wrapper);
    
    expect(pushMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(pushMock).toHaveBeenCalledWith('/react-project');
  });
}); 