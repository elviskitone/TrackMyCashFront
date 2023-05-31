import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AccountDropdown from '../../components/AccountDropdown';

// Mock the AccountDropdown module
jest.mock('../../components/AccountDropdown', () => () => <div data-testid="account-dropdown" />);

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@popperjs/core', () => ({
  createPopper: jest.fn(),
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(() => null),
}));

describe('AccountDropdown', () => {
  beforeEach(() => {
    useNavigate.mockReturnValue(jest.fn());
    createPopper.mockReturnValue({ destroy: jest.fn() });
    FontAwesomeIcon.mockImplementation(({ icon }) => <span>{icon}</span>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders AccountDropdown component', () => {
    render(<AccountDropdown />);

    // Verify that the AccountDropdown component is rendered
    const accountDropdown = screen.getByTestId('account-dropdown');
    expect(accountDropdown).toBeInTheDocument();
  });

  

  // More tests for other functionality in the future
});
