import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

import ProjectsContainer from '../ProjectsContainer';

describe('ProjectsContainer', () => {
  it('renders five project cards', () => {
    const { container } = render(<ProjectsContainer />);
    const gridItems = container.querySelectorAll('#projects .grid > div');
    expect(gridItems.length).toBe(5);
  });
}); 