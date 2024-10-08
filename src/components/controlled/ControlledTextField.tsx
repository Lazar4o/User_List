import React, { memo } from 'react';
import { TextField, TextFieldProps } from 'react-native-ui-lib';
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

interface ControlledTextFieldProps
  extends Omit<TextFieldProps, 'errorMessage'> {
  name: string;
  control: any;
  defaultValue?: string;
  placeholder: string;
  rules?: object;
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
  name,
  control,
  defaultValue = '',
  placeholder,
  rules = {},
  errorMessage,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          errorMessage={!!errorMessage}
          {...rest}
        />
      )}
    />
  );
};

export default ControlledTextField;
