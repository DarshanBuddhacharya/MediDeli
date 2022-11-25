import {Center, Button, Modal, Pressable} from "native-base";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {clear} from "../../features/cartSlice";
import {useAppDispatch, useAppSelector} from "../../features/hooks";

export const ClearButton = () => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useAppDispatch();

    const cartCount = useAppSelector(state => state.cart.totalItems);
    return (
        <Center>
            <Pressable
                android_ripple={{
                    color: "#d52d3a",
                    borderless: true,
                    radius: 25,
                }}
                bg={"primary.500"}
                alignItems={"center"}
                justifyContent={"center"}
                isDisabled={cartCount <= 0 ? true : false}
                _disabled={{bg: "primary.200"}}
                borderRadius={10}
                mr={2}
                onPress={() => setShowModal(true)}
                h={10}
                w={10}>
                <Icon name={"cart-remove"} size={24} color={"#ffff"} />
            </Pressable>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                _backdrop={{
                    _dark: {
                        bg: "coolGray.800",
                    },
                    bg: "warmGray.200",
                    opacity: 0.4,
                }}>
                <Modal.Content maxWidth="350" maxH="212">
                    <Modal.CloseButton />
                    <Modal.Header>Clear Cart</Modal.Header>
                    <Modal.Body>
                        Are you sure you want to clear the cart?. This action is
                        irreversible.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal(false);
                                }}>
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    setShowModal(false);
                                    dispatch(clear());
                                }}>
                                Clear
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    );
};
