import {Box, Button, Pressable, Text} from "native-base";
import React from "react";
import {FormButtonProps} from "../../types/FormButtonProps";

export const FormButton = ({onPress, children}: FormButtonProps) => {
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
            <Text color={"white"} fontSize={18}>
                {children}
            </Text>
        </Pressable>
    );
};
