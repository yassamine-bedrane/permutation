import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Acceuil from './pages/Acceuil';
import Inscription from './pages/Inscription';
import Apropos from './pages/Apropos';
import Connexion from './pages/Connexion';
import Profil from './pages/Profil';
import Recherche from './pages/Recherche';
import SignOut from './pages/SignOut';

const Tab = createBottomTabNavigator();

const App = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [professor, setProfessor] = useState(null);

  const handleLogin = (professorData) => {
    setIsAuthenticated(true);
    setProfessor(professorData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            activeTintColor: 'white',
            inactiveTintColor: 'white',
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Acceuil') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Inscription') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Apropos') {
                iconName = focused ? 'information-circle' : 'information-circle-outline';
              } else if (route.name === 'Connexion') {
                iconName = focused ? 'log-in' : 'log-in-outline';
              } else if (route.name === 'Profil') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Recherche') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'SignOut') {
                iconName = focused ? 'log-out' : 'log-out-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: {
              position: 'absolute',
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 0,
              backgroundColor: '#026773',
              borderRadius: 15,
              height: 50,
              margin:10,
            },
            headerShown: false,
          })}
        >
          {!isAuthenticated && (
            <>
              <Tab.Screen name="Acceuil" component={Acceuil} />
              <Tab.Screen name="Inscription" component={Inscription} />
              <Tab.Screen name="Apropos" component={Apropos} />
              <Tab.Screen
                name="Connexion"
                component={() => <Connexion onLogin={handleLogin} />}
              />
            </>
          )}

          {isAuthenticated && (
            <>
              <Tab.Screen name="Acceuil" component={Acceuil} />
              <Tab.Screen
                name="Profil"
                component={() => <Profil professor={professor} logout={handleLogout} />}
              />
              <Tab.Screen name="Recherche" component={Recherche} />
              <Tab.Screen name="Apropos" component={Apropos} />
              <Tab.Screen
                name="SignOut"
                component={() => <SignOut onLogout={handleLogout} />}
              />
            </>
          )}
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
