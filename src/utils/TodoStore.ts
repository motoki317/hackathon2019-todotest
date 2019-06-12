import { observable } from 'mobx';
import { Get } from '../components/Axios';

class TodoStore {
  @observable todos: Todo[] = [];

  constructor() {
    Get().then((response: Todo[]) => {
      this.todos = response;
    })
  }
}

const store = new TodoStore();

export {
  TodoStore,
  store
};
