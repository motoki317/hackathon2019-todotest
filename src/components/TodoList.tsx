import React from "react";

interface Props {}
interface State {
    todos: Todo[];
    newTodo: Todo;
    error: any
}

class TodoList extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: [],
            newTodo: {
                id: "",
                content: "",
                createdAt: ""
            },
            error: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            newTodo: {
                id: "",
                content: event.target.value,
                createdAt: ""
            }
        });
    }

    handleSubmit(event) {
        if (this.state.newTodo.content == "") {
            this.setState({
                error: "Please input some content to add a new to-do!"
            });
            return;
        }

        this.setState({
            error: null
        });

        const todo: Todo = {
            id: "",
            content: this.state.newTodo.content,
            createdAt: ""
        };

        this.setState((state) => {
            state.todos.push(todo);
        });

        this.setState({
            newTodo: {
                id: "",
                content: "",
                createdAt: ""
            }
        });
    }


    render() {
        const todoList = this.state.todos.map((todo) => {
            return <li>{ todo.content } @ { todo.createdAt }</li>
        });

        return (
            <div>
                <label>
                    Content
                    <input type="text" value={ this.state.newTodo.content } onChange={this.handleInputChange}/>
                </label>
                <button onClick={this.handleSubmit}>Add Todo</button>
                <ul>
                    {todoList}
                </ul>
                {this.state.error}
            </div>
        )
    }
}

export default TodoList;