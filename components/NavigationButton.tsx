import React from "react";
import { Text, View } from "react-native";

import { Href, Link } from "expo-router";

type NavigationButtonProps = {
    href: Href;
    label: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    className?: string;
    textClassName?: string;
};

const NavigationButton = ({
    href,
    label,
    icon,
    iconPosition = "right",
    className = "bg-slate-100 border border-slate-200",
    textClassName = "text-black",
}: NavigationButtonProps) => {
    return (
        <View className="flex-1 h-14">
            <Link href={href} className="w-full h-full">
                <View
                    className={`
                w-full
                h-full
                flex-row
                justify-center
                items-center
                gap-2
                rounded-lg
                ${className}
            `}
                >
                    {icon && iconPosition === "left" && icon}

                    <Text
                        className={`
                    font-bold
                    text-center
                    uppercase
                    ${textClassName}
                `}
                    >
                        {label}
                    </Text>

                    {icon && iconPosition === "right" && icon}
                </View>
            </Link>
        </View>
    );
};

export default NavigationButton;
