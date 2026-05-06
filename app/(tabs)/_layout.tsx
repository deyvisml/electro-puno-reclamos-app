import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

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
                tabBarActiveTintColor: "#f59e0b",
                tabBarInactiveTintColor: "gray",
            }}
            safeAreaInsets={{ bottom: 0 }}
        >
            <Tabs.Screen
                name="requests"
                options={{
                    title: "Reclamos",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="file-clock-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="create-request"
                options={{
                    title: "Crear Reclamo",
                    tabBarIcon: () => (
                        <View className="justify-center items-center bg-red-700 border border-red-500">
                            <View className="-top-16 absolute justify-center items-center bg-amber-500 border-4 border-gray-200 rounded-full w-20 h-20">
                                <Entypo name="plus" size={40} color="white" />
                            </View>
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
