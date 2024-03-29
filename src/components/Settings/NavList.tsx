import {Box, Flex, Pressable, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {NavListProps} from "../../../types/NavLIstProps";
import {useNavigation} from "@react-navigation/native";

export const NavList = ({
    iconName,
    List,
    link,
    iconColor,
    secondaryText,
    onPress,
}: NavListProps) => {
    return (
        <Pressable onPress={onPress}>
            <Box
                flexDirection={"row"}
                justifyContent={"space-between"}
                borderBottomWidth={1}
                pt={4}
                pb={5}
                _light={{borderBottomColor: "gray.300"}}
                _dark={{borderBottomColor: "coolGray.400"}}
                alignItems={"center"}>
                <Flex direction="row" alignItems={"center"}>
                    <Icon name={iconName} color={iconColor} size={28} />
                    <Flex ml={2}>
                        <Text>{List}</Text>
                        {secondaryText ? (
                            <Text noOfLines={1} width={280}>
                                {secondaryText}
                            </Text>
                        ) : null}
                    </Flex>
                </Flex>
                <Icon name="menu-right" color={"red"} size={24} />
            </Box>
        </Pressable>
    );
};
