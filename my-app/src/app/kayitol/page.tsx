"use client";
import {useState} from "react";
import { useRouter } from "next/navigation";



export default function Home(){
    const router = useRouter();
    const [name , setName] = useState("");
    const [password, setPassword]= useState("");

    function handleSave(){
        const usersString = localStorage.getItem("users");
        const usersObject = JSON.parse(usersString) || {};

        if(name ==""){
            alert("kullanıcı adı boş olamaz")
            return;
        }
        localStorage.setItem("users",JSON.stringify({
            ...usersObject,
            [name]:password,
        }))

        router.push("/")

    }
    return(
        <div>
            <h1>Kayıt ol</h1>
            <div>
                <label>
                    Kullanıcı adı:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    ></input>
                </label>
                <label>
                    Şifre :
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </label>
            </div>
            <button type = "button" onClick={handleSave}> Kayıt ol</button>
        </div>
    );

}