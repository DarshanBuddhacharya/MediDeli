import {Avatar, Box, Flex, Heading, Skeleton, Stack, Text} from "native-base";
import React from "react";
import {Image, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {ProductProps} from "../../types/ProductProps";
import CategoryCard from "../components/CategoryCard";
import {Container} from "../components/common/Container";
import SearchBar from "../components/common/SearchBar";
import Title from "../components/common/Title";
import {ItemCard} from "../components/ItemCard";
import {ProductSkeleton} from "../components/skeletons/ProductSkeleton";
import {useAppSelector} from "../features/hooks";
import {useCategory} from "../hooks/use-category";
import {useProduct} from "../hooks/use-products";

const HomeScreen = () => {
    const {loading: productLoading, data: productData} =
        useProduct<ProductProps>({query: "limit=8"});
    const {loading: categoryLoading, data: categoryData} = useCategory();

    const user = useAppSelector(state => state.auth.user);
    return (
        <Container>
            <ScrollView>
                <Flex
                    alignSelf="center"
                    justifyContent={"space-between"}
                    direction="row"
                    bg="primary.600"
                    shadow={2}
                    p={5}
                    rounded="xl"
                    width="100%"
                    display={"flex"}>
                    <Box _text={{color: "white"}}>
                        Hello There, {user?.user?.full_name}
                    </Box>
                    <Avatar
                        bg="green.500"
                        source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                        }}
                    />
                </Flex>

                <Title title={"Top Categories"} />

                <ScrollView horizontal={true}>
                    <Stack direction={"row"} mb="2.5" mt="1.5" space={3}>
                        {categoryLoading &&
                            Array.from({length: 4}).map((_, index) => (
                                <Skeleton
                                    h="100"
                                    w="90"
                                    rounded="lg"
                                    key={index}
                                />
                            ))}
                        {!categoryLoading &&
                            categoryData?.results?.map((data, index) => (
                                <CategoryCard key={index} data={data} />
                            ))}
                    </Stack>
                </ScrollView>
                <SearchBar />
                <Title title={"Recommended"} />
                <ScrollView horizontal={true}>
                    <Stack direction={"row"} mb="2.5" mt="1.5" space={1}>
                        {productLoading &&
                            Array.from({length: 4}).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))}
                        {!productLoading &&
                            productData?.results?.map((data, key) => (
                                <ItemCard data={data} key={key} />
                            ))}
                    </Stack>
                </ScrollView>
                <Flex
                    alignSelf="center"
                    justifyContent={"space-between"}
                    direction="row"
                    bg="primary.800"
                    shadow={2}
                    p={5}
                    rounded="xl"
                    width="100%"
                    display={"flex"}>
                    <Box _text={{color: "white"}}>
                        <Heading color={"white"} mb={3}>
                            MediDeli
                        </Heading>
                        <Flex direction="row" alignItems={"center"}>
                            <Icon name="storefront" color={"white"} size={19} />
                            <Text color={"white"} marginLeft={2}>
                                Test, test, Kathmandu
                            </Text>
                        </Flex>
                        <Flex direction="row" alignItems={"center"}>
                            <Icon
                                name="local-phone"
                                color={"white"}
                                size={19}
                            />
                            <Text color={"white"} marginLeft={2}>
                                +(977) 9846983685
                            </Text>
                        </Flex>
                        <Flex direction="row" alignItems={"center"}>
                            <Icon name="email" color={"white"} size={19} />
                            <Text color={"white"} marginLeft={2}>
                                mediDeli@gmail.com
                            </Text>
                        </Flex>
                    </Box>
                    <Image
                        source={require("../../assets/Images/logo.png")}
                        style={{width: 120, height: 120}}
                    />
                </Flex>
            </ScrollView>
        </Container>
    );
};

export default HomeScreen;
