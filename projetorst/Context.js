import { useState, createContext } from 'react';

export const DataContext = createContext();

export default Context = ({ children }) => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [imagemProduto, setImagemProduto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState('');
  const [tipoEndereco, setTipoEndereco] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');

  return (  
    <DataContext.Provider
      value={{
        nomeProduto,
        setNomeProduto,
        valorProduto,
        setValorProduto,
        imagemProduto,
        setImagemProduto,
        produtos,
        setProdutos,
        total,
        setTotal,
        email,
        setEmail,
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
      }}>
      {children}
    </DataContext.Provider>
  );
};
