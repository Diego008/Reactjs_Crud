import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
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
  const [btnuser, setBtnUser] = useState(true);
  const [idUser, setId] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();

    if (btnuser) {
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
    } else {
      const response = await api.put(`/edituser/${idUser}`, {
        email,
        password,
        cidade,
        estado,
        cep
      });

      if (response.data) {
        loadUsers();
        setEmail("");
        setPassword("");
        setCidade("");
        setEstado("");
        setCep("");
        setShow(true);
        setBtnUser(true);
      } else {
        setShow2(true);
      }
    }

  }

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);

  // let idPage = 1;
  async function loadUsers() {
    const response = await api.get('/allusers');
    // const response = await api.get(`/paginate/${idPage}`);

    setUsers(response.data);
    // setUsers(response.data.users);
  };

  useEffect(() => { loadUsers() }, []);

  let listUsers;

  async function handlePaginate(e) {
    const id = e.target.id;
    await api.get(`/paginate/${id}`).then(response => {
      setUsers(response.data.users);
    })
  };
  
  let items = [];
  for (let number = 1; number <= Math.ceil(users.length / 2); number++) {
    items.push(
      // <button key={number} id={number} onClick={handlePaginate}>
      //   {number}
      // </button>,
    <li class="page-item"><button id={number} class="page-link" onClick={handlePaginate}>{number}</button></li>

    );
  }
  
  const paginationBasic = (
    // <div>
    //   <Pagination size="sm">{items}</Pagination>
    // </div>
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
          </li>
          {items}
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    
  );

  //  useEffect(() => {
  //   async function loadUsers() {
  //     // const response = await api.get('/allusers');
  //     const response = await api.get(`/paginate/${idPage}`);

  //     setUsers(response.data.users);
  //   }
  //    loadUsers();
  //   }, [idPage]);

  async function deleteUser(e) {
    const id = e.target.getAttribute("id");
    await api.delete(`/deleteusers/${id}`);

    setUsers(users.filter(item => item.id !== parseInt(id)));

  };

  async function editUser(e) {
    const id = e.target.getAttribute("id");

    const user = users.filter(item => item.id === parseInt(id));

    setEmail(user[0].email);
    setCidade(user[0].cidade);
    setEstado(user[0].estado);
    setCep(user[0].cep);
    setId(id);
    setBtnUser(false);
  };


  if (users.length > 0) {
    listUsers = (
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
            <th scope="col">CEP</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        {
          users.map((user, key) => (
            <tbody key={user.id}>
              <tr>
                <th scope="row">{user.id}</th>
                <td>{user.email}</td>
                <td>{user.cidade}</td>
                <td>{user.estado}</td>
                <td>{user.cep}</td>
                <td className="acoes"><button key={key} id={user.id} type="button" onClick={deleteUser} className="btn btn-primary">Delete</button>
                  <button key={key} id={user.id} type="button" onClick={editUser} className="btn btn-primary">Editar</button>
                </td>
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
                  disabled={!btnuser}
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
              {btnuser ? 'Cadastrar' : 'Editar'}
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
