
const feedWealth = document.getElementById('wealth');


 const postData = (e) => {
    e.preventDefault();
    const cryptoType = document.getElementById('form').value;
    const amount =
      document.getElementById('amount').value * crypto[`${cryptoType}`];
    const amountEnd =
      document.getElementById('amountEnd').value * crypto[`${cryptoType}`];
  
    const difference = amountEnd - amount;
    const changePercent = (difference / amount) * 100;
  
    const tradeScript = `<td>${cryptoType}</td><td>$${amount.toLocaleString(
      'en-US'
    )}</td><td>$${amountEnd.toLocaleString(
      'en-US'
    )}</td><td>$${difference.toLocaleString(
      'en-US'
    )}</td><td>${changePercent}%</td>`;
  
    feedWealth.insertAdjacentHTML('afterbegin', tradeScript);
  
    const dataToServer = {
      coin: cryptoType,
      before: amount,
      after: amountEnd,
      gainLoss: difference,
      change: changePercent,
    };
  
    console.log(dataToServer);
  
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  
      body: JSON.stringify(dataToServer),
    };
  
    fetch('/submitData', option)
      .then((res) => res.text())
      .then((data) => {
        if (data === 'success') alert('posted blog');
        document.getElementById('amount').value = '';
        document.getElementById('amountEnd').value = '';
      });
  }

  module.exports = postData;
  