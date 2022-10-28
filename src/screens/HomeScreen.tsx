import {Box, Text, View} from "native-base";
import React from "react";
import {StyleSheet} from "react-native";

const HomeScreen = () => {
    return (
        <Box>
            <Box
                alignSelf="center"
                bg="primary.500"
                _text={{
                    fontSize: "md",
                    fontWeight: "medium",
                    color: "warmGray.50",
                    letterSpacing: "lg",
                }}>
                This is a Box
            </Box>
            <Text>Font test</Text>
            <Text>test</Text>
        </Box>
    );
};

export default HomeScreen;
