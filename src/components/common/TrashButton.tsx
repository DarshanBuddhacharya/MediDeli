import {Popover, Button, Pressable, useDisclose} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export const TrashButton = () => {
    const {isOpen, onClose, onOpen} = useDisclose();
    return (
        <>
            <Popover
                isOpen={isOpen}
                onClose={onClose}
                trigger={triggerProps => {
                    return (
                        <Pressable
                            {...triggerProps}
                            onPress={onOpen}
                            android_ripple={{
                                color: "#d52d3a",
                                radius: 12,
                            }}>
                            <Icon
                                name="trash-outline"
                                size={24}
                                color={"#d52d3a"}
                            />
                        </Pressable>
                    );
                }}>
                <Popover.Content accessibilityLabel="Clear Item" w="56">
                    <Popover.Arrow />
                    <Popover.CloseButton />
                    <Popover.Header>Clear Item</Popover.Header>
                    <Popover.Body>
                        Are you sure you want clear this item
                    </Popover.Body>
                    <Popover.Footer justifyContent="flex-end">
                        <Button.Group space={2}>
                            <Button
                                colorScheme="coolGray"
                                variant="ghost"
                                onPress={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger">Clear</Button>
                        </Button.Group>
                    </Popover.Footer>
                </Popover.Content>
            </Popover>
        </>
    );
};
