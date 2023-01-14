import {
    Box,
    Flex,
    Heading,
    Pressable,
    Text,
    View,
    useDisclose,
} from "native-base";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";
import Animated, {BounceInDown, Layout} from "react-native-reanimated";
import {StyleSheet} from "react-native";
import {PaymentOptions} from "../checkout/payment-options";
import {FormButton} from "../Form/FormButton";

type SummeryCardProps = {
    gross_total: number;
    discount: number;
    total: number;
    type: "checkout" | "delivery";
    link: string;
};

export enum CARD_TYPE {
    checkout = "checkout",
    delivery = "delivery",
}

export const SummeryCard = ({
    gross_total,
    discount,
    type,
    total,
    link,
}: SummeryCardProps) => {
    const [showSummary, setShowSummary] = useState<boolean>(false);

    const renderButton = () => {
        switch (type) {
            case CARD_TYPE.checkout:
                return <Button link={link}>Procced To Delivery</Button>;
            case CARD_TYPE.delivery:
                return (
                    <FormButton onPress={onOpen}>
                        Choose a Payment method
                    </FormButton>
                );
            default:
                break;
        }
    };

    const {isOpen, onOpen, onClose} = useDisclose();
    return (
        <Animated.View
            entering={BounceInDown.duration(800)}
            layout={Layout.springify()}
            style={{backgroundColor: "inherit"}}>
            <View
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                backgroundColor={"coolGray.50"}
                borderWidth="1"
                mx={2}
                p={5}>
                <Pressable
                    onPress={() => {
                        setShowSummary(!showSummary);
                    }}
                    textAlign={"center"}
                    alignItems={"center"}>
                    <Icon
                        name="arrow-up-drop-circle-outline"
                        style={showSummary && styles.icon}
                        size={24}
                        color={"red"}
                    />
                </Pressable>
                {showSummary && (
                    <Animated.View
                        entering={BounceInDown.duration(600)}
                        layout={Layout.springify()}>
                        <Heading fontSize={20} pb={2}>
                            Summary
                        </Heading>

                        <Box
                            borderTopWidth={1}
                            borderBottomWidth={1}
                            borderStyle={"dashed"}
                            py={2}
                            borderColor={"primary.600"}>
                            <Flex
                                direction="row"
                                justifyContent={"space-between"}>
                                <Text>Gross Total</Text>
                                <Text color={"gray.500"}>
                                    Rs. {gross_total}
                                </Text>
                            </Flex>
                            {/* <Flex direction="row" justifyContent={"space-between"}>
                    <Text>Delivery fee</Text>
                    <Text color={"gray.500"}>Rs. {delivery_fee}</Text>
                </Flex> */}
                            <Flex
                                direction="row"
                                justifyContent={"space-between"}>
                                <Text>Discount</Text>
                                <Text color={"gray.500"}>Rs. {discount}</Text>
                            </Flex>
                        </Box>
                    </Animated.View>
                )}

                <Box justifyContent={"space-between"} flexDirection="row">
                    <Text fontSize={20} fontWeight={600}>
                        Total
                    </Text>
                    <Text color={"primary.600"}>Rs. {total}</Text>
                </Box>
                {renderButton()}
            </View>

            <PaymentOptions isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    icon: {
        transform: [{rotate: "180deg"}],
    },
});
