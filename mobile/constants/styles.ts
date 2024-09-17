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
        gap: 5,
        flexDirection: "row",
        marginVertical: 5
    },
    mutedButton: {
        backgroundColor: '#191919',
        borderWidth: 1,
        borderColor: '#333333',
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        gap: 5,
        flexDirection: "row",
        marginVertical: 5
    },
    mutedButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: 600,
        fontFamily: "Outfit_600SemiBold",
        textTransform: "uppercase"
    },
    buttonText: {
        color: "black",
        fontSize: 15,
        fontWeight: 600,
        fontFamily: "Outfit_600SemiBold",
        textTransform: "uppercase"
    },
    pageWrapper: {
        padding: 10,
    },
    horizontal: {
        flexDirection: "column",
        gap: 5
    },
    vertical: {
        flexDirection: "column",
        gap: 5
    }
})