import {
    Actionsheet,
    Avatar,
    Box,
    Pressable,
    ScrollView,
    Text,
    useToast,
} from "native-base";
import React, {useState} from "react";
import {Container} from "../../components/common/Container";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Formik} from "formik";
import InputField from "../../components/Form/InputField";
import {FormButton} from "../../components/Form/FormButton";
import RadioGroup from "../../components/Form/RadioGroup";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import DateField from "../../components/Form/DateField";
import {accountFormSchema} from "../../validation/AccountValidation";
import {
    accountCreate,
    accountUpdate,
} from "../../features/account/accountSlice";
import {useNavigation} from "@react-navigation/native";
import {hasAccount} from "../../features/auth/authSlice";
import {ToastAlert} from "../../components/common/ToastAlert";
import {GoBackBtn} from "../../components/common/GoBackBtn";
import ImagePicker, {Image, Options} from "react-native-image-crop-picker";

export const AccountForm = () => {
    const dispatch = useAppDispatch();

    const auth = useAppSelector(state => state.auth.user);

    const {isLoading} = useAppSelector(state => state.account);

    const {user} = auth ?? {};

    const toast = useToast();

    const navigation: any = useNavigation();

    const accountData = useAppSelector(state => state.account.account);

    const [image, setImage] = useState<Image["path"]>(
        accountData?.image ? (accountData?.image as string) : "",
    );

    const [action, setAction] = useState(false);

    const imageCropperSettings: Options = {
        width: 300,
        height: 400,
        cropping: true,
        cropperActiveWidgetColor: "#e63946",
        mediaType: "photo",
        showCropFrame: false,
        freeStyleCropEnabled: true,
        cropperToolbarTitle: "Upload a photo",
        cropperToolbarWidgetColor: "#e63946",
        cropperCircleOverlay: true,
    };

    const handleImagePicker = () => {
        ImagePicker.openPicker(imageCropperSettings).then(image => {
            setImage(image.path);
            setAction(false);
        });
    };

    const handleImageUpload = () => {
        ImagePicker.openCamera(imageCropperSettings).then(image => {
            setImage(image.path);
            setAction(false);
        });
    };

    return (
        <Container>
            <ScrollView>
                <GoBackBtn is_relative />
                <Pressable onPress={() => setAction(true)}>
                    <Actionsheet
                        isOpen={action}
                        onClose={() => setAction(false)}>
                        <Actionsheet.Content>
                            <Actionsheet.Item
                                onPress={() => handleImagePicker()}
                                startIcon={
                                    <Icon
                                        name="photo-album"
                                        size={24}
                                        color="red"
                                    />
                                }>
                                Choose From Album
                            </Actionsheet.Item>
                            <Actionsheet.Item
                                onPress={() => handleImageUpload()}
                                startIcon={
                                    <Icon
                                        name="camera-alt"
                                        size={24}
                                        color="red"
                                    />
                                }>
                                Take a Picture
                            </Actionsheet.Item>
                            <Actionsheet.Item
                                startIcon={
                                    <Icon
                                        name="highlight-remove"
                                        size={24}
                                        color="red"
                                    />
                                }
                                onPress={() => setAction(false)}>
                                Cancel
                            </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
                    <Box alignSelf={"center"}>
                        {image ? (
                            <>
                                <Avatar
                                    bg="grey.500"
                                    mt={4}
                                    size="xl"
                                    justifyContent={"center"}
                                    source={{
                                        uri: image,
                                    }}
                                />
                                <Pressable
                                    right={0}
                                    top={2}
                                    position={"absolute"}
                                    bg="red.500"
                                    onPress={() => setImage("")}
                                    rounded={"full"}>
                                    <Icon
                                        name="highlight-remove"
                                        size={24}
                                        color="white"
                                    />
                                </Pressable>
                            </>
                        ) : (
                            <Avatar
                                bg="grey.500"
                                alignSelf="center"
                                mt={4}
                                size="xl"
                                source={require("../../../assets/Images/profilePlaceholder.jpg")}
                            />
                        )}
                        <Box
                            alignSelf={"center"}
                            bottom={0}
                            p={1}
                            position={"absolute"}
                            bg="red.500"
                            rounded={"full"}>
                            <Icon name="camera-alt" size={24} color="white" />
                        </Box>
                    </Box>
                </Pressable>
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
                            image: [],
                            email: accountData?.email ?? "",
                            gender: accountData?.gender ?? "",
                            address: accountData?.address ?? "",
                            secondary_address:
                                accountData?.secondary_address ?? "",
                            date_of_birth: accountData?.date_of_birth
                                ? new Date(String(accountData?.date_of_birth))
                                : (null as unknown as Date),
                        }}
                        validationSchema={accountFormSchema}
                        onSubmit={async (values, actions) => {
                            const formData = new FormData();
                            const accountPayload = {
                                ...values,
                                date_of_birth: values.date_of_birth
                                    .toISOString()
                                    .substring(0, 10),
                            };

                            Object.entries(accountPayload).forEach(entry => {
                                const [key, value] = entry;
                                formData.append(key, value);
                            });
                            if (image) {
                                console.log("ghjghjghjghjg");
                                formData.append("image", {
                                    uri: image,
                                    name: "image.jpg",
                                    type: "image/jpeg",
                                });
                            }
                            //Check if account exist to call post or patch method
                            if (accountData && user) {
                                const {payload, meta} = await dispatch(
                                    accountUpdate({
                                        id: user.id,
                                        data: formData,
                                    }),
                                );
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
                                if (meta.requestStatus === "fulfilled") {
                                    navigation.push("AccountScreen");
                                    toast.show({
                                        render: () => {
                                            return (
                                                <ToastAlert
                                                    status={"success"}
                                                    title={"Account Updated"}
                                                    description={
                                                        payload.message
                                                    }
                                                />
                                            );
                                        },
                                    });
                                }
                            } else {
                                const {payload, meta} = await dispatch(
                                    accountCreate(formData),
                                );
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
                                if (meta.requestStatus === "fulfilled") {
                                    dispatch(hasAccount());
                                    navigation.push("AccountScreen");
                                    toast.show({
                                        render: () => {
                                            return (
                                                <ToastAlert
                                                    status={"success"}
                                                    title={"Account Created"}
                                                    description={
                                                        payload.message
                                                    }
                                                />
                                            );
                                        },
                                    });
                                }
                            }
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
                                    value={values.gender}
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
