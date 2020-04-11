import React from 'react';

export default class Home extends React.Component {    

    constructor(props) {
        super(props);

        this.state = {
            estados: [
                { desc: 'Acre', sigla: 'AC' },
                { desc: 'Alagoas', sigla: 'AL' },
                { desc: 'Amapá', sigla: 'AP' },
                { desc: 'Amazonas', sigla: 'AM' },
                { desc: 'Bahia', sigla: 'BA' },
                { desc: 'Ceará', sigla: 'CE' },
                { desc: 'Distrito Federal', sigla: 'DF' },
                { desc: 'Espírito Santo', sigla: 'ES' },
                { desc: 'Goiás', sigla: 'GO' },
                { desc: 'Maranhão', sigla: 'MA' },
                { desc: 'Mato Grosso', sigla: 'MT' },
                { desc: 'Mato Grosso do Sul', sigla: 'MS' },
                { desc: 'Minas Gerais', sigla: 'MG' },
                { desc: 'Pará', sigla: 'PA' },
                { desc: 'Paraíba', sigla: 'PB' },
                { desc: 'Paraná', sigla: 'PR' },
                { desc: 'Pernambuco', sigla: 'PE' },
                { desc: 'Piauí', sigla: 'PI' },
                { desc: 'Rio de Janeiro', sigla: 'RJ' },
                { desc: 'Rio Grande do Norte', sigla: 'RN' },
                { desc: 'Rio Grande do Sul', sigla: 'RS' },
                { desc: 'Rondônia', sigla: 'RO' },
                { desc: 'Roraima', sigla: 'RR' },
                { desc: 'Santa Catarina', sigla: 'SC' },
                { desc: 'São Paulo', sigla: 'SP' },
                { desc: 'Sergipe', sigla: 'SE' },
                { desc: 'Tocantins', sigla: 'TO' }
            ],

            usuarios: [
                { email: '', password: '', cidade: '', estado: '', cep: '' }
            ]
        }
        // this.handleChangeState = this.handleChangeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();

        const email = this.inputEmail.value;
        const password = this.inputPass.value;
        const cidade = this.inputCidade.value;
        const estado = this.inputEstado.value;
        const cep = this.inputCEP.value;

        this.setState({
            usuarios: [
                ...this.state.usuarios,
                {
                    email: email,
                    password: password,
                    cidade: cidade,
                    estado: estado,
                    cep: cep
                }
            ]
        })        

        this.inputEmail.value = '';
        this.inputPass.value = '';
        this.inputCidade.value = '';
        this.inputEstado.value = '';
        this.inputCEP.value = '';
    }

    handleChangeState(e) {
        e.preventDefault();

        var j = e.target.value.substring(e.target.value.indexOf('-') + 1);

        console.log(j);
    }


    render() {
        let cont = this.state.usuarios.length - 1;
        let paragraph;

        if (cont === 0) {
            paragraph = <p>Nenhum usuário Cadastrado.</p>
        } else {
            paragraph = <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Senha</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Estado</th>
                        <th scope="col">CEP</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                {

                    this.state.usuarios.map((users, index) => {
                        if (index !== 0) {
                            return (


                                <tbody key={index}>
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{users.email}</td>
                                        <td>{users.password}</td>
                                        <td>{users.cidade}</td>
                                        <td>{users.estado}</td>
                                        <td>{users.cep}</td>
                                    </tr>
                                </tbody>

                            )
                        }
                        return null;
                    })
                }
            </table>
        }

        return (
            <div>
                <div className="col-sm-12 d-flex justify-content-center">
                    <div className="col-sm-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="txtEmail"
                                        ref={el => this.inputEmail = el} value={undefined} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="txtPassword"
                                        ref={el => this.inputPass = el} value={undefined} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Cidade</label>
                                    <input type="text" className="form-control" id="txtCidade"
                                        ref={el => this.inputCidade = el} value={undefined} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Estado</label>
                                    <select id="txtEstado" className="form-control" onChange={this.handleChangeState}
                                        ref={el => this.inputEstado = el}>
                                        <option>Selecione ...</option>
                                        {
                                            this.state.estados.map((estado, index) => {
                                                return <option key={index}>{estado.desc + '-' + estado.sigla}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>CEP</label>
                                    <input type="text" className="form-control" id="txtCEP"
                                        ref={el => this.inputCEP = el} value={undefined} />
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
                <div className="row marginTable">
                    <div className="col-sm-12 d-flex justify-content-center">
                        {paragraph}
                    </div>
                </div>
            </div>
        )
    }
}