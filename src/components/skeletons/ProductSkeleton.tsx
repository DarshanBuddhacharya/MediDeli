import {HStack, Skeleton, VStack} from "native-base";
import React from "react";

export const ProductSkeleton = () => {
    return (
        <VStack
            w={180}
            mr={1}
            mb={2}
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
                borderColor: "coolGray.500",
            }}
            _light={{
                borderColor: "coolGray.200",
            }}>
            <Skeleton h="150" />
            <Skeleton h="4" px="4" startColor="primary.100" />
            <Skeleton h="5" px="4" />
            <HStack px="4" justifyContent={"space-between"}>
                <Skeleton width={65} rounded="md" />
                <Skeleton width={55} rounded="md" startColor="primary.100" />
            </HStack>
        </VStack>
    );
};
