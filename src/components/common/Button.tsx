import {useNavigation} from "@react-navigation/native";
import {Pressable, Text} from "native-base";
import {InterfacePressableProps} from "native-base/lib/typescript/components/primitives/Pressable/types";
import React from "react";

const Button = ({
    children,
    link,
    ...rest
}: {
    children: React.ReactNode;
    link?: string;
} & InterfacePressableProps) => {
    const navigation: any = useNavigation();
    return (
        <Pressable
            {...rest}
            android_ripple={{
                color: "#d52d3a",
                radius: 160,
            }}
            bg={"primary.500"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={10}
            mx={4}
            h={10}
            onPress={() => navigation.push(link)}>
            <Text color={"white"} px={3}>
                {children}
            </Text>
        </Pressable>
    );
};

export default Button;
