const header = $("h1");
header.text('Wiiii')

// fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then(respuesta => respuesta.json())
//     .then(respuesta => {
//         console.log(respuesta.name)
//         header.text(respuesta.name);
//     })

var myHeaders = new Headers();
myHeaders.append("apikey", "UT21ndijqySe9EaVPbAMotxgWxbsXjxQ");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=USD&amount=40", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));