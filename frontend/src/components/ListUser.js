import React from 'react';
import axios from 'axios';

export default class ListUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [
                {
                    email: '',
                    password: '',
                    cidade: '',
                    estado: '',
                    cep: ''
                }
            ]
        }
        
    }

    componentDidMount(){        
        axios.get("http://localhost:3333/allusers").then(response => {                       
            response.data.forEach(element => {
                this.setState({
                    users: [
                        ...this.state.users,
                        {
                            email: element.email,                            
                            cidade: element.cidade,
                            estado: element.estado,
                            cep: element.cep
                        }
                    ]
                })
            });

        });
    }

    render() {

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

                {
                    this.state.users.map((user, index) => {
                        if (index !== 0) {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{user.email}</td>                                        
                                        <td>{user.cidade}</td>
                                        <td>{user.estado}</td>
                                        <td>{user.cep}</td>
                                    </tr>
                                </tbody>
                            )
                        }
                        return null;
                    })
                }
            </table>
        );
    }

}

