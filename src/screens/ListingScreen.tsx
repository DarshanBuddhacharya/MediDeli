import {Stack, Center, HStack, FlatList, Box} from "native-base";
import React from "react";
import {StyleSheet} from "react-native";
import {ProductProps} from "../../types/ProductProps";
import {Container} from "../components/common/Container";
import {GoBackBtn} from "../components/common/GoBackBtn";
import {ItemCard} from "../components/ItemCard";
import {ProductSkeleton} from "../components/skeletons/ProductSkeleton";
import {useProduct} from "../hooks/use-products";

export const ListingScreen = () => {
    const {data, loading} = useProduct<ProductProps>({query: "limit=100"});

    const renderItem = ({item}: {item: ProductProps["results"][0]}) => {
        return <ItemCard data={item} />;
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
                <FlatList
                    columnWrapperStyle={style.row}
                    data={data?.results}
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
