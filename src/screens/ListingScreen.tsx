import {Stack, Center, HStack, FlatList, Box} from "native-base";
import React, {useRef} from "react";
import {Animated, StyleSheet} from "react-native";
import {ProductProps} from "../../types/ProductProps";
import {Container} from "../components/common/Container";
import {GoBackBtn} from "../components/common/GoBackBtn";
import {ItemCard} from "../components/ItemCard";
import {ProductSkeleton} from "../components/skeletons/ProductSkeleton";
import {useProduct} from "../hooks/use-products";

export const ListingScreen = () => {
    const {data, loading} = useProduct<ProductProps>({query: "limit=100"});

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
            <HStack space={3} justifyContent="center">
                {loading &&
                    Array.from({length: 4}).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
            </HStack>
            {data && (
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
