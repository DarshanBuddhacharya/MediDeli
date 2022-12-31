import {Avatar, Box, ScrollView, useToast} from "native-base";
import React, {useCallback, useEffect, useState} from "react";
import {Container} from "../components/common/Container";
import {Formik} from "formik";
import InputField from "../components/Form/InputField";
import {FormButton} from "../components/Form/FormButton";
import RadioGroup from "../components/Form/RadioGroup";
import {useAppDispatch, useAppSelector} from "../features/hooks";
import DateField from "../components/Form/DateField";
import {accountFormSchema} from "../validation/AccountValidation";
import {accountCreate, reset} from "../features/account/accountSlice";
import {useNavigation} from "@react-navigation/native";
import {hasAccount} from "../features/auth/authSlice";
import {ToastAlert} from "../components/common/ToastAlert";
import {GoBackBtn} from "../components/common/GoBackBtn";

export const AccountForm = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(reset());
    }, []);

    const auth = useAppSelector(state => state.auth.user);

    const {isLoading} = useAppSelector(state => state.account);

    const {user} = auth ?? {};

    const toast = useToast();

    const navigation: any = useNavigation();

    return (
        <Container>
            <ScrollView>
                <GoBackBtn />
                <Avatar
                    bg="green.500"
                    alignSelf="center"
                    mt={4}
                    size="xl"
                    source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    }}
                />
                <Box bg={"white"} p={5} rounded={"md"} shadow={5} my={5}>
                    <InputField
                        label={"Full Name"}
                        value={user?.full_name ?? ""}
                        varient={"filled"}
                        icon={"account"}
                        placeHolder={"Full Name"}
                        isDisabled
                    />
                    <InputField
                        label={"Phone Number"}
                        value={user?.phone ?? ""}
                        varient={"filled"}
                        icon={"phone"}
                        placeHolder={"Phone Number"}
                        isDisabled
                    />
                    <Formik
                        initialValues={{
                            image: null,
                            email: "",
                            gender: "",
                            address: "",
                            secondary_address: "",
                            date_of_birth: null as unknown as Date,
                        }}
                        validationSchema={accountFormSchema}
                        onSubmit={async (values, actions) => {
                            const accountPayload = {
                                ...values,
                                date_of_birth: values.date_of_birth
                                    .toISOString()
                                    .substring(0, 10),
                            };
                            const {payload, meta} = await dispatch(
                                accountCreate(accountPayload),
                            );

                            if (meta.requestStatus === "fulfilled") {
                                dispatch(hasAccount());
                                navigation.push("AccountScreen");
                                toast.show({
                                    render: () => {
                                        return (
                                            <ToastAlert
                                                status={"success"}
                                                title={"Account Created"}
                                                description={payload.message}
                                            />
                                        );
                                    },
                                });
                            }

                            actions.setFieldError(
                                "date_of_birth",
                                payload?.date_of_birth &&
                                    payload.date_of_birth[0],
                            );
                            actions.setFieldError(
                                "gender",
                                payload?.image && payload.image[0],
                            );
                            actions.setFieldError(
                                "email",
                                payload?.email && payload.email[0],
                            );
                        }}>
                        {({
                            handleChange,
                            values,
                            setFieldValue,
                            touched,
                            handleSubmit,
                            errors,
                            setFieldTouched,
                        }) => (
                            <>
                                <InputField
                                    onChangeText={handleChange("email")}
                                    onBlur={() => setFieldTouched("email")}
                                    label={"Email"}
                                    value={values.email}
                                    icon={"email-outline"}
                                    placeHolder={"Email"}
                                    touch={touched.email}
                                    error={errors.email}
                                    maxLength={100}
                                />
                                <RadioGroup
                                    onChange={value =>
                                        setFieldValue("gender", value)
                                    }
                                    name={"gender"}
                                    label={"Gender"}
                                    onBlur={() => setFieldTouched("gender")}
                                    touch={touched.gender}
                                    error={errors.gender}
                                />
                                <DateField
                                    onChange={value => {
                                        setFieldValue("date_of_birth", value);
                                    }}
                                    label={"Date of Birth"}
                                    onBlur={() =>
                                        setFieldTouched("date_of_birth")
                                    }
                                    name={"date_of_birth"}
                                    value={values.date_of_birth ?? new Date()}
                                    touch={touched.date_of_birth as boolean}
                                    error={errors.date_of_birth as string}
                                />
                                <FormButton
                                    isSubmitting={isLoading}
                                    onPress={() => {
                                        handleSubmit();
                                    }}>
                                    Submit
                                </FormButton>
                            </>
                        )}
                    </Formik>
                </Box>
            </ScrollView>
        </Container>
    );
};
