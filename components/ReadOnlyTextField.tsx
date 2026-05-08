import React from "react";
import { Text } from "react-native";

const ReadOnlyTextField = ({ value }: { value: string }) => {
    return <Text className="bg-slate-100 p-4">{value}</Text>;
};

export default ReadOnlyTextField;
