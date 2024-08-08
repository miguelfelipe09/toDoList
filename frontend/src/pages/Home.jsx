import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useTask from '../hooks/useTask';

export default function Home() {

        const { addTask, deleteTask, formatDateToBrazilian, deleteTaskFinished, handleOnChange, formatter, setTask,task, tasksFinished, setTaskFinished, title, date, importance, setTitle, setDate, setImportance } = useTask()

        const formattedDate = (date) => {date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })};
          

        useEffect(() => {
            axios.get('http://localhost:5000/tasks')
              .then(response => setTask(response.data))
              .catch(error => console.error('Erro ao buscar usuários:', error));
              axios.get('http://localhost:5000/tasksFinished')
              .then(response => setTaskFinished(response.data))
              .catch(error => console.error('Erro ao buscar usuários:', error));
          }, []);

        return (
            <div className="tasks-container">
                <div className="flex">
                    <div id="plus" onClick={addTask}>
                        <img src="../../public/images/mais.png" alt="" />
                    </div>
                    <input type="text" name="" id="input-task" placeholder='Adicionar uma tarefa' value={title} onChange={(ev) => {setTitle(ev.target.value)}}/>
                    <div id='importance-container'>
                        <label htmlFor="checkbox">{importance ? <img src="../../public/images/estrela.png" alt="" /> : <img src="../../public/images/estrela1.png" alt="" />}</label>
                    </div>
                    <input type="date" name="" id="date" value={date} onChange={(ev) => {setDate(ev.target.value)}}/>
                    <input type="checkbox" name="" id="checkbox" checked={importance} onChange={handleOnChange} hidden/>
                </div>
                <div id="task-table">
                    <div className='item-table'></div>
                    <div className="task-title item-table">Titulo</div>
                    <div className="task-date item-table">Data para conclusão</div>
                    <div className="item-table">Importancia</div>
                    {task.map(tasks => (
                        <>
                            <div className='item-table'><div className='check' onClick={() => {deleteTask(tasks._id, tasks.title, tasks.date, tasks.importance)}}>✔</div></div>
                            <div className="task-title item-table">{tasks.title}</div>
                            <div className="task-date item-table">{formatDateToBrazilian(tasks.date)}</div>
                            <div className="importance item-table">{tasks.importance ? <img src="../../public/images/estrela.png" alt="" /> : <img src="../../public/images/estrela1.png" alt="" />}</div>   
                        </>
                    ))}
                </div>
                <h1>Concluídas</h1>
                <div id="task-table">
                    <div className='item-table'></div>
                    <div className="task-title item-table">Titulo</div>
                    <div className="task-date item-table">Data para conclusão</div>
                    <div className="item-table">Importancia</div>
                    {tasksFinished.map(tasks => (
                        <>
                            <div className='item-table'><div className='check finished' onClick={() => {deleteTaskFinished(tasks._id)}}>✔</div></div>
                            <div className="task-title item-table dashed"><s>{tasks.title}</s></div>
                            <div className="task-date item-table">{formatDateToBrazilian(tasks.date)}</div>
                            <div className="importance item-table">{tasks.importance ? <img src="../../public/images/estrela.png" alt="" /> : <img src="../../public/images/estrela1.png" alt="" />}</div>   
                        </>
                    ))}
                </div>

            </div>
        );
}