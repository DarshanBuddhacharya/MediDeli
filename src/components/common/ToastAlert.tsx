import {Alert, VStack, HStack, CloseIcon, IconButton, Text} from "native-base";
import {useAppDispatch} from "../../features/hooks";
import {reset} from "../../features/auth/authSlice";
import {ResponsiveValue} from "native-base/lib/typescript/components/types";

export interface ToastAlertProps {
    status: "info" | (string & {}) | "error" | "success" | "warning";
    variant?: ResponsiveValue<
        | "subtle"
        | "solid"
        | "outline"
        | "left-accent"
        | "top-accent"
        | "outline-light"
        | (string & {})
    >;
    title: string;
    description: string;
}

export const ToastAlert = ({
    status,
    variant,
    title,
    description,
    ...rest
}: ToastAlertProps) => {
    const dispatch = useAppDispatch();
    return (
        <Alert
            maxWidth="100%"
            alignSelf="center"
            flexDirection="row"
            status={status ? status : "info"}
            variant={variant}
            {...rest}>
            <VStack space={1} flexShrink={1} w="100%">
                <HStack
                    flexShrink={1}
                    alignItems="center"
                    justifyContent="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text
                            fontSize="md"
                            fontWeight="medium"
                            flexShrink={1}
                            color={
                                variant === "solid"
                                    ? "lightText"
                                    : variant !== "outline"
                                    ? "darkText"
                                    : null
                            }>
                            {title}
                        </Text>
                    </HStack>
                    <IconButton
                        variant="unstyled"
                        icon={<CloseIcon size="3" />}
                        _icon={{
                            color:
                                variant === "solid" ? "lightText" : "darkText",
                        }}
                        onPress={() => dispatch(reset())}
                    />
                </HStack>
                <Text
                    px="6"
                    color={
                        variant === "solid"
                            ? "lightText"
                            : variant !== "outline"
                            ? "darkText"
                            : null
                    }>
                    {description}
                </Text>
            </VStack>
        </Alert>
    );
};
