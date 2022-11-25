import {Popover, Button, Pressable, useDisclose} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {ProductProps} from "../../../types/ProductProps";
import {useAppDispatch} from "../../features/hooks";
import {change} from "../../features/wishListSlice";

export const WishListButton = ({
    clearId,
}: {
    clearId: ProductProps["results"][0];
}) => {
    const {isOpen, onClose, onOpen} = useDisclose();

    const dispatch = useAppDispatch();
    return (
        <>
            <Popover
                isOpen={isOpen}
                onClose={onClose}
                placement={"bottom right"}
                trigger={triggerProps => {
                    return (
                        <Pressable
                            {...triggerProps}
                            onPress={onOpen}
                            android_ripple={{
                                color: "#d52d3a",
                                radius: 12,
                            }}>
                            <Icon name="heart" size={24} color={"#d52d3a"} />
                        </Pressable>
                    );
                }}>
                <Popover.Content accessibilityLabel="Clear Item" w="56" mr={-3}>
                    <Popover.Arrow />
                    <Popover.CloseButton />
                    <Popover.Header>Remove From Wishlist</Popover.Header>
                    <Popover.Body>
                        Are you sure you want remove this item
                    </Popover.Body>
                    <Popover.Footer justifyContent="flex-end">
                        <Button.Group space={2}>
                            <Button
                                colorScheme="coolGray"
                                variant="ghost"
                                onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="danger"
                                onPress={() => {
                                    dispatch(change(clearId));
                                    onClose();
                                }}>
                                Remove
                            </Button>
                        </Button.Group>
                    </Popover.Footer>
                </Popover.Content>
            </Popover>
        </>
    );
};
