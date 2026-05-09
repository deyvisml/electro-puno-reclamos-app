import clsx from "clsx";
import React from "react";
import { Pressable, Text, View } from "react-native";

type ActionButtonProps = {
    label: string;
    onPress?: () => void;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    className?: string;
    textClassName?: string;
    disabled?: boolean;
};
/**
 * This components doesn't works well, we need to wrap this in a View with a fixed height, the recomended height is 56px (h-14)
 */
const ActionButton = ({
    label,
    onPress,
    icon,
    iconPosition = "right",
    className = "bg-amber-500",
    textClassName = "text-white",
    disabled = false,
}: ActionButtonProps) => {
    return (
        <View className="flex-1 h-14">
            <Pressable
                onPress={onPress}
                disabled={disabled}
                className={clsx(
                    "flex-row justify-center items-center gap-2 rounded-lg w-full h-full",
                    className,
                    disabled && "opacity-50",
                )}
            >
                {icon && iconPosition === "left" && icon}

                <Text
                    className={clsx(
                        "font-bold text-center uppercase",
                        textClassName,
                    )}
                >
                    {label}
                </Text>

                {icon && iconPosition === "right" && icon}
            </Pressable>
        </View>
    );
};

export default ActionButton;
