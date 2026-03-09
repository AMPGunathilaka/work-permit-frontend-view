$(document).ready(function() {
    
     var urlParams = new URLSearchParams(window.location.search);
    var workPermitId = urlParams.get('workPermitId');


    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/workPermit/get-work-permit-by-work-permit-id?workPermitId=" + workPermitId,
        success: function(response) {

          $("#workPermitIdToPrint").text("Permit No: WPC/GWP/E/M/C/2026/" + response.workPermitId);
          $("#locationToPrint").text(response.location);
          $("#startDateToPrint").text(response.startDate);
          $("#workDescriptionToPrint").text(response.workDescription);
          $("#maintenanceEngToPrint").text(response.maintenanceEng);
          $("#supervisorToPrint").text(response.supervisor);
          $("#workCrewToPrint").text(response.workCrew);
          $("#primaryAndSecondaryEnergySourcesToPrint").text(response.primaryAndSecondaryEnergySources);
          $("#storedEnergySourcesToPrint").text(response.storedEnergySources);
          $("#associatedRisksToPrint").text(response.associatedRisks);
          $("#ppeToPrint").text(response.ppe);
          $("#fireSafetyPrecautionToPrint").text(response.fireSafetyPrecaution);
          $("#emergencyContactNumberToPrint").text(response.emergencyContactNumber);
          $("#supervisorPhoneNumberToPrint").text(response.supervisorPhoneNumber);
          $("#approvedBySAPToPrint").text(response.approvedBySAP);
          $("#additionalInstructionToPrint").text(response.additionalInstruction);
          $("#isolatedByAPToPrint").text(response.isolatedByAP);
          loadIsolationListForPrint(workPermitId);
          
        },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    });
});


function loadIsolationListForPrint(workPermitId) {

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/isolationListBySap/get-isolation-list-by-work-permit-id",
        data: {
            workPermitId: workPermitId
        },

        success: function (data) {

            let tableBody = $("#isolationAPTableBodyToPrint");
            tableBody.empty(); // clear old rows

            data.forEach(function (item, index) {

                let row = `
                    <tr>
                        <td class="step-number">${index + 1}</td>

                        <td class="equipment" >
                            ${item.equipment ?? ""}
                        </td>

                        <td class="tag" >
                            ${item.tag ?? ""}
                        </td>

                        <td class="present-status">
                            ${item.presentStatus ?? ""}
                        </td>

                        <td class="loto-status" >
                            ${item.loToStatus ?? ""}
                        </td>

                        <td>
                            ${item.isolatedDate ?? ""}
                        </td>

                        <td>
                            ${item.lockNo ?? ""}
                        </td>

                        <td>
                            
                        </td>

                        <td>
                            
                        </td>

                        
                    </tr>
                `;

                tableBody.append(row);
            });

        },

        error: function (err) {
            console.error("Isolation list load failed", err);
            alert("Failed to load Isolation List");
        }
    });
}
