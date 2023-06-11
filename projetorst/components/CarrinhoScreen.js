import { FlatList, ScrollView, Alert } from 'react-native';
import { Card, Paragraph, Button, List, TextInput } from 'react-native-paper';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../Context';
import firebase from '../Firebase';
import { styles } from './Utils';
import { valorFormatado } from './Utils';

const CarrinhoScreen = ({ navigation }) => {
  let { produtos, setProdutos, total, setTotal } = useContext(DataContext);
  let [dbprodutos, setDbProdutos] = useState([]);
  let [email, setEmail] = useState('');
  let [dbEndereco, setDbEndereco] = useState([]);
  let {
    tipoEndereco,
    setTipoEndereco,
    logradouro,
    setLogradouro,
    numero,
    setNumero,
    cidade,
    setCidade,
    estado,
    setEstado,
    bairro,
    setBairro,
  } = useContext(DataContext);

  useEffect(() => {
    setDbProdutos([]);
    selecionarTodos();
    selecionarTodosEnderecos();
  }, []);

  const selecionar = (
    key,
    tipoEndereco,
    logradouro,
    numero,
    cidade,
    estado,
    bairro
  ) => {
    setKey(key);
    setTipoEndereco(tipoEndereco);
    setLogradouro(logradouro);
    setNumero(numero);
    setCidade(cidade);
    setEstado(estado);
    setBairro(bairro);
  };

  const selecionarTodos = () => {
    let itens = [];
    firebase
      .database()
      .ref('dbProdutos')
      .orderByChild('logradouro')
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

  const selecionarTodosEnderecos = () => {
    let itens = [];
    firebase
      .database()
      .ref('dbEndereco')
      .orderByChild('logradouro')
      .on('value', (snapshot) => {
        snapshot.forEach((linha) => {
          itens.push({
            key: linha.key,
            tipoEndereco: linha.val().tipoEndereco,
            logradouro: linha.val().logradouro,
            numero: linha.val().numero,
            cidade: linha.val().cidade,
            estado: linha.val().estado,
            bairro: linha.val().bairro,
          });
        });
        setDbEndereco(itens);
      });
  };

  const novoEndereco = () => {
    direciona('Endereços');
  };

  const excluiProduto = (index) => {
    let produto = produtos;
    setTotal(total - produto[index].valor * produto[index].quantidade);
    produto = produto.filter((item) => item !== produto[index]);
    setProdutos(produto);
  };

  const verificaEnvio = () => {
    if (total != 0 && email != '') {
      try {
        firebase
          .database()
          .ref('dbProdutos')
          .push({ info_produtos: produtos, email: email });
        navigation.navigate('Endereco');
      } catch {
        Alert.alert('Atenção', 'Erro ao inserir registro!' + e);
      }
    } else {
      alert('Por favor, digite seu e-mail para confirmar o pedido!');
    }
  };

  const msgFinal = () => {
    let produto = produtos;
    if (produto != 0) {
      verificaEnvio()
      Alert.alert('Pedido enviado com sucesso!')
      navigation.navigate('Menu');

      //clearStates();
    } else {
      alert('O carrinho está vazio!');
    }
  };

  const direciona = (page) => {
    let dir = navigation.navigate(page);
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

        <Card.Actions style={{ alignSelf: 'center', display:'none' }}> 
          <Card style={{ margin: 10,}}>
            <Card.Title
              title="Gerenciar Endereços"
              subtitle="Dados dos endereços cadastrados"
            />
            <Card.Content>
              <Paragraph style={{ marginTop: 20 }}>
                Tipo do endereço:{' '}
              </Paragraph>
              <TextInput
                onChangeText={setTipoEndereco}
                value={tipoEndereco}
                mode="outlined"
                label="Informe o tipo de endereço"
                placeholder="Tipo de endereço"
              />
              <Paragraph style={{ marginTop: 20 }}>Logradouro: </Paragraph>
              <TextInput
                onChangeText={setLogradouro}
                value={logradouro}
                mode="outlined"
                label="Informe o logradouro"
                placeholder="Logradouro"
              />
              <Paragraph style={{ marginTop: 20 }}>Número: </Paragraph>
              <TextInput
                onChangeText={setNumero}
                value={numero}
                mode="outlined"
                label="Informe o número"
                placeholder="Numero"
              />
              <Paragraph style={{ marginTop: 20 }}>Bairro: </Paragraph>
              <TextInput
                onChangeText={setBairro}
                value={bairro}
                mode="outlined"
                label="Informe o bairro"
                placeholder="Bairro"
              />
              <Paragraph style={{ marginTop: 20 }}>Cidade: </Paragraph>
              <TextInput
                onChangeText={setCidade}
                value={cidade}
                mode="outlined"
                label="Informe a cidade"
                placeholder="Cidade"
              />
              <Paragraph style={{ marginTop: 20 }}>Estado: </Paragraph>
              <TextInput
                onChangeText={setEstado}
                value={estado}
                mode="outlined"
                label="Informe o estado"
                placeholder="Estadoo"
              />
            </Card.Content>
            
          </Card>

          <Button
            style={{ padding: 5, marginRight: 10 }}
            icon="plus"
            mode="contained"
            color="#841584"
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
      <List.Section>
        <List.Subheader>Endereço selecionado:</List.Subheader>
        <FlatList
          data={dbEndereco}
          renderItem={({ item }) => {
            return (
              <List.Item
                title={item.tipoEndereco}
                left={(props) => <List.Icon icon="star" />}
                onPress={() =>
                  selecionar(
                    item.key,
                    item.tipoEndereco,
                    item.logradouro,
                    item.numero,
                    item.cidade,
                    item.estado,
                    item.bairro
                  )
                }
              />
            );
          }}
        />
      </List.Section>
      <Button
        style={{ marginTop: 10 }}
        color="#841584"
        onPress={() => novoEndereco()}>
        Novo Endereço
      </Button>
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
    
    </ScrollView>
  );
};

export default CarrinhoScreen;
