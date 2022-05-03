import './App.css';
import { useState } from 'react';
import {FiSearch} from 'react-icons/fi'
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function pesquisa(){

    if(input === ''){
      alert('Digite um cep')
    }

    try{
      const resposta = await api.get(`${input}/json`)
      setCep(resposta.data)
      setInput('')
    }
    catch{
      alert('Erro ao buscar')
      setInput('')
    }

  }

  return (

    <div className="container">

      <h1 className='titulo'>Buscador CEP</h1>

      <div className='box-input'>

        <input type='text' 
        placeholder='Digite um cep...' 
        value={input} 
        onChange={ (e) => setInput(e.target.value) } />

        <button className='btn' onClick={pesquisa}>
          
          <FiSearch size={25} color='#FFF' />

        </button>

      </div>

      {Object.keys(cep).length > 0 && (

        <main className='main'>

          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
      )}

    </div>
  );
}

export default App;
