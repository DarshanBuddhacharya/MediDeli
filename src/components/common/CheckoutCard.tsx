import {Box, Flex, Heading, Image, Pressable, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {CartQuantity} from "./CartQuantity";
import {Container} from "./Container";
import {TrashButton} from "./TrashButton";
import {WishListButton} from "./WishListButton";

export const CheckoutCard = () => {
    return (
        <Box
            rounded="lg"
            overflow="hidden"
            borderColor="primary.600"
            p={2}
            m={4}
            borderBottomWidth={"1"}>
            <Box w={"100%"} flexDirection={"row"}>
                <Image
                    resizeMode="cover"
                    rounded="lg"
                    w={110}
                    h={110}
                    source={{
                        uri: "https://media.istockphoto.com/photos/buying-convenient-food-picture-id1371981344",
                    }}
                    alt="Picture of a Flower"
                />
                <Box ml={3} w={"65%"} h={"100%"}>
                    <Heading size="sm" ml="-1">
                        The Garden City
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
                        Mama Earth
                    </Text>
                    <Text fontWeight="400">
                        {`Lorem ipsum dolor sit amet consectetu`}
                    </Text>
                    <Flex
                        direction="row"
                        width={"90%"}
                        alignItems={"center"}
                        mb={2}
                        justifyContent={"space-between"}>
                        <Icon name="star" size={18} />
                        <WishListButton />
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
                    Rs.400
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
                        <TrashButton />
                    </Pressable>
                    <CartQuantity />
                </Flex>
            </Box>
        </Box>
    );
};
