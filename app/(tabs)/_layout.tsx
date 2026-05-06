import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const LogoHorizontal = require("@/assets/images/electro-puno-horizontal-logo.png");

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                header: () => (
                    <View className="justify-center items-center bg-white border-slate-300 border-b w-full h-20">
                        <Image
                            source={LogoHorizontal}
                            className="w-screen h-10"
                            contentFit="contain"
                        />
                    </View>
                ),
            }}
            safeAreaInsets={{ bottom: 0 }}
        ></Tabs>
    );
};

export default TabLayout;
