import {Box, Flex, Pressable, Text} from "native-base";
import React, {Dispatch, SetStateAction, useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export interface SortButtonProps {
    title: string;
    icon: string;
    handleClick: (arg0: string) => void;
    sortKey: string;
}

export const SortButton = ({
    title,
    icon,
    handleClick,
    sortKey,
}: SortButtonProps) => {
    const [isAssending, setIsAssending] = useState<boolean | null>(null);

    return (
        <Box
            flexDirection={"row"}
            alignItems="center"
            borderColor="coolGray.200"
            borderWidth="1"
            background={isAssending !== null ? "primary.500" : "white"}
            rounded={"lg"}
            pr={1}
            mr={2}>
            <Pressable
                bg={"none"}
                px={1}
                onPress={() => {
                    handleClick(sortKey);
                    setIsAssending(!isAssending);
                }}>
                <Flex direction="row" alignItems={"center"}>
                    <Icon
                        name={icon}
                        color={isAssending !== null ? "white" : "#e63946"}
                        size={19}
                    />
                    <Text
                        px={1}
                        color={isAssending !== null ? "white" : "black"}>
                        {title}
                    </Text>
                    {isAssending !== null && (
                        <Icon
                            name={isAssending ? "chevron-up" : "chevron-down"}
                            color={isAssending !== null ? "white" : "#e63946"}
                            size={19}
                        />
                    )}
                </Flex>
            </Pressable>
            {isAssending !== null && (
                <Pressable
                    onPress={() => {
                        setIsAssending(null);
                        handleClick("");
                    }}>
                    <Icon name="close" color={"white"} size={24} />
                </Pressable>
            )}
        </Box>
    );
};
