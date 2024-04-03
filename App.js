import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { StatusBar } from 'expo-status-bar'
import * as Notifications from 'expo-notifications'

const GEOFENCING_TASK_NAME = 'geofencing-task'
const LOCATION_UPDATES_TASK_NAME = 'location-updates-task'

TaskManager.defineTask(GEOFENCING_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('TaskManager Error:', error.message)
    return
  }
  if (data) {
    console.log('Received new locations:', data)
  }
})

TaskManager.defineTask(LOCATION_UPDATES_TASK_NAME, async ({ data, error }) => {
  // ignore
})

export default function App() {
  useEffect(() => {
    ;(async () => {
      await Location.startLocationUpdatesAsync(LOCATION_UPDATES_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        foregroundService: {
          notificationTitle: 'Background Location Tracking',
          notificationBody: 'Your location is being tracked in the background',
        },
      })

      await Location.startGeofencingAsync(GEOFENCING_TASK_NAME, [])
    })()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <Text>Background Location Tracking</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
