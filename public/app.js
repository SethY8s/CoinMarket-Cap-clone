

// const apiKey = process.env.api



// qString =  "?CMC_PRO_API_KEY=" + apiKey + "urls,logo,description,tags,platform,date_added,notice";

const pen = fetch('http://localhost:2000/pen')
.then( async response => response.json())
.then( async data => { 
    console.log(data)
    
    })
    

