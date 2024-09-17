import { useData } from '@/contexts/DataContext'
import React from 'react'
import { View } from 'react-native'
import { ThemedText } from './ThemedText'

export default function NearbyDiseases() {
    const { nearbyDiseases } = useData()
    console.log(nearbyDiseases[0])
    return (
        <View>
            {
                nearbyDiseases.map((disease, index) => {
                    return (
                        <View key={index}>
                            <ThemedText>{disease.disease}</ThemedText>
                        </View>
                    )
                })
            }
        </View>
    )
}
