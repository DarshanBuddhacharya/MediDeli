import {Box, Flex, Image, Pressable, Text} from "native-base";
import React, {useRef, useState} from "react";
import {Animated, Dimensions, FlatList, ViewToken} from "react-native";
import Button from "../components/common/Button";
import Icon from "react-native-vector-icons/MaterialIcons";
import {useAppDispatch} from "../features/hooks";
import {onBoarding} from "../features/auth/authSlice";
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
];

const Indicator = ({scrollX}: {scrollX: Animated.Value}) => {
    return (
        <Flex
            position={"absolute"}
            flexDirection={"row"}
            bottom={height / 2.5}
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
                    outputRange: [0.6, 0.9, 0.2],
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

    const slideRef = useRef<FlatList>(null);

    const [currentIndex, setCurrentIndex] = useState<number | null>(0);

    const onViewableItemsChanged = useRef(
        ({viewableItems}: {viewableItems: ViewToken[]}) =>
            setCurrentIndex(viewableItems[0].index),
    ).current;

    const dispatch = useAppDispatch();

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
                ref={slideRef}
                onViewableItemsChanged={onViewableItemsChanged}
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
                        <Box
                            position={"absolute"}
                            rounded={"2xl"}
                            shadow={8}
                            p={6}
                            bg={"white"}
                            w={width}
                            alignItems={"center"}
                            bottom={50}>
                            <Text fontSize={"20"} color={"primary.500"}>
                                {item.title}
                            </Text>
                            <Text fontSize={"24"} mb={5}>
                                Ultimate Shopping Experience
                            </Text>
                            <Text mb={50}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Autem, accusantium. Odio sequi
                                nulla alias dolorum atque officia impedit nihil
                                veniam rem
                            </Text>
                        </Box>
                    </Box>
                )}
            />

            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={"row"}
                bottom={"20"}
                w={"full"}>
                <Text ml={6}>Skip</Text>
                {currentIndex === 3 ? (
                    <Button
                        onPress={() => dispatch(onBoarding())}
                        rounded={"full"}
                        LeftIcon={
                            <Icon
                                name="arrow-forward"
                                size={20}
                                color={"white"}
                            />
                        }>
                        Log me In
                    </Button>
                ) : (
                    <Button
                        rounded={"full"}
                        onPress={() =>
                            slideRef.current &&
                            slideRef.current.scrollToIndex({
                                index: currentIndex ? currentIndex + 1 : 1,
                            })
                        }>
                        <Icon name="arrow-forward" size={20} color={"white"} />
                    </Button>
                )}
            </Flex>

            <Indicator scrollX={scrollX} />
        </Box>
    );
};
