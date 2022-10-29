import {VStack, Heading, Input, Icon} from "native-base";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SearchBar = () => {
    return (
        <VStack w="100%" space={5} alignSelf="center" mt={5}>
            <Input
                placeholder="Search Products and Brands"
                width="100%"
                borderRadius="4"
                py="3"
                px="1"
                fontSize="14"
                InputLeftElement={
                    <Icon
                        m="2"
                        ml="3"
                        size="6"
                        color="gray.400"
                        as={<MaterialIcons name="search" />}
                    />
                }
                InputRightElement={
                    <Icon
                        m="2"
                        mr="3"
                        size="6"
                        color="gray.400"
                        as={<MaterialIcons name="filter-list-alt" />}
                    />
                }
            />
        </VStack>
    );
};

export default SearchBar;
