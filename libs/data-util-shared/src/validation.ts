import { ZodSchema } from 'zod';

/**
 * Validate form data
 * @param model ZodSchema
 * @param data form data
 * @returns { success: boolean, data: T | null, error: string | null }
 */
export async function validateForm<T>(model: ZodSchema<T>, data: T) {
  const result = model.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
