import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export interface DateFieldProps {
    label?: string;
    onChange: (text: Date) => void
    onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    keyboardType?: KeyboardTypeOptions
    name: string
    value: Date
    touch?: boolean;
    error?: string;
    maxLength?: number
};