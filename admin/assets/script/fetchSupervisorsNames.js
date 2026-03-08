// mechanic's names download for approve appointment 
$(document).ready(function() {
    // Function to fetch mechanic's names data from backend
    function fetchMechanicDetails() {
        $.ajax({
            url: BASE_URL+"/api/v1/staff/getAllMechanics", // Endpoint to fetch mechanic's names
            type: "GET",
            dataType: "json",
            success: function(data) {
                // Clear previous options
                $('#assignedMechanic').empty();
                // Add default option
                $('#assignedMechanic').append($('<option>', {
                    value: "",
                    text: "Please choose Mechanic",
                    selected: true,
                    disabled: true
                }));
                // Add new options
                data.forEach(function(staff) {
                    $('#assignedMechanic').append($('<option>', {
                        value: staff.firstName,
                        text: staff.firstName
                    }));
                });
            },
            error: function(xhr, status, error) {
                console.error("Failed to fetch mechanic: " + error);
            }
        });
    }
  
    // Fetch mechanics on page load
    fetchMechanicDetails();
  });