import axios from "axios";
import type { GetServerSideProps } from "next";
import { useState } from "react";
import { prisma } from "../lib/prisma";
import { useRouter } from "next/router";
import Head from "next/head";
import { getSession } from "next-auth/react";
type FormData = {
  title: string;
  text: string;
  id: string;
};

export interface ITodos {
  todos: {
    id: string;
    title: string;
    text: string;
  }[];
}

interface ISessionProps {
  id: number;
  name: string;
  email: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const todos = await prisma.todo.findMany({
    select: {
      title: true,
      text: true,
      id: true,
    },
  });

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      todos,
      session,
    },
  };
};

const Home = ({ todos }: ITodos, session: ISessionProps) => {
  const [form, setForm] = useState<FormData>({ title: "", text: "", id: "" });

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function run(data: FormData) {
    if (data.id) {
      updateTodo(data);
    } else {
      try {
        axios.post("http://localhost:3000/api/create", data).then(() => {
          setForm({ title: "", text: "", id: "" });
          refreshData();
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteTodo(id: string) {
    try {
      axios.delete(`http://localhost:3000/api/todo/${id}`).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTodo(data: FormData) {
    try {
      axios
        .patch(`http://localhost:3000/api/todo/${data.id}`, data)
        .then(() => {
          setForm({ title: "", text: "", id: "" });
          refreshData();
        });
    } catch (error) {
      console.log(error);
    }
  }

  const edit = (data: FormData) => {
    setForm({ title: data.title, text: data.text, id: data.id });
  };

  const handleSubmit = async (data: FormData) => {
    try {
      run(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Head>
        <title>ToDo - Fullstack</title>
      </Head>
      <h1 className="text-center font-bold text-2xl mt-4" data-testid="heading">Todos</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <textarea
          placeholder="Description"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />

        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>

      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{todo.title}</h3>
                  <p className="text-sm">{todo.text}</p>
                </div>
                <button
                  className="bg-blue-500 mr-2 ml-2 px-3 text-white rounded self-center"
                  onClick={() => edit(todo)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-3 text-white rounded self-center"
                  onClick={() => deleteTodo(todo.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
