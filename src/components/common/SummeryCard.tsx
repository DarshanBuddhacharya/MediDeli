import {Box, Flex, Heading, Pressable, Text, View} from "native-base";
import React, {useRef, useState} from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";
import {
    Transition,
    Transitioning,
    TransitioningView,
    TransitioningViewProps,
} from "react-native-reanimated";
import {StyleSheet} from "react-native";

type SummeryCardProps = {
    gross_total: number;
    discount: number;
    total: number;
    link: string;
};

const transition = (
    <Transition.Together>
        <Transition.In type="slide-top" durationMs={200} />
        <Transition.Change />
        <Transition.Out type="slide-bottom" durationMs={200} />
    </Transition.Together>
);

export const SummeryCard = ({
    gross_total,
    discount,
    total,
    link,
}: SummeryCardProps) => {
    const [showSummary, setShowSummary] = useState<boolean>(false);
    const ref = useRef<TransitioningView>(null);
    return (
        <Transitioning.View transition={transition} ref={ref}>
            <Box
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                mx={2}
                p={5}>
                <Pressable
                    onPress={() => {
                        ref.current && ref.current.animateNextTransition();
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
                    <View flexGrow={1}>
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
                    </View>
                )}

                <Box justifyContent={"space-between"} flexDirection="row">
                    <Text fontSize={20} fontWeight={600}>
                        Total
                    </Text>
                    <Text color={"gray.800"}>Rs. {total}</Text>
                </Box>
                <Button link={link}>Procced</Button>
            </Box>
        </Transitioning.View>
    );
};

const styles = StyleSheet.create({
    icon: {
        transform: [{rotate: "180deg"}],
    },
});
