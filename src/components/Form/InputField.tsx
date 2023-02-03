import {Box, Flex, Input, Text, useColorMode} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {InputFieldProps} from "../../../types/InputFieldProps";

const InputField = ({
    label,
    icon,
    placeHolder,
    onChangeText,
    onBlur,
    value,
    maxLength,
    isDisabled,
    varient,
    keyboardType,
    error,
    touch,
    ...rest
}: InputFieldProps) => {
    const {colorMode} = useColorMode();
    return (
        <Box w={"100%"} pt={4}>
            {label && <Text>{label}</Text>}
            <Input
                InputLeftElement={
                    <Icon
                        name={icon}
                        size={24}
                        color={error && touch ? "#d52d3a" : "grey"}
                        style={{marginLeft: 10}}
                    />
                }
                {...rest}
                variant={varient}
                isDisabled={isDisabled}
                placeholder={placeHolder}
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                fontSize={15}
                keyboardType={keyboardType}
                maxLength={maxLength}
                color={colorMode === "dark" ? "coolGray.300" : "muted.900"}
                placeholderTextColor={
                    colorMode === "dark" ? "coolGray.300" : "muted.500"
                }
                borderColor={
                    touch && error
                        ? "primary.600"
                        : colorMode === "dark"
                        ? "coolGray.300"
                        : "grey"
                }
            />
            {touch && error && (
                <Flex direction="row" alignItems={"center"} mt={1}>
                    <Icon
                        name="information-outline"
                        size={20}
                        color="#d52d3a"
                    />
                    <Text color={"primary.600"} marginLeft={2}>
                        {error}
                    </Text>
                </Flex>
            )}
        </Box>
    );
};

export default InputField;
