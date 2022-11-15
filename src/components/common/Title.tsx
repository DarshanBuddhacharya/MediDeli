import {Flex, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

type TitleProps = {
    title: string;
};

const Title = ({title}: TitleProps) => {
    return (
        <Flex direction="row" justifyContent={"space-between"} mt={5} mb={2}>
            <Text>{title}</Text>
            <Text>
                <Icon name={"arrow-forward-sharp"} color={"red"} size={24} />
            </Text>
        </Flex>
    );
};

export default Title;
