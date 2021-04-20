import React, { useEffect, useState } from 'react';
import api from "../../services/api";
import DOMPurify from "dompurify";

interface User {
    chrTable: string
}

const ReportTSQL = () => {
    const [users, setUsers] = useState({} as User);

    useEffect(() => {
        api.get('usertsql').then(response => {
            setUsers(response.data.users[0]);
        });
    }, []);    

    // function dateFormat(dob: string){
    //     let datadob = new Date(dob)
    //     return `${datadob.getDate().toString()}/${datadob.getMonth()+1}/${datadob.getFullYear()}`     
    // }
    //To Decide:
    //https://medium.com/@zeolearn/6-best-reactjs-based-ui-frameworks-9c780b96236c
    //https://flaviocopes.com/how-to-format-date-javascript/
    //https://medium.com/@zeolearn/6-best-reactjs-based-ui-frameworks-9c780b96236c      
    //https://material.io/
    //https://www.npmjs.com/package/react-super-responsive-table
    //https://www.pluralsight.com/guides/how-to-use-static-html-with-react
    // 

    function Purify(dataHtml: any){
        const mySafeHTML = DOMPurify.sanitize(dataHtml, {
            ALLOWED_TAGS: ["table", "tr", "td"],
            ALLOWED_ATTR: ["style"],
            });
        return mySafeHTML;
    }

    return (     
        <>  
            <h3>Without dangerouslySetInnerHTML attribute</h3>
            <div>
                {
                    users.chrTable
                }
            </div> 
            <h3>With dangerouslySetInnerHTML attribute</h3>                       
            <div dangerouslySetInnerHTML={{ __html: users.chrTable }}>
            </div>   

            <h3>With Dompurify and dangerouslySetInnerHTML attribute</h3>                       
            <div dangerouslySetInnerHTML={{ __html: Purify(users.chrTable) }}>
            </div>               
        </>

    );
}

export default ReportTSQL;