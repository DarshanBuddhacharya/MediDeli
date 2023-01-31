import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    Pressable,
    Stack,
    Text,
} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {ProductProps} from "../../types/ProductProps";
import {useAppDispatch, useAppSelector} from "../features/hooks";
import {change} from "../features/wishListSlice";
import {AddRemoveBtn} from "./common/AddRemoveBtn";
import {SharedElement} from "react-navigation-shared-element";

export type RootStackParamList = {
    DetailScreen: {productData: ProductProps["results"][0]};
};

export const ItemCard = ({data}: {data: ProductProps["results"][0]}) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const dispatch = useAppDispatch();

    const wishlistItems = useAppSelector(state => state.wishList.wishlistItems);

    const {id, image, product, price} = data;

    const {product_name, brand, description} = product;

    return (
        <Box
            w={170}
            rounded="lg"
            overflow="hidden"
            mb={3}
            backgroundColor={"white"}
            shadow={3}
            borderColor="coolGray.200"
            borderWidth="1">
            <Pressable
                android_ripple={{
                    color: "#fde3e5",
                    radius: 300,
                    borderless: true,
                }}
                onPress={() =>
                    navigation.navigate("DetailScreen", {
                        productData: data,
                    })
                }>
                {image && (
                    <Box w={"100%"} justifyContent="center">
                        <SharedElement id={`product.${id}.image`}>
                            <Image
                                h={160}
                                resizeMode="contain"
                                source={{uri: `${image}`}}
                                alt={image}
                                background="white"
                            />
                        </SharedElement>
                    </Box>
                )}
            </Pressable>
            <Stack p="4" space={3}>
                <Pressable
                    onPress={() =>
                        navigation.navigate("DetailScreen", {
                            productData: data,
                        })
                    }
                    android_ripple={{
                        color: "#fde3e5",
                        radius: 150,
                        borderless: true,
                    }}>
                    <Stack space={2}>
                        <SharedElement id={`product.${id}.title`}>
                            <Heading size="sm" ml="-1" numberOfLines={2}>
                                {product_name}
                            </Heading>
                        </SharedElement>
                        <SharedElement id={`product.${id}.brand`}>
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
                                {brand?.brand_name}
                            </Text>
                        </SharedElement>
                        <SharedElement id={`product.${id}.desc`}>
                            <Text fontWeight="400" numberOfLines={2}>
                                {description}
                            </Text>
                        </SharedElement>
                    </Stack>
                    <Flex
                        direction="row"
                        alignItems="center"
                        justifyContent={"space-between"}>
                        <SharedElement id={`product.${id}.price`}>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400">
                                Rs. {price}
                            </Text>
                        </SharedElement>
                    </Flex>
                </Pressable>
                <HStack
                    space={2}
                    alignItems="center"
                    justifyContent={"space-between"}>
                    <SharedElement id={`product.${id}.wishlist`}>
                        <Pressable
                            onPress={() => dispatch(change(data))}
                            android_ripple={{
                                color: "#fde3e5",
                                borderless: true,
                            }}>
                            {wishlistItems.find(item => item.id === id) ? (
                                <Icon name="heart" size={20} color={"red"} />
                            ) : (
                                <Icon
                                    name="heart-outline"
                                    size={20}
                                    color={"red"}
                                />
                            )}
                        </Pressable>
                    </SharedElement>
                    <AddRemoveBtn is_small cartItems={data} />
                </HStack>
            </Stack>
        </Box>
    );
};
