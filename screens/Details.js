import React, { Component } from 'react';
import { WebBrowser } from 'expo';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

class Details extends Component {
    static navigationOptions = ({navigation}) => {
        const filmData = navigation.getParam('filmData');
        const url = filmData.imdbUrl;

        let handlePressButton = (url) => {
            WebBrowser.openBrowserAsync(url);
        };

        return {
            title: filmData.name,
            headerRight: (
                <TouchableOpacity 
                    onPress={() => handlePressButton(url)}
                    title="Open WebBrowser"
                    style={styles.headerIcon} >
                  <Ionicons name="ios-film" size={32} color="white" />
                </TouchableOpacity>
            ),
        }
    }

    render() {
        const filmData = this.props.navigation.getParam('filmData');
        const image = {uri: "https://image.tmdb.org/t/p/original/" + filmData.tmdbImageId +".jpg" };
        const year = filmData.year;
        const rating = filmData.tmdbRating;
        const synopsis = filmData.synopsis;
        const day = moment(filmData.showtimes[0].startsAtDate + " " + filmData.showtimes[0].startsAtTime).calendar();
        const channel = filmData.showtimes[0].channel;
        console.log(channel);

        return (
            
            <ScrollView style={styles.container}>
                {
                    filmData.tmdbImageId ? (
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={ image } />
                        </View>
                    ) : null
                }
                <View style={styles.releaseWrapper}>
                    {
                        year ? <Text style={styles.text}>Released in { year }</Text> : null
                    }
                    {
                        rating ? <Text style={styles.text}>Rating: { rating + "%" }</Text> : null
                    }
                </View>
                <View>
                    <Text style={styles.text}>Showtimes:</Text>
                    <Text style={styles.smallText}>{ day } on { channel }</Text>
                </View>
                <View style={styles.separator}></View>
                <Text style={styles.smallText}>Film Synopsis: { synopsis }</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },

    image: {
        width: 350,
        height: 500
    },

    imageContainer: {
        alignItems: 'center',
    },

    releaseWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    separator: {
        height: 1,
        backgroundColor: '#aaa',
        marginHorizontal: 10
    },

    text: {
        fontSize: 18,
        marginVertical: 10
    },

    smallText: {
        fontSize: 14,
        marginVertical: 10
    },

    headerIcon: {
        marginRight: 20
    }
});

export default Details;