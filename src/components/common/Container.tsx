import {Box, View} from "native-base";
import React from "react";
import {Dimensions} from "react-native";

export const Container = ({children, ...rest}: {children: React.ReactNode}) => {
    const height = Dimensions.get("screen").height;
    return (
        <View height={height}>
            <Box p={3} mb={100} {...rest}>
                {children}
            </Box>
        </View>
    );
};
