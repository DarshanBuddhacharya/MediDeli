import {Box, Text} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {CategoryProps} from "../../types/CategoryProps";

const CategoryCard = ({data}: {data: CategoryProps["results"][0]}) => {
    return (
        <Box
            bg={data?.color}
            w={100}
            h={100}
            rounded="2xl"
            alignItems={"center"}
            justifyContent={"center"}>
            <Icon name={data?.icon} size={40} color={"white"} />
            <Text color={"white"}>{data?.category_name}</Text>
        </Box>
    );
};

export default CategoryCard;
