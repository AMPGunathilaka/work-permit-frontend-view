
function fetchAllCompletedWorkPermitsList() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/completionWorkPermitByHse/getAllCompletedWorkPermitByHse",
        success: function (data) {
            // Clear existing table rows
            $('#completedWorkPermitList').empty();
            // Populate table with appointments data
            data.forEach(function (workPermit, index) {
               
                $('#completedWorkPermitList').append(`
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
                        <td>${workPermit.isolationCompletedDate}</td>
                        <td>${workPermit.completedByOpEng}</td>
                        <td>${workPermit.hseCompletedDate}</td>
                        <td>${workPermit.completedByHSEInCharge}</td>
                       <td>
                            <a href="#" class="delete-completed-permit">
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



  function deleteCompletedWorkPermit(workPermitId) {
   
    $.ajax({
        method: "DELETE",
        url: BASE_URL+"/api/v1/completionWorkPermitByHse/delete?workPermitId=" + workPermitId,
        success: function (response) {
            alert(response);
            fetchAllCompletedWorkPermitsList(); // Refresh the table after successful deletion
        },
        error: function (error) {
            console.error("Error deleting work Permit:", error);
            // Handle error scenario
        }
    });
  }

  // Event listener for delete icon click
$(document).on('click', '.delete-completed-permit', function() {
    var workPermitId = $(this).closest('tr').find('td:eq(0)').text(); 
    if (confirm("Are you sure you want to delete this work Permit?")) {
        deleteCompletedWorkPermit(workPermitId); 
    }
  });