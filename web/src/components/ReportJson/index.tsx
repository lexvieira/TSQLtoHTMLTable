import React, { useEffect, useState } from 'react';
import api from "../../services/api";

interface User {
    IdUser: number,
    Name: string,
    FullName: string,
    Address: string,
    ZipCode: string,
    TIMESTAMP: string
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
            {
                users.map(user => (
                    <tr>
                        <td>{user.Name}</td>
                        <td>{user.FullName}</td>
                        <td>{user.Address}</td>
                        <td>{user.ZipCode}</td>
                        <td>{dateFormat(user.TIMESTAMP)}</td>    
                    </tr>                    
                ))
            }
        </>

    );
}

export default ReportJson;