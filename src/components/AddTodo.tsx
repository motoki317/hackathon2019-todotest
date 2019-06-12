import React, { Component } from "react";

interface Props {
  handleSubmit: Function;
}

interface State {
  newTodo: Todo;
}

class AddTodo extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      newTodo: {
        content: "",
        id: "",
        createdAt: ""
      }
    };

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

  onKeyDown(event): void {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter' && this.hasModifierKey(event)) {
      event.preventDefault();
      event.stopPropagation();
      this.onSubmit(event);
    }
  }

  hasModifierKey(event): boolean {
    return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
  }

  async onSubmit(event) {
    await this.props.handleSubmit(event, this.state.newTodo);
    this.setState({
        newTodo: {
          content: "",
          id: "",
          createdAt: ""
        }
      });
  }

  render() {
    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <label>
          Content <br/>
          <textarea onKeyDown={(event) => this.onKeyDown(event)} value={this.state.newTodo.content} onChange={(event) => this.handleInputChange(event)}/>
        </label>
        <input type="submit" value={'Add Todo'}/>
      </form>
    );
  }
}

export default AddTodo;