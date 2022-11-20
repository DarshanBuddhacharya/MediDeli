import {Flex, Input, Pressable} from "native-base";
import React, {useEffect, useState} from "react";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import {addToCart, removeFromCart, addByCart} from "../../features/cartSlice";

export const CartQuantity = () => {
    const count = useAppSelector(state => state.cart.totalItems);
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
                isDisabled={count <= 1 ? true : false}
                _disabled={{bg: "primary.200"}}
                h={10}
                w={10}
                onPress={() => dispatch(removeFromCart())}>
                <MatIcon name={"cart-minus"} size={24} color={"white"} />
            </Pressable>
            <Input
                w={50}
                mx={2}
                variant="Outline"
                placeholder={count.toString()}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={18}
                keyboardType={"numeric"}
                onChange={e =>
                    parseInt(e.nativeEvent.text) <= 0 ||
                    isNaN(parseInt(e.nativeEvent.text))
                        ? 1
                        : parseInt(e.nativeEvent.text)
                }
                onEndEditing={e =>
                    dispatch(
                        addByCart(
                            parseInt(e.nativeEvent.text) <= 0 ||
                                isNaN(parseInt(e.nativeEvent.text))
                                ? 1
                                : parseInt(e.nativeEvent.text),
                        ),
                    )
                }
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
                w={10}
                onPress={() => dispatch(addToCart())}>
                <MatIcon name={"cart-plus"} size={24} color={"white"} />
            </Pressable>
        </Flex>
    );
};
