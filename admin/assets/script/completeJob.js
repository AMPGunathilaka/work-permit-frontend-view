// Function to handle click on approve-appointment button in the raw
$(document).on('click', '#complete', function() {
    // Get approve Appointment data from the form
    var row = $(this).closest('tr');
    var appointmentId = row.find('td:nth-child(2)').text(); 
    var customersEmail = row.find('td:nth-child(3)').text(); 
    var firstName = row.find('td:nth-child(4)').text(); 
    
     // Store the ServiceId in a hidden field
     $('#approvedId').val(appointmentId);
     $('#approvedCustomerEmail').val(customersEmail);
     $('#approvedFirstName').val(firstName);
          
    // Show the modal
    $('#completeAppointmentModal').modal('show');
  });


  // Function to handle complete Appointment button click
  function completeAppointment() {
    var appointmentId = $('#approvedId').val();
    var remarks = $('#remarks').val();
    var customersEmail = $('#approvedCustomerEmail').val();
    var firstName = $('#approvedFirstName').val();
    

    $.ajax({
      method: "PUT", // Use PUT method as defined in your backend controller
      url: BASE_URL+"/api/v1/completedAppointment/saveCompletedAppointment", // Update URL to match your backend endpoint
      contentType: "application/json", // Set content type to JSON
      data: JSON.stringify({
        appointmentId: appointmentId,
        remarks: remarks
      }),
      success: function(response) {
        $('#completeAppointmentModal').modal('hide');
        sendEmailToCustomer(customersEmail, "Dear "+ firstName +
             ".Your bike service has been completed and please come to the service center. ","Regarding The Bike Service");
        alert("Appointment Completed Successfully");
        fetchAllApprovedAppointments(); // Refresh table
      },
      error: function(error) {
        console.error("Error Completing Appointment:", error);
        alert("error");
      }
    });
}

 


  // Function to fetch and display all Completed appoinments
function fetchAllCompletedAppointments() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/completedAppointment/getAllCompletedAppointment",
        success: function (data) {
            // Clear existing table rows
            $('#selectedBookEntryGrid tbody').empty();
            // Populate table with appointments data
            data.forEach(function (completedAppointment, index) {
               
                $('#completedAppointments').append(`
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${completedAppointment.appointmentId}</td>
                        <td>${completedAppointment.customersEmail}</td>
                        <td>${completedAppointment.firstName}</td>
                        <td>${completedAppointment.contactNumber}</td>
                        <td>${completedAppointment.address}</td>
                        <td>${completedAppointment.vehicleNumber}</td>
                        <td>${completedAppointment.bikeBrand}</td>
                        <td>${completedAppointment.bikeModel}</td>
                        <td>${completedAppointment.serviceCategory}</td>
                        <td>${completedAppointment.serviceDate}</td>
                        <td>${completedAppointment.requisitionDate}</td>
                        <td>${completedAppointment.mechanicName}</td>
                        <td>${completedAppointment.helpersCount}</td>
                        <td>${completedAppointment.startTime}</td>
                        <td>${completedAppointment.completeTime}</td>
                        <td>${completedAppointment.remarks}</td>
                        <td><button id="reportMake" class="btn btn-success approve-btn" data-appointment-id="${completedAppointment.completeAppointmentId}">Invoice</button></td>
                    </tr>
                `);
            });
        },
        error: function (error) {
            console.error("Error fetching completed appointments:", error);
        }
    });
  }

  //jQuery script for filtering
  $(document).ready(function() {
    $("#emailInputCompleted").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#selectedBookEntryGrid tbody tr").filter(function() {
            $(this).toggle($(this).find("td:eq(1)").text().toLowerCase().indexOf(value) > -1);
        });
    });
});