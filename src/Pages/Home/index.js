import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import {useHistory} from 'react-router-dom';

function App(props) {

  const history = useHistory();
  const [usuario, setUsuario] = useState('');
  const [erro, setErro] = useState(false);

  function handlePesquisa(){
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then(response => {
        const repositories = response.data;
        const repositoriesName = [];
        repositories.map((repository) => {
          repositoriesName.push(repository.name);
        });
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
        setErro(false);
        history.push('/Repositories');
      })
      .catch(err => {
        setErro(true);
      });
  }

  return (
     <S.HomeContainer>
        <S.Image src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"></S.Image>
       <h1>Busca de Repositórios</h1>
      <S.Content>
        <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={user => setUsuario(user.target.value)} />
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
      {
        erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : ''
      }
    </S.HomeContainer>
  );
}

export default App;