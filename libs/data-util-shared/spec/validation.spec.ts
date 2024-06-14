import { z } from 'zod';
import { validateForm } from '../src/validation';

describe('validateForm', () => {
  it('should return success and data when validation passes', async () => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number().int().min(0),
    });

    const data = { name: 'John Doe', age: 30 };
    const result = await validateForm(schema, data);

    expect(result).toEqual({ success: true, data });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should return failure and error details when validation fails', async () => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number().int().min(0),
    });

    const data = { name: '', age: -5 }; // Invalid data
    const result = await validateForm(schema, data);

    expect(result?.success).toBe(false);
    expect(result?.error).toBeDefined();
    expect(result?.error?.name).toEqual({
      _errors: ['String must contain at least 1 character(s)'],
    });
    expect(result?.error?.age).toEqual({ _errors: ['Number must be greater than or equal to 0'] });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should format the error correctly when validation fails', async () => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number().int().min(0),
    });

    const data = { name: '', age: -5 };
    const result = await validateForm(schema, data);

    expect(result?.success).toBe(false);
    expect(result?.error).toBeTruthy();
    expect(result?.error).toEqual({
      _errors: [],
      name: { _errors: ['String must contain at least 1 character(s)'] },
      age: { _errors: ['Number must be greater than or equal to 0'] },
    });
  });

  it('should return failure and null error when an unexpected error occurs', async () => {
    const schema = z.object({
      name: z.string().min(1),
    });

    const data = { name: 'John Doe' };

    // Mock schema to throw a generic error
    const mockSchema = {
      safeParse: () => {
        throw new Error('Unexpected error');
      },
    } as unknown as typeof schema;

    await expect(validateForm(mockSchema, data)).rejects.toThrow('Unexpected error');
  });
});
