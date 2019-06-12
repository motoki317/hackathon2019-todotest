import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";

import Clock from "./components/Clock";
import TodoList from "./components/TodoList";
import AddTodo from './components/AddTodo';
import { Post } from './components/Axios';
import NavBox from './components/NavBox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = ({className}) => {
  return (
    <div className={className}>
      <h1>Hello World!<FontAwesomeIcon icon={faCoffee} /></h1>
    </div>
  );
};

const StyledTitle = styled(Title)`
  font-size: 1.5em;
  text-align: center;
  color: lightgreen;
`;

interface Props {}
interface State {
  page: Pages;
}

export type Pages = '/' | '/add';

const pages: Page[] = [
  {
    name: '/',
    displayName: "Todo-List"
  },
  {
    name: '/add',
    displayName: 'Add Todo'
  }
];

export default class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      page: '/'
    };

    library.add(faCoffee);
  }

  render() {
    return (
        <div>
          <BrowserRouter>
            <NavBox pages={pages}/>
            <StyledTitle />
            <Clock />
            <div>
              <Route exact path={'/'} component={TodoList} />
              <Route path={'/add'} render={() => {return <AddTodo handleSubmit={(event, newTodo) => {Post(newTodo)}}/>}}/>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}
