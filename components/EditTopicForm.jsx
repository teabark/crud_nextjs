'use client'

import {useState} from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({id, title ,description}){

    const router = useRouter();

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch(`http://localhost:3000/api/topics${id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({newTitle, newDescription})
            })

            if(res.ok){
                throw new Error ("Failed to update topic")
            }

            router.refresh();
            router.push('/');
        }catch(error){
            console.log(error)
        }
    }

    return (
        <form className="flex flex-col gap-3">
        <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
        onChange = {(e)=> setNewTitle(e.target.value)}
        value={newTitle}
        />
                <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
        onChange = {(e)=> setNewDescription(e.target.value)}
        value={newDescription}
        />

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Update Topic</button>
    </form>
    );
}