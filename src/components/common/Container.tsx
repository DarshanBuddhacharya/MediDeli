import {Box} from "native-base";
import React from "react";

export const Container = ({children}: {children: React.ReactNode}) => {
    return (
        <Box p={4} mb={20}>
            {children}
        </Box>
    );
};
