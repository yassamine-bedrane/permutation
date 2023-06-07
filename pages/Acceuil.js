import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const StatisticSection = ({ title, data }) => {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.chartContainer}>
        <PieChart style={styles.chart} data={data} animate={true} animationDuration={500} />
        {data.map((item, index) => (
          <View style={styles.chartItem} key={item.key}>
            <View
              style={[
                styles.colorIndicator,
                item.svg && { backgroundColor: item.svg.fill },
              ]}
            />
            <Text style={styles.chartItemText}>
              {`${item.name}: ${((item.value / totalValue) * 100).toFixed(1)}% (${item.value} registered professors)`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};


const Acceuil = () => {
  const [professors, setProfessors] = useState([]);
  const [specialtiesChartData, setSpecialtiesChartData] = useState([]);
  const [citiesChartData, setCitiesChartData] = useState([]);
  const [gradesChartData, setGradesChartData] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = () => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setProfessors(data);
        generateSpecialtiesChartData(data);
        generateCitiesChartData(data);
        generateGradesChartData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateSpecialtiesChartData = (data) => {
    const specialties = {};
    data.forEach((professor) => {
      const specialty = professor.specialite;
      if (specialties[specialty]) {
        specialties[specialty] += 1;
      } else {
        specialties[specialty] = 1;
      }
    });

    const sortedSpecialties = Object.entries(specialties).sort((a, b) => b[1] - a[1]);
    const topSpecialties = sortedSpecialties.slice(0, 15);

    const chartData = topSpecialties.map(([specialty, count], index) => ({
      key: index,
      value: count,
      name: specialty,
      svg: { fill: ['#012E40', '#8FC1B5', '#026773', '#3CA6A6', '#F2E3D5', '#45C4B0', '#9AEBA3', '#DAFDBA', '#506266', '#818274', '#A3AB78', '#146551', '#007566', '#589A8D', '#8FC1B5'][index % 15] },
    }));

    setSpecialtiesChartData(chartData);
  };

  const generateCitiesChartData = (data) => {
    const cities = {};
    data.forEach((professor) => {
      const desiredCities = professor.villeDesiree;
      if (desiredCities) {
        const cityList = desiredCities.split(';');
        cityList.forEach((city) => {
          if (cities[city]) {
            cities[city] += 1;
          } else {
            cities[city] = 1;
          }
        });
      }
    });

    const sortedCities = Object.entries(cities).sort((a, b) => b[1] - a[1]);
    const topCities = sortedCities.slice(0, 15);

    const chartData = topCities.map(([city, count], index) => ({
      key: index,
      value: count,
      name: city,
      svg: { fill: ['#012E40', '#8FC1B5', '#026773', '#3CA6A6', '#F2E3D5', '#45C4B0', '#9AEBA3', '#DAFDBA', '#506266', '#818274', '#A3AB78', '#146551', '#007566', '#589A8D', '#8FC1B5'][index % 15] },
    }));

    setCitiesChartData(chartData);
  };

  const generateGradesChartData = (data) => {
    const grades = {};
    data.forEach((professor) => {
      const grade = professor.grade;
      if (grades[grade]) {
        grades[grade] += 1;
      } else {
        grades[grade] = 1;
      }
    });

    const chartData = Object.keys(grades).map((grade, index) => ({
      svg: { fill: ['#012E40', '#8FC1B5', '#026773', '#3CA6A6', '#F2E3D5', '#45C4B0', '#9AEBA3', '#DAFDBA', '#506266', '#818274', '#A3AB78', '#146551', '#007566', '#589A8D', '#8FC1B5'][index % 15] },
      key: grade,
      name: grade,
      value: grades[grade],
    }));

    setGradesChartData(chartData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          
          <View style={styles.box}>
          <Text style={styles.boxText}>Number of registered professors</Text>
            <Text style={styles.boxText}>{professors.length}</Text>
          </View>
        </View>
        <StatisticSection title="Number of Professors by Specialty" data={specialtiesChartData} />
        <StatisticSection title="Number of Professors by City" data={citiesChartData} />
        <StatisticSection title="Number of Professors by Grade" data={gradesChartData} />
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
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#026773',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chart: {
    padding:25,
    width: 200,
    height: 200,
  },
  chartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  chartItemText: {
    fontSize: 12,
  },
  box: {
    backgroundColor: '#45C4B0',
    borderRadius: 10,
    padding: 40,
    marginBottom: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Acceuil;
