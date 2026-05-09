import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type ProfileOptionItemProps = {
    label: string;
    icon: React.ReactNode;
    onPress?: () => void;
    showArrow?: boolean;
    rightElement?: React.ReactNode;
    danger?: boolean;
    disabled?: boolean;
};

const ProfileOptionItem = ({
    label,
    icon,
    onPress,
    showArrow = true,
    rightElement,
    danger = false,
    disabled = false,
}: ProfileOptionItemProps) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={`${disabled ? "opacity-50" : "active:bg-slate-50"}`}
        >
            <View className="flex-row items-center py-4">
                {/* ICON */}
                <View className="justify-center w-12">{icon}</View>

                {/* LABEL */}
                <Text
                    className={`flex-1  ${
                        danger ? "text-red-500" : "text-slate-800"
                    }`}
                >
                    {label}
                </Text>

                {/* RIGHT */}
                {rightElement}

                {!rightElement && showArrow && (
                    <FontAwesome6
                        name="angle-right"
                        size={20}
                        color="#64748b"
                    />
                )}
            </View>
        </Pressable>
    );
};

export default ProfileOptionItem;
