import React, {useState} from 'react';
import axios from 'axios';

export default function New(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();

        data.append('email', email);
        data.append('password', password);
        data.append('cidade', cidade);
        data.append('estado', estado);
        data.append('cep', cep);

        // await axios.post("http://localhost:3333", data)

        console.log(data);
    }    

    return (
        <div>
            <div className="col-sm-12 d-flex justify-content-center">
                <div className="col-sm-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" className="form-control" id="txtEmail" value={email}
                                onChange={event => setEmail(event.target.value)}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input type="password" className="form-control" id="txtPassword" value={password}
                                onChange={event => setPassword(event.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Cidade</label>
                                <input type="text" className="form-control" id="txtCidade" value={cidade}
                                onChange={event => setCidade(event.target.value)} />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Estado</label>
                                <select id="txtEstado" className="form-control" value={estado} 
                                onChange={event => setEstado(event.target.value)}>
                                    <option>Selecione ...</option>
                                    <option>ACRE - AC</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label>CEP</label>
                                <input type="text" className="form-control" id="txtCEP" value={cep}
                                onChange={event => setCep(event.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label">
                                    Não sou um Robô
                            </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">cadastrar</button>
                    </form>
                </div>
            </div>
            {/* <div className="row marginTable">
                <div className="col-sm-12 d-flex justify-content-center">
                    
                </div>
            </div>  */}
        </div>
    )
}