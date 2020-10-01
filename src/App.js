import React, { useState } from "react";
import "./App.css";

function App() {
    const [taskToAdd, setTaskToAdd] = useState();
    const [listTaks, setListTask] = useState([]);

    const addTask = () => {
        if (listTaks.length < 10) {
            setTaskToAdd();
            setListTask([...listTaks, taskToAdd]);
        }
    };

    const deleteTask = (idTask) => {
      const newListTask = listTaks.filter(e=>e.id != idTask)
      setListTask(newListTask)
    };

    return (
        <div>
            <h1>Bienvenido a todo task</h1>
            <label htmlFor="taskInput">Ingrese tarea</label>
            <textarea
                id={"taskInput"}
                placeholder="Ingrese Tarea"
                maxLength={100}
                type="text"
                value={(taskToAdd && taskToAdd.task) || ""}
                onChange={(e) =>
                    setTaskToAdd({
                        id: new Date(Date.now()).toISOString(),
                        task: e.target.value,
                    })
                }
            />
            <div>
                <button
                    disabled={!taskToAdd || taskToAdd.length < 1}
                    onClick={() => addTask()}
                >
                    Agregar tarea
                </button>
            </div>
            <div>
                <h2>Tareas agregadas: {listTaks.length}</h2>
                <div>
                    {listTaks.length > 0 &&
                        listTaks.map((t) => {
                            return (
                                <div key={t.id}>
                                    <h3>{t.task}</h3>
                                    <button onClick={() => deleteTask(t.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default App;
