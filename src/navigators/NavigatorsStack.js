import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home.js';
import Register from '../views/Register.js';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

export default StackNavigator