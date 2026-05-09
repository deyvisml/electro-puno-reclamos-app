import React from "react";
import { Alert, Linking, Pressable, Text, View } from "react-native";

type ProfileLinkItemProps = {
    label: string;
    url: string;
    icon: React.ReactNode;
    disabled?: boolean;
};

const ProfileLinkItem = ({
    label,
    url,
    icon,
    disabled = false,
}: ProfileLinkItemProps) => {
    const handlePress = async () => {
        try {
            const supported = await Linking.canOpenURL(url);

            if (!supported) {
                Alert.alert(
                    "Enlace no disponible",
                    "No se pudo abrir el enlace.",
                );
                return;
            }

            await Linking.openURL(url);
        } catch {
            Alert.alert("Error", "Ocurrió un problema al abrir el enlace.");
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            disabled={disabled}
            className={`${disabled ? "opacity-50" : "active:bg-slate-50"}`}
        >
            <View className="flex-row items-center py-4">
                {/* ICON */}
                <View className="justify-center w-12">{icon}</View>

                {/* LABEL */}
                <Text className="flex-1 text-slate-800">{label}</Text>
            </View>
        </Pressable>
    );
};

export default ProfileLinkItem;
