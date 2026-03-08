

$(document).on('click', '#isolationWorkPermit', function() {
    var row = $(this).closest('tr');
    var workPermitId = row.find('td:nth-child(2)').text();  

    $('#workPermitIdToSave').val(workPermitId);
    
     loadIsolationList(workPermitId);
    $('#isolationAPModal').modal('show');
  });


function loadIsolationList(workPermitId) {

    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/isolationListBySap/get-isolation-list-by-work-permit-id",
        data: {
            workPermitId: workPermitId
        },

        success: function (data) {

            let tableBody = $("#isolationAPTableBody");
            tableBody.empty(); // clear old rows

            data.forEach(function (item, index) {

                let row = `
                    <tr>
                        <td class="step-number">${index + 1}</td>

                        <td>
                            <input type="text"
                                   class="form-control form-control-sm  text-dark" id="equipmentAP"
                                   value="${item.equipment}" readonly> 
                        </td>

                        <td>
                            <input type="text"
                                   class="form-control form-control-sm  text-dark" id="tagAP"
                                   value="${item.tag}" readonly>
                        </td>

                        <td>
                            <input type="text"
                                   class="form-control form-control-sm  text-dark" id="present-statusAP"
                                   value="${item.presentStatus}" readonly>
                        </td>

                        <td>
                            <input type="text"
                                   class="form-control form-control-sm  text-dark" id="loto-statusAP"
                                   value="${item.loToStatus}" readonly>
                        </td>

                        <td>
                            <input type="date"
                                   class="form-control form-control-sm  text-light"  id="ap-dateAP">
                        </td>

                        <td>
                            <input type="text"
                                   class="form-control form-control-sm  text-light" id="lock-noAP"
                                   placeholder="Lock No">
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
