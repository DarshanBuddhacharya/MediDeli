import {Box, Flex, Input, Text} from "native-base";
import React, {useState} from "react";
import {Pressable} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ComIcon from "react-native-vector-icons/MaterialIcons";
import {InputFieldProps} from "../../types/InputFieldProps";

const PasswordField = ({
    label,
    icon,
    placeHolder,
    onChangeText,
    onBlur,
    value,
    error,
    touch,
}: InputFieldProps) => {
    const [show, setShow] = useState(false);
    return (
        <Box w={"100%"}>
            <Text>{label}</Text>
            <Input
                type={show ? "text" : "password"}
                InputLeftElement={
                    <Icon
                        name={icon}
                        size={24}
                        color={error && touch ? "#d52d3a" : "grey"}
                        style={{marginLeft: 10}}
                    />
                }
                InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                        <Icon
                            name={show ? "eye" : "eye-off"}
                            size={24}
                            style={{marginRight: 10}}
                        />
                    </Pressable>
                }
                placeholder={placeHolder}
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                fontSize={15}
                borderColor={touch && error ? "primary.600" : "grey"}
            />
            {error && (
                <Flex direction="row" alignItems={"center"} mt={1}>
                    <ComIcon name="info-outline" size={20} color="#d52d3a" />
                    <Text color={"primary.600"} marginLeft={2}>
                        {error}
                    </Text>
                </Flex>
            )}
        </Box>
    );
};

export default PasswordField;
