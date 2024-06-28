let HU          = require('../Models/HU');

let cronDay = function(day){
	if (day < 0) {
		return 6;
	}else if (day > 6) {
		return 0;
	}
	return day;
}

module.exports = function(){
	/**
	 * AngryBirds
	*/
	// 100 Angrybird
	HU.findOne({game:'arb', type:100}, 'bet min toX balans x', function(err, arb100){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let arb100bet = arb100.bet;
		let file_angrybird = require('../../config/angrybird.json');
		if (file_angrybird[homQua] && arb100.toX < 1 && arb100.balans > 0) {
			arb100bet = arb100bet-(arb100.min*(arb100.x-1));
		}
		if (file_angrybird[timeNow]) {
			HU.updateOne({game:'arb', type:100}, {$set:{'bet': arb100bet, 'toX': file_angrybird['100'].toX, 'balans': file_angrybird['100'].balans, 'x': file_angrybird['100'].x}}).exec();
		}else{
			HU.updateOne({game:'arb', type:100}, {$set:{'toX': 0, 'balans': 0, 'bet': arb100bet}}).exec();
		}
	});

	// 1000 Angrybird
	HU.findOne({game:'arb', type:1000}, 'bet min toX balans x', function(err, arb1000){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let arb1000bet = arb1000.bet;
		let file_angrybird = require('../../config/angrybird.json');
		if (file_angrybird[homQua] && arb1000.toX < 1 && arb1000.balans > 0) {
			arb1000bet = arb1000bet-(arb1000.min*(arb1000.x-1));
		}
		if (file_angrybird[timeNow]) {
			HU.updateOne({game:'arb', type:1000}, {$set:{'bet': arb1000bet, 'toX': file_angrybird['1000'].toX, 'balans': file_angrybird['1000'].balans, 'x': file_angrybird['1000'].x}}).exec();
		}else{
			HU.updateOne({game:'arb', type:1000}, {$set:{'toX': 0, 'balans': 0, 'bet': arb1000bet}}).exec();
		}
	});

	// 10000 Angrybird
	HU.findOne({game:'arb', type:10000}, 'bet min toX balans x', function(err, arb10000){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let arb10000bet = arb10000.bet;
		let file_angrybird = require('../../config/angrybird.json');
		if (file_angrybird[homQua] && arb10000.toX < 1 && arb10000.balans > 0) {
			arb10000bet = arb10000bet-(arb10000.min*(arb10000.x-1));
		}
		if (file_angrybird[timeNow]) {
			HU.updateOne({game:'arb', type:10000}, {$set:{'bet': arb10000bet, 'toX': file_angrybird['10000'].toX, 'balans': file_angrybird['10000'].balans, 'x': file_angrybird['10000'].x}}).exec();
		}else{
			HU.updateOne({game:'arb', type:10000}, {$set:{'toX': 0, 'balans': 0, 'bet': arb10000bet}}).exec();
		}
	});

	/**
	 * BigBabol
	*/
	// 100 BigBabol
	HU.findOne({game:'bigbabol', type:100}, 'bet min toX balans x', function(err, bbb100){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let bbb100bet = bbb100.bet;
		let file_bigbabol  = require('../../config/bigbabol.json');
		if (file_bigbabol[homQua] && bbb100.toX < 1 && bbb100.balans > 0) {
			bbb100bet = bbb100bet-(bbb100.min*(bbb100.x-1));
		}
		if (file_bigbabol[timeNow]) {
			HU.updateOne({game:'bigbabol', type:100}, {$set:{'bet': bbb100bet, 'toX': file_bigbabol['100'].toX, 'balans': file_bigbabol['100'].balans, 'x': file_bigbabol['100'].x}}).exec();
		}else{
			HU.updateOne({game:'bigbabol', type:100}, {$set:{'toX': 0, 'balans': 0, 'bet': bbb100bet}}).exec();
		}
	});

	// 1000 BigBabol
	HU.findOne({game:'bigbabol', type:1000}, 'bet min toX balans x', function(err, bbb1000){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let bbb1000bet = bbb1000.bet;
		let file_bigbabol  = require('../../config/bigbabol.json');
		if (file_bigbabol[homQua] && bbb1000.toX < 1 && bbb1000.balans > 0) {
			bbb1000bet = bbb1000bet-(bbb1000.min*(bbb1000.x-1));
		}
		if (file_bigbabol[timeNow]) {
			HU.updateOne({game:'bigbabol', type:1000}, {$set:{'bet': bbb1000bet, 'toX': file_bigbabol['1000'].toX, 'balans': file_bigbabol['1000'].balans, 'x': file_bigbabol['1000'].x}}).exec();
		}else{
			HU.updateOne({game:'bigbabol', type:1000}, {$set:{'toX': 0, 'balans': 0, 'bet': bbb1000bet}}).exec();
		}
	});

	// 10000 BigBabol
	HU.findOne({game:'bigbabol', type:10000}, 'bet min toX balans x', function(err, bbb10000){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let bbb10000bet = bbb10000.bet;
		let file_bigbabol  = require('../../config/bigbabol.json');
		if (file_bigbabol[homQua] && bbb10000.toX < 1 && bbb10000.balans > 0) {
			bbb10000bet = bbb10000bet-(bbb10000.min*(bbb10000.x-1));
		}
		if (file_bigbabol[timeNow]) {
			HU.updateOne({game:'bigbabol', type:10000}, {$set:{'bet': bbb10000bet, 'toX': file_bigbabol['10000'].toX, 'balans': file_bigbabol['10000'].balans, 'x': file_bigbabol['10000'].x}}).exec();
		}else{
			HU.updateOne({game:'bigbabol', type:10000}, {$set:{'toX': 0, 'balans': 0, 'bet': bbb10000bet}}).exec();
		}
	});

	/**
	 * MiniPoker
	*/
	// 100 MiniPoker
	HU.findOne({game:'minipoker', type:100}, 'bet min toX balans x', function(err, mpk100){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let mpk100bet = mpk100.bet;
		let file_minipoker = require('../../config/minipoker.json');
		if (file_minipoker[homQua] && mpk100.toX < 1 && mpk100.balans > 0) {
			mpk100bet = mpk100bet-(mpk100.min*(mpk100.x-1));
		}
		if (file_minipoker[timeNow]) {
			HU.updateOne({game:'minipoker', type:100}, {$set:{'bet': mpk100bet, 'toX': file_minipoker['100'].toX, 'balans': file_minipoker['100'].balans, 'x': file_minipoker['100'].x}}).exec();
		}else{
			HU.updateOne({game:'minipoker', type:100}, {$set:{'toX': 0, 'balans': 0, 'bet': mpk100bet}}).exec();
		}
	});

	// 1000 MiniPoker
	HU.findOne({game:'minipoker', type:1000}, 'bet min toX balans x', function(err, mpk1000){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let mpk1000bet = mpk1000.bet;
		let file_minipoker = require('../../config/minipoker.json');
		if (file_minipoker[homQua] && mpk1000.toX < 1 && mpk1000.balans > 0) {
			mpk1000bet = mpk1000bet-(mpk1000.min*(mpk1000.x-1));
		}
		if (file_minipoker[timeNow]) {
			HU.updateOne({game:'minipoker', type:1000}, {$set:{'bet': mpk1000bet, 'toX': file_minipoker['1000'].toX, 'balans': file_minipoker['1000'].balans, 'x': file_minipoker['1000'].x}}).exec();
		}else{
			HU.updateOne({game:'minipoker', type:1000}, {$set:{'toX': 0, 'balans': 0, 'bet': mpk1000bet}}).exec();
		}
	});

	// 10000 MiniPoker
	HU.findOne({game:'minipoker', type:10000}, 'bet min toX balans x', function(err, mpk10000){
		let timeNow = new Date();
		timeNow     = timeNow.getDay();
		let homQua  = cronDay(timeNow-1);
		let mpk10000bet = mpk10000.bet;
		let file_minipoker = require('../../config/minipoker.json');
		if (file_minipoker[homQua] && mpk10000.toX < 1 && mpk10000.balans > 0) {
			mpk10000bet = mpk10000bet-(mpk10000.min*(mpk10000.x-1));
		}
		if (file_minipoker[timeNow]) {
			HU.updateOne({game:'minipoker', type:10000}, {$set:{'bet': mpk10000bet, 'toX': file_minipoker['10000'].toX, 'balans': file_minipoker['10000'].balans, 'x': file_minipoker['10000'].x}}).exec();
		}else{
			HU.updateOne({game:'minipoker', type:10000}, {$set:{'toX': 0, 'balans': 0, 'bet': mpk10000bet}}).exec();
		}
	});

};
