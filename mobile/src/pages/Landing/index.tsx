import React, { useEffect, useState } from 'react';
import { View, Image , Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler'; //adaptar o touch para o sistema operacional

import api from '../../services/api';
import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

function Landing(){
    //Estado para armazenar as conexões 
    const [totalConnections, setTotalConnections]  = useState(0);

    useEffect(() => {
        api.get('/connections').then(response => {
            //console.log(response);
            const { total } = response.data;

            setTotalConnections(total);
        })
    }, []);
    
    //navegação
    const {navigate} = useNavigation();

    function handleNavigateToGiveClassesPage() {
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPages(){
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner}/>

            <Text style={styles.title}>
                Seja bem-vind@, {'\n'} 
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>
        
            <View style={styles.buttonsContainer}>

                <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />

                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />

                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>

            </View>

            <Text style={styles.totalConnections}>
                Mais de {totalConnections} conexões realizadas {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
        
    );
}

export default Landing;