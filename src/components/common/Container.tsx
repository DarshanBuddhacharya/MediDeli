import {Box, View} from "native-base";
import React from "react";
import {Dimensions, SafeAreaView, StyleSheet} from "react-native";

export const Container = ({children, ...rest}: {children: React.ReactNode}) => {
    const height = Dimensions.get("screen").height;
    return (
        <SafeAreaView style={styles.container}>
            <View height={height}>
                <Box p={3} mb={100} {...rest}>
                    {children}
                </Box>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
