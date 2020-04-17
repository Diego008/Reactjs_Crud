import React, { useState, useEffect } from "react";
import axios from "axios";

export default function New() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await axios.get("http://localhost:3333/allusers");

      setUsers(response.data);
      console.log(response.data);
    }
    loadUsers();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Cidade</th>
          <th scope="col">Estado</th>
          <th scope="col">CEP</th>
          <th>Ações</th>
        </tr>
      </thead>
      {users.map(user => (
        <tbody key={user.id}>
          <tr>
      <th scope="row">{user.id}</th>
            <td>{user.email}</td>
            <td>{user.cidade}</td>
            <td>{user.estado}</td>
            <td>{user.cep}</td>
          </tr>
        </tbody>        
      )) }
    </table>
  );
}
