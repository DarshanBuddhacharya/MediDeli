import {Formik} from "formik";
import {Box, Checkbox, Flex, Pressable, Text} from "native-base";
import React from "react";
import {Image} from "react-native";
import {Container} from "../../components/common/Container";
import {FormButton} from "../../components/Form/FormButton";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {loginFormSchema} from "../../validation/LoginValidation";

export type RootStackParamList = {
    Signup: undefined;
    Home: undefined;
};

const LoginScreen = ({
    navigation,
}: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Signup", "Home">;
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
                initialValues={{phone: "", password: ""}}
                validationSchema={loginFormSchema}
                onSubmit={values => {
                    console.log(values), navigation.navigate("Home");
                }}>
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
                        <Checkbox value="true" my={2}>
                            Remember me
                        </Checkbox>
                        <Pressable mt={2}>
                            <Text>Forgot Password?</Text>
                        </Pressable>
                        <FormButton onPress={handleSubmit}>Login</FormButton>
                    </>
                )}
            </Formik>
            <Flex
                direction="row"
                alignItems={"center"}
                justifyContent={"center"}
                mt={2}>
                <Text>Create a new Account, </Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text color={"primary.600"}>Click Here</Text>
                </Pressable>
            </Flex>
        </Container>
    );
};

export default LoginScreen;
