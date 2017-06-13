var suu = 0; // 画像表示数
var sec = 0; // 画像表示秒数
var max = 3; // ファイル名最大数(直書きオンリー)
var doc = document;
var imgOrder = [];
/**
 * 画像名称の最大値を取得する
 * (画像名称は必ず 数字.png であることが前提)
 */
function getMax(){
	alert('未実装');
}
/**
 * 画像表示数チェック
 * true:正常
 * false:以上
 */
function checkSuu(){
	// alert('未実装');
	var ans = false;
	var suu = getVal('suu');
	var nsuu = Number(suu);
	if(nsuu >= 1 && nsuu < 100){
		ans = true;
	}
	return ans;
}
/**
 * 画像表示秒数チェック
 * true:正常
 * false:以上
 */
function checkSec(){
	// とりあえず0.2 秒以上 5秒未満とする
	//alert('未実装');
	var ans = false;
	var sec = getVal('sec');
	var nsec = floatFormat(sec, 1);
	if(nsec >= 0.2 && nsec < 5){
		ans = true;
	}
	return ans;
}
/**
 * N秒スリープするタイマー
 */
function timer(fileName){

	// 現在時刻を取得する
	var src = new Date();
	// N秒スリープするタイマー
	for(;;){
		var dst = new Date();
		var diff = dst.getTime() - src.getTime();
		if(sec * 1000 < diff){
			//alert('非同期描画がまだできていない');
			break;
		}
	}
}
/**
 * valueを取得する
 */
function getVal(id){
	var val = "";
	var obj = doc.getElementById(id);
	if(obj && obj.value){
		val = obj.value;
	}
	return val;
}
/**
 * 小数点n位までを残す関数
 * number=対象の数値
 * n=残したい小数点以下の桁数
 */
function floatFormat( number, n ) {
	var _pow = Math.pow( 10 , n ) ;

	return Math.round( number * _pow ) / _pow ;
}
/**
 * Divに画像を描画する
 */
function showImg(fileName){
	var imgDiv = doc.getElementById('img');
	imgDiv.innerHTML = '';

	if(fileName){
		imgDiv.innerHTML = '<img border="1" src="./img/'+ fileName +'" width="300" height="300" alt="'+fileName+'">';
	}
}
/**
 * ファイル名を作成する
 */
function getFileName(){
	var n = 10;
	if(max >= 10) n = 100;
	var kari = floatFormat(Math.random() * n, 0);
	var fileName = ((kari % max) + 1) + ".png";
	return fileName;
}
/**
 * 処理開始
 */
function startChgImg(){
	// 表示数と表示秒数を取得する
	suu = getVal('suu');
	sec = getVal('sec');

	// 値のチェックを実施する。チェックできなかった場合は、エラー終了とする
	if(checkSec() && checkSuu()){

	} else {
		alert('入力値に不整合があります。');
		return false;
	}

	// 画面表示する画像の順番を作成する
	imgOrder = [];
	var i=0;
	for(;i<suu; i++){
		var imgFileName = getFileName();
		imgOrder.push(imgFileName);
	}
	// 画面に画像を表示する
	for(i=0;i<imgOrder.length; i++){
		//var fnc = showImg(imgOrder[i]);
		//var fnc = function(){alert('run setTimeout()');}
		var fnc = function(){showImg(imgOrder[i]);}
		setTimeout(fnc, 1);
		timer(imgOrder[i]);
	}
	showImg('');
}
