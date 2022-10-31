import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Box, Center, Heading, ScrollView, Pressable, Text} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import {CheckoutCard} from "../components/common/CheckoutCard";
import {Container} from "../components/common/Container";
import {RootStackParamList} from "./CheckoutScreen";

export const WishListScreen = ({
    navigation,
}: {
    navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
    return (
        <Container>
            <Box
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                flexDirection={"column"}
                justifyContent={"space-between"}
                h={"100%"}
                borderWidth="1">
                <ScrollView>
                    <Box>
                        <Pressable
                            flexDirection={"row"}
                            position={"absolute"}
                            pt={5}
                            onPress={() => navigation.goBack()}>
                            <Icon
                                name="chevron-back"
                                color={"#d52d3a"}
                                size={24}
                            />
                            <Text>Back</Text>
                        </Pressable>
                        <Center>
                            <Heading mt={5}>WishList</Heading>
                        </Center>
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
                    </Box>
                </ScrollView>
            </Box>
        </Container>
    );
};
