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
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {Container} from "../components/common/Container";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../components/common/Button";
import ReviewCard from "../components/common/ReviewCard";

const DetailScreen = () => {
    return (
        <Container>
            <ScrollView>
                <Box
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1">
                    <AspectRatio ratio={1}>
                        <Image
                            resizeMode="cover"
                            source={{
                                uri: "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                            }}
                            alt="Picture of a Flower"
                        />
                    </AspectRatio>
                    <Stack p="4" space={3}>
                        <Flex
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}>
                            <Heading size="md" ml="-1">
                                Ceatamol
                            </Heading>
                            <Icon
                                name="heart-outline"
                                size={25}
                                color={"red"}
                            />
                        </Flex>

                        <Text
                            fontSize="sm"
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
                        <Text fontWeight="400">Description</Text>
                        <Text fontSize={15} fontWeight="200">
                            Vicks has always been a family of brands for your
                            entire family. Originally named “Vicks Family
                            Remedies” our most sought after product was Croup &
                            Pneumonia Salve. Later named VapoRub, it was created
                            by Lunsford Richardson out of love and concern for
                            his sick son.
                        </Text>
                        <Text fontWeight="400">Prescribed For</Text>
                        <Text fontSize={15} fontWeight="200">
                            Headache, Vomit
                        </Text>
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
                            Rs.400
                        </Text>
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
                                <MatIcon
                                    name={"cart-minus"}
                                    size={24}
                                    color={"white"}
                                />
                            </Pressable>
                            <Input
                                w={60}
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
                                <MatIcon
                                    name={"cart-plus"}
                                    size={24}
                                    color={"white"}
                                />
                            </Pressable>
                        </Flex>
                    </Flex>
                    <Button>Buy Now</Button>
                    <Box p={4}>
                        <Text fontWeight="400">Reviews</Text>
                        <ReviewCard />
                    </Box>
                </Box>
            </ScrollView>
        </Container>
    );
};

export default DetailScreen;
