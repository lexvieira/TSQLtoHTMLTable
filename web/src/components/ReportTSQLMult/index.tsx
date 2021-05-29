import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import api from "../../services/api";
import purify from "../functions";

interface Table {
    chrTable: string
}

const ReportTSQLMult = () => {
    const [personalReport, setPersonalReport] = useState({} as Table);
    const [personalReportQTD, setPersonalReportQTD] = useState({} as Table);
    const [salesTerritory, setSalesTerritory] = useState({} as Table);
    const [salesTerritoryGroup, setSalesTerritoryGroup] = useState({} as Table);

    const htmlSanitize = new purify();

    useEffect(() => {
        api.get('personreportstsql').then(response => {
            setPersonalReport(response.data.results[0][0]);
            setPersonalReportQTD(response.data.results[1][0]);    
            setSalesTerritory(response.data.results[2][0]);
            setSalesTerritoryGroup(response.data.results[3][0]);                      
        });
    },[]); 
    return (     
        <>  
            <div className="container-fluid text-center">
                <h3>More DomPurify Results</h3> 
                <hr/>              
                <div className="row">
                    <div className="col-3">
                        <h3>Personal Quantity</h3>                   
                        <div className="contentCentered" dangerouslySetInnerHTML={{ __html: htmlSanitize.Purify(personalReportQTD.chrTable,["table", "tr", "td","th", "thead", "tbody", "tfoot", "a"],["style","href","id","name"]) }}>
                        </div>     
                        <br />
                        <Alert variant="warning">
                            Here we are rendering the Table with the Tag <strong>a href</strong> using <strong>SQL Server procedure dbo.SP_Render_HTML_Table.sql</strong> that will redirect us to another page
                        </Alert>                           
                    </div>
                   <div className="col-9">
                        <h3>Personal Results</h3>                       
                        <div className="contentCentered" dangerouslySetInnerHTML={{ __html: htmlSanitize.Purify(personalReport.chrTable,["table", "tr", "td","th", "thead", "tbody", "tfoot", "a"],["style","href","id","name"]) }}>
                        </div>   
                    </div>
                </div>
            </div>
            <hr />
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col-12">
                        <h3>Sales Territory Group</h3>                       
                        <div className="contentCentered" dangerouslySetInnerHTML={{ __html: htmlSanitize.Purify(salesTerritoryGroup.chrTable,["table", "tr", "td","th", "thead", "tbody", "tfoot", "a"],["style","href","id","name"]) }}>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <h3>Sales Territory</h3>
                        <div className="contentCentered" dangerouslySetInnerHTML={{ __html: htmlSanitize.Purify(salesTerritory.chrTable,["table", "tr", "td","th", "thead", "tbody", "tfoot", "a"],["style","href","id","name"]) }}>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReportTSQLMult;