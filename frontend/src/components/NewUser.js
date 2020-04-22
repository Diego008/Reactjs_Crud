import React, { useState, useEffect } from "react";
import { Modal, Button, Pagination } from "react-bootstrap";
import api from '../services/api';

export default function New() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [success, setShow] = useState(false);
  const [warning, setShow2] = useState(false);
  const [users, setUsers] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/', {
      email,
      password,
      cidade,
      estado,
      cep,
    });

    if (response.data) {
      loadUsers();
      setEmail("");
      setPassword("");
      setCidade("");
      setEstado("");
      setCep("");
      setShow(true);
    } else {
      setShow2(true);
    }
  }

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);

  async function loadUsers() {
    const response = await api.get('/allusers');
    
    setUsers(response.data);
  };

  useEffect(() => { loadUsers() }, []);

  async function deleteUser(e) {
    const id = e.target.getAttribute("id");  
    await api.get(`/deleteusers/${id}`);

    setUsers(users.filter(item => item.id !== parseInt(id)));

  };

  let listUsers;
  let currentPage = 1;
  let items = [];
  let usersPerPage = 3;

  function handlePaginate(e) {
    const id = e.target.id;
    
    currentPage = parseInt(id);
    console.log(currentPage);
  };

  if(users.length > 2){
    for (let number = 1; number <= Math.ceil(users.length / usersPerPage); number++) {
      items.push(
        <Pagination.Item key={number} active={(number === currentPage)} onClick={handlePaginate}>
          {number}
        </Pagination.Item>,
      );
    }
  };
  

  const paginationBasic = (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );

  
  if (users.length > 0) {
    const pages = currentPage * usersPerPage;
    const page = pages - usersPerPage;
    const usersListPage = users.slice(page, pages);

    listUsers = (
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
        {
          usersListPage.map((user, key) => (
            <tbody key={user.id}>
              <tr>
                <th scope="row">{user.id}</th>
                <td>{user.email}</td>
                <td>{user.cidade}</td>
                <td>{user.estado}</td>
                <td>{user.cep}</td>
                <td><button key={key} id={user.id} type="button" onClick={deleteUser} className="btn btn-primary">Delete</button></td>
              </tr>
            </tbody>
          ))}
      </table>
    );
  } else {
    listUsers = (
      <p><strong>Nenhum usuário Cadastrado.</strong></p>
    );
  };

  return (
    <div>
      <div className="col-sm-12 d-flex justify-content-center">
        <div className="col-sm-6">
          <form onSubmit={handleSubmit} method="post" action="#">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="txtEmail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="txtPassword"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="txtCidade"
                  value={cidade}
                  onChange={(event) => setCidade(event.target.value)}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Estado</label>
                <select
                  id="txtEstado"
                  className="form-control"
                  value={estado}
                  onChange={(event) => setEstado(event.target.value)}
                  required
                >
                  <option>Selecione ...</option>
                  <option>ACRE - AC</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label>CEP</label>
                <input
                  type="text"
                  className="form-control"
                  id="txtCEP"
                  value={cep}
                  onChange={(event) => setCep(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  required
                />
                <label className="form-check-label">Não sou um Robô</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              cadastrar
            </button>
          </form>
        </div>
      </div>

      <div className="row marginTable">
        <div className="col-sm-12 d-flex justify-content-center">
          {listUsers}
        </div>
      </div>

      <div className="row justify-content-center">
        {paginationBasic}
      </div>

      <Modal show={success} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuário Cadastrado com sucesso</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>

      <Modal show={warning} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Usuário já existente</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Ok
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>

    </div>
  );

}
