import React from "react";
import { Alert, Tab, Tabs } from "react-bootstrap";
import ReportJson from "../../components/ReportJson";
import ReportTSQL from "../../components/ReportTSQL";
import ReportTSQLMult from "../../components/ReportTSQLMult";
import './index.css';
const User = () => {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>
                            Return Data with Json and TSQL using
                            <br /><strong>DomPurify</strong> and <strong>dangerouslySetInnerHTML</strong> 
                        </h2>
                    </div>
                </div>                
                <div className="row">
                    <div className="col-12">
                        <Tabs id="SQLReports" defaultActiveKey="tableJson">
                            <Tab eventKey="tableJson" title="Table Json">
                                <br />
                                <h2>Json Report using API with Node</h2>
                                <Alert variant="primary">
                                    This is the basic use of return data with a API. 
                                    <br /> Request a information to the Server and receive the info/data in a <strong>Json Format</strong>
                                </Alert>
                                <ReportJson/>  
                            </Tab>
                            <Tab eventKey="tableTSQL" title="Table TSQL">
                                <br />
                                <Alert variant="warning">
                                    In this case we are receiving the data from our <strong>API</strong> as an <strong>HTML table</strong>
                                    <br />
                                    This is not a common thing when you thing about render info to the final user, but in some special situations, 
                                    maybe you will need to receive some data in <strong>HTML Format</strong> and just render it at the front-end.
                                    <br />
                                    If you just try to <strong>render the results</strong> at the front-end your <strong>output</strong> will be the below. 
                                </Alert>
                                <ReportTSQL/>  
                            </Tab>
                            <Tab eventKey="reportsTSQL" title="Report TSQL">
                                <br />
                                <Alert variant="warning">
                                    This is a set of data returned through out the <strong>Store Procecure <span>dbo.SP_Render_HTML_Table</span></strong> using <strong>SQL Server</strong>.
                                    <br />
                                    The data is received at the front-end just as a <strong>html table</strong>.
                                    After that we use the <strong>DomPurify</strong> and <strong>dangerouslySetInnerHTML</strong> to render the <strong>HTML table</strong>.
                                </Alert>                               
                                <ReportTSQLMult/>
                            </Tab>
                        </Tabs>                       
                    </div>
                </div>
            </div>
        </>
    ) 

}

export default User;