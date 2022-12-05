import {Box, Flex, Heading, Image, Pressable, Text} from "native-base";
import React from "react";
import Animated, {
    BounceInDown,
    BounceOutDown,
    FadeIn,
    FadeOut,
    Layout,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";
import {ProductProps} from "../../../types/ProductProps";
import {CartQuantity} from "./CartQuantity";
import {TrashButton} from "./TrashButton";
import {WishListButton} from "./WishListButton";

export const CheckoutCard = ({item}: {item: ProductProps["results"][0]}) => {
    return (
        <Animated.View
            entering={BounceInDown.duration(600).delay(300)}
            layout={Layout.springify()}>
            <Box
                rounded="lg"
                overflow="hidden"
                borderColor="primary.600"
                p={2}
                m={4}
                borderBottomWidth={"1"}>
                <Box w={"100%"} flexDirection={"row"}>
                    {item?.image && (
                        <Image
                            resizeMode="cover"
                            rounded="lg"
                            w={110}
                            h={110}
                            source={{uri: `${item?.image}`}}
                            alt="Picture of a Flower"
                        />
                    )}

                    <Box ml={3} w={"65%"} h={"100%"}>
                        <Heading size="sm" ml="-1" numberOfLines={2}>
                            {item?.product?.product_name}
                        </Heading>
                        <Text
                            fontSize="xs"
                            _light={{
                                color: "primary.500",
                            }}
                            _dark={{
                                color: "primary.400",
                            }}
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1">
                            {item?.product?.brand?.brand_name}
                        </Text>
                        <Text fontWeight="400" numberOfLines={1}>
                            {item?.product?.description}
                        </Text>
                        <Flex
                            direction="row"
                            width={"90%"}
                            alignItems={"center"}
                            mb={2}
                            justifyContent={"space-between"}>
                            <Icon name="star" size={18} />
                            <WishListButton clearId={item} />
                        </Flex>
                    </Box>
                </Box>
                <Box
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}>
                    <Text
                        color="coolGray.600"
                        _dark={{
                            color: "warmGray.200",
                        }}
                        fontWeight="400">
                        Rs.{item?.price}
                    </Text>
                    <Flex
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems={"center"}>
                        <Pressable
                            android_ripple={{
                                color: "#d52d3a",
                                borderless: true,
                                radius: 15,
                            }}
                            mr={4}>
                            <TrashButton clearId={item?.id} />
                        </Pressable>
                        <CartQuantity is_small={false} cartItems={item} />
                    </Flex>
                </Box>
            </Box>
        </Animated.View>
    );
};
