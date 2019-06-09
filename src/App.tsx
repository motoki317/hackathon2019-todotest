import React from "react";
import Clock from "./components/Clock";
import TodoList from "./components/TodoList";

export default class App extends React.Component {
  render() {
    return (
        <div>
          <div>Hello World!</div>
          <Clock />
          <TodoList />
        </div>
    );
  }
}
