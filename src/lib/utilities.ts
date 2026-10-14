export const normalizedString = (string: string) => string.trim().toLowerCase();

export const errorResponse = <T>(errorMessage: T): { message: T } => ({
  message: errorMessage,
});
