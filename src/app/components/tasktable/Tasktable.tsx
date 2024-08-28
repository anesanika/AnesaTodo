import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { IoAddOutline } from "react-icons/io5";
import Taskcard from "../taskcard/Taskcard";
import { AnimatePresence } from "framer-motion";

interface TaskType {
  id: number;
  title: string;
  date: string;
  isDone: boolean;
}

type TaskTypes = TaskType[];

const Tasktable = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskTypes>([]);
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getAllTask = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/todo/list/tasks/?user=${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setTasks(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    getAllTask();
  }, [user?.id]);

  const addTask = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/todo/list/tasks/`,
        {
          user: user?.id,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTitle("");
      setError(null);
    } catch (e: any) {
      console.error("Task ADD", e);
      setError(e.response);
    }
  };

  const dynamicDelete = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const dynamicEdit = (taskId: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <form className="w-full" onSubmit={addTask}>
          <div className="flex gap-2 pb-6 border-b border-[#e0e5ff]">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-dashed border-[#c7cefe] bg-white py-1 px-3 text-base font-medium text-[#6B7280] outline-none transition duration-300 focus:border-solid focus:border-[#6A64F1] focus:shadow-md"
              style={
                error ? { boxShadow: "0 0 4px  red" } : { boxShadow: "none" }
              }
            />
            <button
              className="bg-[#4CD964] text-white p-2 rounded-md text-[1.5rem]"
              type="submit"
            >
              <IoAddOutline />
            </button>
          </div>
        </form>
      </div>
      <div className="py-6 flex flex-col gap-1">
        <AnimatePresence>
          {tasks
            .slice()
            .reverse()
            .map((task) => (
              <Taskcard
                key={task.id}
                {...task}
                user={user}
                onDelete={() => dynamicDelete(task.id)}
                onEdit={(newTitle: any) => dynamicEdit(task.id, newTitle)}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tasktable;
