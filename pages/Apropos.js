import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Apropos = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Plateforme de Permutation pour Enseignants Universitaires</Text>

        <Text style={styles.description}>
          Cette plateforme est simplement un espace permettant aux professeurs universitaires de rechercher un partenaire pour une permutation. Elle se limite à cette fonctionnalité. Les enseignants peuvent rechercher des partenaires intéressés par un échange dans d'autres établissements d'enseignement supérieur. Le système facilite la recherche et la correspondance entre les enseignants ayant une volonté mutuelle d'échanger.
        </Text>

        <Text style={styles.description}>
          La plateforme offre une interface conviviale et sécurisée aux enseignants pour communiquer et échanger les informations nécessaires. Les membres peuvent créer des profils personnels et renseigner des informations concernant leurs spécialités, les établissements et les informations de contact. Les enseignants peuvent consulter les profils des partenaires potentiels et entrer en contact avec eux pour discuter des détails de l'accord d'échange.
        </Text>

        <Text style={styles.description}>
          En utilisant cette plateforme, les enseignants peuvent faciliter leur recherche de partenaires d'échange, économiser du temps et des efforts en évitant les communications individuelles et les recherches continues d'opportunités d'échange. Ce système est efficace et utile pour les enseignants souhaitant changer d'institution ou travailler dans un nouvel établissement pour élargir leur expérience académique.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2023. Tous droits réservés.</Text>
          <Text style={styles.footerText}>Développé par Pr. Mohamed LACHGAR</Text>
          <View style={styles.contactContainer}>
            <Ionicons name="call-outline" size={20} color="#3F51B5" style={styles.icon} />
            <Text style={styles.contactText}>+212 708 193 797</Text>
            <Ionicons name="mail-outline" size={20} color="#3F51B5" style={styles.icon} />
            <Text style={styles.contactText}>lachgar.m@ucd.ac.ma</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 70,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  footer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#3F51B5',
    paddingTop: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#3F51B5',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    marginRight: 4,
  },
  contactText: {
    fontSize: 12,
    color: '#3F51B5',
  },
});

export default Apropos;
