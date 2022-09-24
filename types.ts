export type IFormProps = {
  title: string;
  text: string;
  id: string;
  done: string;
};

export type Props = {
  session: IProps;
  todos: IFormProps[];
};

export interface IUser {
  name: string;
  email: string;
}

export interface IProps {
  user: IUser;
  expires: string;
  id: number;
}

export interface ISession {
  session: IProps | null;
}
