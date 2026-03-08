function isolationConfirm() {

    let rows = $("#isolationAPTableBody tr"); // jQuery selector
    let data = [];
    var selectedWorkPermitId = $('#workPermitIdToSave').val();

    rows.each(function(index) {
        data.push({
            workPermitsId: selectedWorkPermitId, // make sure this is set
            steps: index + 1,
            equipment: $(this).find("#equipmentAP").val(),
            tag: $(this).find("#tagAP").val(),
            presentStatus: $(this).find("#present-statusAP").val(),
            loToStatus: $(this).find("#loto-statusAP").val(),
            isolatedDate: $(this).find("#ap-dateAP").val(),
            lockNo: $(this).find("#lock-noAP").val()

        });
    });

    $.ajax({
        url: BASE_URL+"/api/v1/isolationListBySap/isolatedByAp", // match your Spring endpoint
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            alert(response);
            updateWorkPermitWhenIsolatedByAP(selectedWorkPermitId);
            var url  = "printPermit.html?workPermitId=" + selectedWorkPermitId;
             window.open(url, '_blank');
           
        },
        error: function(xhr, status, error) {
            console.error(error);
            alert("Error saving isolation list: " + xhr.responseText);
        }
    });
    
}

function updateWorkPermitWhenIsolatedByAP(selectedWorkPermitId) {

    $(document).ready(function() {
    // Getstaff email from URL parameter
     var staffEmail = sessionStorage.getItem("staffEmail");

    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {
            var isolatedByAP = response.firstName + " "+ response.lastName;
            
             $.ajax({
                method: "PUT", 
                url: BASE_URL+"/api/v1/isolatedWorkPermitByAp/update", 
                contentType: "application/json", // Set content type to JSON
                data: JSON.stringify({
                    workPermitId: selectedWorkPermitId,
                    isolatedByAP: isolatedByAP
                    // Include other fields to update as needed
                }),
                success: function(response) {
       
                    $('#isolationAPModal').modal('hide');    
                    fetchAllSapApprovedWorkPermits(); // Refresh table
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