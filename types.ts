export type FormData = {
  title: string;
  text: string;
  id: string;
  done: string;
};

export type Props = {
  session: IProps;
  todos: {
    id: string;
    title: string;
    text: string;
    done: string;
  }[];
};

export type FormDataArr = {
  title: string;
  text: string;
  id: string;
  done: string;
}[];

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
