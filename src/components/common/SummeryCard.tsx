import {Box, Flex, Heading, Text} from "native-base";
import React from "react";
import Button from "./Button";

export const SummeryCard = () => {
    return (
        <Box
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            mx={2}
            p={5}>
            <Heading fontSize={20} pb={2}>
                Summary
            </Heading>

            <Box
                borderTopWidth={1}
                borderBottomWidth={1}
                borderStyle={"dashed"}
                py={2}
                borderColor={"primary.600"}>
                <Flex direction="row" justifyContent={"space-between"}>
                    <Text>Gross Total</Text>
                    <Text color={"gray.500"}>Rs. 140</Text>
                </Flex>
                <Flex direction="row" justifyContent={"space-between"}>
                    <Text>Delivery fee</Text>
                    <Text color={"gray.500"}>Rs. 50</Text>
                </Flex>
                <Flex direction="row" justifyContent={"space-between"}>
                    <Text>Discount</Text>
                    <Text color={"gray.500"}>Rs. 50</Text>
                </Flex>
            </Box>
            <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize={20} fontWeight={600}>
                    Total
                </Text>
                <Text color={"gray.800"}>Rs. 150</Text>
            </Flex>
            <Button>Procced</Button>
        </Box>
    );
};
