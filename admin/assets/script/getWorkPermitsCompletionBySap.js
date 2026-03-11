
function fetchAllCompletedWorkPermitsBySAP() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/completionWorkPermitBySap/getAllCompletedWorkPermitBySap",
        success: function (data) {
            // Clear existing table rows
            $('#selectedBookEntryGrid tbody').empty();
            // Populate table with appointments data
            data.forEach(function (workPermit, index) {
               
                $('#completionBySapWorkPermits').append(`
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
                        <td>${workPermit.approvedBySAP}</td>
                        <td>${workPermit.isolatedByAP}</td>
                        <td>${workPermit.completedDate}</td>
                        <td>${workPermit.completionNoteByEcp}</td>
                        <td>${workPermit.completedByMEng}</td>
                        <td>${workPermit.completedByShiftInCharge}</td>
                        <td><button id="confirmDeIsolationAp" class="btn btn-success approve-btn" data-appointment-id="${workPermit.workPermitId}">DeIsolate - AP</button></td>
                    </tr>
                `);
            });
        },
        error: function (error) {
            console.error("Error fetching appointments:", error);
        }
    });
  }




   $(document).on('click', '#confirmDeIsolationAp', function() {

    var row = $(this).closest('tr');
    var workPermitId = row.find('td:nth-child(2)').text();

    Swal.fire({
        title: 'Confirm De-Isolation',
        text: "Are you sure you want to de-isolate this Work Permit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, De-Isolate it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {

        if (result.isConfirmed) {
            updateWorkPermitWhenCompletionByAP(workPermitId); 
        }

    });

});


  function updateWorkPermitWhenCompletionByAP(selectedWorkPermitId) {

    $(document).ready(function() {
    // Getstaff email from URL parameter
     var staffEmail = sessionStorage.getItem("staffEmail");

    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {
            var completedByOpEng = response.firstName + " "+ response.lastName;
            var isolationCompletedDate = new Date();
            
             $.ajax({
                method: "PUT", 
                url: BASE_URL+"/api/v1/completionWorkPermitByAp/update", 
                contentType: "application/json", // Set content type to JSON
                data: JSON.stringify({
                    workPermitId: selectedWorkPermitId,
                    isolationCompletedDate: isolationCompletedDate,
                    completedByOpEng: completedByOpEng
                    // Include other fields to update as needed
                }),
                success: function(response) {  
                    Swal.fire({
                        icon: 'success',
                        title: 'De-Isolated!',
                        text: 'Work Permit successfully De-Isolated.',
                        timer: 2000,
                        showConfirmButton: false
                    });    
                    fetchAllCompletedWorkPermitsBySAP(); // Refresh table
                },
                error: function(error) {
        
                console.error("Error updating permit:", error);
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