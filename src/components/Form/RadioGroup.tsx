import {Box, Flex, Input, Radio, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {InputFieldProps} from "../../../types/InputFieldProps";
import {Field, FieldProps} from "formik";
import {RadioGroupProps} from "../../../types/RadioGropProps";

const RadioGroup = ({
    label,
    onChange,
    onBlur,
    maxLength,
    keyboardType,
    name,
    error,
    touch,
    ...rest
}: RadioGroupProps) => {
    return (
        <Field name={name}>
            {({field}: FieldProps) => (
                <Box w={"100%"} pt={4}>
                    <Text>{label}</Text>
                    <Radio.Group
                        {...rest}
                        {...field}
                        name={name}
                        accessibilityLabel="favorite number"
                        onChange={onChange}>
                        <Flex direction="row" alignItems="center">
                            <Radio value="Male" my={1}>
                                Male
                            </Radio>
                            <Radio value="Female" my={1} ml={3}>
                                Female
                            </Radio>
                            <Radio value="Other" my={1} ml={3}>
                                Other
                            </Radio>
                        </Flex>
                    </Radio.Group>
                    {touch && error && (
                        <Flex direction="row" alignItems={"center"} mt={1}>
                            <Icon
                                name="info-outline"
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

export default RadioGroup;
