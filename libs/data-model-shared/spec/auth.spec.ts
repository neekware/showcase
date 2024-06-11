import { describe, expect, it } from '@jest/globals';
import { LoginFormModel } from '../src/auth';

describe('LoginFormModel', () => {
  it('should validate correct inputs', () => {
    const validInputs = {
      email: 'test@example.com',
      password: 'password123',
    };

    expect(LoginFormModel.safeParse(validInputs).success).toBe(true);
  });

  it('should fail with invalid email', () => {
    const invalidEmailInputs = {
      email: 'invalidEmail',
      password: 'password123',
    };

    expect(LoginFormModel.safeParse(invalidEmailInputs).success).toBe(false);
  });

  it('should fail with password length less than 8', () => {
    const shortPasswordInputs = {
      email: 'test@example.com',
      password: 'pass', // Less than 8 characters
    };

    expect(LoginFormModel.safeParse(shortPasswordInputs).success).toBe(false);
  });

  it('should fail with missing email', () => {
    const missingEmailInputs = {
      password: 'password123',
    };

    expect(LoginFormModel.safeParse(missingEmailInputs).success).toBe(false);
  });

  it('should fail with missing password', () => {
    const missingPasswordInputs = {
      email: 'test@example.com',
    };

    expect(LoginFormModel.safeParse(missingPasswordInputs).success).toBe(false);
  });
});
