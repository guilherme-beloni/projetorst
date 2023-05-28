import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import EnderecoScreen from './components/EnderecoScreen';
import HomeScreen from './components/HomeScreen';
import CarrinhoScreen from './components/CarrinhoScreen';
import ProdutoScreen from './components/ProdutoScreen'
import Context from './Context';

const Tab = createBottomTabNavigator();  

export default App = () => {
  return (
    <Context>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name == 'Menu')
                return <Ionicons name="home" size={size} color={color} />;
              else if (route.name == 'Carrinho')
                return <Ionicons name="ios-cart" size={size} color={color} />;
              else if (route.name == 'Endereços')
                return <Ionicons name='list' size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Menu" component={HomeScreen} />
          <Tab.Screen name="Carrinho" component={CarrinhoScreen} />
          <Tab.Screen name='Endereços' component={EnderecoScreen} />
          
          <Tab.Screen
            name="Produto"
            component={ProdutoScreen}
            options={{ display: 'none', tabBarButton: () => null }}
            style={{alignSelf: 'center'}}
          />
          
    
        </Tab.Navigator> 
      </NavigationContainer>
    </Context>
  );
};   