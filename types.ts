export type FormData = {
  title: string;
  text: string;
  id: string;
};

export type TodosProps = {
  todos: {
    id: string;
    title: string;
    text: string;
  }[];
};

export type FormDataArr = {
  title: string;
  text: string;
  id: string;
}[];
