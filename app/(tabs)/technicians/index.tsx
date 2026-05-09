import NavigationButton from "@/components/NavigationButton";
import PageHeader from "@/components/PageHeader ";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

const TechnicianImage = require("@/assets/images/technician.png");

const DATA = [
    { id: "1", firstName: "Técnico 1", lastName: "Apellido 1" },
    { id: "2", firstName: "Técnico 2", lastName: "Apellido 2" },
    { id: "3", firstName: "Técnico 3", lastName: "Apellido 3" },
    { id: "4", firstName: "Técnico 4", lastName: "Apellido 4" },
    { id: "5", firstName: "Técnico 5", lastName: "Apellido 5" },
    { id: "6", firstName: "Técnico 6", lastName: "Apellido 6" },
    { id: "7", firstName: "Técnico 7", lastName: "Apellido 7" },
];

const Technicians = () => {
    return (
        <View className="flex-1 bg-white p-3">
            {/* Header */}
            <PageHeader title="Técnicos" />

            <View className="mt-5 w-48">
                <NavigationButton
                    href="/technicians/create"
                    label="Nuevo Técnico"
                    icon={<FontAwesome6 name="plus" size={20} color="white" />}
                    className="bg-amber-500 border-amber-500"
                    iconPosition="left"
                    textClassName="text-white"
                />
            </View>

            <FlatList
                className="mt-3"
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link href={`/technicians/${item.id}`}>
                        <View className="flex-row items-center gap-x-4 bg-white py-6 border-slate-300 border-b">
                            <Image
                                source={TechnicianImage}
                                className="rounded-lg w-16 h-16"
                                contentFit="cover"
                            />

                            <View className="flex-1 justify-center gap-1.5">
                                <Text className="font-bold uppercase">
                                    {item.firstName} {item.lastName}
                                </Text>
                                <View className="gap-1">
                                    <View className="flex-row">
                                        <Text className="font-bold text-sm uppercase">
                                            DNI:{" "}
                                        </Text>
                                        <Text className="flex-1 text-sm">
                                            12345678
                                        </Text>
                                    </View>
                                    <View className="flex-row">
                                        <Text className="font-bold text-sm uppercase">
                                            Nº de Teléfono:{" "}
                                        </Text>
                                        <Text className="flex-1 text-sm">
                                            987654321
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Text className="top-3 right-0 absolute text-gray-500 text-sm">
                                Creado: 12 Mar 2024
                            </Text>

                            <View className="right-0 bottom-3 absolute flex-row items-center gap-2">
                                <Text className="font-semibold text-amber-500">
                                    Ver detalle
                                </Text>
                                <FontAwesome6
                                    name="arrow-right-long"
                                    size={20}
                                    color="#f59e0b"
                                />
                            </View>
                        </View>
                    </Link>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default Technicians;
