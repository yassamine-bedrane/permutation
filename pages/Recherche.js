import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Recherche = () => {
  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [villeActuelleOptions, setVilleActuelleOptions] = useState([]);
  const [villeDesireeOptions, setVilleDesireeOptions] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [selectedVilleActuelle, setSelectedVilleActuelle] = useState('');
  const [selectedVilleDesiree, setSelectedVilleDesiree] = useState('');
  const [professors, setProfessors] = useState([]);
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    fetchOptions();
    fetchProfessors();
  }, []);

  const fetchOptions = () => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setSpecialiteOptions(extractUniqueSpecialites(data));
        setVilleActuelleOptions(extractUniqueVilles(data));
        setVilleDesireeOptions(extractUniqueVilles(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProfessors = () => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setProfessors(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const extractUniqueSpecialites = (professors) => {
    const uniqueSpecialites = [...new Set(professors.map((professor) => professor.specialite))];
    return uniqueSpecialites;
  };

  const extractUniqueVilles = (professors) => {
    const uniqueVilles = new Set();

    professors.forEach((professor) => {
      if (professor.villeFaculteActuelle) {
        uniqueVilles.add(professor.villeFaculteActuelle);
      }

      if (professor.villeDesiree) {
        professor.villeDesiree.split(';').forEach((ville) => {
          uniqueVilles.add(ville);
        });
      }
    });

    const uniqueVillesList = Array.from(uniqueVilles);

    return uniqueVillesList;
  };

  const filterProfessors = () => {
    let filteredProfessors = professors;

    if (selectedSpecialite) {
      filteredProfessors = filteredProfessors.filter((professor) => professor.specialite === selectedSpecialite);
    }

    if (selectedVilleActuelle) {
      filteredProfessors = filteredProfessors.filter(
        (professor) => professor.villeFaculteActuelle === selectedVilleActuelle
      );
    }

    if (selectedVilleDesiree) {
      filteredProfessors = filteredProfessors.filter((professor) =>
        professor.villeDesiree.includes(selectedVilleDesiree)
      );
    }

    return filteredProfessors;
  };

  const resetOptions = () => {
    setSelectedSpecialite('');
    setSelectedVilleActuelle('');
    setSelectedVilleDesiree('');
    setIsReset(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Spécialité:</Text>
        <RNPickerSelect
          placeholder={{ label: 'Toutes les spécialités', value: '' }}
          items={specialiteOptions.map((specialite) => ({ label: specialite, value: specialite }))}
          onValueChange={(value) => setSelectedSpecialite(value)}
          value={selectedSpecialite}
          style={pickerSelectStyles}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Ville actuelle:</Text>
        <RNPickerSelect
          placeholder={{ label: 'Toutes les villes actuelles', value: '' }}
          items={villeActuelleOptions.map((ville) => ({ label: ville, value: ville }))}
          onValueChange={(value) => setSelectedVilleActuelle(value)}
          value={selectedVilleActuelle}
          style={pickerSelectStyles}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Ville désirée:</Text>
        <RNPickerSelect
          placeholder={{ label: 'Toutes les villes désirées', value: '' }}
          items={villeDesireeOptions.map((ville) => ({ label: ville, value: ville }))}
          onValueChange={(value) => setSelectedVilleDesiree(value)}
          value={selectedVilleDesiree}
          style={pickerSelectStyles}
        />
      </View>
      <Button title="Réinitialiser" onPress={resetOptions} />
      <ScrollView style={styles.professorsContainer}>
        {filterProfessors().map((professor) => (
          <View key={professor.id} style={styles.professorItem}>
            <Text style={styles.professorText}>
              {`${professor.nom} (${professor.email} | ${professor.tel} | ${professor.grade}) - ${professor.specialite}`}
            </Text>
            <Text style={styles.professorText}>{`(${professor.villeFaculteActuelle} | ${professor.villeDesiree})`}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 70,
    paddingLeft: 16,
    paddingRight: 16,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  professorsContainer: {
    flex: 1,
    marginTop:20,
    marginBottom: 16,
  },
  professorItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 4,
  },
  professorText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default Recherche;
