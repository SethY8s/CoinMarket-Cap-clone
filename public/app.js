const feedDisplay = document.getElementById('feed');
const feedForm = document.getElementById('form');
const feedWealth = document.getElementById('wealth');
const userInput = document.querySelector('.form-container');

const crypto = {};

async function pageLoader() {
  const data = await fetch('http://localhost:2000/data')
    .then(async (response) => {
      return response.json();
    })
    .then(async (data) => {
      const parsedData = data['data'];

      parsedData.forEach((element) => {
        let percentChange;
        // if statement to change color of 24hr change
        if (element['quote']['USD']['percent_change_24h'] >= 0) {
          percentChange = `<td class='text-success'>${element['quote']['USD'][
            'percent_change_24h'
          ].toFixed(2)}%</td>`;
        } else {
          percentChange = `<td class='text-danger'>${element['quote']['USD'][
            'percent_change_24h'
          ].toFixed(2)}%</td>`;
        }
        // making table
        const table = `<tr><td>${element['cmc_rank']}</td><td><span id=${
          element['symbol']
        }></span> ${element['name']} <span class='text-secondary'>(${
          element['symbol']
        })</span</td>
      <td>$${element['quote']['USD']['price'].toLocaleString('en-US')}</td>
      ${percentChange} <td>${element['quote']['USD'][
          'market_cap'
        ].toLocaleString('en-US')}</td>
      <td>${element['circulating_supply'].toLocaleString('en-US')}</td> </tr>`;

        feedDisplay.insertAdjacentHTML('beforeend', table);

        const title = `<option>${element['name']}</option>`;
        feedForm.insertAdjacentHTML('beforeend', title);
      });

      for (i = 0; i < 10; i++) {
        crypto[data['data'][i]['name']] = data['data'][i]['quote']['USD']['price'];
      }
    });

  // logos
  const logo = await fetch('http://localhost:2000/logo')
    .then(async (response) => {
      return response.json();
    })
    .then(async (data) => {
      let arr = Object.entries(data['data']);
      arr.forEach((element) => {
        let logoContainer = document.getElementById(`${element[1]['symbol']}`);

        const logo = `<img class="logo" src=${element[1]['logo']} alt="Coin Logo"/>`;

        logoContainer.insertAdjacentHTML('beforeend', logo);
      });
    });
}
// end of pagelaoder

pageLoader();

// calculator
userInput.addEventListener('submit', function (e) {
  e.preventDefault();
  const cryptoType = document.getElementById('form').value;
  const amount = (document.getElementById('amount').value)*crypto[`${cryptoType}`];
  const amountEnd = (document.getElementById('amountEnd').value)*crypto[`${cryptoType}`];;
  const typePrice = crypto[`${cryptoType}`];
  const yourWealthBefore = typePrice * amount;
  const yourWealthAfter = typePrice * amountEnd;

  const gainLoss =yourWealthAfter - yourWealthBefore;
  const change = (gainLoss/yourWealthBefore)*100;
  
 const tradeScript = `<td>${cryptoType}</td><td>$${amount.toLocaleString('en-US')}</td><td>$${amountEnd.toLocaleString('en-US')}</td><td>$${gainLoss.toLocaleString('en-US')}</td><td>${change}%</td>`


  feedWealth.insertAdjacentHTML(
    'beforeend', tradeScript
    
  );
});
// console.log(pen)
