import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton, RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    

    function loadFavorites(){
        /* Ir no banco e pegar todos os profs que o usuario favoritou*/
        AsyncStorage.getItem('favorites').then(response => {
            if (response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            
            }
        });
    }

    /*useFocusEffect(() => {
        loadFavorites();
    });*/

    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit(){
        loadFavorites();
        const response = await api.get('/classes', {
            params:{
                subject,
                week_day,
                time,
            }
        });
        
        setIsFilterVisible(false);
        setTeachers(response.data);

        /*console.log({
            subject,
            week_day,
            time,
        })*/
    }

    return (

        <View style={styles.container}>
            <PageHeader 
                title="Procure por Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color='#FFF' />
                    </BorderlessButton>
                )}
                
            > 
                { isFilterVisible && (
                    <View style={styles.searchForm}>

                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            /* onChangeText vai receber o texto digitado diretamente */
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Qual o dia?" 
                                    placeholderTextColor="#c1bccc"
                                    value={week_day}
                                    /* onChangeText vai receber o texto digitado diretamente */
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Qual horário?" 
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    /* onChangeText vai receber o texto digitado diretamente */
                                    onChangeText={text => setTime(text)}
                                />
                            </View>

                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}   
            </PageHeader>


            <ScrollView style={styles.teacheList} 
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return(
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )}
                )}
                
            </ScrollView>
        </View>
    );
}

export default TeacherList;