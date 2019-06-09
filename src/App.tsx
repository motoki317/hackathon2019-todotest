import React from "react";
import styled from "styled-components";

import Clock from "./components/Clock";
import TodoList from "./components/TodoList";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export default class App extends React.Component {
  render() {
    return (
        <div>
          <Title>Hello World!</Title>
          <Clock />
          <TodoList />
        </div>
    );
  }
}
