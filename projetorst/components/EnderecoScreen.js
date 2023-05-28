import { List, TextInput, Button, Card, Paragraph } from 'react-native-paper';
import { ScrollView, FlatList, Alert } from 'react-native';
import { styles } from './Utils';
import { useContext, useEffect, useState } from 'react';
import firebase from '../Firebase';
import { DataContext } from '../Context';

export default function CategoriasScreen() {
  let [key, setKey] = useState('');
  let [dbEndereco, setDbEndereco] = useState([]);
  let [botaoAlterarExcluir, setBotaoAlterarExcluir] = useState(true);
  let [botaoInserir, setBotaoInserir] = useState(false);
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
    setDbEndereco([]);
    selecionarTodos();
  }, []);

  const selecionarTodos = () => {
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
    setBotaoAlterarExcluir(false);
    setBotaoInserir(true);
  };

  const cancelar = () => {
    setKey('');
    setTipoEndereco('');
    setLogradouro('');
    setNumero('');
    setCidade('');
    setEstado('');
    setBairro('');
    setDbEndereco([]);
    selecionarTodos();
    setBotaoAlterarExcluir(true);
    setBotaoInserir(false);
  };

  const inserirEndereco = () => {
    try {
      firebase
        .database()
        .ref('dbEndereco')
        .push({
          tipoEndereco: tipoEndereco,
          logradouro: logradouro,
          numero: numero,
          cidade: cidade,
          estado: estado,
          bairro: bairro,
        });
      alert('Registro inserido com sucesso!');
      navigation.navigate('Carrinho');
      cancelar();
    } catch (e) {
      alert('Erro ao inserir!');
    }
  };

  const alterarEndereco = () => {
    try {
      firebase
        .database()
        .ref('dbEndereco')
        .child(key)
        .update({
          tipoEndereco: tipoEndereco,
          logradouro: logradouro,
          numero: numero,
          cidae: cidade,
          estado: estado,
          bairro: bairro,
        });
      alert('Registro alterado com sucesso!');
      cancelar();
    } catch (e) {
      alert('Erro ao alterar!');
    }
  };

  const excluirEndereco = () => {
    Alert.alert('Mensagem', 'Deseja realmente excluir esse endereço?', [
      {
        text: 'Sim',
        onPress: () => {
          try {
            firebase.database().ref('dbEndereco').child(key).remove();
            alert('Registro excluído com sucesso!');
            cancelar();
          } catch (e) {
            alert('Erro ao excluir!');
          }
        },
      },
      {
        text: 'Não',
        onPress: () => cancelar(),
      },
    ]);
  };

  return (
    <ScrollView>
      <Card style={{ margin: 10 }}>
        <Card.Title
          title="Gerenciar Endereços"
          subtitle="Dados dos endereços cadastrados"
        />
        <Card.Content>
          <Paragraph style={{ marginTop: 20 }}>Tipo do endereço: </Paragraph>
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
            //style={{display: 'none'}}
            onChangeText={setEstado}
            value={estado}
            mode="outlined"
            label="Informe o estado"
            placeholder="Estadoo"
          />
        </Card.Content>
        <Card.Actions>
          <Button
            icon="plus"
            mode="contained"
            style={styles.buttonCrud}
            disabled={botaoInserir}
            onPress={() => inserirEndereco()}></Button>
          <Button
            icon="pencil"
            mode="contained"
            style={styles.buttonCrud}
            disabled={botaoAlterarExcluir}
            onPress={() => alterarEndereco()}></Button>
          <Button
            icon="delete"
            mode="contained"
            style={styles.buttonCrud}
            disabled={botaoAlterarExcluir}
            onPress={() => excluirEndereco()}></Button>
          <Button
            icon="cancel"
            mode="contained"
            style={styles.buttonCrud}
            onPress={() => cancelar()}></Button>  
        </Card.Actions>
      </Card>
      <List.Section>
        <List.Subheader>Endereços registrados</List.Subheader>
        <FlatList
          data={dbEndereco}
          renderItem={({ item }) => {
            return (
              <List.Item
                title={item.tipoEndereco}
                left={(props) => <List.Icon icon="arrow-right" />}
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
    </ScrollView>
  );
}
