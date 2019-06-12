import React, { Component } from 'react';
import {Get, Post, Delete} from './Axios';
import AddTodo from './AddTodo';

interface Props {
}

interface State {
  todos: Todo[];
  error: any
}

class TodoList extends Component<Props, State> {
  private timerID: number = 0;

  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
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
      this.setState({
        todos: response.reverse()
      });
    });
  }

  async handleSubmit(event, newTodo: Todo): void {
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
      this.setState((state) => {
        return {
          todos: [response, ...state.todos]
        };
      });
    });
  }

  handleDelete(id: string) {
    Delete(id).then(response => {
      if (response) {
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== id)
        });
      } else {
        console.error("Delete failed");
      }
    });
  }

  render() {
    const todoList = this.state.todos.map((todo, index) => {
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