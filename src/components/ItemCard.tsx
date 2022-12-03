import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
    AspectRatio,
    Box,
    Center,
    Flex,
    Heading,
    HStack,
    Image,
    Pressable,
    Spacer,
    Stack,
    Text,
} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {ProductProps} from "../../types/ProductProps";
import {useAppDispatch, useAppSelector} from "../features/hooks";
import {change} from "../features/wishListSlice";
import {CartQuantity} from "./common/CartQuantity";

export type RootStackParamList = {
    DetailScreen: {productId: string};
};

export const ItemCard = ({data}: {data: ProductProps["results"][0]}) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const dispatch = useAppDispatch();

    const wishlistItems = useAppSelector(state => state.wishList.wishlistItems);

    return (
        <Box mb={2} mr={1}>
            <Box
                w={180}
                rounded="lg"
                overflow="hidden"
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
                            productId: data?.id,
                        })
                    }>
                    {data?.image && (
                        <Box w={"100%"} justifyContent="center">
                            <Image
                                h={160}
                                resizeMode="contain"
                                source={{uri: `${data.image}`}}
                                alt={data.image}
                                background="white"
                            />
                        </Box>
                    )}
                </Pressable>
                <Stack p="4" space={3}>
                    <Pressable
                        onPress={() =>
                            navigation.navigate("DetailScreen", {
                                productId: data?.id,
                            })
                        }
                        android_ripple={{
                            color: "#fde3e5",
                            radius: 150,
                            borderless: true,
                        }}>
                        <Stack space={2}>
                            <Heading size="sm" ml="-1" numberOfLines={2}>
                                {data?.product?.product_name}
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
                                {data?.product?.brand?.brand_name}
                            </Text>
                            <Text fontWeight="400" numberOfLines={2}>
                                {data?.product?.description}
                            </Text>
                        </Stack>
                        <Flex
                            direction="row"
                            alignItems="center"
                            justifyContent={"space-between"}>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400">
                                Rs. {data?.price}
                            </Text>
                        </Flex>
                    </Pressable>
                    <HStack
                        space={1}
                        alignItems="center"
                        justifyContent={"space-between"}>
                        <Pressable
                            onPress={() => dispatch(change(data))}
                            android_ripple={{
                                color: "#fde3e5",
                                borderless: true,
                            }}>
                            {wishlistItems.find(item => item.id === data.id) ? (
                                <Icon name="heart" size={20} color={"red"} />
                            ) : (
                                <Icon
                                    name="heart-outline"
                                    size={20}
                                    color={"red"}
                                />
                            )}
                        </Pressable>
                        <CartQuantity is_small cartItems={data} />
                    </HStack>
                </Stack>
            </Box>
        </Box>
    );
};
