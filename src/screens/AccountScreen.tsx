import {Box, Pressable, Text} from "native-base";
import React, {useContext} from "react";
import {AuthContext} from "../Store/auth-context";

const Account = () => {
    const authCntx = useContext(AuthContext);
    return (
        <Box>
            <Pressable onPress={authCntx.logout}>
                <Text>Logout</Text>
            </Pressable>
        </Box>
    );
};

export default Account;
