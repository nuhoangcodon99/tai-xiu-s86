let angrybird = require('./bot_hu/angrybird');
let bigbabol = require('./bot_hu/bigbabol');
let candy = require('./bot_hu/candy');
let sexandzen = require('./bot_hu/sexandzen');
let daohaitac = require('./bot_hu/daohaitac');
let longlan = require('./bot_hu/longlan');
let royal = require('./bot_hu/royal');
let sieuxe = require('./bot_hu/sieuxe');
let zeus = require('./bot_hu/zeus');
let caoboi = require('./bot_hu/caoboi');
let tamhung = require('./bot_hu/tamhung');
let mini3cay = require('./bot_hu/mini3cay');
let minipoker = require('./bot_hu/minipoker');
let vqred = require('./bot_hu/vqred');
let dmanhhung = require('./bot_hu/dmanhhung');


let randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(io, listBot) {

    setInterval(() => {
        angrybird(io, listBot);
    }, randomInteger(3000, 30000));

    setInterval(() => {
        mini3cay(io, listBot);
    }, randomInteger(3000, 30000));

    setInterval(() => {
        minipoker(io, listBot);
    }, randomInteger(3000, 30000));

    setInterval(() => {
        bigbabol(io, listBot);
    }, randomInteger(3000, 30000));

    setInterval(() => {
        longlan(io, listBot);
    }, randomInteger(3000, 30000));

    setInterval(() => {
        vqred(io, listBot);
    }, randomInteger(3000, 30000));


    setInterval(() => {
        royal(io, listBot);
    }, randomInteger(3000, 30000));

    setInterval(() => {
        zeus(io, listBot);
    }, randomInteger(3000, 30000));

    setInterval(() => {
        candy(io, listBot);
    }, randomInteger(3000, 30000));

    setInterval(() => {
        sexandzen(io, listBot);
    }, randomInteger(3000, 30000));

    // setInterval(() =>{
    // 	daohaitac(io, listBot);
    // }, 60000);
    // setInterval(() =>{
    // 	royal(io, listBot);
    // }, 60000);
    // setInterval(() =>{
    // 	sieuxe(io, listBot);
    // }, 60000);
    // setInterval(() =>{
    // 	dmanhhung(io, listBot);
    // }, 60000);
    // setInterval(() =>{
    // 	caoboi(io, listBot);
    // }, 60000);

};