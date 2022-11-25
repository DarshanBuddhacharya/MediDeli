import {Center, Heading, Image} from "native-base";
import React from "react";
import {ImageSourcePropType} from "react-native";
import Button from "../common/Button";

type FallBackProps = {
    title: string;
    imageUrl: ImageSourcePropType;
    link: string;
};

export const Fallback = ({title, imageUrl, link}: FallBackProps) => {
    return (
        <Center pt={20}>
            <Heading w={"60%"} textAlign="center">
                {title}
            </Heading>
            <Image
                source={imageUrl}
                style={{width: "80%", height: 300}}
                alt={"whishlist-empty"}
                py={3}
            />
            <Button link={link}>Add an Item</Button>
        </Center>
    );
};
