import React, { useEffect } from "react";
import { useState } from "react";
import Actionbtn from "../actions/Actionbtn";
import axios from "axios";
import { motion } from "framer-motion";

interface TaskcardProps {
  user?: any;
  id: number;
  title: string;
  date: string;
  isDone: boolean;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
}

const Taskcard: React.FC<TaskcardProps> = ({
  id,
  title,
  date,
  isDone,
  user,
  onDelete,
  onEdit,
}: any) => {
  const [checked, setChecked] = useState(isDone);
  const token = localStorage.getItem("access");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleValue, setTitle] = useState<string>("");

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/todo/list/tasks/${id}/`,
        {
          headers: {
            user: user.id,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(id);
    } catch (e) {
      console.error(e);
    }
  };

  const handeEdit = () => {
    setIsEdit(!isEdit);
    setTitle(title);
  };

  const saveEdit = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/todo/list/tasks/${id}/`,
        {
          title: titleValue,
          user: user.id,
          isDone: checked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEdit(false);
      if (onEdit) onEdit(titleValue);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: -25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
      }}
      className="w-full"
    >
      <div className="w-full bg-neutral-50 p-2 rounded-lg shadow">
        <div className="flex items-center bg-white rounded-lg p-2">
          <div className="w-2 h-2 bg-green-300 rounded-full mr-4"></div>
          <div className="flex-grow text-neutral-500 first-letter:uppercase">
            {isEdit ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={titleValue}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-b border-purple-300 text-[18px] focus:border-purple-700 transition-colors duration-200 outline-none font-[SfBold] w-[40%] min-w-[125px]"
                />
                <Actionbtn text="Save" action={saveEdit} />
              </div>
            ) : (
              <h1
                className="font-[SfBold] text-[18px]"
                style={
                  checked
                    ? { textDecoration: "line-through", fontStyle: "italic" }
                    : {}
                }
              >
                {title}
              </h1>
            )}
          </div>
          <div className="text-neutral-500 mr-4 text-[10px] text-[Sf]">
            {date}
          </div>
          <div className="flex justify-center items-center gap-2">
            {isEdit && (
              <div className="w-4 h-4 flex items-center justify-center border-2 border-purple-500 text-purple-500 rounded-full">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={checked}
                    onChange={handleChange}
                  />
                  <div
                    className={`w-4 h-4 border-2 rounded-md flex items-center justify-center transition-colors duration-300 ${
                      checked
                        ? "bg-[#6a64f1] border-[#6a64f1]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 text-white transform transition-transform duration-300 ${
                        checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            )}
            <Actionbtn text="Edit" bg="#FFCC00" action={handeEdit} />
            <Actionbtn text="Delete" bg="#FF605C" action={handleDelete} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Taskcard;
