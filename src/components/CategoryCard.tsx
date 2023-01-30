import {Box, Image, Text, View} from "native-base";
import React from "react";
import {CategoryProps} from "../../types/CategoryProps";
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity} from "react-native";
import {SharedElement} from "react-navigation-shared-element";

const CategoryCard = ({data}: {data: CategoryProps["results"][0]}) => {
    const navigation: any = useNavigation();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("CategoryScreen", {
                    data,
                })
            }>
            <Box
                w={120}
                h={160}
                alignItems={"center"}
                shadow={8}
                mx={1}
                mb={2}
                py={2}
                rounded="2xl">
                <SharedElement
                    id={`category.${data?.id}.bg`}
                    style={StyleSheet.absoluteFillObject}>
                    <View
                        style={StyleSheet.absoluteFillObject}
                        bg={data?.color}
                        rounded="xl"
                    />
                </SharedElement>
                <SharedElement id={`category.${data?.id}.title`}>
                    <Text fontSize={"20"} color={"white"} mb={2}>
                        {data?.name}
                    </Text>
                </SharedElement>
                <SharedElement id={`category.${data?.id}.image`}>
                    <Image
                        source={{uri: data?.icon}}
                        style={{width: 60, height: 60}}
                        alt="category-image"
                    />
                </SharedElement>
                <SharedElement id={`category.${data?.id}.desc`}>
                    <Text noOfLines={2} fontSize={16} color={"white"} px={1}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Culpa, dolorem?
                    </Text>
                </SharedElement>
            </Box>
        </TouchableOpacity>
    );
};

export default CategoryCard;
