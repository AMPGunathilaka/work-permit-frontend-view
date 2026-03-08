
function fetchAllCompletedWorkPermitsByECP() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/completionWorkPermitByEcp/getAllCompletedWorkPermitByEcp",
        success: function (data) {
            // Clear existing table rows
            $('#selectedBookEntryGrid tbody').empty();
            // Populate table with appointments data
            data.forEach(function (workPermit, index) {
               
                $('#completionByEcpWorkPermits').append(`
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
                        <td><button id="confirmCompletionSap" class="btn btn-success approve-btn" data-appointment-id="${workPermit.workPermitId}">Confirm - SAP</button></td>
                    </tr>
                `);
            });
        },
        error: function (error) {
            console.error("Error fetching appointments:", error);
        }
    });
  }


  $(document).on('click', '#confirmCompletionSap', function() {
    var row = $(this).closest('tr');
    var workPermitId = row.find('td:nth-child(2)').text(); 
    if (confirm("Are you sure you want to complete this Work Permit?")) {
        updateWorkPermitWhenCompletionBySAP(workPermitId); 
    }
  });


  function updateWorkPermitWhenCompletionBySAP(selectedWorkPermitId) {

    $(document).ready(function() {
    // Getstaff email from URL parameter
     var staffEmail = sessionStorage.getItem("staffEmail");

    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {
            var completedByShiftInCharge = response.firstName + " "+ response.lastName;
            
             $.ajax({
                method: "PUT", 
                url: BASE_URL+"/api/v1/completionWorkPermitBySap/update", 
                contentType: "application/json", // Set content type to JSON
                data: JSON.stringify({
                    workPermitId: selectedWorkPermitId,
                    completedByShiftInCharge: completedByShiftInCharge
                    // Include other fields to update as needed
                }),
                success: function(response) {    
                    fetchAllCompletedWorkPermitsByECP(); // Refresh table
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