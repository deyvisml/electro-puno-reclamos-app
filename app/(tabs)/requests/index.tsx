import PageHeader from "@/components/PageHeader ";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const DATA = [
    { id: "1", title: "Reclamo 1" },
    { id: "2", title: "Reclamo 2" },
    { id: "3", title: "Reclamo 3" },
    { id: "4", title: "Reclamo 4" },
    { id: "5", title: "Reclamo 5" },
];

const Requests = () => {
    return (
        <View className="flex-1 bg-white p-3">
            {/* Header */}
            <PageHeader title="Reclamos" />
            <Link href="/login">Login</Link>

            <View className="flex-row flex-wrap gap-1 mt-4">
                {[
                    "Todos",
                    "Pendientes",
                    "Asignados",
                    "En proceso",
                    "Completados",
                ].map((item) => (
                    <Pressable
                        key={item}
                        className="bg-white px-4 py-2 border border-slate-300 rounded-full"
                    >
                        <Text>{item}</Text>
                    </Pressable>
                ))}
            </View>
            <FlatList
                className="mt-4"
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link href={`/requests/${item.id}`}>
                        <View className="flex-row items-center gap-2 bg-white py-4 border-slate-300 border-b">
                            <Image
                                source={{
                                    uri: "https://www.adobe.com/acrobat/hub/media_173d13651460eb7e12c0ef4cf8410e0960a20f0ee.jpg",
                                }}
                                className="rounded-lg w-28 h-28"
                                contentFit="cover"
                            />

                            <View className="flex-1 justify-center gap-1.5">
                                <Text className="font-light">Ticket #123</Text>
                                <Text className="font-bold uppercase">
                                    Reconexión
                                </Text>
                                <View className="gap-1">
                                    <View className="flex-row">
                                        <Text className="font-bold text-sm uppercase">
                                            Ubicación:{" "}
                                        </Text>
                                        <Text className="flex-1 text-sm">
                                            Av. Ejemplo 123, Puno Lorem
                                        </Text>
                                    </View>
                                    <View className="flex-row">
                                        <Text className="font-bold text-sm uppercase">
                                            Técnico:{" "}
                                        </Text>
                                        <Text className="flex-1 text-sm">
                                            Juan Pérez
                                        </Text>
                                    </View>
                                    <View className="flex-row">
                                        <Text className="font-bold text-sm uppercase">
                                            Estado:{" "}
                                        </Text>
                                        <Text className="flex-1 text-sm">
                                            En proceso
                                        </Text>
                                    </View>
                                    <View className="flex-row">
                                        <Text className="font-bold text-sm uppercase">
                                            Plazo:{" "}
                                        </Text>
                                        <Text className="flex-1 text-sm">
                                            14 dias
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

export default Requests;
