import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextArea = Input;

  if(textarea){
     InputOrTextArea = Input
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{!!label}</FormLabel>
      <InputOrTextArea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
