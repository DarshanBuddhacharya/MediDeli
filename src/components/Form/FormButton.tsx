import {HStack, Heading, Pressable, Spinner, Text} from "native-base";
import React from "react";
import {FormButtonProps} from "../../../types/FormButtonProps";

export const FormButton = ({
    onPress,
    children,
    isSubmitting,
}: FormButtonProps) => {
    return (
        <Pressable
            bg={"primary.600"}
            mt={3}
            w={"100%"}
            h={10}
            borderRadius={5}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
            android_ripple={{color: "primary.600"}}
            onPress={onPress}>
            {isSubmitting ? (
                <HStack space={2} justifyContent="center">
                    <Spinner
                        color={"white"}
                        accessibilityLabel="Loading posts"
                    />
                    <Heading color="white" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
            ) : (
                <Text color={"white"} fontSize={18}>
                    {children}
                </Text>
            )}
        </Pressable>
    );
};
