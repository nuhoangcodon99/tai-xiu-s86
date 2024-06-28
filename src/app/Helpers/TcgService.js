/*
 * Module TCGAMING API
 * DESCRIPTION: tương tác với các api của TCGAMING
 * DOCUMENT: https://doc.tc-gaming.com/
 * AUTHOR: Kunkeyr
 * GITHUB: https://github.com/kunkey
 */

const axios = require('axios');
const qs = require('qs');

let serviceHash = `https://tcg.1810ihm.com`;
let TcgApiService = {
    url: `http://www.connect6play.com/doBusiness.do`,
    merchantCode: `winvipvndk`,
    desKey: `4UcCbMwH`,
    signKey: `tQ2V2m2Oz1EKWf3h`,
    currency: `VNDK`,
    productType: 112,
    productName: `SEX`,
    prefix: `0fe`,
    language: 'VI'
}

// CREATE/REGISTER PLAYER API
let createUser = async(username, password) => {
    let registerParams = {
        username,
        password,
        currency: TcgApiService.currency,
        method: 'cm',
    };
    return await postAPI(registerParams);
}

// UPDATE PASSWORD API
let updatePassword = async(username, password) => {
    let updateParams = {
        username,
        password,
        currency: TcgApiService.currency,
        method: 'up',
    };
    return await postAPI(updateParams);
}

// GET BALANCE API
let getBalance = async(username, product_type) => {
    let getBalanceParams = {
        username,
        product_type,
        method: 'gb'
    };
    return await postAPI(getBalanceParams);
}

// USER FUND TRANSFER API
let userTransfer = async(username, product_type, fund_type, amount, reference_no) => {
    let userTransferParams = {
        username,
        product_type,
        fund_type,
        amount,
        reference_no,
        method: 'ft'
    };
    return await postAPI(userTransferParams);
}

// CHECK TRANSACTION STATUS API
let checkTransfer = async(product_type, ref_no) => {
    let checkTransferParams = {
        product_type,
        ref_no,
        method: 'cs'
    };
    return await postAPI(checkTransferParams);
}

// LAUNCH GAME API
let getLaunchGame = async(username, product_type, game_mode, game_code, platform) => {
    let getLaunchGameParams = {
        username,
        product_type,
        game_mode,
        game_code,
        platform,
        language: TcgApiService.language,
        method: 'lg'
    };
    return await postAPI(getLaunchGameParams);
}

// LAUNCH GAME LOTTERY API
// CLOSED
let getLaunchGameLottery = async(username, product_type, game_mode, game_code, platform, view) => {
    let lotteryBetMode = 'Traditional';
    let series = [];
    let getLaunchGameLotteryParams = {
        username,
        product_type,
        game_mode,
        game_code,
        platform,
        language: TcgApiService.language,
        method: 'lg'
    };
    return await postAPI(getLaunchGameLotteryParams);
}

// GAME LIST API
let getGameList = async(product_type, platform, client_type, game_type, page, page_size) => {
    let getGameListParams = {
        product_type,
        platform,
        client_type,
        game_type,
        page,
        page_size,
        method: 'tgl'
    };
    return await postAPI(getGameListParams);
}

// PLAYER GAME RANK API
let getGameRank = async(product_type, game_category, game_code, start_date, end_date, count) => {
    let getGameRankParams = {
        product_type,
        game_category,
        game_code,
        start_date,
        end_date,
        count,
        method: 'pgr'
    };
    return await postAPI(getGameRankParams);
}

// GET RNG BET DETAILS
let getBetDetails = async(batch_name, page) => {
    let getBetDetailsParams = {
        batch_name,
        page,
        method: 'bd'
    };
    return await postAPI(getBetDetailsParams);
}

// GET RNG BET DETAILS BY MEMBER
let getBetDetailsMember = async(username, start_date, end_date, page) => {
    let getBetDetailsMemberParams = {
        username,
        start_date,
        end_date,
        page,
        method: 'bdm'
    };
    return await postAPI(getBetDetailsMemberParams);
}

let postAPI = async(dataParams) => {
    try {
        const hashData = await hashParams(dataParams);
        const post = await axios({
            method: 'post',
            url: TcgApiService.url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 10000,
            data: qs.stringify({
                'merchant_code': TcgApiService.merchantCode,
                'params': hashData.params,
                'sign': hashData.sign
            })
        });
        return post.data;
    } catch (e) {
        console.log(`TCG Error Post API: ${e.message}`);
        return;
    }
}

let hashParams = async(params) => {
    try {
        const hash = await axios({
            method: 'post',
            url: serviceHash,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'params': JSON.stringify(params)
            })
        });
        return hash.data;
    } catch (e) {
        console.log(`TCG Error Hash Params: ${e.message}`);
        return;
    }
}


module.exports = {
    TcgApiService, // export info api key TCG
    hashParams,
    postAPI,
    createUser,
    updatePassword,
    getBalance,
    userTransfer,
    checkTransfer,
    getLaunchGame,
    getLaunchGameLottery,
    getGameList,
    getGameRank,
    getBetDetails,
    getBetDetailsMember
}