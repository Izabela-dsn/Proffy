import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites(){
    const [favorites, setFavorites] = useState([]);

    function loadFavorites(){
        /* Ir no banco e pegar todos os profs que o usuario favoritou*/
        AsyncStorage.getItem('favorites').then(response => {
            if (response){
                const favoritedTeachers = JSON.parse(response);
                

                setFavorites(favoritedTeachers);
            
            }
        });
    }

    /* useEffect(dispara algo quando o componente for 
    exibido em tela) -> recebe qual função vai ser disparada 
    e o array quando ela vai ser disparada, 
    se for uma variável ela vai ser disparada 
    quando essa variavel mudar, se for vazio ela 
    vai ser dispara só uma vez no começo do componente*/

    /*useEffect(() => {
        loadFavorites();
    }, []);*/

    //Vai ser executado toda vez que a tela entra em foco
    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
             <PageHeader title="Meus Proffys favoritos"/>

             <ScrollView style={styles.teacheList} 
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return(
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;