import React, { useState } from "react";
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
  Flex,
} from "@chakra-ui/react";
import { IFormProps, Props } from "../types";
import { useRouter } from "next/router";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";

import styles from "../styles/Home.module.scss";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        title: true,
        text: true,
        id: true,
        done: true,
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
  const [form, setForm] = useState<IFormProps>({
    title: "",
    text: "",
    id: "",
    done: "",
  });

  const [errmsg, setErrMsg] = useState("");
  const [load, setLoad] = useState(false);

  const [btnText, setText] = useState("Add +");
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function run(data: IFormProps) {
    setLoad(true);
    if (data.id) {
      updateTodo(data);
    } else {
      console.log(data, "func run");

      try {
        axios
          .post("/api/create", data)
          .then(() => {
            setForm({ title: "", text: "", id: "", done: "" });
            refreshData();
            setErrMsg("");
            setLoad(false);
          })
          .catch((error) => {
            setErrMsg(error?.response.data.message);
            setLoad(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function deleteTodo(id: string) {
    try {
      setLoad(true);
      axios.delete(`/api/todo/${id}`).then(() => {
        refreshData();
        setLoad(false);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTodo(data: IFormProps) {
    try {
      setLoad(true);
      axios.patch(`/api/todo/${data.id}`, data).then(() => {
        setForm({ title: "", text: "", id: "", done: "" });
        setLoad(false);
        refreshData();
        setText("Add +");
      });
    } catch (error) {
      console.error(error);
    }
  }

  const edit = (data: IFormProps) => {
    setForm({
      title: data.title,
      text: data.text,
      id: data.id,
      done: data.done,
    });
    setText("Change");
  };

  const handleSubmit = async (data: IFormProps) => {
    console.log(data, "func handle");

    try {
      run(data);
    } catch (error) {
      console.error(error);
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
        onSubmit={(event) => {
          event.preventDefault();
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
          onChange={(e) => {
            e.preventDefault();
            setForm({ ...form, text: e.target.value });
          }}
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
      <Flex
        justifyContent="center"
        gap="20px"
        py={8}
        className="max-w-[70%] m-auto tabletMini:max-w-full mobile:flex-col"
      >
        <div className="w-[48%] space-y-6 flex flex-col items-stretch mobile:w-full">
          <p className="text-center font-bold text-lg mb-2">Process</p>
          <ul className={styles.list}>
            {todos?.map(
              (todo) =>
                !todo.done && (
                  <li
                    data-testid="todoList"
                    key={todo.id}
                    className={`border-b border-gray-600 p-2 ${
                      styles.todo__item
                    } ${todo.done ? styles.done : ""}`}
                  >
                    <div className="flex justify-between">
                      <div
                        className="flex-1"
                        onClick={() => {
                          run({
                            title: todo.title,
                            text: todo.text,
                            id: todo.id,
                            done: todo.done ? "" : "Yes",
                          });
                        }}
                      >
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
                )
            )}
          </ul>
        </div>
        <div className="w-[48%] space-y-6 flex flex-col items-stretch mobile:w-full">
          <p className="text-center font-bold text-lg mb-2">Done</p>
          <ul className={styles.list}>
            {todos?.map(
              (todo) =>
                todo.done && (
                  <li
                    data-testid="todoList"
                    key={todo.id}
                    className={`border-b border-gray-600 p-2 ${
                      styles.todo__item
                    } ${todo.done ? styles.done : ""}`}
                  >
                    <div className="flex justify-between">
                      <div
                        className="flex-1"
                        onClick={() => {
                          run({
                            title: todo.title,
                            text: todo.text,
                            id: todo.id,
                            done: todo.done ? "" : "Yes",
                          });
                        }}
                      >
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
                )
            )}
          </ul>
        </div>
      </Flex>
    </main>
  );
};

export default Home;
