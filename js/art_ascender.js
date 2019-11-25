
/* Set array for default colors */
var currentColors = ["#D5F5F5", "#5BBEFF", "#805FF1", "#2DCCCD", "#237ABA", "#004481"];

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
}

/* Set css-doodle element as variable */
const doodle = document.querySelector('css-doodle');

/* Update color on color picker change */
Object.keys(pickr).forEach(function(key) {

	pickr[key].on('save', function() {
		doodle.style.setProperty('--color'+key, pickr[key].getColor().toHEXA());

		// update set colors
		currentColors[key] = pickr[key].getColor().toHEXA();
		doodle.update(); 
	});
});

/* Redraw on click */
$('#redraw').on('click', function(e) {
	doodle.update();
	e.preventDefault();
});
