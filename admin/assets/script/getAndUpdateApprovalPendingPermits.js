
function fetchAllApprovalPendingAppointments() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/workPermit/getAllApprovalPendingWorkPermits",
        success: function (data) {
            // Clear existing table rows
            $('#selectedBookEntryGrid tbody').empty();
            // Populate table with appointments data
            data.forEach(function (workPermit, index) {
               
                $('#pendingWorkPermits').append(`
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${workPermit.workPermitId}</td>
                        <td>${workPermit.location}</td>
                        <td>${workPermit.workPermitType}</td>
                        <td>${workPermit.workDescription}</td>
                        <td>${workPermit.startDate}</td>
                        <td>${workPermit.maintenanceEng}</td>
                        <td>${workPermit.supervisor}</td>
                        <td>${workPermit.workCrew}</td>
                        <td>${workPermit.emergencyContactNumber}</td>
                        <td>${workPermit.supervisorPhoneNumber}</td>
                        <td>${workPermit.primaryAndSecondaryEnergySources}</td>
                        <td>${workPermit.storedEnergySources}</td>
                        <td>${workPermit.associatedRisks}</td>
                        <td>${workPermit.ppe}</td>
                        <td>${workPermit.fireSafetyPrecaution}</td>
                        <td>${workPermit.additionalInstruction}</td>
                        <td><button id="approveWorkPermit" class="btn btn-success approve-btn" data-appointment-id="${workPermit.workPermitId}">Approve</button></td>
                        <td><button id="reject" class="btn btn-danger reject-btn" data-appointment-id="${workPermit.workPermitId}">Reject</button></td>
                        <td>
                            <a href="#" class="update-workPermit">
                                <i class="bx bx-edit text-primary fs-4"></i>
                            </a>
                        </td>
                        <td>
                            <a href="#" class="delete-pending-permit">
                                <i class="bx bx-trash text-danger fs-4"></i>
                            </a>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (error) {
            console.error("Error fetching appointments:", error);
        }
    });
  }



  //jQuery script for filtering
  $(document).ready(function() {
    $("#emailInputPending").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#selectedBookEntryGrid tbody tr").filter(function() {
            $(this).toggle($(this).find("td:eq(1)").text().toLowerCase().indexOf(value) > -1);
        });
    });
});

//------------------------------------------------------------------------------------------------------------

// Function to delete a Approval Pending Appointment
   function deleteApprovalPendingAppointment(workPermitId) {
    $.ajax({
        method: "DELETE",
        url: BASE_URL+"/api/v1/workPermit/delete?workPermitId=" + workPermitId,
        success: function (response) {
           Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Work Permit deleted successfully.',
                timer: 2000,
                showConfirmButton: false
            });
            fetchAllApprovalPendingAppointments(); // Refresh the table after successful deletion
        },
        error: function (error) {
            console.error("Error deleting work Permit:", error);
            // Handle error scenario
        }
    });
  }

  // Event listener for delete icon click
$(document).on('click', '.delete-pending-permit', function () {

    var workPermitId = $(this).closest('tr').find('td:eq(0)').text();

    Swal.fire({
        title: 'Delete Work Permit?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel'
    }).then((result) => {

        if (result.isConfirmed) {
            deleteApprovalPendingAppointment(workPermitId);
        }

    });

});


//--------------------------------------------------------------------------------------------------------------------------

 // Event listener for update icon click
$(document).on('click', '.update-workPermit', function() {
     var row = $(this).closest('tr'); 
    var workPermitId = row.find('td:eq(0)').text();
    $('#updateLocation').val(row.find('td:nth-child(3)').text());
    $('#updateWorkDescription').val(row.find('td:nth-child(5)').text());
    $('#updateSupervisor').val(row.find('td:nth-child(8)').text());
    $('#updateWorkCrew').val(row.find('td:nth-child(9)').text());
    $('#updateEmergencyContactNumber').val(row.find('td:nth-child(10)').text());
    $('#updateSupervisorPhoneNumber').val(row.find('td:nth-child(11)').text());
    $('#updateAdditionalInstruction').val(row.find('td:nth-child(17)').text());
    // Store the ServiceId in a hidden field
    $('#workPermitIdToUpdate').val(workPermitId);

    // Show the modal
    $('#updateapprovalPendingWorkPermitModal').modal('show');

  });



  function updateApprovalPendingWorkPermit() {
    // Get updated Appointment data from the form
    var updateLocation = $('#updateLocation').val();
    var updateWorkDescription = $('#updateWorkDescription').val();
    var updateSupervisor = $('#updateSupervisor').val();
    var updateWorkCrew = $('#updateWorkCrew').val();
    var updateEmergencyContactNumber = $('#updateEmergencyContactNumber').val();
    var updateSupervisorPhoneNumber = $('#updateSupervisorPhoneNumber').val();
    var updateAdditionalInstruction = $('#updateAdditionalInstruction').val();
    // Get receivedAppointmentId
    var workPermitId = $('#workPermitIdToUpdate').val();

    if (updateLocation === "" || updateWorkDescription === "" || updateSupervisor === "" || updateWorkCrew === ""|| updateEmergencyContactNumber === ""
            || updateSupervisorPhoneNumber === "" || updateAdditionalInstruction === "" 
        ) {
            alert("Please provide all the inputs.");
            return;
        }
  
    // Perform AJAX request to update Appointment data
    $.ajax({
      method: "PUT", // Use PUT method as defined in your backend controller
      url: BASE_URL+"/api/v1/workPermit/update", // Update URL to match your backend endpoint
      contentType: "application/json", // Set content type to JSON
      data: JSON.stringify({
        workPermitId: workPermitId,
        location: updateLocation,
        workDescription: updateWorkDescription,
        supervisor: updateSupervisor,
        workCrew: updateWorkCrew,
        emergencyContactNumber: updateEmergencyContactNumber,
        supervisorPhoneNumber: updateSupervisorPhoneNumber,
        additionalInstruction: updateAdditionalInstruction
        // Include other fields to update as needed
      }),
      success: function(response) {
        
        $('#updateapprovalPendingWorkPermitModal').modal('hide');
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Work Permit Updated Successfully!',
            timer: 2000,
            showConfirmButton: false
        });
        fetchAllApprovalPendingAppointments(); // Refresh table
      },
      error: function(error) {
        // Handle error response
        console.error("Error updating Work Permit:", error);
        alert("error");
      }
    });
  }

//-------------------------------------------------------------------------------------------------------

// Event listener for reject icon click
$(document).on('click', '#reject', function() {
     var row = $(this).closest('tr'); 
    var workPermitId = row.find('td:eq(0)').text();
   
    $('#workPermitIdToReject').val(workPermitId);

    // Show the modal
    $('#rejectWorkPermitModal').modal('show');

  });



  function rejectApprovalPendingWorkPermit() {
    // Get updated Appointment data from the form
    var rejectedReason = $('#rejectedReason').val();
    // Get receivedAppointmentId
    var workPermitId = $('#workPermitIdToReject').val();

    if (rejectedReason === "") {
            alert("Please provide reoson for rejection");
            return;
        }

  
    // Perform AJAX request to update Appointment data
    $(document).ready(function() {
    // Getstaff email from URL parameter
     var staffEmail = sessionStorage.getItem("staffEmail");

    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {
            var rejectedBy = response.firstName + " "+ response.lastName;
            
             $.ajax({
                method: "PUT", 
                url: BASE_URL+"/api/v1/rejectedWorkPermit/reject", 
                contentType: "application/json", // Set content type to JSON
                data: JSON.stringify({
                    workPermitId: workPermitId,
                    rejectedReason: rejectedReason,
                    rejectedBy:rejectedBy
                    // Include other fields to update as needed
                }),
                success: function(response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Rejected!',
                        text: 'Work Permit Rejected!',
                        timer: 2000,
                        showConfirmButton: false
                    });  
                    $('#rejectWorkPermitModal').modal('hide'); 
                    fetchAllApprovalPendingAppointments(); // Refresh table
                },
                error: function(error) {
        
                console.error("Error rejecting work permit:", error);
                alert("error");
                }
             });

            },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    });
});

}