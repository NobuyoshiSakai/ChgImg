/**
 * 問題を作成する
 */
function answer(index){
  // 正解数を0で初期化
  right_cnt =0;
  var divObj = document.getElementById('img');
  var html = "";
  var i=0;

  // 正解ファイル名を取得する
  var ansFileName = imgOrder[index];

  // 正解候補ファイル名リストを作成する
  var ansList = getAnswerList(ansFileName);

  html =  "";
  html += "<table>";
  html += "<tr><td colspan='5'>"+(index + 1)+"番目の画像を以下からお選び下さい。</td></tr>";

  // ------------------------------------------------
  // 問題画像を表示する
  // 問画像は5枚毎に表示し、必ず1枚は正解を混ぜる
  // ------------------------------------------------
  html += "<tr>";
  for(i=0; i<ansList.length; i++){
    var script = "";
    if(ansList[i] == ansFileName){
      script = "setAnswer("+index+", true);";
    } else {
      script = "setAnswer("+index+", false);";
    }
    var imgTag = '<img border="1" onclick="'+script+'" src="./img/'+ ansList[i] +'" width="70" height="70" alt="'+ansList[i]+'">';
    html += "<td id='question_"+i+"'>"+imgTag+"</td>";
  }
  html += "</tr>";

  // ------------------------------------------------
  // 正解画像
  // ------------------------------------------------
  html += "<tr><td colspan='5'>正解画像はこちら！<br><hr></td></tr>";

  // ------------------------------------------------
  // 回答画像を表示する
  // 回答画像は5問毎に改行する ※id は連番
  // ------------------------------------------------
  var imgOrderLength = imgOrder.length;
  var answerListRow = imgOrderLength / 5;
  var rowCnt = 0;
  if(imgOrderLength % 5 > 0){answerListRow += 1;}

  for(rowCnt=0; rowCnt<answerListRow; rowCnt++){
    html += "<tr>";
    for(i=0; i<5; i++){
      var answerFileName = "";
      var id = (rowCnt * 5) + i;
      if(id < imgOrderLength){
        answerFileName = '<img border="1" src="./img/'+ imgOrder[id] +'" width="70" height="70" alt="'+imgOrder[id]+'">';
      } else {
        answerFileName = "";
      }
      html += "<td id='ans_"+id+"' style='visibility: hidden;'>"+answerFileName+"</td>";
    }
    html += "</tr>";
  }
  html += "</table>";

  // tableを設定する
  divObj.innerHTML = html;
}
/**
 * 正否判定を行ない、処理を行う
 */
function setAnswer(questionNo, isRight){

  // ------------------------------------------------
  // 正否処理を行う
  // ------------------------------------------------
  var id = "ans_" + questionNo;
  var tdObj = document.getElementById(id);
  tdObj.style.visibility = 'visible';
  if(isRight){
    // alert("正解");
    right_cnt += 1;
  } else {
    // alert("不正解");
  }
  // ------------------------------------------------
  // 新しい問題を作成する
  // 最後の問題の場合は、結果を表示する
  // ------------------------------------------------
  // 次の問題
  var index = questionNo + 1;

  if(index < imgOrder.length){
    // 正解ファイル名を取得する
    var ansFileName = imgOrder[index];
    // 正解候補ファイル名リストを作成する
    var ansList = getAnswerList(ansFileName);
    var i=0;

    for(i=0; i<ansList.length; i++){
      var script = "";
      if(ansList[i] == ansFileName){
        script = "setAnswer("+index+", true);";
      } else {
        script = "setAnswer("+index+", false);";
      }
      var imgTag = '<img border="1" onclick="'+script+'" src="./img/'+ ansList[i] +'" width="70" height="70" alt="'+ansList[i]+'">';
      var tdObj  = document.getElementById('question_' + i);
      tdObj.innerHTML = imgTag;
    }
  } else {
    alert("問題数 " + imgOrder.length + " のうち\n正解は " + right_cnt + " でした。");
  }
}
/**
 * 正解候補のリストを作成する
 */
function getAnswerList(ansFileName){
  var ansList = [];
  var i=0;
  ansList.push(ansFileName);

  // 回答リストの最大値 -1 の正解候補をリストに格納する
  for(i=0; i<ans_list_max -1; i++){
  	var imgFileName = '';
		// 同じ画像が2枚以上あると、正解が増えるため、同じ画像が無いようにする
		do{
			imgFileName = getFileName();

    // ファイル名がリストに存在した場合は、再度正解候補のファイル名を取得する
		} while(indexFileName(ansList, imgFileName) >= 0)
		ansList.push(imgFileName);
  }
  // 正解候補のリストをシャッフルする
  ansList = shuffleList(ansList);

  // シャッフルしたリストを返す
  return ansList;
}
/**
 * 正解候補リスト内に、ファイル名が存在したら、その位置(0始まり)を返す
 * 存在しない場合は、-1を返す
 */
function indexFileName(ansList, fileName){
  var index = -1;
  var i=0;
  for(i=0; i<ansList.length; i++){
    if(ansList[i] == fileName){
      index = i;
      break;
    }
  }
  return index;
}
/**
 * 回答リストをシャッフルして返す
 */
function shuffleList(ansList){
  var newAnsList = [];
  var i=0;
  while(ansList.length > 0){
    var mod5 = (Math.random() * Date.now()) % (ansList.length-1);
    if(!mod5) mod5 = 0;
    mod5 = Math.round(mod5)
    newAnsList.push(ansList[mod5]);
    ansList.splice( mod5, 1 ) ;
  }
  return newAnsList;
}
/**
 * 正解候補の中にある正解の位置を返す(0始まり)
 */
function getAnswerPosition(ansList, answer){
  var pos = 0;
  var i=0;
  for(i=0; i<ansList.length; i++){
    if(ansList[i] == answer){
      pos = i;
      break;
    }
  }
  return pos;
}
