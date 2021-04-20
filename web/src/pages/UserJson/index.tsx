import React from "react";
import ReportJson from "../../components/ReportJson";
import ReportTSQL from "../../components/ReportTSQL";
const UserJson = () => {

    return (
        <>
            <div>
                <h3>Table Json</h3>
                <table>
                <thead><tr><th>Name</th><th>Nome Completo</th><th>Endereço</th><th>CEP</th><th>Data</th></tr></thead>
                <tbody>
                    <ReportJson/>
                </tbody>
                </table>  
                <h3>Table TSQL</h3>
                    <ReportTSQL/>      
            </div>
        </>
    ) 

}

export default UserJson;