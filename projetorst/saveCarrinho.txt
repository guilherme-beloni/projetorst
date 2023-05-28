import { FlatList, BackHandler, ScrollView } from 'react-native';
import { Card, Paragraph, Button, List, TextInput } from 'react-native-paper';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../Context';
import firebase from '../Firebase';
import { styles, valorFormatado } from './Utils';

const CarrinhoScreen = ({ navigation }) => {
  let { produtos, setProdutos, total, setTotal } = useContext(DataContext);
  let [dbprodutos, setDbProdutos] = useState([]);
  let [email, setEmail] = useState('');

  useEffect(() => {
    setDbProdutos([]);
    selecionarTodos();
  }, []);

  /*const clearStates = () => {
    setProdutos('');
    setTotal('');
    setEmail('');
  };*/
  
  const selecionarTodos = () => {
    let itens = [];
    firebase
      .database()
      .ref('dbPedidos')
      .orderByChild('email')
      .on('value', (snapshot) => {
        snapshot.forEach((linha) => {
          itens.push({
            key: linha.key,
            produtos: linha.val().produtos,
            email: linha.val().email,
          });
        });
        setDbProdutos(itens);
      });
  };

  const excluiProduto = (index) => {
    let produto = produtos;
    setTotal(total - produto[index].valor * produto[index].quantidade);
    produto = produto.filter((item) => item !== produto[index]);
    setProdutos(produto);
  };

  const verificaEnvio = () => {
    if (total != 0 && email != '') {
      try {firebase.database().ref('dbPedidos').push({ info_prdutos: produtos, email: email });
      alert('O seu pedido foi entregue ao restaurante, obrigado!');
      } catch {
        alert('Erro ao inserir registro!'+e)
      }      
    } else {
      alert('Por favor, digite seu e-mail para confirmar o pedido!');
      }
  };
  
  /*const verificaEmail = () => {
    if (email !== '') {
      try {firebase.database().ref('dbPedidos').push({ email: email });
      alert('O seu pedido foi entregue ao restaurante, obrigado!');
      navigation.navigate('Menu');
      } catch {
        alert('Erro ao inserir registro!'+e)
      }     
    } else {
      alert('Por favor, digite seu e-mail para confirmar o pedido!');
    }
  };*/


  const msgFinal = () => {
    let produto = produtos;
    if (produto != 0) {
      verificaEnvio();     
      //clearStates();
    } else {
      alert('O carrinho está vazio!');
    }
  };

  const contCompra = () => {
    navigation.navigate('Menu');
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title title="Meu Carrinho:" />
        <Card.Content>
          {total != 0 ? (
            <Paragraph>Valor total: {valorFormatado(total)}</Paragraph>
          ) : (
            <></>
          )}
          {produtos.length ? (
            <FlatList
              data={produtos}
              renderItem={({ item, index }) => {
                return (
                  <List.Accordion
                    title={item.nome}
                    left={(props) => <List.Icon icon="star" />}>
                    <List.Item title={'Quantidade: ' + item.quantidade} />
                    <List.Item title={'Valor: ' + valorFormatado(item.valor)} />
                    <List.Item
                      right={(props) => (
                        <Button
                          color="#FF0000"
                          icon="delete"
                          mode="contained"
                          onPress={() => excluiProduto(index)}>
                          Excluir
                        </Button>
                      )}
                    />
                  </List.Accordion>
                );
              }}
            />
          ) : (
            <Paragraph>Nenhum produto adicionado!</Paragraph>
          )}
        </Card.Content>
  
        <Card.Content>
          <TextInput
            onChangeText={setEmail}
            value={email}
            mode="outlined"
            label="Digite seu e-mail"
            placeholder="e-mail"
          />
        </Card.Content>
        <Card.Actions style={{ alignSelf: 'center' }}>
          <Button
            style={{ padding: 5, marginRight: 10 }}
            icon="plus"
            mode="contained"
            onPress={contCompra}>
            Adicionar
          </Button>
          <Button
            style={{ padding: 5, marginRight: 5 }}
            icon="send"
            color="#00FF7F"
            mode="contained"
            onPress={msgFinal}>
            Finalizar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};
  
export default CarrinhoScreen;
