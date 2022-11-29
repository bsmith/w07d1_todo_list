import './App.css';
import React, { useState } from 'react';

function App() {
    const [tasks, setTasks] = useState(
        [
            { name: "Buy shopping", priority: "high" },
            { name: "Clean bathroom", priority: "low" },
            { name: "Car's MOT", priority: "high" }
        ]
    );

    const [newTask, setNewTask] = useState("");

    const [newPriority, setNewPriority] = useState("low");

    const changePriority = (index) => {
        const newTaskArray = [...tasks];
        const oldPriority = newTaskArray[index].priority;
        if (oldPriority === "low") {
            newTaskArray[index].priority = "high";
        }
        else if (oldPriority === "high") {
            newTaskArray[index].priority = "low";
        }
        setTasks(newTaskArray)

    }

    const taskNodes = tasks.map((task, index) => {
        return (
            <li key={index} className={task.priority === "high" ? "high-priority" : "low-priority"}>
                {task.name}
                <div>
                    <input type="range" id={`priority-${index}`} name={`priority-${index}`}
                        min="0" max="100" value={task.priority === "high" ? 100 : 0} step="100"
                        onChange={() => { changePriority(index) }}>
                    </input>
                    <label htmlFor={`priority-${index}`}>{ task.priority[0].toUpperCase() + task.priority.slice(1) }</label>
                </div>


            </li>
        )
    });

    const handleTextChange = (event) => {
        setNewTask(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setNewPriority(event.target.value);
    }

    const saveNewTask = (event) => {
        event.preventDefault();
        const newTasksArray = [...tasks];
        newTasksArray.push({ name: newTask, priority: newPriority });
        setTasks(newTasksArray);
        setNewTask("");
    };

    return (
        <>
            <h1>Todo list</h1>

            <form onSubmit={saveNewTask}>
                <label htmlFor="new-task">Add new task</label>
                <textarea id="new-task" value={newTask} onChange={handleTextChange} lines="3"></textarea>

                <input type="radio" id="high" name="priority" value="high" checked={newPriority === "high"} onChange={handlePriorityChange}></input>
                <label htmlFor="high">High</label>
                <input type="radio" id="low" name="priority" value="low" checked={newPriority === "low"} onChange={handlePriorityChange}></input>
                <label htmlFor="low">Low</label>

                <input type="submit" value="Save new task"></input>
            </form>

            <ul>
                {taskNodes}
            </ul>
        </>
    );
}

export default App;
