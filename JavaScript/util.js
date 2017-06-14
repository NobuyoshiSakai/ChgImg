/**
 * valueを取得する
 */
function getVal(id){
	var val = "";
	var obj = document.getElementById(id);
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
