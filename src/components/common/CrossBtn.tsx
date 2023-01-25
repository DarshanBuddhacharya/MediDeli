import {Pressable} from "native-base";
import Icon from "react-native-vector-icons/Feather";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export const CrossBtn = ({with_back}: {with_back?: boolean}) => {
    const navigation = useNavigation();
    return (
        <Pressable
            alignSelf={"flex-end"}
            mr={2}
            mt={2}
            rounded={"md"}
            bg={with_back ? "primary.500" : "transparent"}
            onPress={() => navigation.goBack()}>
            <Icon name="x" color={"white"} size={28} />
        </Pressable>
    );
};
