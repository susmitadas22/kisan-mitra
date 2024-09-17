import React from 'react'
import { View } from 'react-native-reanimated/lib/typescript/Animated'
import { ThemedText } from './ThemedText'
type DiseaseInfoProps = {
    name: string
    cause: string
    symptoms: string
    treatment: string

}
export default function DiseaseInfo() {
    return (
        <ThemedText>DiseaseInfo</ThemedText>
    )
}
