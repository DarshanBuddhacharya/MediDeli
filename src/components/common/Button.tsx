import {useNavigation} from "@react-navigation/native";
import {Box, Pressable, Text} from "native-base";
import {InterfacePressableProps} from "native-base/lib/typescript/components/primitives/Pressable/types";
import React, {ReactNode} from "react";
import {IconProps} from "react-native-vector-icons/Icon";
import Icon from "react-native-vector-icons/MaterialIcons";

const Button = ({
    children,
    link,
    LeftIcon,
    ...rest
}: {
    children: ReactNode;
    LeftIcon?: ReactNode;
    link?: string;
} & InterfacePressableProps) => {
    return (
        <Pressable
            {...rest}
            android_ripple={{
                color: "#d52d3a",
                radius: 160,
            }}
            bg={"primary.500"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={10}
            mx={4}
            h={10}
            px={3}>
            <Text color={"white"}>{children}</Text>
            {LeftIcon && LeftIcon}
        </Pressable>
    );
};

export default Button;
