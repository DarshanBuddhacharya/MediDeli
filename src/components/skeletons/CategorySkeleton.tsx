import {HStack, Skeleton, VStack} from "native-base";
import React from "react";

export const CategorySkeleton = () => {
    return (
        <VStack
            w={120}
            h={160}
            mx={1}
            mb={2}
            borderWidth="1"
            space={3}
            overflow="hidden"
            rounded="md"
            _dark={{
                borderColor: "coolGray.500",
            }}
            _light={{
                borderColor: "coolGray.200",
            }}>
            <Skeleton h="4" mt={2} px="4" startColor="primary.100" />
            <Skeleton h="20" />
            <HStack px="2" space={2}>
                <Skeleton h="2" />
                <Skeleton h="2" />
            </HStack>
        </VStack>
    );
};
