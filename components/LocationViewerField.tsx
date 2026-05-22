import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";

import MapView, { Marker } from "react-native-maps";

export type LocationValue = {
    latitude: number;
    longitude: number;
    address: string;
};

type LocationViewerFieldProps = {
    value: LocationValue | null;
};

const LocationViewerField = ({ value }: LocationViewerFieldProps) => {
    const mapRef = useRef<MapView>(null);

    if (!value) {
        return (
            <View className="justify-center items-center border border-slate-300 rounded-2xl h-40">
                <Ionicons name="location-outline" size={36} color="#94a3b8" />

                <Text className="mt-2 text-slate-500">
                    No hay ubicación registrada
                </Text>
            </View>
        );
    }

    const focusMarker = () => {
        mapRef.current?.animateToRegion({
            latitude: value.latitude,
            longitude: value.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    return (
        <View className="bg-white border border-slate-300 rounded-2xl overflow-hidden">
            {/* MAPA */}
            <View className="relative">
                <MapView
                    ref={mapRef}
                    style={{
                        width: "100%",
                        height: 300,
                    }}
                    initialRegion={{
                        latitude: value.latitude,
                        longitude: value.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: value.latitude,
                            longitude: value.longitude,
                        }}
                    />
                </MapView>

                {/* BOTÓN REENFOCAR */}
                <Pressable
                    onPress={focusMarker}
                    className="right-3 bottom-3 absolute justify-center items-center bg-white shadow border border-slate-200 rounded-full w-11 h-11"
                >
                    <Ionicons name="locate" size={20} color="#0f172a" />
                </Pressable>
            </View>

            {/* INFO */}
            <View className="gap-3 p-3">
                <View className="flex-row items-start">
                    <Ionicons name="location" size={16} color="#f59e0b" />

                    <Text
                        numberOfLines={2}
                        className="flex-1 ml-2 text-slate-600 text-sm"
                    >
                        {value.address}
                    </Text>
                </View>

                <View className="flex-row gap-2">
                    <View className="flex-1 bg-slate-50 px-3 py-2 rounded-lg">
                        <Text className="text-[10px] text-slate-400 uppercase">
                            Latitud
                        </Text>

                        <Text
                            numberOfLines={1}
                            className="text-slate-700 text-xs"
                        >
                            {value.latitude}
                        </Text>
                    </View>

                    <View className="flex-1 bg-slate-50 px-3 py-2 rounded-lg">
                        <Text className="text-[10px] text-slate-400 uppercase">
                            Longitud
                        </Text>

                        <Text
                            numberOfLines={1}
                            className="text-slate-700 text-xs"
                        >
                            {value.longitude}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LocationViewerField;
