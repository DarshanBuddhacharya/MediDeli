import {useRoute} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {
    Avatar,
    Box,
    FlatList,
    Flex,
    HStack,
    Heading,
    Image,
    ScrollView,
    Text,
    VStack,
    View,
} from "native-base";
import React, {useState} from "react";
import {CrossBtn} from "../../components/common/CrossBtn";
import {Container} from "../../components/common/Container";
import {useCategoryDetail} from "../../hooks/use-category-detail";
import {SharedElement} from "react-navigation-shared-element";
import {CategoryDetialProps} from "../../../types/CategoryDetialProps";
import {StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
    BounceIn,
    FadeIn,
    Layout,
    StretchInX,
    ZoomInLeft,
    ZoomInRight,
} from "react-native-reanimated";
import {ItemCard} from "../../components/ItemCard";
import {ProductProps} from "../../../types/ProductProps";
import {axiosClient} from "../../utils/axiosClient";
import urls from "../../../constants/urls";
import {ProductSkeleton} from "../../components/skeletons/ProductSkeleton";

type RootStackParamList = {
    CategoryScreen: {data: CategoryDetialProps};
};

type CategoryNavigationProps = NativeStackScreenProps<
    RootStackParamList,
    "CategoryScreen"
>["route"];

const CategoryScreen = () => {
    const route = useRoute<CategoryNavigationProps>();
    const {data} = route.params;

    const {data: forChild, loading} = useCategoryDetail(data.id);

    const {color, icon, name, id} = data ?? {};

    const {child, product} = forChild ?? {};

    const [selectedTab, setSelectedTab] = useState("");

    const {data: subCategory, loading: subLoading} =
        useCategoryDetail(selectedTab);

    return (
        <>
            <SharedElement
                id={`category.${id}.bg`}
                style={StyleSheet.absoluteFillObject}>
                <Animated.View
                    entering={FadeIn.duration(300)}
                    style={[
                        StyleSheet.absoluteFillObject,
                        {backgroundColor: color},
                    ]}
                />
            </SharedElement>
            <ScrollView>
                <Container>
                    <CrossBtn />
                    <SharedElement id={`category.${id}.title`}>
                        <Heading
                            fontSize={"24"}
                            mb={2}
                            color={"white"}
                            alignItems={"flex-start"}>
                            {name}
                        </Heading>
                    </SharedElement>
                    <SharedElement id={`category.${id}.desc`}>
                        <Text
                            noOfLines={2}
                            adjustsFontSizeToFit
                            color={"white"}
                            alignSelf={"flex-start"}
                            fontSize={16}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Culpa, dolorem?
                        </Text>
                    </SharedElement>
                    <Box alignSelf={"center"} mt={8}>
                        <SharedElement id={`category.${id}.image`}>
                            <Image
                                source={{uri: icon}}
                                style={{width: 150, height: 150}}
                                alt="category-image"
                            />
                        </SharedElement>
                    </Box>
                    <Animated.View
                        entering={StretchInX.duration(400)}
                        layout={Layout.springify()}>
                        <Box
                            flexDirection={"row"}
                            justifyContent={"space-evenly"}
                            my={4}>
                            <Flex alignItems={"center"}>
                                <Avatar
                                    bg="green.500"
                                    source={require("../../../assets/Images/file.png")}
                                />
                                <Text fontSize={18} color={"white"}>
                                    200
                                </Text>
                                <Text fontSize={14} color={"white"}>
                                    Different Products
                                </Text>
                            </Flex>
                            <Flex alignItems={"center"} mx={4}>
                                <Avatar
                                    bg="green.500"
                                    source={require("../../../assets/Images/boxes.png")}
                                />
                                <Text fontSize={18} color={"white"}>
                                    100
                                </Text>
                                <Text fontSize={14} color={"white"}>
                                    stocks Available
                                </Text>
                            </Flex>
                            <Flex alignItems={"center"}>
                                <Avatar
                                    bg="green.500"
                                    source={require("../../../assets/Images/customer-service.png")}
                                />
                                <Text fontSize={18} color={"white"}>
                                    20+
                                </Text>
                                <Text fontSize={14} color={"white"}>
                                    Satisfied Costumers
                                </Text>
                            </Flex>
                        </Box>
                    </Animated.View>

                    <Animated.ScrollView
                        entering={ZoomInRight.duration(400)}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <HStack>
                            <TouchableOpacity
                                onPress={() => setSelectedTab("")}>
                                <View px={1}>
                                    <Text
                                        color={"white"}
                                        px={2}
                                        rounded={"md"}
                                        bg={
                                            selectedTab === ""
                                                ? "primary.500"
                                                : "transparent"
                                        }>
                                        Recommended
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {child?.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedTab(item.id)}>
                                    <Text
                                        color={"white"}
                                        px={2}
                                        rounded={"md"}
                                        bg={
                                            selectedTab === item.id
                                                ? "primary.500"
                                                : "transparent"
                                        }>
                                        {item?.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </HStack>
                    </Animated.ScrollView>
                    <HStack flexWrap={"wrap"} mt={4}>
                        {!selectedTab &&
                            !loading &&
                            product?.map((item, index) => (
                                <VStack key={index}>
                                    <ItemCard data={item} />
                                </VStack>
                            ))}
                        {!subLoading &&
                            subCategory?.product.map((item, index) => (
                                <VStack key={index}>
                                    <ItemCard data={item} />
                                </VStack>
                            ))}
                        {selectedTab &&
                            subLoading &&
                            Array.from({length: 4}).map((_, index) => (
                                <VStack key={index}>
                                    <ProductSkeleton key={index} />
                                </VStack>
                            ))}
                    </HStack>
                </Container>
            </ScrollView>
        </>
    );
};

export default CategoryScreen;
