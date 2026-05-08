import { FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";

type Props = {
    title: string;
    backHref?: string;
    showBackButton?: boolean;
};

const PageHeader = ({ title, backHref, showBackButton = false }: Props) => {
    return (
        <View>
            {showBackButton && backHref && (
                <Link
                    href={backHref as any}
                    className="top-1/2 z-10 absolute py-3 pe-6 -translate-y-1/2"
                >
                    <FontAwesome6 name="arrow-left" size={24} color="black" />
                </Link>
            )}

            <Text
                className={`font-bold text-3xl  ${
                    showBackButton ? "text-center" : "text-left"
                }`}
            >
                {title}
            </Text>
        </View>
    );
};

export default PageHeader;
