import {Flex, Input, Pressable} from "native-base";
import React, {useEffect, useState} from "react";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import {add, clearById, remove, update} from "../../features/cartSlice";
import {ProductProps} from "../../../types/ProductProps";
import Animated, {
    BounceInRight,
    BounceOutRight,
    Layout,
} from "react-native-reanimated";

type CartQuantityProps = {
    is_small: boolean;
    cartItems: ProductProps["results"][0];
};

export const AddRemoveBtn = ({is_small, cartItems}: CartQuantityProps) => {
    const dispatch = useAppDispatch();

    const [cartQuantity, setCartQuantity] = useState<number>();

    const cart = useAppSelector(state => state.cart.cartItems);

    const singleCart = cart?.find(item => item.id === cartItems.id);

    useEffect(() => {
        setCartQuantity(singleCart?.amount);
    }, [singleCart?.amount]);

    const handleQuantityChange = () => {
        dispatch(update({cart: cartItems, quantity: cartQuantity}));
    };

    return (
        <Flex direction="row" alignItems="center" h={10}>
            {singleCart && singleCart?.amount >= 0 && (
                <Animated.View
                    entering={BounceInRight.duration(900)}
                    exiting={BounceOutRight.duration(900)}
                    layout={Layout.springify()}>
                    <Flex direction="row" alignItems="center" h={10}>
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
                            h={is_small ? 8 : 10}
                            w={is_small ? 8 : 10}
                            onPress={() =>
                                singleCart?.amount > 1
                                    ? dispatch(remove(cartItems))
                                    : dispatch(clearById(singleCart?.id))
                            }>
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
                            value={singleCart.amount.toString()}
                            onChange={e => {
                                e.nativeEvent.text &&
                                    setCartQuantity(
                                        parseInt(e.nativeEvent.text),
                                    );
                                handleQuantityChange();
                            }}
                            // onEndEditing={e => {
                            //     handleQuantityChange();
                            // }}
                            alignItems={"center"}
                            justifyContent={"center"}
                            fontSize={is_small ? 16 : 18}
                            keyboardType={"numeric"}
                            textAlign="center"
                        />
                    </Flex>
                </Animated.View>
            )}
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
