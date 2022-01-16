import{addingCrypto} from './function.js';
const feedDisplay = document.getElementById('feed');
const feedForm = document.getElementById('form');
const userInput = document.querySelector('userInputContainer');

const pen = {};



fetch('http://localhost:2000/data')
  .then(async (response) => {
    return response.json();
  })
  .then(async (data) => {
    const parsedData = data['data'];
    // console.log(data['data'][0]['name'])

    await parsedData.forEach((element) => {
      let percentChange;

      if (element['quote']['USD']['percent_change_24h'] >= 0) {
        percentChange = `<td class='text-success'>${element['quote']['USD'][
          'percent_change_24h'
        ].toFixed(2)}%</td>`;
      } else {
        percentChange = `<td class='text-danger'>${element['quote']['USD'][
          'percent_change_24h'
        ].toFixed(2)}%</td>`;
      }

      const table = `<tr><td>${element['cmc_rank']} ${
        element['name']
      } <span class='text-secondary'>(${element['symbol']})</span</td>
      <td>$${element['quote']['USD']['price'].toLocaleString('en-US')}</td>
      ${percentChange} <td>${element['quote']['USD'][
        'market_cap'
      ].toLocaleString('en-US')}</td>
      <td>${element['circulating_supply'].toLocaleString('en-US')}</td> </tr>`;

      feedDisplay.insertAdjacentHTML('beforeend', table);

      const title = `<option>${element['name']}</option>`;
      feedForm.insertAdjacentHTML('beforeend', title);
    });
    
    for (let i = 0; i < 10; i++) {
      pen[data['data'][i]['name']] = data['data'][i]['quote']['USD']['price'];
    }
  });

  
  

console.log(pen);
