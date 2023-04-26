import {Box, Flex, Image, Text} from "native-base";
import React, {useRef} from "react";
import {Animated, Dimensions} from "react-native";
import {View} from "react-native";
import Button from "../components/common/Button";
const {width, height} = Dimensions.get("screen");

const DATA = [
    {
        key: "3571572",
        title: "Multi-lateral intermediate moratorium",
        description:
            "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
        image: require("../../assets/Images/OnBoarding/onBoarding1.jpg"),
    },
    {
        key: "3571746",
        title: "Automated radical data-warehouse",
        description:
            "Use the optical SAS system, then you can navigate the auxiliary alarm!",
        image: require("../../assets/Images/OnBoarding/onBoarding2.jpg"),
    },
    {
        key: "3571747",
        title: "Automated radical data-warehouse",
        description:
            "Use the optical SAS system, then you can navigate the auxiliary alarm!",
        image: require("../../assets/Images/OnBoarding/onBoarding3.jpg"),
    },
    {
        key: "357177",
        title: "Automated radical data-warehouse",
        description:
            "Use the optical SAS system, then you can navigate the auxiliary alarm!",
        image: require("../../assets/Images/OnBoarding/onBoarding4.jpg"),
    },
    // {
    //     key: "3571680",
    //     title: "Inverse attitude-oriented system engine",
    //     description:
    //         "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    //     image: "https://image.flaticon.com/icons/png/256/3571/3571680.png",
    // },
    // {
    //     key: "3571603",
    //     title: "Monitored global data-warehouse",
    //     description: "We need to program the open-source IB interface!",
    //     image: "https://image.flaticon.com/icons/png/256/3571/3571603.png",
    // },
];

const Indicator = ({scrollX}: {scrollX: Animated.Value}) => {
    return (
        <Flex
            position={"absolute"}
            flexDirection={"row"}
            bottom={height / 2.7}
            mx={"auto"}>
            {DATA.map((_, index) => {
                const inputRange = [
                    (index - 1) * width,
                    index * width,
                    (index + 1) * width,
                ];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 0.7, 0.5],
                    extrapolate: "clamp",
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 0.9, 0.6],
                    extrapolate: "clamp",
                });
                return (
                    <Animated.View
                        key={`indicator-${index}`}
                        style={{
                            height: 15,
                            width: 15,
                            marginHorizontal: 4,
                            borderRadius: 100,
                            opacity,
                            backgroundColor: "white",
                            transform: [{scale}],
                        }}
                    />
                );
            })}
        </Flex>
    );
};

export const OnBoardingScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    return (
        <Box
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
            w={width}
            h={height}>
            <Animated.FlatList
                data={DATA}
                keyExtractor={item => item.key}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false},
                )}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({item}) => (
                    <Box
                        position={"relative"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        w={width}
                        h={height}>
                        <Image
                            source={item?.image}
                            opacity={0.7}
                            background={"black"}
                            alt="imgs"
                            w={width}
                            h={height}
                            mb={280}
                        />
                    </Box>
                )}
            />
            <Box
                position={"absolute"}
                rounded={"2xl"}
                shadow={8}
                p={6}
                mb={6}
                bg={"white"}
                w={width}
                alignItems={"center"}
                bottom={0}>
                <Text fontSize={"20"} color={"primary.500"}>
                    Welcome To
                </Text>
                <Text fontSize={"24"} mb={5}>
                    Ultimate Shopping Experience
                </Text>
                <Text mb={5}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, accusantium. Odio sequi nulla alias dolorum atque
                    officia impedit nihil veniam rem
                </Text>
                <Button size={"xs"}>sdssdsds</Button>
            </Box>
            <Indicator scrollX={scrollX} />
        </Box>
    );
};
