"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function kayıtSayfası() {
    router.push("/kayitol");
  }

 

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

 
  const users = JSON.parse(localStorage.getItem("users") || "{}");


  if (users[email] && users[email] === password) {
    alert("Giriş başarılı!");
    router.push("/oyun");
  } else {
    alert("E-posta veya şifre hatalı!");
  }
};

  return (
    <div>
      <form onSubmit={handleLogin}>
        E-posta
        <br />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        Şifre
        <br />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={kayıtSayfası}>
          Kayıt Ol
        </button>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}