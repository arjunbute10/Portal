import { MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormContext } from "react-hook-form";

type MyTextFieldProps = {
    label: string,
    name: string,
    required?: boolean,
    placeholder?: string,
    type?: string,
    minLength?: number,
    maxLength?: number,
    disabled?: boolean,
    autocomplete?: string,
    multiline?: boolean,
    defaultValue?: any,
    variant?: 'standard' | 'outlined' | 'filled',
    size?: 'small' | 'medium',
    endAdornment?: JSX.Element, // For TextField
    startAdornment?: JSX.Element, // For TextField
    items?: Array<{ value: string, label: string }>, // For SelectField
    helperText?: boolean,
    shrink?: boolean,
}

export default function MyTextField({
    label,
    name,
    required,
    placeholder,
    multiline,
    autocomplete,
    type,
    disabled,
    defaultValue,
    variant,
    size,
    endAdornment,
    startAdornment,
    items,
    shrink,
    helperText = true
}: MyTextFieldProps) {

    const { register, formState: { errors } } = useFormContext();
    const Label = () => <>{label} {required && <span className='text-danger'>*</span>}</>;

    if (items) {
        return (
            <TextField
                label={<Label />}
                {...register(name)}
                variant={variant || 'outlined'}
                error={errors[name] ? true : false}
                placeholder={placeholder}
                autoComplete={autocomplete}
                helperText={errors[name] && helperText && (errors as any)[name].message}
                fullWidth
                defaultValue={defaultValue}
                multiline={multiline}
                size={size || 'small'}
                type={type || 'text'}
                disabled={disabled}
                select
            >
                {items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    }

    return (
        <TextField
            label={<Label />}
            {...register(name)}
            variant={variant || 'outlined'}
            error={errors[name] ? true : false}
            placeholder={placeholder}
            autoComplete={autocomplete}
            helperText={errors[name] && helperText && (errors as any)[name].message}
            fullWidth
            defaultValue={defaultValue}
            multiline={multiline}
            size={size || 'small'}
            type={type || 'text'}
            disabled={disabled}
            InputLabelProps={shrink ? { shrink: shrink } : undefined}
            InputProps={{
                startAdornment: startAdornment ? startAdornment : undefined,
                endAdornment: endAdornment ? endAdornment : undefined
            }} // For TextField
        />
    );
};