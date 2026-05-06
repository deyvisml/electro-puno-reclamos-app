import { Image } from "expo-image";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const ElectroPunoLogo = require("@/assets/images/electro-puno-logo.png");

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            // 🔥 Simulación de carga (ej: AsyncStorage, API, etc.)
            await new Promise((res) => setTimeout(res, 3000));

            const logged = false; // ← aquí tu lógica real
            setIsLogged(logged);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-white border border-red-500">
                <Image
                    source={ElectroPunoLogo}
                    className="w-full h-24"
                    contentFit="contain"
                />
                <ActivityIndicator className="mt-6" size="large" />
            </View>
        );
    }

    return isLogged ? (
        <Redirect href="/(tabs)/requests" />
    ) : (
        <Redirect href="/(auth)/login" />
    );
}
