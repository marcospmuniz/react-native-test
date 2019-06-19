import React from "react";
import Routes from "./routes";

// configurações da statusbar do telefone
import "./config/StatusBarConfig";

/*
 * Quando não for preciso usar nenhuma propriedade do Component do React, então
 * não precisa criar uma classe que exporta um componente, basta criar uma função normal
 * com o retorno desejado e exportar esta função, como nesse exemplo
 */
const App = function() {
  return <Routes />;
};

export default App;
