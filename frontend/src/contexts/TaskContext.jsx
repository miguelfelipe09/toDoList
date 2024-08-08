import { createContext, useState } from "react";
import axios from "axios";
const formatter = Intl.DateTimeFormat('pt-BR', {
    dateStyle: "short"
})
export const TaskContext = createContext()
export default function TaskContextProvider( {children} ) {

    
    const [task, setTask] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [importance, setImportance] = useState(false)
    const [tasksFinished, setTaskFinished] = useState([]);

    const addTask = () => {
        axios.post('http://localhost:5000/tasks', { title, date, importance })
        .then(response => setTask([...task, response.data]))
        .catch(error => console.error('Erro ao adicionar usuário:', error));
        setTitle('')
        setDate('')
        setImportance(false)
    };

    const deleteTask = (id, title, date, importance) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
          .then(response => {
            setTask(task.filter(tasks => tasks._id !== id));
          })
          .catch(error => console.error('Erro ao excluir usuário:', error));
        taskFinished(title, date, importance)
    };

    const taskFinished = (title, date, importance) => {
        axios.post('http://localhost:5000/tasksFinished', { title, date, importance })
        .then(response => setTaskFinished([...tasksFinished, response.data]))
        .catch(error => console.error('Erro ao adicionar usuário:', error));
        setTitle('')
        
    };

    const deleteTaskFinished = (id) => {
        axios.delete(`http://localhost:5000/tasksFinished/${id}`)
          .then(response => {
            setTaskFinished(tasksFinished.filter(task => task._id !== id));
          })
          .catch(error => console.error('Erro ao excluir usuário:', error));
    };

    const handleOnChange = () => {
        setImportance(!importance)
    }

    const formatter = Intl.DateTimeFormat('pt-BR', {
        dateStyle: "short"
    })

    function formatDateToBrazilian(dateString) {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        
        return `${day}/${month}/${year}`;
      }

    const teste = {
        task,
        setTask,
        setTitle,
        setDate,
        setImportance,
        tasksFinished,
        setTaskFinished,
        title,
        date,
        importance,
        addTask,
        deleteTask,
        taskFinished,
        deleteTaskFinished,
        handleOnChange,
        formatter,
        formatDateToBrazilian
    }

    return (
        <TaskContext.Provider value={teste}>
            {children}
        </TaskContext.Provider>
    )
}