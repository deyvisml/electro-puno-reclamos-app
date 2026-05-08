import PageHeader from "@/components/PageHeader ";
import ProfileLinkItem from "@/components/ProfileLinkItem";
import ProfileOptionItem from "@/components/ProfileOptionItem";
import {
    FontAwesome6,
    MaterialCommunityIcons,
    MaterialIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Profile = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="p-3 bg-white flex-grow "
        >
            {/* Header */}
            <PageHeader title="Perfil" />

            <View className="mt-4">
                <ProfileOptionItem
                    label="Actualizar Perfil"
                    icon={
                        <FontAwesome6 name="user" size={26} color="#334155" />
                    }
                    onPress={() => {
                        alert("Actualizar Perfil");
                    }}
                />

                <ProfileOptionItem
                    label="Cerrar la sesión"
                    icon={
                        <MaterialIcons
                            name="exit-to-app"
                            size={26}
                            color="#334155"
                        />
                    }
                    showArrow={false}
                    onPress={() => {
                        alert("Cerrar la sesión");
                    }}
                />
            </View>

            <View className="mt-16">
                <Text className="font-bold text-3xl">Contáctanos</Text>

                <View className="mt-4">
                    <ProfileLinkItem
                        label="123 456 789"
                        url="tel:+51123456789"
                        icon={
                            <MaterialCommunityIcons
                                name="phone-outline"
                                size={26}
                                color="#334155"
                            />
                        }
                    />

                    <ProfileLinkItem
                        label="@electropuno"
                        url="https://facebook.com/empresa"
                        icon={
                            <SimpleLineIcons
                                name="social-facebook"
                                size={26}
                                color="#334155"
                            />
                        }
                    />

                    <ProfileLinkItem
                        label="@tiktokelectropuno"
                        url="https://tiktok.com/@tiktokelectropuno"
                        icon={
                            <MaterialIcons
                                name="tiktok"
                                size={26}
                                color="#334155"
                            />
                        }
                    />

                    <ProfileLinkItem
                        label="Av. Ejemplo 123, Puno"
                        url="https://maps.google.com/?q=Av.+Ejemplo+123,+Puno"
                        icon={
                            <SimpleLineIcons
                                name="map"
                                size={26}
                                color="#334155"
                            />
                        }
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;
