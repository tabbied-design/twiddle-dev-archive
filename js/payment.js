var handler = StripeCheckout.configure({
  key: 'pk_test_woBx2u32eWjgCzilLrbODt2m00AbDikxlS',
  image: 'img/symbol_dark_bg.png',
  locale: 'auto',
  token: function(token, args) {
    var orderData = {
      "token": token.id,
      "email": token.email,
      "product": '6 print-ready JPG files for custom artwork of '+ $('.product-title').attr('data-name'),
      "quantity": 1,
      "amount": Number($('.product-title').attr('data-price') - promo_discount),
      "name": args.billing_name
    };
    var dataString = JSON.stringify(orderData);

    // get html for doodle
	var shadowDoodle = document.querySelector('css-doodle').shadowRoot,
		mainDoodle = shadowDoodle.innerHTML,
		introDoodle = $('css-doodle').prop('outerHTML'),
		dataDoodle = introDoodle + mainDoodle;

	    $.ajax({
			type: "POST",
			url: "stripe_payment.php",
			data: {postData: dataString, postDoodle: dataDoodle},
			beforeSend: function(){
				$('.left-bg').addClass('move');
				$('css-doodle').velocity('fadeOut', { duration: 600 },[ 0.11, 0.71, 0.81, 0.71]);
				$('.preloader').velocity('fadeIn', { duration: 600 },[ 0.11, 0.71, 0.81, 0.71]);
				setTimeout(function() { 
			        $('.curtain').addClass('move');
			    }, 100);
    		},
			success: function(data){
				// if successful, display thank you screen
				var result = $.trim(data);
				var dollars = orderData.amount / 100;

				/*if (result == 'i') {
					window.location = "/shipping-not-available.html";
				}*/
				if (result == 's') {
					var orderSummary =  '<h2>A great big thank you!</h2>' +
										'<p>Your order has been placed successfully. We will work as fast as possible to send your customized artwork to you. In the meantime, we sent a receipt to ' + orderData.email + '. We also recommend you taking a screenshot of this page for your records.</p>' +
										'<h3>Order details</h3>' +
										'<p>You placed an order for '  + orderData.product + '. Your files will be sent to ' + orderData.email + ' within an estimated delivery time of less than 24 hours.';
					var orderDetails =  '<ul class="horTable">' +
											'<li><span class="title">Subtotal</span> <span class="value">$' + dollars + '</li>' +
											'<li class="morespace"><span class="title bolder">Total paid</span>  <span class="value bolder">$' + dollars + '</li>' +
										'</ul>' +
										'<p><a href="../" class="link link-reveil">Continue shopping</a></p>';
					$('#order-summary').html(orderSummary);
					$('#order-details').html(orderDetails);

					// hide loader
					$('.curtain').removeClass('move');
					$('.preloader').velocity('fadeOut', { duration: 600 },[ 0.11, 0.71, 0.81, 0.71]);
					setTimeout(function() { 
				        $('.left-bg').removeClass('move');
				    	$('css-doodle').velocity('fadeIn', { duration: 600 },[ 0.11, 0.71, 0.81, 0.71]);
				    }, 100);
				    $('.free-sample').hide();
				}
				// if fail, show error screen
				else {
					window.location = "/payment-error.html";
				}

			},
			error: function(errMsg) {
				window.location = "/payment-error.html";
			}
		});
	}
});
// set global variable default promo_discount to 0
var promo_discount = 0;
document.querySelector('.order_btn').addEventListener('click', function(e) {
	var promo_code = $.trim($('#promo_code').val()).toLowerCase();
	if (promo_code == 'beta') {
		promo_discount = 1000;
	}
	else {
		promo_discount = 0;
	}
	var productTitle = $('.product-title'),
		productName = $(productTitle).attr('data-name'),
		productPrice = $(productTitle).attr('data-price') - promo_discount;

	handler.open({
		name: productName + ' $' +(productPrice/100),
		description: 'Digital download',
		currency: 'usd',
		amount: Number(productPrice),
		shippingAddress: false, 
		billingAddress: true
	});
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
	handler.close();
});

// Show select dropdown on click
$('#custom_choices label, #paper_type').on('click', function() {
	$('.selections').velocity('fadeIn', { duration: 300 });
});
// Do things when selecting options
$('.selections li').on('click', function() {
	let $this = $(this);
	// close select dropdown
	$this.parent().velocity('slideUp', { duration: 300, delay: 200 }).find('.selected').removeClass('selected');
	// update select field
	$this.addClass('selected');
	$('#paper_type').html($this.html());
	// update price
	var updatedPrice = $this.attr('data-price');
	$('.product-title').attr('data-price', updatedPrice+'00');
	$('#final-price').html('$'+updatedPrice);
});