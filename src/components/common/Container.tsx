import {Box, View} from "native-base";
import React from "react";
import {Dimensions} from "react-native";

export const Container = ({children, ...rest}: {children: React.ReactNode}) => {
    const height = Dimensions.get("screen").height;
    return (
        <View
            _dark={{
                bg: "coolGray.800",
            }}
            _light={{
                bg: "gray.100",
            }}
            height={height}>
            <Box p={3} mb={120} {...rest}>
                {children}
            </Box>
        </View>
    );
};
