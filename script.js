// Mitchell Li
$(function() {

	var bannerInd = 0;

	var jsons = ['json/all.json','json/fire.json',
				'json/grass.json','json/water.json'];

	var bannerType = ['All','Fire','Grass','Water'];

	var bannerPics = ['pictures/pikachu.jpg','pictures/charmander.jpg',
						'pictures/bulbasaur.jpg','pictures/squirtle.jpg'];

	function addPhotos(photos) {
		var pokeGrid = $('#grid');
		pokeGrid.empty();

		photos.forEach(function(p) {
			var element = '<div class="col-3 d-inline-block"><img src="' + p.path + '"id="' + p.name + '" class="d-block img-fluid mx-auto" alt="" /></div>';
			pokeGrid.append(element);
		});
	}


	function getPhotos(jsonPath) {
		$.ajax({
			type: 'GET',
			url: jsonPath,
			dataType: 'json',
			success: function (data) {
				addPhotos(data);
			},
			error: function(req, status, err) {
				console.log('ERROR loading data:', err);
			}
		});
	}


	function slideLeft() {
		if (bannerInd===0) {
			bannerInd = 3;
			$('#rightButton').attr('value', bannerType[0]);
			$('#leftButton').attr('value', bannerType[bannerInd-1]);
		} else {
			bannerInd--;
			if (bannerInd===0){
				$('#rightButton').attr('value', bannerType[bannerInd+1]);
				$('#leftButton').attr('value', bannerType[3]);
			} else {
				$('#rightButton').attr('value', bannerType[bannerInd+1]);
				$('#leftButton').attr('value', bannerType[bannerInd-1]);
			}
		}
		$('#banner').children('img').attr('src', bannerPics[bannerInd]);
		getPhotos(jsons[bannerInd]);
	}


	function slideRight() {
		if (bannerInd===3) {
			bannerInd = 0;
			$('#rightButton').attr('value', bannerType[bannerInd+1]);
			$('#leftButton').attr('value', bannerType[3]);
		} else {
			bannerInd++;
			if (bannerInd===3){
				$('#rightButton').attr('value', bannerType[0]);
				$('#leftButton').attr('value', bannerType[bannerInd-1]);
			} else {
				$('#rightButton').attr('value', bannerType[bannerInd+1]);
				$('#leftButton').attr('value', bannerType[bannerInd-1]);
			}
		}
		$('#banner').children('img').attr('src', bannerPics[bannerInd]);
		getPhotos(jsons[bannerInd]);
	}


	var canvas = document.getElementById('gui');
	var context = canvas.getContext('2d');
	function draw(e){
		$('h3').html(e.target.id);

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(e.target,(canvas.width-e.target.width)/2-e.target.width/2,(canvas.height-e.target.height)/2-e.target.height/2);
	}

	getPhotos(jsons[0]);

	document.getElementById("grid").addEventListener('click', draw, false);
	$('#leftButton').on('click', slideLeft);
	$('#rightButton').on('click', slideRight);
});