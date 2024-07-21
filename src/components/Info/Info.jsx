import './Info.css';
import React from 'react';
import { Container, Header, Content, List, Panel } from 'rsuite';

const Info = () => {
  return (
    <div className='container'>
      <Header>
        <h1>Proyecto Web Crud API en JavaScript React</h1>
      </Header>
      <Content>
        <Panel bordered>
          <p>
            Esta página web que he desarrollado utilizando JavaScript con la librería React se encarga de gestionar los endpoints de la API, permitiendo al usuario una vez autenticado visualizar y manipular los datos.
          </p>
        </Panel>
        <Panel header="Requisitos" bordered>
          <ul>
            <li>Node.js : 20.12.2</li>
            <li>npm : 10.5.0</li>
            <li>React : 18.2.0</li>
            <li>React Suite : 5.64.2</li>
          </ul>
        </Panel>
        <Panel header="Instalación" bordered>
          <List>
            <List.Item className='lista'>
              <strong>1. Clona el repositorio:</strong>
              <pre>
                <code>
                  git clone https://github.com/anap011/project_inventory_management-web_crud.git<br />
                  cd project_inventory_management-web_crud
                </code>
              </pre>
              <strong>2. Instala los requisitos:</strong>
              <pre>
                <code>
                  npm install<br />
                  npm install react@18.2.0 react-dom@18.2.0<br />
                  npm install rsuite@5.64.2
                </code>
              </pre>
              <strong>3. Inicie el proyecto:</strong>
              <pre>
                <code>
                  npm start
                </code>
              </pre>
            </List.Item>
          </List>
        </Panel>
      </Content>
    </div>
  );
};

export default Info;
