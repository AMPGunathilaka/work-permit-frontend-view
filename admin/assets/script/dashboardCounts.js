 //registered customer count download
 $(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/dashboard/getCountOfRegisteredStaff",
        success: function(response) {

          $("#staffCount").text(response);
          
        },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    });
});

//Inquiries count download
$(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/dashboard/getCountOfTotallyCompletedWorkPermits",
        success: function(response) {

          $("#completedWorkPermitCount").text(response);
          
        },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    });
});

//Received Appointments count download
$(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/dashboard/getCountOfRejectedWorkPermits",
        success: function(response) {

          $("#rejectedWorkPermitCount").text(response);
          
        },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    });
});


