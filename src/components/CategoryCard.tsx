import {Box, Text} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

const CategoryCard = () => {
    return (
        <Box
            bg={"blue.400"}
            w={100}
            h={100}
            rounded="2xl"
            alignItems={"center"}
            justifyContent={"center"}>
            <Icon name="medical" size={40} color={"white"} />
            <Text color={"white"}>Pharmacy</Text>
        </Box>
    );
};

export default CategoryCard;
