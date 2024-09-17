import NearbyDiseases from '@/components/NearbyDiseases'
import { globalStyles } from '@/constants/styles'
import React from 'react'
import { View } from 'react-native'

export default function Explore() {
    return (
        <View style={globalStyles.pageWrapper}>
            <NearbyDiseases />
        </View>
    )
}
