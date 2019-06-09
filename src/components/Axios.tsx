import axios from 'axios';
import "babel-polyfill";

const url = "http://hackathon-test-server.jichoup.trap.show/";

export async function Get(): Promise<Todo[]> {
  // return (await axios.get(url)).data as Todo[]
  // ↑ cannot handle exceptions

  return axios.get(url).then((response) => {
    console.log("Get Success: ", response);
    return response.data.todos as Todo[];
  }).catch((error: TodoList.Get.Response) => {
    console.error("Get Error: ", error);
    return [];
  });
}

export async function Post(todo: Todo): Promise<Todo> {
  const data = {
    content: todo.content
  };

  // return (await axios.post(url, data)).data as Todo;

  return axios.post(url, data).then((response) => {
    console.log("Post Success: ", response);
    return response.data as Todo;
  }).catch((error: TodoList.Post.Response) => {
    console.error("Post Error:", error);
    return {id: "", content: "", createdAt: ""};
  });
}

export async function Delete(id: string): Promise<boolean> {
  // return (await axios.delete(url, {data: {id: id}})).status === 200;

  return axios.delete(url, {data: {id: id}}).then((response) => {
    console.log("Delete Success: ", response);
    return response.status === 200;
  }).catch((error: TodoList.Delete.Response) => {
    console.error("Delete Error: ", error);
    return false;
  });
}


