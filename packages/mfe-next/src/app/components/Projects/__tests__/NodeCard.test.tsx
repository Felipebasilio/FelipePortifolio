import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }));

import NodeCard from '../CardsComponents/NodeCard';

describe('NodeCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    pushMock.mockClear();
  });

  it('renders the Node.js icon and title', () => {
    render(<NodeCard fadeTimeInterval={600} />);
    expect(screen.getByText('🟢')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Node\.js Project/i })).toBeInTheDocument();
  });

  it('navigates on click after delay', () => {
    render(<NodeCard fadeTimeInterval={600} />);
    
    // Click the wrapper div using the data-testid
    const wrapper = screen.getByTestId('node-card-wrapper');
    fireEvent.click(wrapper);
    
    expect(pushMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(600);
    expect(pushMock).toHaveBeenCalledWith("/node");
  });
}); 