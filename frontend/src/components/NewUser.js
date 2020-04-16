import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function New() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [success, setShow] = useState(false);
  const [warning, setShow2] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    await axios
      .post("http://localhost:3333", {
        email,
        password,
        cidade,
        estado,
        cep,
      })
      .then((response) => {
        
        if (response.data) {          
          setEmail("");
          setPassword("");
          setCidade("");
          setEstado("");
          setCep("");          
          setShow(true);
        }else{
          setShow2(true);
        }

      })
      .catch((err) => {
        alert("Erro para cadastrar usuário");
      });
  }

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);

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
      {/* <div className="row marginTable">
                <div className="col-sm-12 d-flex justify-content-center">
                    
                </div>
            </div>  */}
    </div>
  );
}
