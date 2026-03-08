
function fetchAllApIsolatedWorkPermits() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/isolatedWorkPermitByAp/getAllIsolatedWorkPermitByAp",
        success: function (data) {
            // Clear existing table rows
            $('#selectedBookEntryGrid tbody').empty();
            // Populate table with appointments data
            data.forEach(function (workPermit, index) {
               
                $('#isolatedWorkPermits').append(`
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
                        <td style="background-color:#001f3f;">${workPermit.continuedDate}</td>
                        <td style="background-color:#001f3f;">${workPermit.continueBySAP}</td>
                        <td style="background-color:#001f3f;">${workPermit.continueByECP}</td>
                        <td style="background-color:#001f3f;">${workPermit.continueByNCP}</td>
                        <td style="background-color:#001f3f;">${workPermit.continueWorkCrew}</td>
                        <td><button id="confirmCompletionEcp" class="btn btn-success approve-btn" data-appointment-id="${workPermit.workPermitId}">Confirm - ECP</button></td>
                        <td><button id="continueWorkPermit" class="btn btn-primary approve-btn" data-appointment-id="${workPermit.workPermitId}">Continue</button></td>
                    </tr>
                `);
            });
        },
        error: function (error) {
            console.error("Error fetching appointments:", error);
        }
    });
  }



  $(document).on('click', '#confirmCompletionEcp', function() {
    var row = $(this).closest('tr');
    var workPermitId = row.find('td:nth-child(2)').text(); 
    $('#workPermitIdToConfirmCompletion').val(workPermitId);
    $('#confirmCompletionModal').modal('show');
  });


  function updateWorkPermitWhenCompletionByECP() {

    $(document).ready(function() {
    // Getstaff email from URL parameter
     var staffEmail = sessionStorage.getItem("staffEmail");

    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {
            var completedByMEng = response.firstName + " "+ response.lastName;
            var jobCompletedDate = new Date();
            var completionNoteByEcp = $('#completionNoteByEcp').val();
            var workPermitId = $('#workPermitIdToConfirmCompletion').val();
            
             $.ajax({
                method: "PUT", 
                url: BASE_URL+"/api/v1/completionWorkPermitByEcp/update", 
                contentType: "application/json", // Set content type to JSON
                data: JSON.stringify({
                    workPermitId: workPermitId,
                    completedByMEng: completedByMEng,
                    completionNoteByEcp: completionNoteByEcp,
                    completedDate:jobCompletedDate
                    // Include other fields to update as needed
                }),
                success: function(response) {    
                    fetchAllApIsolatedWorkPermits();
                    alert('successfully completed by ECP ')
                    $('#confirmCompletionModal').modal('hide');
                },
                error: function(error) {
        
                console.error("Error updating work permit:", error);
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


//-------------------------------------------------------------------------------------------------------------------


$(document).on('click', '#continueWorkPermit', function() {
    var row = $(this).closest('tr');
    var workPermitId = row.find('td:nth-child(2)').text(); 
    $('#workPermitIdToContinue').val(workPermitId);
    $('#continuePermitModal').modal('show');
  });


function updateWorkPermitWhenContinueBySAP() {

    $(document).ready(function() {
    // Getstaff email from URL parameter
     var staffEmail = sessionStorage.getItem("staffEmail");

    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {
            var continueBySAP = response.firstName + " "+ response.lastName;
            var continuedDate = new Date();
            var continueByECP = $('#continueByECP').val();
            var continueByNCP = $('#continueByNCP').val();
            var continueWorkCrew = $('#continueWorkCrew').val();
            var workPermitId = $('#workPermitIdToContinue').val();
            
             $.ajax({
                method: "PUT", 
                url: BASE_URL+"/api/v1/continueWorkPermit/update", 
                contentType: "application/json", // Set content type to JSON
                data: JSON.stringify({
                    workPermitId: workPermitId,
                    continuedDate: continuedDate,
                    continueBySAP: continueBySAP,
                    continueByECP: continueByECP,
                    continueByNCP: continueByNCP,
                    continueWorkCrew:continueWorkCrew
                    // Include other fields to update as needed
                }),
                success: function(response) {  
                    if(response=='updated')  {
                        fetchAllApIsolatedWorkPermits();
                        alert('successfully continue by SAP ')
                        $('#continuePermitModal').modal('hide');
                    }
                    if(response=='already continued'){
                        alert('You already continued work permit and You can only continue one time');
                         $('#continuePermitModal').modal('hide');
                    }
                    
                },
                error: function(error) {
        
                console.error("Error updating work permit:", error);
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


 