import React, {useState} from 'react'
import{useForm} from "react-hook-form";
import Helmet from 'react-helmet';

// function ToDoList()  {

    // const [ toDo, setToDo ] = useState("");
    // const [ toDoError, setToDoError] = useState("");
    // const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    //     const {
    //         currentTarget : { value },
    //     } = event;
    //     setToDoError("");
    //     setToDo(value);
    // };
    // const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if(toDo.length < 10) {
    //         return setToDoError("To do should be longer");
    //     };
    //     console.log(toDo)
    // };

    // return (
    //         <div>
    //             <form onSubmit={onSubmit}>
    //                 <input onChange={onChange} value={toDo} placeholder="write to do" />
    //                 <button>Add</button>
    //                 {toDoError !== "" ? toDoError : null}
    //             </form>
    //         </div>
    // )
// };

interface IForm {
    email: string,
    password: string,
}

function ToDoList() {
    const { register, handleSubmit, formState:{errors} } = useForm<IForm>({
        defaultValues: {
            email:"@naver.com",
        }
    });
    const onValid = (data:any) => {
        console.log(data)
    }
    console.log(errors);
    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("email", {
                        required: "Email Required",
                        minLength: 10,
                        pattern: {
                            value:/^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        },
                    })}
                placeholder="email"
                />
                <span>
                    {errors?.email?.message}
                </span>
                <input {...register("password", {required:"Paasword is requierd!", minLength: 5})}placeholder="Password" />
                <button>Add</button>
            </form>
        </div>
    )
};

export default ToDoList;