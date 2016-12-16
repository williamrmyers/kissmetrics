<script type="text/javascript">

// Sets vars to current url

 previous_url = window.location.hash

 current_url = window.location.hash

// Here we will define the a function for each page. This page will set event listeners for that page, that will create Kissmetrics API calls to setup tracking

// Functions

// Tracks User Sign In - Email

function setUserSignIn() {
	$('#navbar_signin').click(function(){ 
		_kmq.push(['identify',$('#inputUsername').val()]);
		_kmq.push(['record', 'Signed In', {
		    'Email':$('#inputUsername').val()
		}]);
	});
// Tracks User Sign In - Email on Tablet Mobile
	$('#modal_signin').click(function(){ 
		_kmq.push(['identify',$('#inputUsername2').val()]);
		_kmq.push(['record', 'Signed In', {
		    'Email':$('#inputUsername2').val()
		}]);
	}); 

}

// End Track User Sign In

// Tracks Signups on Create Profile 

function create_profile_form () {
	$('.btnNext').click(function(){ 
		_kmq.push(['identify',$('#createEmail').val()]);
		_kmq.push(['record', 'Create Profile step 1', {
		    'Email':$('#createEmail').val()
		}]);
		// add callback here
		track_page_create_profile_2()
	}); 

	function track_page_create_profile_2() {
		$('.btnNext').click(function(){ 
			_kmq.push(['record', 'Create Profile step 2', {
              'First Name':$('#createFName').val(),
              'Last Name':$('#createLName').val(),
              'Address':$('#createAddress').val(),
              'Phone':$('#billingPhone').val(),
              'City':$('#createCity').val(),
              'State':$('#createState').val(),
              'Zip':$('#createPostal').val()
			}]);
			track_page_create_profile_3()
		}); 
	}

	function track_page_create_profile_3(){
		$('.btn.btn-success.btnLoading').click(function(){ 
				_kmq.push(['record', 'Create Profile Confirm']);
		}); 
	}
}
// End Tracks Signups on Create Profile

// Day selected on calendar before hitting "book now"

//function day_selected() {
//	$('.day').click(function(){
//		whatDay()
//	})
//};

//function whatDay() {
//	var day = $('.active+ .day').html();
//	_kmq.push(['record', 'Selected Date', {
//		'Selected Date':$('.active+ .day').html()
//	}])	
//};

// Sets Book Now button on Calander click, as well as when a user clicks a filter

function tracked_calander() {
	$('#filters').click(function(){ 
		trigger_book_now_internal()
	});
}

// Start Book Now trigger

// This function should be triggered when you click the calender or need to reset the event listeners
function trigger_book_now_internal(){
	setTimeout(function(){
		$('.teetime').each(function () {
			var $this = $(this);
			var $btn = $this.find('.btn-success');
			var _booknow_coursename = $this.find('.coursename').text();
			var _special = $this.find('.ribbon')
			var _price = $this.find('.rateset b').text();

			$btn.click(function (e) {
				// console.log(_booknow_coursename, _special, _price);
				
				if (_special.html() == '') {
					// console.log('Is Special')
					var _is_special="Special"
				} else {
					var _is_special='Not Special'
					// console.log('Not Special')
				}


				_kmq.push(['record', 'clicked booknow', {
					'Book Now Rate': _price,
					'Day Selected at TeeTimes': $('.day.active').html()+ ", " + $('.switch').html(),
					'Booknow Facility Name':_booknow_coursename,
					'Booknow Special': _is_special
				}]);
			});
		});
	}, 1000);
}

// This will fire a listener check if the page is fully loaded every second and after it is will set an event listener.
// This function should be called when you visit a route where the "Book Now" Buttons exist
function check_book_now() {
	// This will be set to false so we only fire this function once.
	var book_now_page_loaded = "false"
		setInterval(function(){ 
				if (book_now_page_loaded =="false") {
					if ($('#p0+ .panel-footer .btn-success').html() == "Book Now") {
						trigger_book_now_internal()
						book_now_page_loaded = "true"
					}
				}
		}, 500);

}
// End Book Now Trigger


// #bookdetails content when they go to login or create profile to book tee time

function bookingDetails() {
	setTimeout(function(){
		$('#btnBookTeeTimeProfile').click(function(){
			_kmq.push(['record', 'Viewed Booking Details', {
			    'Course Name':$('#tdLeft tr:nth-child(1) td:nth-child(2)').html(),
			    'Date': $('#tdLeft tr:nth-child(2) td:nth-child(2)').html(),
			    'Time': $('#tdLeft tr:nth-child(3) td:nth-child(2)').html(),
			    'Number of Golfers': $('a.bookqty.btn.btn-default.active').text(),
			    'Total Due at Course': $('#pricePreview tr:nth-child(3) td:nth-child(2)').html(),
			    'Temperature': $('.weather_temp').html(),
			    'Weather': $('.text-right').html().split('</h2>')[1]
			}]);
		})
	}, 1500);
}

// Tracks the confirmation page by checking if we are on the page, and then tracking it only once

var confirmation_sent_to_KM = "false";

function check_if_confirmation_page(){
	if ( $('tr:nth-child(6) td:nth-child(1)').html() == 'Confirmation:' ) {
		if (confirmation_sent_to_KM == "false") {
		
			completed_purchase()
			confirmation_sent_to_KM = "true";
		}
	}
}

setInterval("check_if_confirmation_page()", 1000)

// End confirmation page check

// Completed Purchase runs on the #bookteetime hash

function completed_purchase() {
	setTimeout(function(){
		_kmq.push(['record', 'Completed Purchase', {
			'Total Due at Course': $('.active td+ td').text(),
			'Confirmation Facility':$('.panel-default:nth-child(1) .firstrow td+ td').html(),
			'Confirmation Time':$('tr:nth-child(4) td+ td').html(),
			'Confirmation Number of Golfers': $('tr:nth-child(5) td+ td').html().replace(/\D/g,''),
			'Confirmation Date':$('tr:nth-child(3) b').html(),
			'Confirmation Number': $('tr:nth-child(6) b').html(),
			'Confirmation Day':$('tr:nth-child(3) b').html().split(",")[0]
		}]);
	}, 1500);
}

// End Completed Purchase

// End general functions

// tracks #bookteetime
function KM_track_bookteetime() {
	// console.log("book tee time listener set")
	// viewed page event
	_kmq.push(['record', 'Viewed Bookteetime Form']);	
	$('#btnBookTeeTime').click(function(){ 
	_kmq.push(['identify',$('#proemail').val()]);
	_kmq.push(['record', 'Submitted Book Tee Time', {
	    'First Name':$('#profirst').val(),
	    'Last Name':$('#prolast').val(),
	    'Email':$('#proemail').val(),
	    'Phone':$('#billingPhone').val(),
	    'City':$('#billingCity').val(),
	    'State':$('#billingState').val(),
	    'Zip':$('#billingPostal').val()
		}]);
	});
	// tracks signing
}
  
// tracks #bookdetails
function KM_track_bookdetails() {
	// console.log("On Booking details")
	setUserSignIn()
	bookingDetails()
}

// tracks #createprofile
function KM_track_createprofile() {
	// console.log("On Create Profile")
	setUserSignIn()
	create_profile_form()
}

// tracks #courseinfo
function KM_track_courseinfo() {
	// console.log("Course Info")
	setUserSignIn()
}

// tracks #teetimes or an empty string
function KM_track_teetimes() {
	// console.log("Course Tee Times")
	setUserSignIn()
	check_book_now()
	tracked_calander()
}


// checks which event listers should be fired based on hash

function set_listeners() {
	// console.log("Listeners set")
	if (window.location.hash ==="#bookteetime") {
		KM_track_bookteetime()
	}
	if (window.location.hash ==="#bookdetails") {
		KM_track_bookdetails()
	}
	if (window.location.hash ==="#createprofile") {
		KM_track_createprofile()
	}
	if (window.location.hash ==="#courseinfo") {
		KM_track_courseinfo()
	}
	if (window.location.hash ==="" || window.location.hash ==="#teetimes") {
      KM_track_teetimes()
	}
}

// This function will check if the current url is different than the last one. If it is different it will trigger the secript to select event listeners

function test_url() {

current_url = window.location.hash
// console.log( current_url )

	if (current_url != previous_url) {
		// console.log("URL CHANGED")
		set_listeners()
		previous_url = current_url
	}

}

// triggers the test_url avery few milliseconds
setInterval("test_url()", 500)

// triggers the set listeners function when the iframe is loaded for the first time.
$( document ).ready(function() {
    set_listeners()
});

</script>
