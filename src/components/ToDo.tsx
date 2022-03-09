import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";


function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id)
            const oldToDo = oldToDos[targetIndex];
            const newToDo = {text, id, category: name as any};
            const toDos = [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)]
            localStorage.setItem("toDo", JSON.stringify(toDos));
            console.log(oldToDo, newToDo);
            return toDos;
        })
    };
    const deleteToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id)
            const toDos = [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex+1)]
            localStorage.setItem("toDo", JSON.stringify(toDos));
            console.log(oldToDos[targetIndex].text, "is deleted");
            return toDos;
        })

    };
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
            <button onClick={deleteToDo}>Delete</button>
        </li>
    );
}

export default ToDo;