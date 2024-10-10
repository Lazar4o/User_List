import React, { memo } from 'react';
import { Text, TextField, TextFieldProps, View } from 'react-native-ui-lib';
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
  label: string;
  rules?: object;
  multiline?: boolean;
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
  label,
  rules = {},
  errorMessage,
  multiline = true,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View marginB-10>
          <TextField
            multiline={multiline}
            numberOfLines={1}
            label={label}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={!!errorMessage}
            // @TODO: Extract style into a reusable utility
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 10,
            }}
            {...rest}
          />
          {errorMessage && (
            <Text color={'red'}>
              {errorMessage && typeof errorMessage === 'string'
                ? errorMessage
                : (errorMessage as FieldError)?.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default memo(ControlledTextField);
