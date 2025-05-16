import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }));

import AngularCard from '../CardsComponents/AngularCard';

describe('AngularCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    pushMock.mockClear();
  });

  it('renders the Angular icon and title', () => {
    render(<AngularCard fadeTimeInterval={500} />);
    expect(screen.getByText('🅰️')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Angular Project/i })).toBeInTheDocument();
  });

  it('navigates on click after delay', () => {
    render(<AngularCard fadeTimeInterval={500} />);
    
    // Click the wrapper div using the data-testid
    const wrapper = screen.getByTestId('angular-card-wrapper');
    fireEvent.click(wrapper);
    
    expect(pushMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(pushMock).toHaveBeenCalledWith("/angular");
  });
}); 