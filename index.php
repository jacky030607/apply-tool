<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>申請入學採計科目篩選器</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>
	function search(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
      	document.getElementById("result").innerHTML = this.responseText;
    	}
  	};
  	xhttp.open("GET", "getResult.php?q=" + $("#qd")[0].value + "&s=" + $("#qs")[0].value, true);
  	xhttp.send();
	}
	</script>
</head>
<body>
	<div class="container">
		申請入學採計科目篩選器
	</div>

	<div class="container form-group">
		<div class="input-group mb-3">
		  <input type="text" class="form-control" id="qd" placeholder="科系名稱" value="" onkeyup="search()">
		  <div class="input-group-append">
				<span class="input-group-text">@</span>
			</div>
			<input type="text" class="form-control" id="qs" placeholder="學校名稱" value="" onkeyup="search()">
			<div class="input-group-append">
		    <button class="btn btn-primary" onclick="search()">搜尋</button>
		  </div>
		</div>
	</div>

	<div id="result"></div>
</body>
</html>
