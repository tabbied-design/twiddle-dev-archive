/* Get style from css-doodle element */
const 	doodle = document.querySelector('css-doodle'),
		doodleStyles = window.getComputedStyle(doodle),
	
		// get initial colors of art from HTML
		countColors = $('.colors').attr('data-count'),

		/* Initialize array to plug in default colors */
		currentColors = [];
// Plug in colors in currentColors array to set color picker and default colors
for (let i = 0; i < countColors; ++i) {
	currentColors[i] = doodleStyles.getPropertyValue('--color'+i);
};

/* Set color picker object */
var pickr = {};

/* Create color pickers */
for (let i = 0; i < currentColors.length; ++i) {
	pickr[i] = new Pickr({
	    el: '.color-picker'+i,
	    
	    swatches: [],
	    theme: 'monolith',

	    defaultRepresentation: 'HEX',
	    default: currentColors[i],
	    components: {
	        preview: true,
	        opacity: false,
	        hue: true,

		    interaction: {
		        hex: false,
		        rgba: false,
		        hsva: false,
		        input: true,
		        clear: false,
		        save: true
		    }
	   	}
	});
	// !important: this is a temp plugin bug fix to update colors of the color picker button on safari
	$('.pcr-button').eq(i).css('color', currentColors[i]);
}
/* Update color on color picker change */
Object.keys(pickr).forEach(function(key) {

	pickr[key].on('save', function() {
		doodle.style.setProperty('--color'+key, pickr[key].getColor().toHEXA());

		// update set colors
		doodle.update(); 

		// !important: this is a temp plugin bug fix to update colors of the color picker button on safari
		$('.pcr-button').eq(key).css('color', pickr[key].getColor().toHEXA());
	});
});

/* Redraw on click */
$('#redraw').on('click', function(e) {
	doodle.update();
	e.preventDefault();
});

/* Redraw with custom text function */
$('#custom_text').on('input',function() {
    var text = $(this).val();
    var initial = text.charAt(0);
    doodle.style.setProperty('--text', 'SUPER ' + text);
     doodle.style.setProperty('--initial', initial);
    doodle.update();
});
