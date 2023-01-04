import {useNavigation} from "@react-navigation/native";
import {Pressable, Text} from "native-base";
import {
    IPressableProps,
    InterfacePressableProps,
} from "native-base/lib/typescript/components/primitives/Pressable/types";
import React, {MemoExoticComponent} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {number} from "yup";

export const GoBackBtn = ({
    is_relative,
    ...rest
}: {
    is_relative?: boolean;
    mt?: number;
}) => {
    const navigation = useNavigation();
    return (
        <Pressable
            flexDirection={"row"}
            {...rest}
            position={is_relative ? `relative` : `absolute`}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" color={"#d52d3a"} size={24} />
            <Text>Back</Text>
        </Pressable>
    );
};
