import {Box, Flex, Heading, Text} from "native-base";
import React from "react";
import Button from "./Button";

type SummeryCardProps = {
    gross_total: number;
    discount: number;
    total: number;
    link: string;
};

export const SummeryCard = ({
    gross_total,
    discount,
    total,
    link,
}: SummeryCardProps) => {
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
                    <Text color={"gray.500"}>Rs. {gross_total}</Text>
                </Flex>
                {/* <Flex direction="row" justifyContent={"space-between"}>
                    <Text>Delivery fee</Text>
                    <Text color={"gray.500"}>Rs. {delivery_fee}</Text>
                </Flex> */}
                <Flex direction="row" justifyContent={"space-between"}>
                    <Text>Discount</Text>
                    <Text color={"gray.500"}>Rs. {discount}</Text>
                </Flex>
            </Box>
            <Flex direction="row" justifyContent={"space-between"}>
                <Text fontSize={20} fontWeight={600}>
                    Total
                </Text>
                <Text color={"gray.800"}>Rs. {total}</Text>
            </Flex>
            <Button link={link}>Procced</Button>
        </Box>
    );
};
