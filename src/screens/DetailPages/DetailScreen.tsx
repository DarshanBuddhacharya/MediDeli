import {
    AspectRatio,
    Box,
    FlatList,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    Pressable,
    ScrollView,
    Stack,
    Text,
    View,
} from "native-base";
import React, {useRef, useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../components/common/Button";
import ReviewCard from "../../components/common/ReviewCard";
import {CartQuantity} from "../../components/common/CartQuantity";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useRoute} from "@react-navigation/native";
import {useProduct} from "../../hooks/use-products";
import {ProductProps} from "../../../types/ProductProps";
import {Animated, Dimensions, StyleSheet} from "react-native";
import {CrossBtn} from "../../components/common/CrossBtn";
import {SharedElement} from "react-navigation-shared-element";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import {change} from "../../features/wishListSlice";

type RootStackParamList = {
    DetailScreen: {productData: ProductProps["results"][0]};
};

type Props = NativeStackScreenProps<
    RootStackParamList,
    "DetailScreen"
>["route"];

const lata = [
    "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
];

const DetailScreen = () => {
    //fetching routes
    const route = useRoute<Props>();
    const productData = route.params.productData;

    const {product, price, id, image} = productData;

    const {product_name, description, brand} = product;

    const {width, height} = Dimensions.get("screen");

    const scrollX = useRef(new Animated.Value(0)).current;

    const [read, setRead] = useState(true);

    const dispatch = useAppDispatch();

    const wishlistItems = useAppSelector(state => state.wishList.wishlistItems);

    return (
        <>
            {/* <View h={height} style={StyleSheet.absoluteFillObject}>
                {lata.map((image, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ];

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                    });
                    return (
                        <Animated.Image
                            key={`image-${index}`}
                            source={{uri: image}}
                            style={[StyleSheet.absoluteFillObject, {opacity}]}
                            blurRadius={80}
                        />
                    );
                })}
            </View> */}
            <ScrollView
                style={{
                    shadowColor: "#000",
                    shadowOpacity: 1,
                    shadowOffset: {width: 0, height: 0},
                    shadowRadius: 20,
                }}>
                <CrossBtn with_back />
                {/* <Animated.FlatList
                    data={lata}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: true},
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    renderItem={({item}) => {
                        return (
                            <Box
                                w={width}
                                justifyContent="center"
                                px={4}
                                alignItems={"center"}>
                                <SharedElement id={`product.${id}.image`}>
                                    <Image
                                        source={{
                                            uri: item,
                                        }}
                                        alt="img"
                                        resizeMode="cover"
                                        width={width - 8}
                                        height={350}
                                    />
                                </SharedElement>
                            </Box>
                        );
                    }}
                /> */}
                <Box
                    w={width}
                    justifyContent="center"
                    px={4}
                    mt={2}
                    alignItems={"center"}>
                    <SharedElement id={`product.${id}.image`}>
                        <Image
                            source={{
                                uri: image,
                            }}
                            alt="img"
                            resizeMode="cover"
                            width={width - 8}
                            height={350}
                        />
                    </SharedElement>
                </Box>
                <Box background={"white"} rounded="xl" mx={2} mb={100}>
                    <Stack p="4" space={3}>
                        <Flex
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}>
                            <SharedElement id={`product.${id}.title`}>
                                <Heading size="md" width={300}>
                                    {product_name}
                                </Heading>
                            </SharedElement>
                            <SharedElement id={`product.${id}.wishlist`}>
                                <Pressable
                                    onPress={() =>
                                        dispatch(change(productData))
                                    }
                                    android_ripple={{
                                        color: "#fde3e5",
                                        borderless: true,
                                    }}>
                                    {wishlistItems.find(
                                        item => item.id === id,
                                    ) ? (
                                        <Icon
                                            name="heart"
                                            size={24}
                                            color={"red"}
                                        />
                                    ) : (
                                        <Icon
                                            name="heart-outline"
                                            size={24}
                                            color={"red"}
                                        />
                                    )}
                                </Pressable>
                            </SharedElement>
                        </Flex>
                        <SharedElement id={`product.${id}.brand`}>
                            <Text
                                fontSize="md"
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
                        <Text fontWeight="400">Description</Text>
                        <Pressable onPress={() => setRead(!read)}>
                            <SharedElement id={`product.${id}.desc`}>
                                <Text
                                    fontSize={15}
                                    fontWeight="200"
                                    numberOfLines={read ? 4 : 0}>
                                    {description}
                                </Text>
                            </SharedElement>
                            <Text color={"primary.500"} fontWeight="400">
                                {read ? "Read More" : "Show less"}
                            </Text>
                        </Pressable>
                    </Stack>
                    <Flex
                        direction="row"
                        alignItems="center"
                        justifyContent={"space-between"}
                        p="4">
                        <SharedElement id={`product.${id}.price`}>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400">
                                Rs.{price}
                            </Text>
                        </SharedElement>
                        {productData && (
                            <CartQuantity
                                cartItems={productData}
                                is_small={false}
                            />
                        )}
                    </Flex>
                    <Button link={"Checkout"}>Buy Now</Button>
                    <Box p={4}>
                        <Text fontWeight="400">Reviews</Text>
                        <ReviewCard />
                        <ReviewCard />
                    </Box>
                </Box>
            </ScrollView>
        </>
    );
};

export default DetailScreen;
