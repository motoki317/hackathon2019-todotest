import React from 'react';
import {Get, Post, Delete} from './Axios';

interface Props {
}

interface State {
  todos: Todo[];
  newTodo: Todo;
  error: any
}

class TodoList extends React.Component<Props, State> {
  private timerID: number = 0;

  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
      newTodo: {
        id: '',
        content: '',
        createdAt: '',
      },
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTable = this.updateTable.bind(this);
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
        todos: response
      });

      console.log("Current todos: ", this.state.todos);
    });
  }

  handleInputChange(event) {
    this.setState({
      newTodo: {
        id: '',
        content: event.target.value,
        createdAt: '',
      },
    });
  }

  handleSubmit(event) {
    if (this.state.newTodo.content == '') {
      this.setState({
        error: 'Please input some content to add a new to-do!',
      });
      return;
    }

    this.setState({
      error: null,
    });

    Post(this.state.newTodo).then(response => {
      this.setState((state) => {
        state.todos.push(response);
      });

      this.setState({
        newTodo: {
          id: '',
          content: '',
          createdAt: '',
        },
      });
    });
  }


  render() {
    const todoList = this.state.todos.map((todo, index) => {
      return (
        <tr key={index}>
          <th>{todo.content}</th>
          <th>{todo.createdAt}</th>
        </tr>
      );
    });

    return (
      <div>
        <label>
          Content
          <input type="text" value={this.state.newTodo.content} onChange={this.handleInputChange}/>
        </label>
        <button onClick={this.handleSubmit}>Add Todo</button>
        <br/>
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
            </tr>
            {todoList}
          </tbody>
        </table>
        {this.state.error}
      </div>
    );
  }
}

export default TodoList;