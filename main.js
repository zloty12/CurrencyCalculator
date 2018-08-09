const NBPtableA = 'https://api.nbp.pl/api/exchangerates/tables/a?format=json';
const NBPtableB = 'https://api.nbp.pl/api/exchangerates/tables/B?format=json';
const header = document.querySelector('header');
const currfrom = document.querySelector('.currfrom');
const currto = document.querySelector('.currto');
const convert = document.querySelector('.convert');
const kwota = document.querySelector('.kwota');
const result  = document.querySelector('p');
const dane =[];
const daneB = [];
const rates = [];
const test = [];
let kursy;
let kursyObj = {};
// Fetch data from NBP
fetch(NBPtableB).then(blob => blob.json()).then(data => {daneB.push(...data);
fetch(NBPtableA)
.then(blob => blob.json())
.then(data => {
    dane.push(...data)
// Get array of objects
rates.push(...dane[0].rates); //Both NBP tables
rates.push(...daneB[0].rates)
rates.unshift({ currency: "Polski Złoty", code: "PLN", mid: 1.0}) // Add PLN
kursy = rates.map(rate =>  {
    const ob = {};
    ob[rate.code] = rate.mid;
    return ob;
})
// Merge array of objects into object
kursy.forEach(kurs => {
    for(var prop in kurs){
        kursyObj[prop] = kurs[prop];
        }
    })
// DOM Modifications
header.innerHTML = `<span>Kalkulator walut na dzień ${dane[0].effectiveDate}</span>`
currfrom.innerHTML = rates.map(rate => `<option>${rate.code +' - ' + rate.currency}</option>`)
currto.innerHTML = rates.map(rate => `<option>${rate.code+ ' - ' + rate.currency}</option>`)
// Convert function
function convertCurr(){
    const value = kwota.value;
    
    let wynik = (value * kursyObj[currfrom.value.slice(0,3)] / kursyObj[currto.value.slice(0,3)]).toFixed(2);
    
    console.log(wynik);
    result.innerHTML = `${kwota.value} ${currfrom.value} <br> = <br> ${wynik} ${currto.value} `
    
}
convert.addEventListener('click',convertCurr);
});

})

