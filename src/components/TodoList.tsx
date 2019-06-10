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
  private timerID: number;

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
        todos: response.reverse()
      });
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
    event.preventDefault();

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
        return {
          todos: [response, ...state.todos]
        };
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

  onKeyDown(event): void {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter' && this.hasModifierKey(event)) {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit(event);
    }
  }

  hasModifierKey(event): boolean {
    return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
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
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>
            Content <br/>
            <textarea onKeyDown={(event) => this.onKeyDown(event)} value={this.state.newTodo.content} onChange={() => this.handleInputChange(event)}/>
          </label>
          <input type="submit" value={'Add Todo'}/>
        </form>
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