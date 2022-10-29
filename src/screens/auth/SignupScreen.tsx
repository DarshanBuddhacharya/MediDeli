import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Formik} from "formik";
import {Box, Flex, Pressable, Text} from "native-base";
import React from "react";
import {Image} from "react-native";
import {Container} from "../../components/common/Container";
import {FormButton} from "../../components/Form/FormButton";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import {loginFormSchema} from "../../validation/LoginValidation";

export type RootStackParamList = {
    Login: undefined;
};

const SignupScreen = ({
    navigation,
}: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}) => {
    return (
        <Container>
            <Box alignItems={"center"} mt={5}>
                <Image
                    source={require("../../../assets/Images/logo-name.png")}
                    style={{width: 200, height: 120}}
                />
            </Box>
            <Formik
                initialValues={{full_name: "", phone: "", password: ""}}
                validationSchema={loginFormSchema}
                onSubmit={values => console.log(values)}>
                {({
                    handleChange,
                    setFieldTouched,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <>
                        <InputField
                            onChangeText={handleChange("full_name")}
                            onBlur={() => setFieldTouched("full_name")}
                            value={values.full_name}
                            icon={"person"}
                            placeHolder={"Full Name"}
                            touch={touched.full_name}
                            error={errors.full_name}
                        />
                        <InputField
                            onChangeText={handleChange("phone")}
                            onBlur={() => setFieldTouched("phone")}
                            value={values.phone}
                            icon={"phone"}
                            placeHolder={"Phone Number"}
                            keyboardType={"number-pad"}
                            touch={touched.phone}
                            error={errors.phone}
                            maxLength={10}
                        />
                        <PasswordField
                            icon={"key-variant"}
                            onChangeText={handleChange("password")}
                            onBlur={() => setFieldTouched("password")}
                            value={values.password}
                            touch={touched.password}
                            error={errors.password}
                            placeHolder={"Password"}
                        />
                        <FormButton onPress={handleSubmit}>Signup</FormButton>
                    </>
                )}
            </Formik>
            <Flex
                direction="row"
                alignItems={"center"}
                justifyContent={"center"}
                mt={2}>
                <Text>Already have an account, </Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text color={"primary.600"}>Click Here</Text>
                </Pressable>
            </Flex>
        </Container>
    );
};

export default SignupScreen;
