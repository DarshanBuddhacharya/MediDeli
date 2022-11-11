import { FormEvent } from "react";

export interface FormButtonProps {
    children: React.ReactNode;
    onPress: (e?: FormEvent<HTMLFormElement> | undefined) => void;

}