import {Box, Flex, Text, useColorMode} from "native-base";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-date-picker";
import {Field, FieldProps} from "formik";
import {DateFieldProps} from "../../../types/DateFieldProps";
import {getMaximumDate, getMinimumDate} from "../../../utils/dobUtil";

const DateField = ({
    label,
    error,
    touch,
    name,
    onChange,
    value,
    ...rest
}: DateFieldProps) => {
    const {colorMode} = useColorMode();
    return (
        <Field name={name}>
            {({field}: FieldProps) => (
                <Box w={"100%"} pt={4} borderBottomWidth={0.2}>
                    {label && (
                        <Text borderBottomWidth={0.2} pb={2}>
                            {label}
                        </Text>
                    )}
                    <DatePicker
                        date={value}
                        {...rest}
                        {...field}
                        textColor={
                            touch && error
                                ? "#e63946"
                                : colorMode === "dark"
                                ? "white"
                                : "#000"
                        }
                        onDateChange={onChange}
                        mode={"date"}
                        maximumDate={getMinimumDate()}
                        minimumDate={getMaximumDate()}
                        androidVariant={"nativeAndroid"}
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
            )}
        </Field>
    );
};

export default DateField;
