import {
    AspectRatio,
    Box,
    Center,
    Flex,
    Heading,
    HStack,
    Image,
    Spacer,
    Stack,
    Text,
} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export const ItemCard = () => {
    return (
        <Box>
            <Box
                maxWidth={190}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1">
                <Box w={170}>
                    <AspectRatio ratio={1}>
                        <Image
                            resizeMode="cover"
                            source={{
                                uri: "https://media.istockphoto.com/photos/buying-convenient-food-picture-id1371981344",
                            }}
                            alt="Picture of a Flower"
                        />
                    </AspectRatio>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
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
                            Beauty
                        </Text>
                        <Text fontWeight="400">
                            Bengaluru (also called Bangalore)
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
                            Rs.400
                        </Text>
                        <HStack space={1} alignItems="center">
                            <Icon
                                name="heart-outline"
                                size={20}
                                color={"red"}
                            />
                            <Icon name="cart-outline" size={20} color={"red"} />
                        </HStack>
                    </Flex>
                </Stack>
            </Box>
        </Box>
    );
};
