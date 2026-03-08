
$(document).on('click', '#approveWorkPermit', function() {
    var row = $(this).closest('tr');
    var workPermitId = row.find('td:nth-child(2)').text(); 
    $('#workPermitIdToSave').val(workPermitId);
    $('#approveWorkPermitModal').modal('show');
  });




function approveWorkPermit() {
    let rows = $("#isolationTableBody tr"); // jQuery selector
    let data = [];
    var selectedWorkPermitId = $('#workPermitIdToSave').val();

    rows.each(function(index) {
        data.push({
            workPermitsId: selectedWorkPermitId, // make sure this is set
            steps: index + 1,
            equipment: $(this).find("#equipment").val(),
            tag: $(this).find("#tag").val(),
            presentStatus: $(this).find("#present-status").val(),
            loToStatus: $(this).find("#loto-status").val(),
            isolatedDate: "null",
            lockNo: "null"

        });
    });

    $.ajax({
        url: BASE_URL+"/api/v1/isolationListBySap/save", // match your Spring endpoint
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            alert(response);
            updateWorkPermitWhenApproveBySAP(selectedWorkPermitId);
        },
        error: function(xhr, status, error) {
            console.error(error);
            alert("Error saving isolation list: " + xhr.responseText);
        }
    });
}


function updateWorkPermitWhenApproveBySAP(selectedWorkPermitId) {

    $(document).ready(function() {
    // Getstaff email from URL parameter
     var staffEmail = sessionStorage.getItem("staffEmail");

    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {
            var approvedBySAP = response.firstName + " "+ response.lastName;
            
             $.ajax({
                method: "PUT", 
                url: BASE_URL+"/api/v1/approvedWorkPermitBySap/update", 
                contentType: "application/json", // Set content type to JSON
                data: JSON.stringify({
                    workPermitId: selectedWorkPermitId,
                    approvedBySAP: approvedBySAP
                    // Include other fields to update as needed
                }),
                success: function(response) {
       
                    $('#approveWorkPermitModal').modal('hide');    
                    fetchAllApprovalPendingAppointments(); // Refresh table
                },
                error: function(error) {
        
                console.error("Error updating staff:", error);
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