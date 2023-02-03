import {Box} from "native-base";
import React from "react";

export const Container = ({children, ...rest}: {children: React.ReactNode}) => {
    return (
        <Box p={3} mb={20} {...rest}>
            {children}
        </Box>
    );
};
