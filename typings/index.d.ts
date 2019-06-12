// idはサーバーで生成します
type Todo = { id: string; content: string; createdAt: string };

declare namespace TodoList {
  namespace Get {
    type Request = {};
    type Response = {
      status: 200;
      data: {
        todos: Todo[];
      };
    };
  }
  namespace Post {
    type Request = {
      todo: { content: string };
    };
    type Response = { status: 200; data: Todo } | { status: 400; data: 'Bad Request' };
  }
  namespace Delete {
    type Request = { id: string };
    type Response = { status: 200; data: 'OK' };
  }
}
