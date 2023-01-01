import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export interface RadioGroupProps {
    label?: string;
    onChange: (text: string) => void
    value: string
    onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    keyboardType?: KeyboardTypeOptions
    name: string
    touch?: boolean;
    error?: string;
    maxLength?: number
};
