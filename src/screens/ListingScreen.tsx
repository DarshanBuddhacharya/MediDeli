import {
    Box,
    Button,
    FlatList,
    Flex,
    HStack,
    ScrollView,
    Select,
    View,
} from "native-base";
import React, {useEffect, useMemo, useState} from "react";
import {Animated, Dimensions, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {ProductProps} from "../../types/ProductProps";
import {Container} from "../components/common/Container";
import {GoBackBtn} from "../components/common/GoBackBtn";
import SearchBar from "../components/common/SearchBar";
import {SortButton} from "../components/common/SortButton";
import {ItemCard} from "../components/ItemCard";
import {ProductSkeleton} from "../components/skeletons/ProductSkeleton";
import {axiosClient} from "../utils/axiosClient";
import {FlashList, MasonryFlashList} from "@shopify/flash-list";
import {useAppDispatch, useAppSelector} from "../features/hooks";
import {productGet} from "../features/product/productSlice";

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

    const [page, setPage] = useState(1);

    const loadMorePage = () => {
        setPage(page + 1);
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productGet(page));
    }, [page]);

    const {product, isLoading} = useAppSelector(state => state.product);

    const [language, setLanguage] = useState<string>();

    const renderItem = ({item}: {item: ProductProps["results"][0]}) => {
        return <ItemCard key={item.id} data={item} />;
    };

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 200);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -200],
    });

    // const memoedRender = useMemo(() => renderItem, [products]);

    return (
        <Container>
            <Animated.View
                style={{
                    transform: [{translateY: translateY}],
                    elevation: 200,
                    zIndex: 100,
                }}>
                <Box
                    rounded="lg"
                    backgroundColor={"white"}
                    shadow={3}
                    px={2}
                    mx={1}
                    position={"absolute"}
                    mt={1}
                    left={0}
                    right={0}
                    pt={2}
                    borderColor="coolGray.200"
                    borderWidth="1">
                    <GoBackBtn is_relative />
                    <Flex
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                        mt={2}>
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
                    </ScrollView>
                </Box>
            </Animated.View>

            <View
                style={{
                    height: Dimensions.get("screen").height,
                    width: Dimensions.get("screen").width,
                    justifyContent: "space-between",
                }}>
                <FlashList
                    data={product}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                    onEndReached={loadMorePage}
                    onScroll={e => {
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }}
                    onEndReachedThreshold={0.2}
                    estimatedItemSize={200}
                    ListHeaderComponent={<View height={180} />}
                    ListFooterComponent={
                        <HStack space={2} justifyContent="center">
                            {isLoading &&
                                Array.from({length: 2}).map((_, index) => (
                                    <ProductSkeleton key={index} />
                                ))}
                        </HStack>
                    }
                />
            </View>
        </Container>
    );
};

const style = StyleSheet.create({
    row: {
        justifyContent: "space-around",
    },
});
