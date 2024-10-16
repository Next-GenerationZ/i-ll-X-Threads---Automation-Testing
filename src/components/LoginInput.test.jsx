/**
 * Skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange: Render the LoginInput component
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Act: Simulate typing into the email input field
    await userEvent.type(emailInput, 'test@example.com');

    // Assert: Ensure the email input value is updated correctly
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange: Render the LoginInput component
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Act: Simulate typing into the password input field
    await userEvent.type(passwordInput, 'password123');

    // Assert: Ensure the password input value is updated correctly
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange: Create a mock function for login and render the LoginInput component
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);

    // Find the email and password inputs, and the login button
    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Act: Simulate typing in the email and password fields and clicking the login button
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    // Assert: Ensure the login function is called with the correct data
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
