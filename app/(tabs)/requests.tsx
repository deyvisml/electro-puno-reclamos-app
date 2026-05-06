import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Requests = () => {
    return (
        <View>
            <Text>requests</Text>
            <Link href="/login">
                <Text>Go to Login</Text>
            </Link>
        </View>
    );
};

export default Requests;
