import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }));

import VueCard from '../CardsComponents/VueCard';

describe('VueCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    pushMock.mockClear();
  });

  it('renders the Vue icon and title', () => {
    render(<VueCard fadeTimeInterval={400} />);
    expect(screen.getByText('🖖')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Vue Project/i })).toBeInTheDocument();
  });

  it('navigates on click after delay', () => {
    render(<VueCard fadeTimeInterval={400} />);
    
    // Click the wrapper div using the data-testid
    const wrapper = screen.getByTestId('vue-card-wrapper');
    fireEvent.click(wrapper);
    
    expect(pushMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(400);
    expect(pushMock).toHaveBeenCalledWith("/vue");
  });
}); 