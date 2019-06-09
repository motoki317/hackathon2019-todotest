import axios from 'axios';

const url = "http://hackathon-test-server.jichoup.trap.show/";

export function Get(): Promise<Todo[]> {
  return axios.get(url).then((response) => {
    console.log("Get Success: ", response);
    return response.data as Todo[];
  }).catch((error: TodoList.Get.Response) => {
    console.log("Get Error: ", error);
    return [];
  });
}

export function Post(todo: Todo): Promise<Todo> {
  const data = {
    content: todo.content
  };

  return axios.post(url, data).then((response) => {
    console.log("Post Success: ", response);
    return response.data as Todo;
  }).catch((error: TodoList.Post.Response) => {
    console.log("Post Error:", error);
    return {id: "", content: "", createdAt: ""};
  });
}

export function Delete(id: string): Promise<boolean> {
  return axios.delete(url, {data: {id: id}}).then((response) => {
    console.log("Delete Success: ", response);
    return response.status === 200;
  }).catch((error: TodoList.Delete.Response) => {
    console.log("Delete Error: ", error);
    return false;
  });
}


