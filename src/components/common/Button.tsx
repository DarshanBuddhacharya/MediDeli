import {Box, Pressable, Text} from "native-base";
import React from "react";

const Button = ({children}: {children: React.ReactNode}) => {
    return (
        <Pressable
            android_ripple={{
                color: "#d52d3a",
                radius: 160,
            }}
            bg={"primary.500"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={10}
            mx={4}
            h={10}>
            <Text color={"white"}>{children}</Text>
        </Pressable>
    );
};

export default Button;
