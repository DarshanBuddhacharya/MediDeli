import {Box, View} from "native-base";
import React from "react";

export const Container = ({children, ...rest}: {children: React.ReactNode}) => {
    return (
        <View
            _dark={{
                bg: "coolGray.800",
            }}
            _light={{
                bg: "white",
            }}>
            <Box p={3} mb={20} {...rest}>
                {children}
            </Box>
        </View>
    );
};
