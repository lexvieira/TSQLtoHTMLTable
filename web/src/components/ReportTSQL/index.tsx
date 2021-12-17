import React, { useEffect, useState } from 'react';
import api from "../../services/api";
import { Alert } from 'react-bootstrap';
import purify  from "../functions";

interface User {
    chrTable: string
}

const ReportTSQL = () => {
    const [users, setUsers] = useState({} as User);

    const htmlSanitize = new purify();
    
    useEffect(() => {
        api.get('usertsql').then(response => {
            setUsers(response.data.users[0]);
        });
    }, []);    

    return (     
        <>  
            <div className="container-fluid contentCentered">
                <div className="row align-items-center">
                    <div className="col-12 text-center">
                        <h3>Without dangerouslySetInnerHTML attribute</h3>
                        <Alert variant="danger">
                            Just to let it clear, without the <strong>dangerouslySetInnerHTML</strong> attribute our data will be just showed as a string. 
                        </Alert> 
                        <div className="contentCentered">
                            {
                                users.chrTable
                            }
                        </div>                         
                    </div>
                </div>
            </div>
            <hr />
            <div className="container contentCentered">
                <div className="row text-center">
                    {/* Control Disposition with Col */}
                    <div className="col">
                        <h3>Only DangerouslySetInnerHTML attribute</h3>     
                        <Alert variant="danger">
                            In this case we are passing our variable to the attribute <strong>dangerouslySetInnerHTML</strong> and it is converting the string to a <strong>HTML Table</strong> 
                            <br /> Here you can notice comparing with the next table that all columns and are being showed.
                            <br /> Attribute: <code>dangerouslySetInnerHTML=&#123;&#123; __html: users.chrTable &#125;&#125;</code>
                            <br /> The data received is not being processed and filtered, so all html tags are included, that in certain point could be dangerous for your code.
                            <br />See the Article <a href="https://www.pluralsight.com/guides/how-to-use-static-html-with-react">https://www.pluralsight.com/guides/how-to-use-static-html-with-react</a>
                        </Alert> 
                        <div className="contentCentered" dangerouslySetInnerHTML={{ __html: users.chrTable }}>
                        </div> 
                    </div>                    
                </div>                
            </div>
            <hr />
            <div className="container contentCentered">
                <div className="row text-center">
                    <div className="col-12">
                        <h3>With Dompurify</h3>
                        <h4>Using dangerouslySetInnerHTML attribute</h4>   
                        <Alert variant="success">
                            Here we are <strong>filtering</strong> the <strong>HTML tags</strong> that we want/need to render.
                            <br /> That makes the code safer avoiding the possibility to render any unwished code.
                            <br /> Attribute: <code>dangerouslySetInnerHTML=&#123;&#123; __html: Purify(users.chrTable) &#125;&#125;</code>
                            <br /> In this case we are using a function that will call the Dom Purify to sanitaze the code, avoiding the possibility of malicious users alter your code.
                        </Alert>  
                        <Alert variant="secondary">
                            <code className="codeBlock">
                            function Purify(dataHtml: any)&#123;{ "\n" }
                            { "\t" }const mySafeHTML = DOMPurify.sanitize(dataHtml, &#123;{ "\n" }
                            { "\t" }ALLOWED_TAGS: ["table", "tr", "td"],{ "\n" }
                            { "\t" }ALLOWED_ATTR: ["style"],{ "\n" }
                            { "\t" }&#125;);{ "\n" }
                            { "\t" }return mySafeHTML;{ "\n" }
                            &#125;
                            </code>
                        </Alert>
                        <Alert variant="success">
                            As you can see that, the table on the left side is being rendered without the <strong>headers</strong>, that is why we called the <strong>DomPurify.sanitize</strong> without inform that we need the <strong>tag TH, between others like THEAD or TBODY.</strong>
                            <br />To solve that we included the parameters <strong>["thead", "th"]</strong> on the table of the right side. 
                        </Alert>
                    </div>
                </div>
            </div>                    
            <div className="container-fluid contentCentered">
                <div className="row text-center">
                    <div className="col-3">
                        <div className="contentCentered" dangerouslySetInnerHTML={{ __html: htmlSanitize.Purify(users.chrTable) }}>
                        </div>
                    </div>  
                    <div className="col-9">                      
                        <div className="contentCentered tableScroll" dangerouslySetInnerHTML={{ __html: htmlSanitize.Purify(users.chrTable,["table", "thead", "th", "tr", "td"], ["style"]) }}>
                        </div>

                    </div>                    
                </div>                
            </div>

           
        </>

    );
}

export default ReportTSQL;