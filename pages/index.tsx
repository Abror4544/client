import React, { useRef, useState } from "react";
import { prisma } from "../lib/prisma";
import Head from "next/head";
import axios from "axios";
import { getSession } from "next-auth/react";
import type { GetServerSideProps } from "next/types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { FormData, Props } from "../types";
import { useRouter } from "next/router";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";

import styles from "../styles/Home.module.scss";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
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
          destination: "/login",
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
  } catch (error) {
    return {
      props: {
        todos: null,
        session: null,
      },
    };
  }
};

const Home = ({ session, todos }: Props) => {
  const [form, setForm] = useState<FormData>({
    title: "",
    text: "",
    id: "",
  });
  const [errmsg, setErrMsg] = useState("");
  const [load, setLoad] = useState(false);
  const [btnText, setText] = useState("Add +");
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function run(data: FormData) {
    setLoad(true);
    if (data.id) {
      updateTodo(data);
    } else {
      try {
        axios
          .post("http://localhost:3000/api/create", data)
          .then(() => {
            setForm({ title: "", text: "", id: "" });
            refreshData();
            setErrMsg("");
            setLoad(false);
          })
          .catch((error) => setErrMsg(error?.response.data.message));
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteTodo(id: string) {
    try {
      setLoad(true);
      axios.delete(`http://localhost:3000/api/todo/${id}`).then(() => {
        refreshData();

        setLoad(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTodo(data: FormData) {
    try {
      setLoad(true);
      axios
        .patch(`http://localhost:3000/api/todo/${data.id}`, data)
        .then(() => {
          setForm({ title: "", text: "", id: "" });
          setLoad(false);
          refreshData();
          setText("Add +");
        });
    } catch (error) {
      console.log(error);
    }
  }

  const edit = (data: FormData) => {
    setForm({ title: data.title, text: data.text, id: data.id });
    setText("Change");
  };

  const handleSubmit = async (data: FormData) => {
    try {
      run(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <Head>
        <title>ToDo - Fullstack</title>
      </Head>
      <Header session={session} />
      <h1
        className="text-center font-bold text-2xl mt-4 mb-4"
        data-testid="heading"
      >
        Todos
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-xs mx-auto space-y-6 flex flex-col items-stretch"
        style={{ position: "relative" }}
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
          data-testid="testInput"
          required
        />
        <textarea
          placeholder="Description"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          data-testid="testTextarea"
          className="border-2 rounded border-gray-600 p-1"
        />

        <button
          disabled={load}
          type="submit"
          className={`bg-blue-500 text-white rounded p-1 ${styles.btn}`}
        >
          {btnText}
        </button>
        {load && <Loader />}

        {errmsg && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errmsg}</AlertDescription>
          </Alert>
        )}
      </form>

      <div className="w-auto min-w-[25%] max-w-xs mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {todos?.map((todo) => (
            <li
              data-testid="todoList"
              key={todo.id}
              className="border-b border-gray-600 p-2"
            >
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
