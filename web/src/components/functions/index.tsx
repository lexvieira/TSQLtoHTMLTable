import DOMPurify from "dompurify";

class purify {
    
    Purify(dataHtml: any,allowedTags = ["table", "tr", "td"], allowedAttr = ["style"]){
        console.log(dataHtml);
        console.log(allowedTags);
        console.log(allowedAttr);
        const mySafeHTML = DOMPurify.sanitize(dataHtml, {
            ALLOWED_TAGS: allowedTags, 
            ALLOWED_ATTR: allowedAttr,
            });
        return mySafeHTML;
    }

    DateFormat(dob: string){
        let datadob = new Date(dob)
        return `${datadob.getDate().toString()}/${datadob.getMonth()+1}/${datadob.getFullYear()}`     
    }    
}

export default purify;