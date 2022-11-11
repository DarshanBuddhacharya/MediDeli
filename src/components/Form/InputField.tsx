import {
    Box,
    Flex,
    FormControl,
    Input,
    Text,
    WarningOutlineIcon,
} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {InputFieldProps} from "../../../types/InputFieldProps";

const InputField = ({
    label,
    icon,
    placeHolder,
    onChangeText,
    onBlur,
    value,
    maxLength,
    keyboardType,
    error,
    touch,
}: InputFieldProps) => {
    return (
        <Box w={"100%"}>
            <Text>{label}</Text>
            <Input
                InputLeftElement={
                    <Icon
                        name={icon}
                        size={24}
                        color={error && touch ? "#d52d3a" : "grey"}
                        style={{marginLeft: 10}}
                    />
                }
                placeholder={placeHolder}
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                fontSize={15}
                keyboardType={keyboardType}
                maxLength={maxLength}
                borderColor={error && touch ? "primary.600" : "grey"}
            />
            {touch && error && (
                <Flex direction="row" alignItems={"center"} mt={1}>
                    <Icon name="info-outline" size={20} color="#d52d3a" />
                    <Text color={"primary.600"} marginLeft={2}>
                        {error}
                    </Text>
                </Flex>
            )}
        </Box>
    );
};

export default InputField;
