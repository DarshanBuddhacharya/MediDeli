import {Box, Flex, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {NavListProps} from "../../../types/NavLIstProps";

export const NavList = ({iconName, List, link, iconColor}: NavListProps) => {
    return (
        <Box
            flexDirection={"row"}
            justifyContent={"space-between"}
            borderBottomWidth={1}
            pt={4}
            pb={5}
            borderBottomColor={"gray.300"}
            alignItems={"center"}>
            <Flex direction="row" alignItems={"center"}>
                <Icon name={iconName} color={iconColor} size={28} />
                <Text ml={2}>{List}</Text>
            </Flex>
            <Icon name="menu-right" color={"red"} size={24} />
        </Box>
    );
};
