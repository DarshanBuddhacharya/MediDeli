import {
    Avatar,
    Box,
    Center,
    Heading,
    Image,
    Pressable,
    ScrollView,
    useColorMode,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useEffect} from "react";
import {logout} from "../features/auth/authSlice";
import {useAppDispatch, useAppSelector} from "../features/hooks";
import {Container} from "../components/common/Container";
import {NavList} from "../components/Settings/NavList";
import {
    ACCOUNT_COMPELETE_SETTINGS,
    ACCOUNT_SETTINGS,
    APP_SETTINGS,
    PAYMENT_SETTINGS,
} from "../../constants/SettingsData";
import Button from "../components/common/Button";
import {accountGet, reset} from "../features/account/accountSlice";
import {useNavigation} from "@react-navigation/native";

const Account = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(accountGet());
    }, []);

    const userData = useAppSelector(state => state.auth.user);

    const {user} = userData ?? {};

    const navigation: any = useNavigation();

    const {toggleColorMode} = useColorMode();

    return (
        <Container>
            <ScrollView>
                {user?.has_account ? (
                    <Box position={"relative"} mb={5}>
                        <Avatar
                            bg="green.500"
                            alignSelf="center"
                            mt={4}
                            size="xl"
                            source={{
                                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                            }}
                        />
                        <Heading alignSelf="center">{user?.full_name}</Heading>
                        <Pressable
                            position="absolute"
                            p={3}
                            shadow={5}
                            onPress={() => navigation.push("AccountForm")}
                            rounded="md"
                            bg={"primary.500"}
                            right={0}>
                            <Icon
                                name="account-edit-outline"
                                color={"white"}
                                size={28}
                            />
                        </Pressable>
                    </Box>
                ) : (
                    <Center py={5}>
                        <Heading textAlign="center">
                            Complete your profile
                        </Heading>
                        <Image
                            source={require("../../assets/Images/no-account.png")}
                            style={{height: 300}}
                            alt={"whishlist-empty"}
                        />
                        <Button link={"AccountForm"}>Complete Profile</Button>
                    </Center>
                )}

                <Box
                    _light={{bg: "white", borderColor: "coolGray.200"}}
                    _dark={{bg: "muted.800", borderColor: "coolGray.600"}}
                    rounded="md"
                    shadow={5}
                    px={3}
                    pt={2}
                    mb={4}>
                    <Heading>Account</Heading>
                    {user?.has_account &&
                        ACCOUNT_COMPELETE_SETTINGS().map((item, key) => (
                            <NavList
                                key={key}
                                List={item.List}
                                onPress={() => navigation.navigate(item.link)}
                                secondaryText={item?.secondaryText}
                                iconColor={item.iconColor}
                                iconName={item.iconName}
                            />
                        ))}
                    {ACCOUNT_SETTINGS.map((item, key) => (
                        <NavList
                            key={key}
                            List={item.List}
                            link={item.link}
                            iconColor={item.iconColor}
                            iconName={item.iconName}
                        />
                    ))}
                </Box>
                <Box
                    _light={{bg: "white", borderColor: "coolGray.200"}}
                    _dark={{bg: "muted.800", borderColor: "coolGray.600"}}
                    rounded="md"
                    shadow={5}
                    px={3}
                    pt={2}
                    mb={4}>
                    <Heading>Payment</Heading>
                    {PAYMENT_SETTINGS.map((item, key) => (
                        <NavList
                            key={key}
                            List={item.List}
                            link={item.link}
                            iconColor={item.iconColor}
                            iconName={item.iconName}
                        />
                    ))}
                </Box>
                <Box
                    _light={{bg: "white", borderColor: "coolGray.200"}}
                    _dark={{bg: "muted.800", borderColor: "coolGray.600"}}
                    rounded="md"
                    shadow={5}
                    px={3}
                    pt={2}
                    mb={4}>
                    <Heading>App settings</Heading>
                    <NavList
                        List={"Toggle Light/Dark Mode"}
                        iconColor={"#335C67"}
                        iconName={"white-balance-sunny"}
                        onPress={() => toggleColorMode()}
                    />
                    {APP_SETTINGS.map((item, key) => (
                        <NavList
                            key={key}
                            List={item.List}
                            link={item.link}
                            iconColor={item.iconColor}
                            iconName={item.iconName}
                        />
                    ))}
                </Box>
                <Box
                    _light={{bg: "white", borderColor: "coolGray.200"}}
                    _dark={{bg: "muted.800", borderColor: "coolGray.600"}}
                    rounded="md"
                    shadow={5}
                    px={3}
                    py={2}
                    mb={4}>
                    <Pressable
                        flexDirection={"row"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        onPress={() => {
                            dispatch(logout());
                            dispatch(reset());
                        }}>
                        <Heading>Logout</Heading>
                        <Icon name="logout" color={"red"} size={24} />
                    </Pressable>
                </Box>
            </ScrollView>
        </Container>
    );
};

export default Account;
