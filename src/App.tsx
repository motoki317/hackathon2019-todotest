import React, { Component } from "react";
import styled from "styled-components";

import Clock from "./components/Clock";
import TodoList from "./components/TodoList";
import AddTodo from './components/AddTodo';
import { Post } from './components/Axios';
import NavBox from './components/NavBox';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

interface Props {}
interface State {
  page: 'LIST' | 'ADD';
}

const pages: Page[] = [
  {
    name: 'LIST',
    displayName: "Todo-List"
  },
  {
    name: 'ADD',
    displayName: 'Add Todo'
  }
];

export default class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      page: 'LIST'
    };

    this.onPageSelect = this.onPageSelect.bind(this);
  }

  onPageSelect(page) {
    this.setState({
      page: page
    });
  }

  render() {
    let view;

    switch (this.state.page) {
      case 'LIST':
        view = <TodoList/>;
        break;
      case 'ADD':
        view = (
          <AddTodo handleSubmit={(event, newTodo) => {
              Post(newTodo)
            }
          }/>
        );
        break;
      default:
        view = <TodoList />;
        break;
    }

    return (
        <div>
          <NavBox pages={pages} onSelect={this.onPageSelect}/>
          <Title>Hello World!</Title>
          <Clock />
          {view}
        </div>
    );
  }
}
