$(document).ready(function () {
    $('#loader').hide();
    $('div.container-fluid').show();
})

$('a').on('click',function(e){
    e.preventDefault();
});
var app = angular.module('testingApp', []);
app.controller('hotelController', function ($scope, $http) {
    $scope.searchType="Hotels";
    $scope.searchVal = "";
    $scope.token = $('meta').data('token');
    $scope.showDropdown = false;
    $scope.showPeopleDropdown=false;
    $scope.showRoom=true;


    // tab changing process home and hotels

    $scope.changeHome=function(){
        $scope.showRoom=false;
        $("div#hotels").hide( 10 ).delay( 100 ).slideDown( 400 );
        $scope.searchType="Home";
    }

    // end tab changing process home and hotels
    $scope.updateCalenderDate = function (startDate, endDate) {
        $scope.startDate = startDate; //today date as an initital value for calender
        $scope.startDisplayDate = $scope.startDate.format("DD MMM YYYY");
        $scope.startDisplayDay = $scope.startDate.format('dddd');
        $scope.endDate = endDate; //  range 35 days from today date
        $scope.endDisplayDate = $scope.endDate.format("DD MMM YYYY");
        $scope.endDisplayDay = $scope.endDate.format('dddd');

    }
    $scope.updateCalenderDate(moment(), moment().add(35, 'days'));
    //starting date as an initital value for calender
    // make range 35 days from today date ...for ending date
    /*
        $scope.whenUserFocusOnSearchInput=function(){     //when user put cursor to searching country or start typing
        var sendData = new FormData();
        sendData.append('searchKey',$scope.searchKey);
        sendData.append('token', $scope.token)

         $http({
             method : "POST",
             url : "json/searchResult.json"
             data : sendData
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySuccess(response) {
             $scope.searchResult = response.data;
                                            // this data will be show in pop down list
        }, function myError(response) {
           console.log("Error found ")
        });
      }
      */

    //  request from server  searchResult.json
    // then strore in a variable call $scope.searchResult

    $scope.searchResult = [  //default value for ajax request or api request or backend data for example
        {
            "Place": "Bongok, Thailand",
            "fontawesomeIcon": "eye",
            "properties":899
        },
        {
            "Place": "Mandalay, Myanmar",
            "fontawesomeIcon": "star",
            "properties":124
        },
        {
            "Place": "Singapore, Singapore",
            "fontawesomeIcon": "eye",
            "properties":34
        },
        {
            "Place": "Toyko, Japan",
            "fontawesomeIcon": "star",
            "properties":838
        },
        {
            "Place": "Property 1, Singapore",
            "fontawesomeIcon": "home",
            "properties":3834238
        },
        {
            "Place": "Property 2, Austrilla",
            "fontawesomeIcon": "home",
            "properties":434
        }];

    $scope.runNoFocus = function () {
        $scope.showDropdown = false;
    }

    $scope.runFocus = function () {
        $('div.daterangepicker').hide();
        document.getElementById("searchHotels").focus();
        $scope.showDropdown = true;
    }

    $scope.getSelectedValue = function (index) {
        //function for selecting country or town.
        // enter destination or property
        $scope.showDropdown = false;
        $scope.searchVal = $scope.searchResult[index].Place;
        /*
        when I get index from selected value  Country index , or selected index
        then I will query to API or Backend to get start date and End Date from database .
        var sendData = new FormData();
        sendData.append('countryId',index);  //let index will be Primary Key of Country Database table
        sendData.append('token', $scope.token);

        $http({
          method : "POST",
          url : "json/searchResult.json"
          data : sendData
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySuccess(response) {
            $scope.startDate = response.data['startDate'];  //ajax request back range of calander
            $scope.endDate = response.data['endDate'];
         }, function myError(response) {
            console.log("Error found ")
        });
         */
        // Starting Example
        var index = parseInt(index);

        switch (index) {
            case 0:
                $scope.startDate = moment().add(1, 'days');
                $scope.endDate = moment().add(100, 'days');
                break;
            case 1:
                $scope.startDate = moment().add(2, 'days');
                $scope.endDate = moment().add(120, 'days');
                break;
            case 2:
                $scope.startDate = moment().add(3 ,'days');
                $scope.endDate = moment().add(600, 'days');
                break;
            case 3:
                $scope.startDate = moment();
                $scope.endDate = moment().add(40, 'days');
                break;
            case 4:
                $scope.startDate = moment();
                $scope.endDate = moment().add(50, 'days');
                break;
            case 5:
                $scope.startDate = moment().add(1, 'days');
                $scope.endDate = moment().add(31, 'days');
                break;
        }

        $scope.updateCalenderDate($scope.startDate, $scope.endDate);
        $scope.openRangeCalendar();
        // Ending Example
    }
    var dateRangePicker = $('#dateTimeInput');
    $scope.isRangeCalendarOpen=false;
    $scope.openRangeCalendar = function () {

        if($scope.isRangeCalendarOpen==true){
            $scope.isRangeCalendarOpen=false;
            $('div.daterangepicker').fadeOut();
            return ;
        }
        $scope.isRangeCalendarOpen=true;
        $scope.isRangeSecCalendarOpen=false;


        //open for  first check-out date , start date  when user click on calendar or after selected country

        dateRangePicker.daterangepicker({
            opens: 'center',
            startDate:moment(),
            startDate:moment().add('25','days'),
            minDate: $scope.startDate,
            maxDate: $scope.endDate,
        }, function (start, end, label) {
            //Run function when calendar get Both start Date and End Date

            $('#startDisplayDate').text(start.format('DD MMM YYYY'));
            $('#startDisplayDay').text(start.format('dddd'));
            $('#endDisplayDate').text(end.format('DD MMM YYYY'));
            $('#endDisplayDay').text(end.format('dddd'));
            $scope.startDate=start;
            $scope.end=end;


            //node in global variable for database query Or Search Button or for Submitting data .
        });
        dateRangePicker.on('apply.daterangepicker', function () {
            $('div.people').trigger('click');
        }); //listen to calendar apply button

        dateRangePicker.on('cancel.daterangepicker', function () {
            $('#dateTimeInput"').val('');
        });

        dateRangePicker.on('show.daterangepicker', function () {
            //when calendar is showing , I want to track weather the user choose start date or not ,
            // It will do with setInterval until selected value change
            var e=  $('table.table-condensed td.start-date');
            e.removeClass('start-date');
            e.addClass('selected-date');
            var interval = setInterval(function () {
                var e = $('table.table-condensed td.start-date');

                var newDay = e.text();
                if (e.length==1) {
                    clearInterval(interval);
                    var mothAndyear = $('table.table-condensed td.start-date').parents('table').children('thead').children('tr').first().text()
                    $scope.startDisplayDate = newDay + " " + mothAndyear;
                    var dayIndex = e.parent('tr').children().index(e);
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    $scope.startDisplayDay = days[dayIndex];


                    $("#startDisplayDate").text($scope.startDisplayDate);
                    $("#startDisplayDay").text($scope.startDisplayDay);

                    $('div.daterangepicker').fadeOut().promise().done(function () {
                        $scope.openSecRangeCalendar();
                    });
                }
            }, 100);
        });

        $("#dateTimeInput").trigger('click').promise().done(function () {
            $(".daterangepicker").css({
                "top": 367, "left": 15
            });


        });



    } //finished process in select start date
    $scope.isRangeSecCalendarOpen=false;
    $scope.openSecRangeCalendar = function () {
        if($scope.isRangeSecCalendarOpen==true){
            $scope.isRangeSecCalendarOpen=false;
            $('div.daterangepicker').fadeOut();
            return ;
        }
        $scope.isRangeCalendarOpen=false;
        $scope.isRangeSecCalendarOpen=true;
        //after finishing of selecting starting date , it will go to end date .
        $(".daterangepicker").css({
            "top": 367, "left": 190
        }).fadeIn();

    }
    // Done Every thing for the Calendar

    $scope.showPeopleDropDown=function(){
        $(".daterangepicker").hide();
        $scope.showPeopleDropdown=true;

    }

    // Staring for Room, Adults and Children Dropdown

    $scope.rooms=1;
    $scope.adults=1;
    $scope.children=0;
    /*
    above variable can be stores as a session or cookies and . also can store as a HTML5 Local Storage ...
    In the purpose of keep previous selected information.
    */
    $scope.addChildren=function(){
        window.scrollY=354;
        $scope.children++;
        $('#appendChildrens').append($("select.children").clone().removeClass('children').show());


    }
    $scope.subChildren=function(){
        window.scrollY=354;
        $scope.children--;
        $('#appendChildrens').children('select').first().remove();

    }

    // starting refined your search
    $scope.isAnnimated=false;
    $scope.annimateRefined=function () {
        if(!$scope.isAnnimated){
            $('div.refined').animate({
                width: "+=467",
                marginLeft: "-=230",
                height:"+=290",
                opacity:0.9,
                borderRadius:0,
                boxShadow:"1px 1px 3px #000000"
            },500,function(){
                $("#ratingRefined").fadeIn(200);
            }).children('span').animate({
                marginTop:"+=285"
            }).children('i').attr('class','fa fa-arrow-up');
            $scope.isAnnimated=true;

            $('span.refined').on('click',function(){
                $(this).children('i').attr('class','fa fa-arrow-down');
                $("#ratingRefined").slideUp(200);
                $(this).animate({marginTop:""}).parent('div').animate({
                    width: "-=467",
                    marginLeft: "+=230",
                    height:"-=290",
                    opacity:1,
                    borderRadius:"+=50",
                    boxShadow:"0px 0px 1px #060606"
                },function(){

                    $('span.refined').off('click');
                    $scope.isAnnimated=false;
                });
            });
            $('input#price-per-night').slider({});
            $('input#guest-rating').slider({});

            $('input#price-per-night').on('slide',function (e) {
                var arr=e.value;
                $scope.priceFrom=arr[0];
                $scope.priceTo=arr[1];
                $('span#price').children('i')[0].innerHTML=arr[0];
                $('span#price').children('i')[1].innerHTML=arr[1];
            });
            $('input#guest-rating').on('slide',function (e) {
                    if(e.value==5){
                        $("span#rating").text("All");
                        $scope.guestRating="All";
                    }else{
                        $scope.guestRating=e.value;
                        $("span#rating").text(e.value + " and above");

                    }

            });

            $('div#rating').starrr({
                change: function(e, value){
                    if (value) {
                        $scope.starRating=value;
                    }else{
                        $scope.starRating="No Rating ";
                    }
                }
            });
        }
    }

    // ending refined your search
    // starting search button
    $scope.starRating="no rating";
    $scope.priceFrom=0;
    $scope.priceTo="400+";
    $scope.guestRating="All";
    $scope.submitForm=function(){
        $("#myModal").modal();
        if($scope.searchVal==""){
            $scope.modalTitle="Error:";
            $scope.modalBody="Please Give information your search Country !";
        }else{
            var childrens=$('#appendChildrens').children('select');
            var age="";
            if(childrens.length > 0){
                age=" children ages are =";
                childrens.each(function(e){
                    age+=$(this).val()+" ,";
                });
            }
            $scope.modalTitle="Success : Form is Summiting to Server with Following Information ";
            var room="";
            if($scope.showRoom){
                 room=", Rooms ="+$scope.rooms;

            }
            $scope.modalBody=" Search Type= "+$scope.searchType +",  Country or Country ID  ="+$scope.searchVal + ", From Date UTC ="+ $scope.startDate + ", End Date UTC ="+ $scope.endDate+ room + ", Adults ="+$scope.adults +", Children ="+$scope.children+age +", Price Between from "+$scope.priceFrom+" to "+$scope.priceTo+", Guest rating = "+$scope.guestRating+", Star rating ="+$scope.starRating;
        }
    }
    // ending search button
});
