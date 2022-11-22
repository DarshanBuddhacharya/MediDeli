import {useNavigation} from "@react-navigation/native";
import {Pressable, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export const GoBackBtn = ({is_relative}: {is_relative?: boolean}) => {
    const navigation = useNavigation();
    return (
        <Pressable
            flexDirection={"row"}
            position={is_relative ? `relative` : `absolute`}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" color={"#d52d3a"} size={24} />
            <Text>Back</Text>
        </Pressable>
    );
};
