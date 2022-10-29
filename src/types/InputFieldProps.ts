import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export interface InputFieldProps {
    label?: string;
    icon: string;
    placeHolder: string;
    onChangeText: (text: string) => void
    onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    value: string
    keyboardType?: KeyboardTypeOptions
    touch?: boolean;
    error?: string;
    maxLength?: number
};
