$().ready(function() {
	var doodle = document.querySelector('css-doodle'),
		  doodleStyles = window.getComputedStyle(doodle),
		  colorSets = [
		  	['#FFFFFF','#81FFF9','#00FFF3','#00A1FF','#FF8DFF','#FF007E','#C3FFFC'],
		  	['#FCEADB','#00FFF3','#54FFFB','#14D9D4','#568EA6','#FF007E','#FCEADB'],
		  	['#E8F8F8','#AEEDEA','#AEEDEA','#78B7B4','#FDB0D6','#A54374','#E8F8F8']
		  ];
	// Redraws art on click
	/*$('.redraw').on('click', function(e) {
		let colorSet = colorSets[Math.floor(Math.random()*colorSets.length)]
		redraw(colorSet);
		e.preventDefault();
	});*/
	setInterval(function(){ 
		let colorSet = colorSets[Math.floor(Math.random()*colorSets.length)]
		redraw(colorSet);
	}, 4000);

	function redraw(colorSet) {
		
		for (let i = 0; i < 6; ++i) {
			doodle.style.setProperty('--color'+i, colorSet[i]);
		};

		$('.hero-container').css('background-color', colorSet[6]);
		// update set colors
		doodle.update(); 		
	};
});