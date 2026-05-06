import "@/lib/nativewind";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./../global.css";

const RootLayout = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView
                className="flex-1 bg-amber-500"
                edges={["top", "bottom"]}
            >
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default RootLayout;
