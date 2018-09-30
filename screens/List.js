import React, {Component} from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import moment from 'moment'

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false
        };

        this.handlePress = this.handlePress.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        fetchData().then(() => {
          this.setState({refreshing: false});
        });
      }

    componentDidMount() {
        this.props.onLoad();
    }

    handlePress(data) {
        this.props.navigation.navigate('Details', {filmData: data});
    }

    renderItem({item}) {
        // Setting rating text color
        let ratingColor = ""
        if (item.tmdbRating >= 60) {
            ratingColor = 'green'
        } else if (item.tmdbRating < 60 && item.tmdbRating >= 40) {
            ratingColor = 'yellow'
        } else {
            ratingColor='red'
        }

        // Formatting showtimes
        let day = moment(item.showtimes[0].startsAtDate + " " + item.showtimes[0].startsAtTime).calendar();

        return (
            <TouchableOpacity underlayColor="#888" onPress={() => this.handlePress(item)}>
                <View style={styles.listItem}>
                    <View>
                        <Text style={styles.titleText} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.showtimeText}>{day} on {item.showtimes[0].channel}</Text>
                    </View>
                    <View style={styles.ratingWrapper}>
                        <Text style={[styles.ratingText, styles[ratingColor + 'Text']]}>{item.tmdbRating === 0 ? null : item.tmdbRating + "%"}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    keyExtractor(item, index) {
        return `${index}`;
    }

    renderSeparator() {
        const style = { height: 1, backgroundColor: '#ddd', marginLeft: 10 };
        return <View style={style} />;
    }

    render() {
        return(
            <FlatList 
                data={this.props.totalFilmData}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.renderSeparator}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                    />
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },

    titleText: {
        fontSize: 18
    },

    showtimeText: {
        fontSize: 12
    },

    ratingText: {
        fontSize: 18,
    },

    greenText: {
        color: '#265819'
    },

    yellowText: {
        color: '#71500f'
    },

    redText: {
        color: '#7e2310'
    },

    ratingWrapper: {
        position: 'absolute',
        right: 15,
    }
});

export default List;