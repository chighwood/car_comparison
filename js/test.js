fetch('/api/0.3/?cmd=getModels&make=Mazda&year=2018&sold_in_us=1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

