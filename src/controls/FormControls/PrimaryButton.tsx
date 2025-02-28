import { LoadingButton } from "@mui/lab";
import Button, { ButtonProps } from "@mui/material/Button";

export type PrimaryButtonProps = Omit<ButtonProps, 'ref'> & {
  label: string;
  fullwidth?: boolean;
  loading?: boolean,
  loadingPosition?: 'start' | 'end' | 'center',
};

const PrimaryButton = (props: PrimaryButtonProps) => {
  const {
    color = 'primary',
    label,
    variant = 'contained',
    fullwidth = true,
    type = 'submit',
    size = 'large',
    style,
    loading = false,
    loadingPosition = 'end',
    startIcon,
    key,
    disabled = false,
    ...otherProps
  } = props;

  return (
    <>
      {!loading ?
        <Button
          color={color}
          variant={variant}
          type={type}
          size={size}
          fullWidth={fullwidth}
          style={style}
          key={key}
          disabled={disabled}
          {...otherProps}
        >{label}</Button>
        :
        <LoadingButton
          color={color}
          variant={variant}
          type={type}
          size={size}
          fullWidth={fullwidth}
          loading={loading}
          style={style}
          key={key}
          loadingPosition={loadingPosition}
          startIcon={startIcon}
          disabled={disabled}
          {...otherProps}
        >{label}</LoadingButton>
      }
    </>

  );
};

export default PrimaryButton;