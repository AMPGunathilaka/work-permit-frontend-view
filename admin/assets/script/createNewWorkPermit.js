
//create new work permit----------------------------------------

$(document).ready(function () {
    // Handle Add button click
    $('#btnCreateNewWorkPermit').click(function () {
        // Get form values
        var staffEmail = sessionStorage.getItem("staffEmail");

        var location = $('#location').val();
        var workPermitType = $('#workPermitType').val();
        var workDescription = $('#workDescription').val();
        var startDate = $('#startDate').val();
        var requisitionDate = new Date(); // today's date
        var supervisor = $('#supervisor').val();
        var workCrew = $('#workCrew').val();
        var emergencyContactNumber = $('#emergencyContactNumber').val();
        var supervisorPhoneNumber = $('#supervisorPhoneNumber').val();
        var additionalInstruction = $('#additionalInstruction').val();

        //---------------------------------------------------------------------
        // Get all checked checkboxes
        var checkedBoxes1 = document.querySelectorAll('input[name="psEnergySources"]:checked');

        // Create array to store selected values
        var selectedValues1 = [];

        checkedBoxes1.forEach(function (checkbox) {
        selectedValues1.push(checkbox.value);
        });

        // Join with "/"
        var primaryAndSecondaryEnergySources = selectedValues1.join("/");

     
        //---------------------------------------------------------------------
        // Get all checked checkboxes
        var checkedBoxes2 = document.querySelectorAll('input[name="energySources"]:checked');

        // Create array to store selected values
        var selectedValues2 = [];

        checkedBoxes2.forEach(function (checkbox) {
        selectedValues2.push(checkbox.value);
        });

        // Join with "/"
        var storedEnergySources = selectedValues2.join("/");


        //------------------------------------------------------------------------------------

         // Get all checked checkboxes
        var checkedBoxes3 = document.querySelectorAll('input[name="associatedRisks"]:checked');

        // Create array to store selected values
        var selectedValues3 = [];

        checkedBoxes3.forEach(function (checkbox) {
        selectedValues3.push(checkbox.value);
        });

        // Join with "/"
        var associatedRisks = selectedValues3.join("/");

        //------------------------------------------------------------------------------------

         // Get all checked checkboxes
        var checkedBoxes4 = document.querySelectorAll('input[name="PPE"]:checked');

        // Create array to store selected values
        var selectedValues4 = [];

        checkedBoxes4.forEach(function (checkbox) {
        selectedValues4.push(checkbox.value);
        });

        // Join with "/"
        var ppe = selectedValues4.join("/");
       

        //------------------------------------------------------------------------------------

         // Get all checked checkboxes
        var checkedBoxes5 = document.querySelectorAll('input[name="fireSafetyPrecaution"]:checked');

        // Create array to store selected values
        var selectedValues5 = [];

        checkedBoxes5.forEach(function (checkbox) {
        selectedValues5.push(checkbox.value);
        });

        // Join with "/"
        var fireSafetyPrecaution = selectedValues5.join("/");


        // --- INPUT VALIDATION ---
        if (location === "" || workPermitType === "" || workDescription === "" || startDate === ""|| supervisor === ""
            || workCrew === "" || emergencyContactNumber === "" || supervisorPhoneNumber === "" || additionalInstruction === ""
        ) {
            alert("Please provide all the inputs.");
            return;
        }

        // Convert serviceDate to Date object for comparison
        var startDateObj = new Date(startDate);

        // Check if startDate is before requisitionDate (today)
        if (startDateObj < requisitionDate.setHours(0, 0, 0, 0)) {
            alert("Permit date cannot be before today's date.");
            return;
        }

        // --- AJAX REQUEST TO GET STAFF DATA ---
        $.ajax({
            type: "GET",
            url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
            success: function (response) {
                // Assuming response contains firstName, contactNumber, address
                var firstName = response.firstName;
                var lastName = response.lastName;
                var contactNumber = response.contactNumber;
                var address = response.address;

                // --- AJAX REQUEST TO SAVE WORK PERMIT ---
                $.ajax({
                    method: "POST",
                    contentType: "application/json",
                    url: BASE_URL+"/api/v1/workPermit/save",
                    async: true,
                    data: JSON.stringify({
                        "workPermitId": 0,
                        "location": location,
                        "workPermitType": workPermitType,
                        "workDescription": workDescription,
                        "startDate": startDate,
                        "maintenanceEng": firstName +" " + lastName,
                        "supervisor": supervisor,
                        "workCrew": workCrew,
                        "emergencyContactNumber": emergencyContactNumber,
                        "supervisorPhoneNumber": supervisorPhoneNumber,
                        "primaryAndSecondaryEnergySources": primaryAndSecondaryEnergySources,
                        "storedEnergySources": storedEnergySources,
                        "associatedRisks": associatedRisks,
                        "ppe": ppe,
                        "fireSafetyPrecaution": fireSafetyPrecaution,
                        "additionalInstruction": additionalInstruction,
                        "rejectedReason": "null",
                        "rejectedBy": "null",
                        "approvedBySAP": "null",
                        "isolatedByAP": "null",
                        "continuedDate": "null",
                        "continueBySAP": "null",
                        "continueByECP": "null",
                        "continueByNCP": "null",
                        "continueWorkCrew": "null",
                        "completedDate": "null",
                        "completionNoteByEcp": "null",
                        "completedByMEng": "null",
                        "isolationCompletedDate": "null",
                        "completedByOpEng": "null",
                        "completedByShiftInCharge": "null",
                        "hseCompletedDate": "null",
                        "completedByHSEInCharge": "null",
                        "status": "pending"
                    }),
                    success: function (data) {
                         Swal.fire({
                            icon: 'success',
                            title: 'Saved!',
                            text: 'Work Permit saved successfully!',
                            timer: 2000,
                            showConfirmButton: false
                        });
                       
                    },
                    error: function (error) {
                        console.error("Error saving appointment:", error);
                        alert("Error saving work permit. Please try again.");
                    }
                });

            },
            error: function (xhr, status, error) {
                alert("Error: " + xhr.responseText);
            }
        });

    });

});

document.getElementById("btnClearWorkPermit").addEventListener("click", function () {

    // Clear all text inputs
    document.querySelectorAll("#createWorkPermitMain input[type='text']").forEach(function(el){
        el.value = "";
    });

    // Clear date input
    document.querySelectorAll("#createWorkPermitMain input[type='date']").forEach(function(el){
        el.value = "";
    });

    // Reset dropdown
    document.getElementById("workPermitType").selectedIndex = 0;

    // Clear all textareas
    document.querySelectorAll("#createWorkPermitMain textarea").forEach(function(el){
        el.value = "";
    });

    // Uncheck all checkboxes
    document.querySelectorAll("#createWorkPermitMain input[type='checkbox']").forEach(function(el){
        el.checked = false;
    });

});