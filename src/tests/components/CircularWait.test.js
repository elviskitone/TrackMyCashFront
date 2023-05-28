import React from 'react';
import { render } from '@testing-library/react';
import CircularWait from '../../components/CircularWait';

describe('CircularWait', () => {
  it('renders the circular spinner element', () => {
    const { container } = render(<CircularWait />);
    const spinnerElement = container.querySelector('.flex.items-center.justify-center > div');

    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement.tagName).toBe('DIV');
    expect(spinnerElement).toHaveClass('animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900');
  });
});
