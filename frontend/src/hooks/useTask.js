import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

export default function useTask() {
    return useContext(TaskContext)
}