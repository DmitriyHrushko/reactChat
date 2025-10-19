import { TextField, type TextFieldProps } from '@mui/material';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
	name: Path<T>;
	control: Control<T>;
	label: string;
}

export function FormField<T extends FieldValues>({ name, control, label, ...textFieldProps }: FormFieldProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					{...textFieldProps}
					label={label}
					error={!!error}
					helperText={error?.message || textFieldProps.helperText}
					fullWidth
					value={field.value ?? ''}
				/>
			)}
		/>
	);
}
