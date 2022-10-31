import {Box, Flex, Text} from "native-base";
import React from "react";

export const DeliveryList = () => {
    return (
        <Box
            p={4}
            mt={2}
            mx={2}
            bg={"coolGray.100"}
            borderWidth={1}
            borderColor={"coolGray.300"}>
            <Flex
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                alignSelf={"stretch"}>
                <Text flex={4} fontWeight={600} fontSize={16}>
                    Cetamol is this as of that
                </Text>
                <Text ml={5} flex={2}>
                    100
                </Text>
                <Text
                    flex={2}
                    color="coolGray.600"
                    _dark={{
                        color: "warmGray.200",
                    }}
                    fontWeight="400">
                    Rs.90
                </Text>
            </Flex>
        </Box>
    );
};
