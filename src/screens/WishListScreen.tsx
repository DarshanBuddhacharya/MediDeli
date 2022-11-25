import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
    Box,
    Center,
    Heading,
    ScrollView,
    Pressable,
    Text,
    Image,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import {CheckoutCard} from "../components/common/CheckoutCard";
import {Container} from "../components/common/Container";
import {RootStackParamList} from "./CheckoutScreen";
import {useAppSelector} from "../features/hooks";
import {GoBackBtn} from "../components/common/GoBackBtn";
import {ClearButton} from "../components/common/ClearButton";
import {ClearWishBtn} from "../components/common/ClearWishBtn";
import Button from "../components/common/Button";
import {Fallback} from "../components/skeletons/Fallback";

export const WishListScreen = ({
    navigation,
}: {
    navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
    const wishListItems = useAppSelector(state => state.wishList.wishlistItems);

    return (
        <Container>
            <Box
                rounded="lg"
                overflow="hidden"
                flexDirection={"column"}
                justifyContent={"space-between"}
                h={"100%"}>
                <ScrollView>
                    <Box>
                        <Box
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            pt={5}
                            px={2}>
                            <GoBackBtn is_relative />
                            <Heading>WishList</Heading>
                            <ClearWishBtn />
                        </Box>
                        {wishListItems.length > 0 ? (
                            wishListItems?.map((item, index) => (
                                <CheckoutCard item={item} key={index} />
                            ))
                        ) : (
                            <Fallback
                                title={"Looks like your Wish List is Empty"}
                                link={"Home"}
                                imageUrl={require("../../assets/Images/wishlist.png")}
                            />
                        )}
                    </Box>
                </ScrollView>
            </Box>
        </Container>
    );
};
