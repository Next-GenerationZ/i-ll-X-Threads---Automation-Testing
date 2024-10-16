/**
 * Skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    // Clean up after each test
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange: Render the RegisterInput component
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // Act: Simulate typing into the name input field
    await userEvent.type(nameInput, 'John Doe');

    // Assert: Ensure the name input value is updated correctly
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    // Arrange: Render the RegisterInput component
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Act: Simulate typing into the email input field
    await userEvent.type(emailInput, 'test@example.com');

    // Assert: Ensure the email input value is updated correctly
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange: Render the RegisterInput component
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Act: Simulate typing into the password input field
    await userEvent.type(passwordInput, 'password123');

    // Assert: Ensure the password input value is updated correctly
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange: Create a mock function for register and render the RegisterInput component
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    // Find the input fields and the register button
    const nameInput = await screen.getByPlaceholderText('Name');
    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Act: Simulate typing into the input fields and clicking the register button
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(registerButton);

    // Assert: Ensure the register function is called with the correct data
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
