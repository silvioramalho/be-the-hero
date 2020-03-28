import React, { useState } from 'react';

import Header from './Header'
// import Header2 from './Header2'

function App() {
  // Array [valorAtual, funcaoDeAtualizacao]
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }
  return (
    // <Header2 title="Semana Oministack" />
    // <Header>Semana Oministack</Header>
    <div>
      <Header>Contador: {counter}</Header>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}

export default App;
