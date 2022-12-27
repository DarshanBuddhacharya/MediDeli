import {REACT_APP_DEV_MODE} from "@env";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import axios from "axios";
import {Formik} from "formik";
import {Box, Flex, Pressable, Text, useToast} from "native-base";
import React, {useEffect} from "react";
import {Image, ScrollView} from "react-native";
import {Container} from "../../components/common/Container";
import {ToastAlert} from "../../components/common/ToastAlert";
import {FormButton} from "../../components/Form/FormButton";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import {SignupFormSchema} from "../../validation/SignupValidation";
import {useDispatch} from "react-redux";
import {reset, signup} from "../../features/auth/authSlice";
import {useAppDispatch, useAppSelector} from "../../features/hooks";

export type RootStackParamList = {
    Login: undefined;
};

const SignupScreen = ({
    navigation,
}: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}) => {
    const dispatch = useAppDispatch();

    const {isError, message, isLoading} = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(reset());
    }, []);

    return (
        <Container>
            <ScrollView>
                <Box alignItems={"center"} mt={5}>
                    <Image
                        source={require("../../../assets/Images/logo-name.png")}
                        style={{width: 200, height: 120}}
                    />
                </Box>
                <Formik
                    initialValues={{
                        full_name: "",
                        phone: "",
                        password: "",
                        password2: "",
                    }}
                    validationSchema={SignupFormSchema}
                    onSubmit={value => {
                        dispatch(signup(value));
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
                                onChangeText={handleChange("full_name")}
                                onBlur={() => setFieldTouched("full_name")}
                                value={values.full_name}
                                icon={"account"}
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
                            <PasswordField
                                icon={"key-variant"}
                                onChangeText={handleChange("password2")}
                                onBlur={() => setFieldTouched("password2")}
                                value={values.password2}
                                touch={touched.password2}
                                error={errors.password2}
                                placeHolder={"Password"}
                            />
                            <FormButton onPress={handleSubmit}>
                                Signup
                            </FormButton>
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
                {isError && (
                    <Box mt={10}>
                        <ToastAlert
                            title={"Signup Error"}
                            description={message as string}
                            status={"error"}
                        />
                    </Box>
                )}
            </ScrollView>
        </Container>
    );
};

export default SignupScreen;
