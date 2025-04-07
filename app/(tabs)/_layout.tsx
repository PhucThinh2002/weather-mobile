// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { StyleSheet } from 'react-native';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: '#ffffff',
//         tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
//         tabBarStyle: styles.tabBar,
//         tabBarLabelStyle: styles.tabBarLabel,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Weather',
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="partly-sunny" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="manage-locations"
//         options={{
//           title: 'Manage',
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="location" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="weekly-forecast"
//         options={{
//           title: 'Forecast',
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="calendar" size={24} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: '#63b3ed',
//     borderTopWidth: 0,
//   },
//   tabBarLabel: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });