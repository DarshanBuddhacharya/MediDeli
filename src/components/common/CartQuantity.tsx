import {Flex, Input, Pressable} from "native-base";
import React, {useEffect, useState} from "react";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import {add, remove} from "../../features/cartSlice";
import {useCart} from "../../hooks/use-cart";
import {ProductProps} from "../../../types/ProductProps";

type QuantityHandlerProps = {
    handle: "add" | "remove" | "update";
    id: string;
};

type CartQuantityProps = {
    is_small: boolean;
    cartItems: ProductProps["results"][0];
};

export const CartQuantity = ({is_small, cartItems}: CartQuantityProps) => {
    const dispatch = useAppDispatch();

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
                isDisabled={cartItems.amount <= 1 ? true : false}
                _disabled={{bg: "primary.200"}}
                h={is_small ? 8 : 10}
                w={is_small ? 8 : 10}
                onPress={() => dispatch(remove(cartItems))}>
                <MatIcon
                    name={"cart-minus"}
                    size={is_small ? 18 : 24}
                    color={"white"}
                />
            </Pressable>
            <Input
                w={is_small ? 12 : 50}
                mx={is_small ? 0 : 2}
                variant="Outline"
                placeholder={cartItems?.amount?.toString()}
                value={cartItems?.amount?.toString()}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={is_small ? 16 : 18}
                keyboardType={"numeric"}
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
                onPress={() => dispatch(add(cartItems))}
                borderRadius={10}
                h={is_small ? 8 : 10}
                w={is_small ? 8 : 10}>
                <MatIcon
                    name={"cart-plus"}
                    size={is_small ? 18 : 24}
                    color={"white"}
                />
            </Pressable>
        </Flex>
    );
};
