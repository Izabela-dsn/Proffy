import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartIcon from '../../assets/images/icons/heart-outline.png';
import notMyFavoriteAnymoreIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

import styles from './styles';

export interface Teacher {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    whatsapp:  string;
}

interface TeacherItemProps{
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp(){
        api.post('connections', {
            user_id: teacher.id,
        })

        Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`)
    }
    
    async function handleToggleFavorite() {
        //buscar todos os favoritos
        const favorites = await AsyncStorage.getItem('favorites');
        
        //cria o array
        let favoritesArray = [];
        if(favorites) {
            //se existir ele vai sobrescrever o array
            favoritesArray = JSON.parse(favorites);
        }

        if(isFavorited){

            //remover dos favoritos
            const favoriteIndex = favoritesArray.findIdex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);

            setIsFavorited(false);

        } else{

            //add aos favoritos
            favoritesArray.push(teacher);

            setIsFavorited(true);
        }

        //salva no storage convertido em texto
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }   

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: teacher.avatar}} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>

            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>
            
            <View style={styles.footer}>

                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost},00</Text>
                </Text>

                <View style={styles.buttonsContainer}>

                    <RectButton 
                        onPress= {handleToggleFavorite}
                        style={[
                            styles.favoriteButton, 
                            isFavorited ? styles.favorited : {},
                        ]}>
                        
                        { isFavorited
                            ? <Image source={notMyFavoriteAnymoreIcon} />
                            : <Image source={heartIcon} /> 
                        }
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>


                </View>
            </View>
        </View>
    );
}

export default TeacherItem;