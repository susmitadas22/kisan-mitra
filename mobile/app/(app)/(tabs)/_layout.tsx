import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'compass' : 'compass-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Scan',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'scan' : 'scan-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
