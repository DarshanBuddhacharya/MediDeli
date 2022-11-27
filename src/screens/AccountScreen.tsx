import {Box, Pressable, Text} from "native-base";
import React, {useContext} from "react";
import {logout} from "../features/auth/authSlice";
import {useAppDispatch} from "../features/hooks";

const Account = () => {
    const dispatch = useAppDispatch();
    return (
        <Box>
            <Pressable onPress={() => dispatch(logout())}>
                <Text>Logout</Text>
            </Pressable>
        </Box>
    );
};

export default Account;
