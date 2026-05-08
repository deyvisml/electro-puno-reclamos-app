import FormField from "@/components/FormField";
import ImageGalleryField from "@/components/ImageGalleryField";
import LocationViewerField from "@/components/LocationViewerField";
import PageHeader from "@/components/PageHeader ";
import ReadOnlyTextField from "@/components/ReadOnlyTextField";
import RequestStatus from "@/components/RequestStatus";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const Request = () => {
    const [selectedMenuOption, setSelectedMenuOption] = useState<string>("0");

    const [menuOptions, setmenuOptions] = useState([
        {
            id: "0",
            label: "Detalles",
            icon: "info",
        },
        {
            id: "1",
            label: "Ubicación",
            icon: "location-on",
        },
        {
            id: "2",
            label: "Usuario",
            icon: "person",
        },
        {
            id: "3",
            label: "Responsable",
            icon: "engineering",
        },
        {
            id: "4",
            label: "Resultado",
            icon: "check-circle",
        },
    ]);

    return (
        <View className="flex-1 bg-white p-3">
            {/* Header */}
            <View className="pb-3">
                <PageHeader
                    title="Reclamo #001"
                    backHref="/requests"
                    showBackButton
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName=" flex-grow"
            >
                <View>
                    <RequestStatus status="Pendiente" statusId="0" />

                    <View className="mt-2">
                        {/* Menu */}
                        <View className="flex-row border-slate-300 border-b-2">
                            {menuOptions.map((option) => (
                                <Pressable
                                    key={option.id}
                                    className={`justify-center flex-1 items-center rounded-t-2xl h-16 ${selectedMenuOption === option.id ? "bg-slate-600" : "bg-white"}`}
                                    onPress={() =>
                                        setSelectedMenuOption(option.id)
                                    }
                                >
                                    <MaterialIcons
                                        name={option.icon as any}
                                        size={24}
                                        color={
                                            selectedMenuOption === option.id
                                                ? "white"
                                                : "#64748b"
                                        }
                                    />
                                    <Text
                                        className={`text-xs ${selectedMenuOption === option.id ? "text-white" : "text-slate-600"}`}
                                    >
                                        {option.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>

                        {/* Content */}
                        <View className="mt-4">
                            {/* 00. Details */}
                            {selectedMenuOption === "0" && (
                                <View className="gap-4">
                                    <FormField label="Tipo de Reclamo">
                                        <ReadOnlyTextField value="Reconexión" />
                                    </FormField>

                                    <FormField label="Suministro">
                                        <ReadOnlyTextField value="654321" />
                                    </FormField>

                                    <FormField label="Descripción">
                                        <ReadOnlyTextField value="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, perferendis. Facere cumque culpa laboriosam eveniet placeat ipsum eaque minus ut, suscipit nemo dolor sit unde obcaecati, quidem repudiandae vitae! Numquam expedita autem inventore nisi magnam commodi quas laudantium atque adipisci?" />
                                    </FormField>

                                    <FormField label="Fotos">
                                        <ImageGalleryField
                                            images={[
                                                "https://www.adobe.com/acrobat/hub/media_173d13651460eb7e12c0ef4cf8410e0960a20f0ee.jpg",
                                                "https://image.cnbcfm.com/api/v1/image/107192893-1676056282124-happy-black-man-freelancer-working-from-home-2022-12-16-08-24-33-utc.jpg",
                                            ]}
                                        />
                                    </FormField>
                                </View>
                            )}

                            {/* 01. Location */}
                            {selectedMenuOption === "1" && (
                                <View className="gap-4">
                                    <FormField label="Ubicación">
                                        <LocationViewerField
                                            value={{
                                                latitude: -15.8402,
                                                longitude: -70.0219,
                                                address:
                                                    "Av. Simón Bolívar 123, Puno",
                                            }}
                                        />
                                    </FormField>

                                    <FormField label="Referencia">
                                        <ReadOnlyTextField value="Detras de la tienda" />
                                    </FormField>
                                </View>
                            )}

                            {/* 02. User */}
                            {selectedMenuOption === "2" && (
                                <View className="gap-4">
                                    <FormField label="Nombres">
                                        <ReadOnlyTextField value="Juan" />
                                    </FormField>

                                    <FormField label="Apellidos">
                                        <ReadOnlyTextField value="Pérez García" />
                                    </FormField>

                                    <FormField label="DNI">
                                        <ReadOnlyTextField value="12345678" />
                                    </FormField>

                                    <FormField label="Nº de teléfono">
                                        <ReadOnlyTextField value="+51 999 888 777" />
                                    </FormField>
                                </View>
                            )}

                            {/* 03. Responsable */}
                            {selectedMenuOption === "3" && (
                                <View className="gap-4">
                                    <FormField label="Nombres">
                                        <ReadOnlyTextField value="Juan" />
                                    </FormField>

                                    <FormField label="Apellidos">
                                        <ReadOnlyTextField value="Pérez García" />
                                    </FormField>

                                    <FormField label="Nº de teléfono">
                                        <ReadOnlyTextField value="+51 999 888 777" />
                                    </FormField>
                                </View>
                            )}

                            {/* 04. Result */}
                            {selectedMenuOption === "4" && (
                                <View className="gap-4">
                                    <FormField label="Fecha de finalización">
                                        <ReadOnlyTextField value="2023-10-10" />
                                    </FormField>
                                    <FormField label="Reclamo resuelto">
                                        <ReadOnlyTextField value="Si" />
                                    </FormField>
                                    <FormField label="Detalle">
                                        <ReadOnlyTextField value="El reclamo fue resuelto satisfactoriamente." />
                                    </FormField>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Request;
