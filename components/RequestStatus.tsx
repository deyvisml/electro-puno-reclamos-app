import React from "react";
import { Text, View } from "react-native";

const RequestStatus = ({
    status,
    statusId,
}: {
    status: string;
    statusId: string;
}) => {
    let backgroundColor = "bg-gray-500";
    let textColor = "text-white";
    switch (statusId) {
        case "0":
            backgroundColor = "bg-gray-200";
            textColor = "text-black";
            break;
        case "1":
            backgroundColor = "bg-blue-400";
            break;
        case "2":
            backgroundColor = "bg-amber-500";
            break;
        case "3":
            backgroundColor = "bg-green-500";
            break;
    }

    return (
        <View className="flex-row justify-center items-center">
            <Text>Estado: </Text>
            <Text
                className={`${backgroundColor} ${textColor} px-2 py-1 rounded font-bold text-sm uppercase`}
            >
                {status}
            </Text>
        </View>
    );
};

export default RequestStatus;
