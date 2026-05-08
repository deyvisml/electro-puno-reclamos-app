import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";

import MapView, { MapPressEvent, Marker } from "react-native-maps";

import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

export type LocationValue = {
    latitude: number;
    longitude: number;
    address: string;
};

type Props = {
    value: LocationValue | null;
    onChange: (location: LocationValue | null) => void;
};

const LocationPickerField = ({ value, onChange }: Props) => {
    const mapRef = useRef<MapView>(null);

    const [open, setOpen] = useState(false);

    const [region, setRegion] = useState({
        latitude: -15.8402,
        longitude: -70.0219,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [selectedLocation, setSelectedLocation] =
        useState<LocationValue | null>(value);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        setSelectedLocation(value);
    }, [value]);

    const getCurrentLocation = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permiso requerido",
                "Necesitamos acceder a tu ubicación.",
            );
            return;
        }

        const location = await Location.getCurrentPositionAsync({});

        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    const handleOpenMap = () => {
        setOpen(true);

        setTimeout(() => {
            if (value && mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude: value.latitude,
                    longitude: value.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            }
        }, 300);
    };

    const handleMapPress = async (event: MapPressEvent) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;

        try {
            const response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            const place = response[0];

            const address = [place.street, place.streetNumber, place.city]
                .filter(Boolean)
                .join(", ");

            setSelectedLocation({
                latitude,
                longitude,
                address: address || "Ubicación seleccionada",
            });
        } catch {
            Alert.alert("Error", "No se pudo obtener la dirección.");
        }
    };

    const confirmLocation = () => {
        if (!selectedLocation) return;

        onChange(selectedLocation);

        setOpen(false);
    };

    const clearLocation = () => {
        setSelectedLocation(null);
        onChange(null);
    };

    return (
        <>
            {/* ESTADO VACÍO */}
            {!value && (
                <Pressable
                    onPress={handleOpenMap}
                    className="justify-center items-center bg-slate-50 border-2 border-slate-300 border-dashed rounded-2xl h-32"
                >
                    <Ionicons
                        name="location-outline"
                        size={34}
                        color="#475569"
                    />

                    <Text className="mt-1 font-medium text-slate-600">
                        Seleccionar ubicación
                    </Text>
                </Pressable>
            )}

            {/* ESTADO SELECCIONADO */}
            {value && (
                <View className="gap-4 bg-white p-4 border border-slate-300 rounded-2xl">
                    <View className="flex-row items-start">
                        <View className="justify-center items-center bg-amber-100 mr-3 rounded-full w-10 h-10">
                            <Ionicons
                                name="location"
                                size={20}
                                color="#f59e0b"
                            />
                        </View>

                        <View className="flex-1">
                            <Text className="font-semibold text-slate-800">
                                Ubicación seleccionada
                            </Text>

                            <Text
                                numberOfLines={2}
                                className="mt-1 text-slate-500 text-sm"
                            >
                                {value.address}
                            </Text>
                        </View>
                    </View>

                    {/* LAT / LNG */}
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

                    <View className="flex-row gap-2">
                        <Pressable
                            onPress={handleOpenMap}
                            className="flex-1 justify-center items-center bg-blue-500 rounded-xl h-11"
                        >
                            <Text className="font-medium text-white">
                                Cambiar ubicación
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={clearLocation}
                            className="justify-center items-center border border-red-300 rounded-xl w-11 h-11"
                        >
                            <Ionicons
                                name="trash-outline"
                                size={20}
                                color="#ef4444"
                            />
                        </Pressable>
                    </View>
                </View>
            )}

            {/* MODAL */}
            <Modal visible={open} animationType="slide">
                <View className="flex-1">
                    {/* MAPA */}
                    <MapView
                        ref={mapRef}
                        style={{ flex: 1 }}
                        initialRegion={region}
                        onPress={handleMapPress}
                    >
                        {selectedLocation && (
                            <Marker
                                coordinate={{
                                    latitude: selectedLocation.latitude,
                                    longitude: selectedLocation.longitude,
                                }}
                            />
                        )}
                    </MapView>

                    {/* INFO */}
                    <View className="bg-white p-4 border-slate-200 border-t">
                        {!selectedLocation && (
                            <Text className="text-slate-500">
                                Toca el mapa para seleccionar una ubicación
                            </Text>
                        )}

                        {selectedLocation && (
                            <View className="gap-3">
                                <View className="gap-3">
                                    <View>
                                        <Text className="font-semibold text-slate-800">
                                            Ubicación seleccionada
                                        </Text>

                                        <Text className="mt-1 text-slate-600">
                                            {selectedLocation.address}
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
                                                {selectedLocation.latitude}
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
                                                {selectedLocation.longitude}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <Pressable
                                    onPress={confirmLocation}
                                    className="justify-center items-center bg-blue-500 rounded-xl h-12"
                                >
                                    <Text className="font-semibold text-white">
                                        Confirmar ubicación
                                    </Text>
                                </Pressable>
                            </View>
                        )}

                        <Pressable
                            onPress={() => setOpen(false)}
                            className="justify-center items-center mt-3 h-12"
                        >
                            <Text className="text-slate-500">Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default LocationPickerField;
