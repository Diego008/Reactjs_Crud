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
            ]
        }
        this.handleChangeState = this.handleChangeState.bind(this);

    }

    handleChangeState(e) {
        e.preventDefault();
        
        var j = e.target.value.substring(e.target.value.indexOf('-') +1);        

        console.log(j);
    }


    render() {
        
        return (
            <div className="col-sm-12 d-flex justify-content-center">
                <div className="col-sm-6">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input type="password" className="form-control" id="inputPassword4" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Cidade</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Estado</label>
                                <select id="inputState" className="form-control" onChange={this.handleChangeState}>
                                    <option>Selecione ...</option>
                                    {
                                        this.state.estados.map((estado, index) => {
                                            return <option key={index}>{estado.desc +'-' +estado.sigla}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label>CEP</label>
                                <input type="text" className="form-control" id="inputZip" />
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
        )
    }
}