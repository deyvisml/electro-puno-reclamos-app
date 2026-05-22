import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

type LocationValue = {
    latitude: number;
    longitude: number;
    address: string;
};

type VisitConfirmationButtonProps = {
    targetLocation: LocationValue;

    onConfirm?: (params: {
        currentLocation: {
            latitude: number;
            longitude: number;
        };
        distanceInMeters: number;
    }) => Promise<void> | void;

    confirmed?: boolean;

    radiusInMeters?: number;
};

const VisitConfirmationButton = ({
    targetLocation,
    onConfirm,
    confirmed = false,
    radiusInMeters = 100,
}: VisitConfirmationButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleConfirmVisit = async () => {
        try {
            setLoading(true);

            // permiso
            const permission =
                await Location.requestForegroundPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    "Permiso requerido",
                    "Necesitamos acceder a tu ubicación para confirmar la visita.",
                );

                return;
            }

            // ubicación actual
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const currentLatitude = currentLocation.coords.latitude;

            const currentLongitude = currentLocation.coords.longitude;

            // distancia
            const distanceInMeters = getDistance(
                {
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                },
                {
                    latitude: targetLocation.latitude,
                    longitude: targetLocation.longitude,
                },
            );

            // fuera del radio
            if (distanceInMeters > radiusInMeters) {
                Alert.alert(
                    "Ubicación no válida",
                    `Debes estar dentro de un radio de ${radiusInMeters} metros para confirmar la visita.\n\nDistancia actual: ${Math.round(distanceInMeters)} metros.`,
                );

                return;
            }

            // callback externo
            await onConfirm?.({
                currentLocation: {
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                },
                distanceInMeters,
            });

            Alert.alert(
                "Visita confirmada",
                "La visita fue confirmada exitosamente.",
            );
        } catch {
            Alert.alert("Error", "No se pudo confirmar la visita.");
        } finally {
            setLoading(false);
        }
    };

    // YA CONFIRMADO
    if (confirmed) {
        return (
            <View className="flex-row justify-center items-center gap-2 bg-emerald-500 rounded-lg h-14">
                <Ionicons name="checkmark-circle" size={22} color="white" />

                <Text className="font-bold text-white uppercase">
                    Visita confirmada
                </Text>
            </View>
        );
    }

    return (
        <View className="gap-3">
            {/* INFO */}
            <View className="bg-slate-50 p-3 border border-slate-200 rounded-lg">
                <View className="flex-row items-start gap-2">
                    <Ionicons
                        name="information-circle-outline"
                        size={18}
                        color="#475569"
                    />

                    <View className="flex-1">
                        <Text className="text-slate-700 text-sm">
                            Debes encontrarte cerca de la ubicación registrada
                            para confirmar la visita.
                        </Text>

                        <Text className="mt-1 text-slate-500 text-xs">
                            Radio permitido: {radiusInMeters}m
                        </Text>
                    </View>
                </View>
            </View>

            {/* BOTÓN */}
            <Pressable
                onPress={handleConfirmVisit}
                disabled={loading}
                className={`
                    flex-row
                    justify-center
                    items-center
                    gap-2
                    rounded-lg
                    h-14
                    ${loading ? "bg-slate-400" : "bg-emerald-500"}
                `}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={22}
                            color="white"
                        />

                        <Text className="font-bold text-white uppercase">
                            Confirmar visita
                        </Text>
                    </>
                )}
            </Pressable>
        </View>
    );
};

export default VisitConfirmationButton;
