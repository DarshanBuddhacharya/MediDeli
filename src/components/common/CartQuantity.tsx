import {Flex, Input, Pressable} from "native-base";
import React from "react";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

export const CartQuantity = () => {
    return (
        <Flex direction="row" alignItems="center">
            <Pressable
                android_ripple={{
                    color: "#d52d3a",
                    borderless: true,
                    radius: 25,
                }}
                bg={"primary.500"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={10}
                h={10}
                w={10}>
                <MatIcon name={"cart-minus"} size={24} color={"white"} />
            </Pressable>
            <Input
                w={50}
                mx={2}
                variant="Outline"
                placeholder="Filled"
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={18}
                keyboardType={"numeric"}
                value={"1"}
                textAlign="center"
            />
            <Pressable
                android_ripple={{
                    color: "#d52d3a",
                    borderless: true,
                    radius: 25,
                }}
                bg={"primary.500"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={10}
                h={10}
                w={10}>
                <MatIcon name={"cart-plus"} size={24} color={"white"} />
            </Pressable>
        </Flex>
    );
};
