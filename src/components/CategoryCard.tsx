import {Box, Image, Text} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {CategoryProps} from "../../types/CategoryProps";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";

const CategoryCard = ({data}: {data: CategoryProps["results"][0]}) => {
    const navigation: any = useNavigation();
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("CategoryScreen", {
                    categoryId: data?.id,
                })
            }>
            <Box
                bg={data?.color}
                w={120}
                h={160}
                shadow={8}
                mx={1}
                mb={2}
                py={2}
                rounded="2xl"
                alignItems={"center"}
                justifyContent={"center"}>
                {/* <Icon name={data?.icon} size={40} color={"white"} /> */}
                <Text
                    fontSize={"18"}
                    color={"white"}
                    alignSelf={"flex-start"}
                    ml={3}
                    mb={2}>
                    {data?.name}
                </Text>
                <Image
                    source={{uri: data?.icon}}
                    style={{width: 60, height: 60}}
                    alt="category-image"
                />
                <Text noOfLines={2} color={"white"} fontSize={14} mt={2}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Culpa, dolorem?
                </Text>
            </Box>
        </TouchableOpacity>
    );
};

export default CategoryCard;
