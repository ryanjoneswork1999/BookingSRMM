
import { FieldErrors } from "../generated/graphql";
export const bookingFieldError = (errors: FieldErrors[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
