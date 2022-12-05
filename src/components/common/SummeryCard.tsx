import {Box, Flex, Heading, Pressable, Text, View} from "native-base";
import React, {useRef, useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";
import Animated, {
    BounceInDown,
    BounceInUp,
    FadeIn,
    Layout,
} from "react-native-reanimated";
import {StyleSheet} from "react-native";

type SummeryCardProps = {
    gross_total: number;
    discount: number;
    total: number;
    link: string;
};

export const SummeryCard = ({
    gross_total,
    discount,
    total,
    link,
}: SummeryCardProps) => {
    const [showSummary, setShowSummary] = useState<boolean>(false);
    return (
        <Animated.View
            entering={BounceInDown.duration(800)}
            layout={Layout.springify()}>
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
                        // ref.current && ref.current.animateNextTransition();
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
                <Button link={link}>Procced</Button>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    icon: {
        transform: [{rotate: "180deg"}],
    },
});
