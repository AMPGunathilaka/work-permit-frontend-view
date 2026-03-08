function getStaffDetailsToUpdate() {
     var staffEmail = sessionStorage.getItem("staffEmail");

    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {

          $("#editFirstName").val(response.firstName);
          $("#editLastName").val(response.lastName);
          $("#editAddress").val(response.address);
          $("#editContactNumber").val(response.contactNumber);
        
        },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    });
  }

  function updateStaffProfile() {
    // Get updated Appointment data from the form
    var urlParams = new URLSearchParams(window.location.search);
    var staffEmail = urlParams.get('staffEmail');
    var updateFirstName = $('#editFirstName').val();
    var updateLastName = $('#editLastName').val();
    var updateAddress = $('#editAddress').val();
    var updateContactNumber = $('#editContactNumber').val();

    // Contact number validation (10 digits)
        if (!isValidContactStaffConNu(updateContactNumber)) {
            alert("Contact number must be 10 digits.");
            return;
        }
    
    // Perform AJAX request to update Appointment data
    $.ajax({
      method: "PUT", // Use PUT method as defined in your backend controller
      url: BASE_URL+"/api/v1/staff/update", // Update URL to match your backend endpoint
      contentType: "application/json", // Set content type to JSON
      data: JSON.stringify({
        staffEmail: staffEmail,
        firstName: updateFirstName,
        lastName: updateLastName,
        address: updateAddress,
        contactNumber: updateContactNumber
        // Include other fields to update as needed
      }),
      success: function(response) {
        alert("Profile Update Successfully");
        
      },
      error: function(error) {
        // Handle error response
        console.error("Error updating profile:", error);
        alert("error");
      }
    });
  }

  // Contact number validation (10 digits only)
function isValidContactStaffConNu(contact) {
    var contactPattern = /^[0-9]{10}$/;
    return contactPattern.test(contact);
}