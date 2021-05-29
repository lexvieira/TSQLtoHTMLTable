import React, { useEffect, useState } from 'react';
import api from "../../services/api";

interface User {
    BusinessEntityID: number,
    PersonType: string,
    NameStyle: string,
    Title: string,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Suffix: string,
    Demographics: string,
    ModifiedDate: string
}

const ReportJson = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        api.get('userjson').then(response => {
            setUsers(response.data.users);
        });
    }, []);    

    function dateFormat(dob: string){
        let datadob = new Date(dob)
        return `${datadob.getDate().toString()}/${datadob.getMonth()+1}/${datadob.getFullYear()}`     
    }
    return (     
        <>
            <div className="container-fluid contentCentered">
                <div className="row">
                    <div className="col">
                        <table className="table table-striped hover">
                            <thead><tr><th>ID</th><th>Title</th><th>Name</th><th>Middle Name</th><th>Last Name</th><th>Suffix</th><th>Data</th></tr></thead>
                            <tbody>    
                                {
                                    users.map(user => (
                                        <tr key={user.BusinessEntityID}> 
                                            <td>{user.BusinessEntityID}</td>
                                            <td>{user.PersonType}</td>
                                            <td>{user.FirstName}</td>
                                            <td>{user.MiddleName}</td>
                                            <td>{user.LastName}</td>    
                                            <td>{user.Suffix}</td> 
                                            <td>{dateFormat(user.ModifiedDate)}</td>                         
                                        </tr>                    
                                    ))
                                }
                            </tbody>
                        </table>   
                    </div>
                </div>
              
            </div>
    

        </>

    );
}

export default ReportJson;