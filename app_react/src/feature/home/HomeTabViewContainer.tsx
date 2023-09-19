import { ReactNode } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { DefaultTheme } from "react-native-paper";

import { HomeDataRepository } from "./HomeData";
import textStyles from "../../style";
import useAsync from "../../hook/useAsync";

type ChartBuilder = (data: [number, number][]) => ReactNode;

interface Props {
    title: string;
    repository: HomeDataRepository,
    builder?: ChartBuilder,
    children?: ReactNode,
};

const HomeTabViewContainer = ({
    title,
    repository,
    builder,
    children,
}: Props) => {
    const state = useAsync(repository.getData);

    return (
        <View
            style={{
                marginHorizontal: 20,
                marginVertical: 40,
            }}
        >
            <Text style={textStyles.titleLarge}>{title}</Text>
            <View style={{ height: 20 }} />
            <View>
                {state.loading && <ActivityIndicator
                    animating={true}
                    size="large"
                    color={DefaultTheme.colors.primary}
                    style={{
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                />}
            </View>
            {!state.loading && builder?.(state.value!)}
            {children}
        </View>
    );
};

export default HomeTabViewContainer;