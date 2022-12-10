import {VStack, Heading, Input, Icon, Button, Pressable} from "native-base";
import React, {Dispatch, SetStateAction} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SearchBar = ({
    setSearchParams,
    searchParams,
}: {
    setSearchParams: Dispatch<SetStateAction<string>>;
    searchParams: string;
}) => {
    return (
        <VStack flex={2} alignSelf="center" mr={4}>
            <Input
                placeholder="Search Products"
                borderColor="coolGray.200"
                borderWidth="1"
                onChange={e => setSearchParams(e.nativeEvent.text)}
                value={searchParams}
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
                    <>
                        {searchParams && (
                            <Pressable
                                onPress={() => {
                                    setSearchParams("");
                                }}>
                                <Icon
                                    m="2"
                                    mr="3"
                                    size="6"
                                    color="gray.400"
                                    as={<MaterialIcons name="close" />}
                                />
                            </Pressable>
                        )}
                    </>
                }
            />
        </VStack>
    );
};

export default SearchBar;
