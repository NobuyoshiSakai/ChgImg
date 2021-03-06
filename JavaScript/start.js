var suu = 0; // 画像表示数
var sec = 0; // 画像表示秒数

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
 * Divに画像を描画する
 */
function showImg(fileName){
	var imgDiv = document.getElementById('img');
	imgDiv.innerHTML = '';

	if(fileName){
		imgDiv.innerHTML = '<img border="1" src="./img/'+ fileName +'" width="300" height="300" alt="'+fileName+'">';
	} else {
		//var i=0;
		//for(;i<imgOrder.length;i++){
		//	var fileTag = '<img border="1" src="./img/'+ imgOrder[i] +'" width="100" height="100" alt="'+imgOrder[i]+'">'
		//	imgDiv.innerHTML += fileTag;
		//}
	}
}
/**
 * 画面に表示する、画像の一覧を作成する
 */
function createFileNameList(){
	imgOrder = [];
	var i=0;
	var imgFileName;
	var imgOldName;
	for(;i<suu; i++){

		// 前後で同じ画像が設定されると、切り目がわからなくなるため、前後で同じにならないようにする
		do{
			imgFileName = getFileName();
		} while(imgFileName == imgOldName)

		imgOldName = imgFileName;
		imgOrder.push(imgFileName);
	}
}
/**
 * 画面に順に、画像を表示する
 */
var slideid;
var cnt=0;
function showAll(){
	if(cnt < suu){
		console.log(imgOrder[cnt]);

		// 画像を表示する
		showImg(imgOrder[cnt]);
		cnt++;
	} else {
		// 画像の一覧を表示する
		showImg('');
		clearInterval(slideid);
	}
}
/**
 * 処理開始
 */
function startChgImg(){
	// 表示数と表示秒数を取得する
	suu = getVal('suu');
	sec = getVal('sec');

	// 値のチェックを実施する。チェックできなかった場合は、エラー終了とする
	if(checkSec() == false || checkSuu() == false){
		alert('入力値に不整合があります。');
		return false;
	}

	// 画面表示する画像の順番を作成する
	createFileNameList();

	// 画像を順に表示する
	cnt=0;
	slideid = setInterval("showAll()",sec * 1000);
}
