import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router";


const SalesDetail = () => {
    const { ID } : any = useParams();    
    const [salesDetail, setsalesDetail] = useState({} as any);

    useEffect(() => {
        api.get(`personsales/${ID}`).then(response => {
            setsalesDetail(response.data.personSales[0]);
        });        
    })
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h1 className="alert">Sales Result {salesDetail.PersonType}</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>
                                        Person by Type QTD
                                    </th>                                    
                                    <th>
                                        Number of Orders
                                    </th>
                                    <th>
                                        Total Sales
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {salesDetail["Person by Type QTD"]}
                                    </td>                                    
                                    <td>
                                        {salesDetail["Number Of Orders"]}
                                    </td>
                                    <td>
                                        {salesDetail["Total Due"]}
                                    </td>                                
                                </tr>                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row text-right">
                    <div className="col-12">
                        <a href="/">Come back</a>
                    </div>
                </div>
            </div>            
        </>
    )
}

export default SalesDetail;