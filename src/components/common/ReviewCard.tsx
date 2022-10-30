import {Avatar, Box, Flex, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const ReviewCard = () => {
    return (
        <Box
            flexDirection={"row"}
            borderWidth={1}
            mt={2}
            borderRadius={15}
            borderColor="primary.600"
            p={2}>
            <Avatar
                bg="green.500"
                source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
            />
            <Box marginLeft={4}>
                <Text>Nancy Bahadur</Text>
                <Flex direction="row" mt={1}>
                    <Icon name="star" color={"gold"} />
                    <Icon name="star" color={"gold"} />
                </Flex>
                <Text fontWeight={200} fontSize={14} mt={3} width={250}>
                    Very Good product I like it very Nicely lol dfsdf dfd
                </Text>
            </Box>
        </Box>
    );
};

export default ReviewCard;
