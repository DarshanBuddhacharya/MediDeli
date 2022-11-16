import {
    AspectRatio,
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    Pressable,
    ScrollView,
    Stack,
    Text,
} from "native-base";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {Container} from "../../components/common/Container";
import Button from "../../components/common/Button";
import ReviewCard from "../../components/common/ReviewCard";
import {CartQuantity} from "../../components/common/CartQuantity";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useRoute} from "@react-navigation/native";
import {useProduct} from "../../hooks/use-products";
import {ProductProps} from "../../../types/ProductProps";

type RootStackParamList = {
    DetailScreen: {productId: string};
};

type Props = NativeStackScreenProps<
    RootStackParamList,
    "DetailScreen"
>["route"];

const DetailScreen = () => {
    //fetching routes
    const route = useRoute<Props>();
    const productId = route.params.productId;

    const {data, loading} = useProduct<ProductProps["results"][0]>(productId);

    const [read, setRead] = useState(true);

    return (
        <Container>
            <ScrollView>
                <Box
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1">
                    <AspectRatio ratio={1}>
                        {data?.image && (
                            <Image
                                resizeMode="cover"
                                source={{uri: `${data?.image}`}}
                                alt="Picture of Product"
                            />
                        )}
                    </AspectRatio>
                    <Stack p="4" space={3}>
                        <Flex
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}>
                            <Heading size="md" width={300}>
                                {data?.product?.product_name}
                            </Heading>
                            <Icon
                                name="heart-outline"
                                size={25}
                                color={"red"}
                            />
                        </Flex>

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
                            {data?.product?.brand?.brand_name}
                        </Text>
                        <Text fontWeight="400">Description</Text>
                        <Pressable onPress={() => setRead(!read)}>
                            <Text
                                fontSize={15}
                                fontWeight="200"
                                numberOfLines={read ? 4 : 0}>
                                {data?.product?.description}
                            </Text>
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
                        <Text
                            color="coolGray.600"
                            _dark={{
                                color: "warmGray.200",
                            }}
                            fontWeight="400">
                            Rs.{data?.price}
                        </Text>
                        <CartQuantity />
                    </Flex>
                    <Button link={"Checkout"}>Buy Now</Button>
                    <Box p={4}>
                        <Text fontWeight="400">Reviews</Text>
                        <ReviewCard />
                        <ReviewCard />
                    </Box>
                </Box>
            </ScrollView>
        </Container>
    );
};

export default DetailScreen;
