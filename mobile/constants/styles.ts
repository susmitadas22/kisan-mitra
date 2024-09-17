import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        gap: 5,
        flexDirection: "row",
    },
    buttonText: {
        color: "black",
        fontSize: 15,
        fontWeight: 600,
        fontFamily: "Outfit_400Regular"
    },
    pageWrapper: {
        padding: 10,
    },
    horizontal: {
        flexDirection: "column",
        gap: 5
    }
})