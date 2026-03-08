function fetchAllRejectedWorkPermitsList() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/rejectedWorkPermit/getAllRejectedWorkPermits",
        success: function (data) {
            // Clear existing table rows
            $('#rejectedWorkPermitList').empty();
            // Populate table with appointments data
            data.forEach(function (workPermit, index) {
               
                $('#rejectedWorkPermitList').append(`
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
                        <td>${workPermit.rejectedReason}</td>
                        <td>${workPermit.rejectedBy}</td>
                       <td>
                            <a href="#" class="delete-rejeted-permit">
                                <i class="bx bx-trash text-danger fs-4"></i>
                            </a>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (error) {
            console.error("Error fetching work permits:", error);
        }
    });
  }



  function deleteRejectedWorkPermit(workPermitId) {
   
    $.ajax({
        method: "DELETE",
        url: BASE_URL+"/api/v1/rejectedWorkPermit/delete?workPermitId=" + workPermitId,
        success: function (response) {
            alert(response);
            fetchAllRejectedWorkPermitsList(); // Refresh the table after successful deletion
        },
        error: function (error) {
            console.error("Error deleting work Permit:", error);
            // Handle error scenario
        }
    });
  }

  // Event listener for delete icon click
$(document).on('click', '.delete-rejeted-permit', function() {
    var workPermitId = $(this).closest('tr').find('td:eq(0)').text(); 
    if (confirm("Are you sure you want to delete this work Permit?")) {
        deleteRejectedWorkPermit(workPermitId); 
    }
  });