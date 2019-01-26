"use strict";
var data = [];
var subjects = ['chinese', 'english', 'math', 'society', 'science'];
var subject_index = {
  "頂標": "s1",
  "前標": "s2",
  "均標": "s3",
  "後標": "s4",
  "底標": "s5",
  "採計": "s6",
  "二階": "s7"
};

function getData(){
  $.getJSON('data/data.json', function(json_data) {
    for(var x in json_data)
      data.push(json_data[x]);
  });
}

function search(qd, qs, c){
  if(qd == '' && qs == '') return [];

  var results = [];
  for(var i=0; i<data.length; i++){
    var regex_qd = new RegExp(qd,'i');
    var regex_qs = new RegExp(qs,'i');
    if(regex_qd.test(data[i]['name']) && regex_qs.test(data[i]['school'])){
      var flag = true;
      for(var j=0; j<5; j++){
        if(data[i][subjects[j]]=='--' && c[j]=='2') flag = false;
        if(data[i][subjects[j]]!='--' && c[j]=='3') flag = false;
      }
      if(flag) results.push(data[i]);
    }
  }
  return results;
}

function getFormatted(str){
  if(str in subject_index){
    return "<td class='subject align-middle " + subject_index[str] + "'>" + str + "</td>";
  }
  return "<td class='subject align-middle'>" + str + "</td>";
}

function update(){
  $(".loading").show();

  // clear table
  $('#result_content').empty();
  var results = search($('#qd').val(), $('#qs').val(), [$('#s1').val(),
                                                        $('#s2').val(),
                                                        $('#s3').val(),
                                                        $('#s4').val(),
                                                        $('#s5').val()]);
  var content = '';
  for(var i=0; i<results.length; i++){
    var url = "https://www.cac.edu.tw/apply108/system/108ColQry_forapply_3r5k9d/html/108_" + results[i]['id'] + ".htm";
    content += '<tr>';
    content += '<td>' + results[i]['school'] + '</td>';
    content += "<td><a href='" + url + "'>" + results[i]['name'] + '</a></td>';
    for(var j=0; j<subjects.length; j++)
      content += getFormatted(results[i][subjects[j]]);
    content += '</tr>';
  }
  $('#result_content').append(content);

  // add strikethrough on subjects which is filtered
  for(var i=1;i<=5;i++){
    if($("#s"+i).val() == '1')$("#t"+i).css({"text-decoration-line": "",
                                             "text-decoration-color": "",
                                             "color": "black"});
    if($("#s"+i).val() == '2')$("#t"+i).css({"text-decoration-line": "underline",
                                             "text-decoration-color": "Green",
                                             "color": "green"});
    if($("#s"+i).val() == '3')$("#t"+i).css({"text-decoration-line": "line-through",
                                             "text-decoration-color": "DarkRed",
                                             "color": "darkred"});
  }
  // reduce text length on small devices
  if($(window).width()<768){
    $("#btn_advanced").text("進階");
    $(".subject-title").each(function(){
      var str=$(this).text().substring(0,1);
      $(this).text(str);
    });
    $(".option-title").each(function(){
      var str=$(this).text().substring(0,2);
      $(this).text(str);
    });
  }

  $(".loading").hide();
}

// auto search when the page is fully loaded
$(document).ready(function(){
  getData();
  update();
});
