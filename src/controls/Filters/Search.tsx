import React, { useCallback, useMemo } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.keyCode === 35 || e.keyCode === 36 || e.keyCode === 37 || e.keyCode === 39) {
    e.stopPropagation();
  }
};

export type SearchBoxProps = Omit<TextFieldProps, 'onKeyDown'> & {
  setValue?: (newValue: any) => void;
  endAdornment?: JSX.Element, // For TextField
  startAdornment?: JSX.Element, // For TextField
};

function SearchBox(props: SearchBoxProps) {
  const {
    name,
    value,
    setValue,
    onChange: onChangeProp,
    size,
    fullWidth,
    placeholder,
    endAdornment,
    startAdornment,
    ...otherProps
  } = props;

  const onChange = useCallback((e: any) => {
    if (setValue)
      setValue(e.target.value);
    if (onChangeProp) {
      onChangeProp(e.nativeEvent);
    }
  }, [setValue, onChangeProp]);

  return (
    <TextField
      name={name}
      fullWidth={fullWidth}
      size={size}
      value={value}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      InputProps={{
        startAdornment: startAdornment ? startAdornment : undefined,
        endAdornment: endAdornment && value ? endAdornment : undefined
      }} // For TextField
      {...otherProps}
      onChange={onChange}
    />
  );
}


export default SearchBox;



