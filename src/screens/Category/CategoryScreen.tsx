import {useRoute} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Box, Flex, Heading, Image, ScrollView, Text, View} from "native-base";
import React from "react";
import {CrossBtn} from "../../components/common/CrossBtn";
import {Container} from "../../components/common/Container";
import {useCategoryDetail} from "../../hooks/use-category-detail";
import {NavList} from "../../components/Settings/NavList";

type RootStackParamList = {
    CategoryScreen: {categoryId: string};
};

type CategoryNavigationProps = NativeStackScreenProps<
    RootStackParamList,
    "CategoryScreen"
>["route"];

const CategoryScreen = () => {
    const route = useRoute<CategoryNavigationProps>();
    const categoryId = route.params.categoryId;

    const {data, loading} = useCategoryDetail(categoryId);

    const {child, color, icon, name} = data ?? {};
    return (
        <ScrollView bg={color}>
            <Container>
                <CrossBtn />
                <Heading color={"#DEE2E6"} mb={2}>
                    {name}
                </Heading>
                <Text noOfLines={2} color={"white"} fontSize={16}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Culpa, dolorem?
                </Text>
                <Box alignSelf={"center"}>
                    <Image
                        source={{uri: icon}}
                        style={{width: 150, height: 150}}
                        mt={5}
                        alt="category-image"
                    />
                </Box>
                <View mt={4}>
                    {child &&
                        child.map((item, key) => (
                            <Box
                                key={key}
                                flexDirection={"row"}
                                alignItems={"center"}
                                bg={"white"}
                                rounded="md"
                                shadow={8}
                                p={3}
                                mb={2}>
                                <Image
                                    source={{uri: icon}}
                                    style={{width: 50, height: 50}}
                                    alt="category-image"
                                />
                                <Flex ml={3}>
                                    <Text fontSize={18}>{item.name}</Text>
                                    <Text noOfLines={2} fontSize={14}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Culpa, dolorem?
                                    </Text>
                                </Flex>
                            </Box>
                        ))}
                </View>
            </Container>
        </ScrollView>
    );
};

export default CategoryScreen;
