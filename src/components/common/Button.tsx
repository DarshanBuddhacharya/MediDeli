import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Box, Pressable, Text} from "native-base";
import React from "react";

const Button = ({
    children,
    link,
}: {
    children: React.ReactNode;
    link: string;
}) => {
    const navigation: any = useNavigation();
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
            h={10}
            onPress={() => navigation.push(link)}>
            <Text color={"white"} px={3}>
                {children}
            </Text>
        </Pressable>
    );
};

export default Button;
