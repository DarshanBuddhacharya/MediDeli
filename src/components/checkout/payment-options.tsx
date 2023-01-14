import {Actionsheet, Box, Center, Flex, Radio, Text, View} from "native-base";
import {StyleSheet} from "react-native";

import {PAYMENT_METHODS} from "../../../constants/PaymentMethods";
import {useState} from "react";
import Button from "../common/Button";

export interface PaymentOptionProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export const PaymentOptions = ({isOpen, onClose}: PaymentOptionProps) => {
    const [value, setValue] = useState("one");
    return (
        <Center>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text
                            fontSize="16"
                            color="gray.500"
                            _dark={{
                                color: "gray.300",
                            }}>
                            Payment Methods
                        </Text>
                    </Box>
                    <Radio.Group
                        name="myRadioGroup"
                        accessibilityLabel="favorite number"
                        value={value}
                        onChange={nextValue => {
                            setValue(nextValue);
                        }}>
                        <View px={4} style={[styles.container]}>
                            {PAYMENT_METHODS.map((item, key) => (
                                <View key={key} style={styles.item}>
                                    <Radio value={item.slug} my={1}>
                                        <Text>{item.name}</Text>
                                    </Radio>
                                </View>
                            ))}
                        </View>
                    </Radio.Group>
                    <Button width={"90%"} my={5} link={""}>
                        Confirm
                    </Button>
                </Actionsheet.Content>
            </Actionsheet>
        </Center>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    item: {
        width: "50%",
    },
});
