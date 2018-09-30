import { createStackNavigator } from 'react-navigation';
import List from './containers/List';
import Details from './screens/Details';

const RootNavigator = createStackNavigator({
    List: List,
    Details: Details
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#68aa63',
        },
        headerTintColor: '#fff'
    }
});

List.navigationOptions = {
    title: 'Films On Freeview'
}

export default RootNavigator;