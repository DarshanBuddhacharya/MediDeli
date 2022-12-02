import {useNavigation} from "@react-navigation/native";
import {Flex, Box, Modal, Pressable, Text} from "native-base";
import React, {useState} from "react";
import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const CustomTabButton = () => {
    const [showModal, setShowModal] = useState(false);

    const navigation = useNavigation();
    return (
        <>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(!showModal)}
                _backdrop={{
                    _dark: {
                        bg: "coolGray.800",
                    },
                    bg: "warmGray.200",
                    opacity: 0.4,
                }}>
                <Modal.Content maxWidth="300">
                    <Modal.Header>Search By</Modal.Header>
                    <Modal.Body>
                        <Pressable
                            mb={2}
                            android_ripple={{
                                color: "#fde3e5",
                                borderless: true,
                            }}>
                            <Flex direction="row" alignItems={"center"}>
                                <Icon
                                    name={"globe-model"}
                                    size={30}
                                    color={"#e63946"}
                                />
                                <Text pl={2}>Product</Text>
                            </Flex>
                        </Pressable>
                        <Pressable
                            mb={2}
                            android_ripple={{
                                color: "#fde3e5",
                                borderless: true,
                            }}>
                            <Flex direction="row" alignItems={"center"}>
                                <Icon
                                    name={"view-grid-outline"}
                                    size={30}
                                    color={"#e63946"}
                                />
                                <Text pl={2}>Category</Text>
                            </Flex>
                        </Pressable>
                        <Pressable
                            mb={2}
                            android_ripple={{
                                color: "#fde3e5",
                                borderless: true,
                            }}>
                            <Flex direction="row" alignItems={"center"}>
                                <Icon
                                    name={"shopping"}
                                    size={30}
                                    color={"#e63946"}
                                />
                                <Text pl={2}>Brand</Text>
                            </Flex>
                        </Pressable>
                        <Pressable
                            mb={2}
                            android_ripple={{
                                color: "#fde3e5",
                                borderless: true,
                            }}>
                            <Flex direction="row" alignItems={"center"}>
                                <Icon
                                    name={"camera"}
                                    size={30}
                                    color={"#e63946"}
                                />
                                <Text pl={2}>Camera</Text>
                            </Flex>
                        </Pressable>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <TouchableOpacity
                style={{
                    top: -15,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => setShowModal(true)}>
                <Box
                    height={70}
                    width={70}
                    bg={"primary.500"}
                    alignItems={"center"}
                    borderRadius={10}
                    justifyContent={"center"}>
                    <Icon name={"shopping-search"} size={32} color={"#fff"} />
                </Box>
            </TouchableOpacity>
        </>
    );
};
