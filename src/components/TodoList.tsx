import React, { Component } from 'react';
import {Get, Post, Delete} from './Axios';
import AddTodo from './AddTodo';
import { store } from '../utils/TodoStore';
import { observer } from 'mobx-react';

interface Props {}

interface State {
  error: any
}

@observer
class TodoList extends Component<Props, State> {
  private timerID: number = 0;

  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
    };

    this.updateTable = this.updateTable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(): void {
    this.updateTable();
    this.timerID = setInterval(() => this.updateTable(), 5000);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  updateTable() {
    Get().then(response => {
      store.todos = response.reverse();
    });
  }

  async handleSubmit(event, newTodo: Todo) {
    event.preventDefault();

    if (newTodo.content == '') {
      this.setState({
        error: 'Please input some content to add a new to-do!',
      });
      return;
    }

    this.setState({
      error: null,
    });

    await Post(newTodo).then(response => {
      store.todos = [response, ...store.todos];
    });
  }

  handleDelete(id: string) {
    Delete(id).then(response => {
      if (response) {
        store.todos = store.todos.filter(todo => todo.id !== id);
      } else {
        console.error("Delete failed");
      }
    });
  }

  render() {
    const todoList = store.todos.map((todo, index) => {
      return (
        <tr key={index}>
          <th>{todo.content}</th>
          <th>{ new Date(todo.createdAt).toLocaleString() }</th>
          <th><button onClick={() => this.handleDelete(todo.id)}>Delete</button></th>
        </tr>
      );
    });

    return (
      <div>
        <AddTodo handleSubmit={this.handleSubmit}/>
        <br/>
        {this.state.error}
        <br/>
        <table style={
          {
            border: "1px solid black"
          }
        }>
          <tbody>
            <tr>
              <th>Content</th>
              <th>Created at</th>
              <th>Delete</th>
            </tr>
            {todoList}
          </tbody>
        </table>

      </div>
    );
  }
}

export default TodoList;