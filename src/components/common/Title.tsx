import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Flex, Pressable, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

type TitleProps = {
    title: string;
    is_redirectable?: boolean;
};

type RootStackParamList = {
    ListingScreen: undefined;
};

const Title = ({title, is_redirectable}: TitleProps) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <Flex direction="row" justifyContent={"space-between"} mt={5} mb={2}>
            <Text>{title}</Text>
            {is_redirectable && (
                <Pressable onPress={() => navigation.navigate("ListingScreen")}>
                    <Text>
                        <Icon
                            name={"arrow-forward-sharp"}
                            color={"red"}
                            size={24}
                        />
                    </Text>
                </Pressable>
            )}
        </Flex>
    );
};

export default Title;
