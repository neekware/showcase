import { ZodSchema } from 'zod';
import { type DataRetrieval } from '@lib/data-model-shared';

/**
 * Validate form data
 * @param model ZodSchema
 * @param data form data
 * @returns Promise<ServerResponseType>
 */
export async function validateForm<T>(model: ZodSchema<T>, data: T): Promise<DataRetrieval<T>> {
  const result = model.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const formattedError = JSON.stringify(result.error.format());
  return { success: false, message: formattedError };
}
