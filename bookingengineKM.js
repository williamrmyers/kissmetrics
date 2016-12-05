<script type="text/javascript">

// sets vars to current url
 previous_url = window.location.hash

 current_url = window.location.hash

// here we will define the a function for each page. This page will set event listeners for that page, that will create Kissmetrics API calls to setup tracking

// General function

function setUserSignIn() {
	$('#navbar_signin').click(function(){ 
		_kmq.push(['identify',$('#inputUsername').val()]);
		_kmq.push(['record', 'Signed In', {
		    'Email':$('#inputUsername').val()
		}]);
	});
// Tracks Modal
	$('#modal_signin').click(function(){ 
		_kmq.push(['identify',$('#inputUsername2').val()]);
		_kmq.push(['record', 'Signed In', {
		    'Email':$('#inputUsername2').val()
		}]);
	}); 

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

// end confirmation page

// tracks signups on createprofile
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
// End tracks signups on createprofile

// Book now trigger

function trigger_book_now(){
	setTimeout(function(){
		$('.btn-success').click(function () {
			b_tags = $("b")
		    var id = this.parentNode.previousElementSibling.id;
		   	_kmq.push(['record', 'clicked booknow', {'Book Now Rate': b_tags[Number(id.replace(/\D/g,'')) + 1].innerHTML, 'Day Selected at TeeTimes': $('.day.active').html()+ ", " + $('.switch').html() }]);
		})
	}, 1000);
}

// Book now trigger End

// sets book now on calander click, as well as when a user clicks a filter

function tracked_calander() {
	$('#filters').click(function(){ 
		trigger_book_now()
	});
}

// runs on the #bookteetime route

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

// End general functions

// tracks #bookteetime
function KM_track_bookteetime() {
	console.log("book tee time listener set")
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
	console.log("On Booking details")
	setUserSignIn()
}

// tracks #createprofile
function KM_track_createprofile() {
	console.log("On Create Profile")
	setUserSignIn()
	create_profile_form()
}

// tracks #courseinfo
function KM_track_courseinfo() {
	console.log("Course Info")
	setUserSignIn()
}

// tracks #Teetimes or an empty string
function KM_track_teetimes() {
	console.log("Course Tee Times")
	setUserSignIn()
	trigger_book_now()
	tracked_calander()
  day_selected()
}


// checks which event listers should be fired

function set_listeners() {
	console.log("Listeners set")
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
		console.log("URL CHANGED")
		set_listeners()
		previous_url = current_url
	}

}

// triggers the test_url avery few milliseconds
setInterval("test_url()", 500)
  
</script>
