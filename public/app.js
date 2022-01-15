
const feedDisplay = document.getElementById('feed');



 fetch('http://localhost:2000/pen')
.then( async response => {return response.json()})
.then( async data => { 
    

    const parsedData = data['data']
    // console.log(data['data'][0]['name'])

    await parsedData.forEach( element => {
        // console.log(element['name'])
        const title = `${element.name}`;
        console.log(title)

        
    
    feedDisplay.insertAdjacentHTML('beforeend', title);


    });
    
    });



    
    
    
    



