import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Flex, Pressable, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

type TitleProps = {
    title: string;
};

type RootStackParamList = {
    ListingScreen: undefined;
};

const Title = ({title}: TitleProps) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <Pressable onPress={() => navigation.navigate("ListingScreen")}>
            <Flex
                direction="row"
                justifyContent={"space-between"}
                mt={5}
                mb={2}>
                <Text>{title}</Text>
                <Text>
                    <Icon
                        name={"arrow-forward-sharp"}
                        color={"red"}
                        size={24}
                    />
                </Text>
            </Flex>
        </Pressable>
    );
};

export default Title;
