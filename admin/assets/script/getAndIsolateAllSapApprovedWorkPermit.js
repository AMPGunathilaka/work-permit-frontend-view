
function fetchAllSapApprovedWorkPermits() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/approvedWorkPermitBySap/getAllApprovedWorkPermitBySap",
        success: function (data) {
            // Clear existing table rows
            $('#selectedBookEntryGrid tbody').empty();
            // Populate table with appointments data
            data.forEach(function (workPermit, index) {
               
                $('#approvedWorkPermits').append(`
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
                        <td>${workPermit.approvedBySAP}</td>
                        <td><button id="isolationWorkPermit" class="btn btn-success approve-btn" data-appointment-id="${workPermit.workPermitId}">Isolation</button></td>
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