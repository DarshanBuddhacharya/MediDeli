import {Box, Button, Flex, HStack, ScrollView, Select} from "native-base";
import React, {useEffect, useRef, useState} from "react";
import {Animated, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {ProductProps} from "../../types/ProductProps";
import {Container} from "../components/common/Container";
import {GoBackBtn} from "../components/common/GoBackBtn";
import SearchBar from "../components/common/SearchBar";
import {SortButton} from "../components/common/SortButton";
import {ItemCard} from "../components/ItemCard";
import {ProductSkeleton} from "../components/skeletons/ProductSkeleton";
import {axiosClient} from "../utils/axiosClient";

export const ListingScreen = () => {
    const [sortKeys, setSortKeys] = useState<string[]>([]);

    const [searchParams, setSearchParams] = useState("");

    const handleClick = (sortKey: string) => {
        if (sortKeys.includes(sortKey)) {
            // Replace the sort key with its negated value
            setSortKeys(
                sortKeys.map(key => (key === sortKey ? `-${sortKey}` : key)),
            );
        } else if (sortKeys.includes(`-${sortKey}`)) {
            setSortKeys([
                ...sortKeys.filter(key => key !== `-${sortKey}`),
                sortKey,
            ]);
        } else {
            setSortKeys([...sortKeys, sortKey]);
        }
    };

    const sortParams = `ordering=${sortKeys.join(",")}`;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps>();

    const fetchApi = async () => {
        try {
            const {data} = await axiosClient.get<ProductProps>(
                `products/?limit=100&search=${searchParams}&${sortParams}`,
            );
            setData(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchApi();
    }, [searchParams, sortParams]);

    const [language, setLanguage] = useState<string>();

    const scrollY = useRef(new Animated.Value(0)).current;

    const ITEM_SIZE = 200;

    const renderItem = ({
        item,
        index,
    }: {
        item: ProductProps["results"][0];
        index: number;
    }) => {
        const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 5)];
        const oppacityRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
        ];
        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
        });
        const opacity = scrollY.interpolate({
            inputRange: oppacityRange,
            outputRange: [1, 1, 1, 0],
        });
        return (
            <Animated.View style={{transform: [{scale}], opacity}}>
                <ItemCard data={item} />
            </Animated.View>
        );
    };

    return (
        <Container>
            <GoBackBtn is_relative />
            <Box>
                <Flex
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between"
                    pt={2}>
                    <SearchBar
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                    <Flex direction="row" justifyContent={"space-between"}>
                        <Button mr={1}>
                            <Icon name="close" color={"white"} size={19} />
                        </Button>
                        <Button>
                            <Icon name="filter" color={"white"} size={19} />
                        </Button>
                    </Flex>
                </Flex>
                <ScrollView horizontal={true} py={4}>
                    <Select
                        placeholder="Category"
                        selectedValue={language}
                        borderColor="coolGray.200"
                        borderWidth="1"
                        w={150}
                        mr={2}
                        onValueChange={(itemValue: string) =>
                            setLanguage(itemValue)
                        }>
                        <Select.Item label="Wallet" value="key0" />
                        <Select.Item label="ATM Card" value="key1" />
                        <Select.Item label="Debit Card" value="key2" />
                        <Select.Item label="Credit Card" value="key3" />
                        <Select.Item label="Net Banking" value="key4" />
                    </Select>
                    <SortButton
                        handleClick={handleClick}
                        title={"Price"}
                        icon={"currency-inr"}
                        sortKey={"price"}
                    />
                    <SortButton
                        handleClick={handleClick}
                        title={"Rating"}
                        icon={"star"}
                        sortKey={"rating"}
                    />
                    {/* <SortButton
                        setSearch={setSearch}
                        title={"Stock"}
                        searchQuery={}
                        icon={"text-box"}
                    /> */}
                </ScrollView>
            </Box>
            <HStack space={3} justifyContent="center">
                {loading &&
                    Array.from({length: 4}).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
            </HStack>
            {!loading && data && (
                <Animated.FlatList
                    columnWrapperStyle={style.row}
                    data={data?.results}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true},
                    )}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            )}
        </Container>
    );
};

const style = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: "space-between",
    },
});
