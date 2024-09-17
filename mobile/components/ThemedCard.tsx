import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from "@react-navigation/native";

export type ThemedCardProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedCard({ style, lightColor, darkColor, ...otherProps }: ThemedCardProps) {
    const { colors } = useTheme()
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');

    return <View style={[
        {
            backgroundColor: colors.card,
            borderColor: borderColor,
            borderCurve: 'circular',
        },
        style
        , styles.wrapper

    ]} {...otherProps} />;
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        borderWidth: 0.5,
    }
})