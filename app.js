//const fetch = require('node-fetch')

async function output() {
    return await fetch(`https://works.ioa.tw/weather/api/all.json`).then(res => res.json()).then(data => {
        return data
    })
}
//console.log(output())


const app = require('http').createServer((req, res) => res.send('Ahoy!'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


