$(document).ready(function () {

    $('#btnAddStaff').click(function () {

        // Get form values
        var staffEmail = $('#staffEmail').val();
        var password = $('#staffPassword').val();
        var firstName = $('#staffFirstName').val();
        var lastName = $('#staffLastName').val();
        var address = $('#staffAddress').val();
        var contactNumber = $('#staffContactNumber').val();
        var department = $('#department').val();
        var position = $('#position').val();
        var accessLevel = $('#accessLevel').val();
        var activeStatus = true;

        // --- VALIDATIONS ---

        // Email required
        if (staffEmail === "") {
            alert("Please enter email.");
            return;
        }

        // Email format validation
        if (!isValidEmail(staffEmail)) {
            alert("Invalid email format. Please enter a valid email.");
            return;
        }

        // Contact number validation (10 digits)
        if (!isValidContact(contactNumber)) {
            alert("Contact number must be 10 digits.");
            return;
        }

        // Other fields required
        if (password === "" || firstName === "" || lastName === "" || address === "" || accessLevel === "") {
            alert("Please fill all inputs.");
            return;
        }

        // ---- AJAX Request ----
        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: BASE_URL+"/api/v1/staff/save",
            async: true,
            data: JSON.stringify({
                "staffEmail": staffEmail,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "address": address,
                "contactNumber": contactNumber,
                "department": department,
                "position": position,
                "accessLevel": accessLevel,
                "activeStatus": activeStatus
            }),
            success: function (data) {

                staffMemberPictureSave(staffEmail); // save image

                 Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    text: 'Staff Member saved successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });
                fetchAllStaffs(); // reload table
            },
            error: function (error) {
                console.error("Error saving staff:", error);
                alert("Error saving staff. Please try again.");
            }
        });
    });

    // Clear Button
    $('#btnClearStaff').click(function () {
        $('#memberForm input, #memberForm select').val('');
    });

});

// --- Reused Validation Functions ---
function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidContact(contact) {
    var contactPattern = /^[0-9]{10}$/;
    return contactPattern.test(contact);
}


//staff profile photo save function
function staffMemberPictureSave(staffEmail){
  var formData = new FormData();
  formData.append('image', $('#staffMemberImage')[0].files[0]);
  formData.append('staffEmail',staffEmail); // Add customer email to formData

  $.ajax({
      type: 'POST',
      url: BASE_URL+'/api/v1/staff/uploadImage', // Change the URL to match your backend endpoint
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log("picture uploaded");
      },
      error: function (xhr, status, error) {
          console.error(xhr.responseText);
      }
  });
}


  // Function to fetch and display all staffs
  function fetchAllStaffs() {
    $.ajax({
        method: "GET",
        url: BASE_URL+"/api/v1/staff/getAllStaff",
        success: function (data) {
            // Clear existing table rows
            $('#selectedBookEntryGrid tbody').empty();
            // Populate table with staff data
            data.forEach(function (staff, index) {
                // Call the downloadStaffImage function to get staff picture
                  downloadStaffImage(staff.staffEmail,index);
                $('#registeredStaff').append(`
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td><img src="" id="staffImage_${index}" width="40" height="40" style="border-radius: 50%;" alt="Staff Image"></td>
                        <td>${staff.staffEmail}</td>
                        <td>${staff.password}</td>
                        <td>${staff.firstName}</td>
                        <td>${staff.lastName}</td>
                        <td>${staff.address}</td>
                        <td>${staff.contactNumber}</td>
                        <td>${staff.department}</td>
                        <td>${staff.position}</td>
                        <td>${staff.accessLevel}</td>
                        <td>${staff.activeStatus}</td>
                        <td>
                            <a href="#" class="delete-staff">
                                <i class="bx bx-trash text-danger fs-4"></i>
                            </a>
                            <a href="#" class="update-staff">
                                <i class="bx bx-edit text-primary fs-4"></i>
                            </a>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (error) {
            console.error("Error fetching staffs:", error);
        }
    });
  }

  // Funtion to download customer images for registered customers table
  function downloadStaffImage(staffEmail, index){
    $.ajax({
      type: 'GET',
      url: BASE_URL+'/api/v1/staff/download?staffEmail=' + staffEmail, // Change the URL to match your backend endpoint
      xhrFields: {
          responseType: 'blob'
      },
      success: function (response) {
        var imageUrl = URL.createObjectURL(response);
        $('#staffImage_' + index).attr('src', imageUrl);
      },
      error: function (xhr, status, error) {
          console.error(xhr.responseText);
          
      }
  });     
  }

   // Function to delete a staff
   function deleteStaff(staffEmail) {
    $.ajax({
        method: "DELETE",
        url: BASE_URL+"/api/v1/staff/delete?staffEmail=" + staffEmail,
        success: function (response) {
           Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Staff Member deleted successfully.',
                timer: 2000,
                showConfirmButton: false
            });
            fetchAllStaffs(); // Refresh the table after successful deletion
        },
        error: function (error) {
            console.error("Error deleting staff:", error);
            // Handle error scenario
        }
    });
  }



     // Event listener for delete icon click
$(document).on('click', '.delete-staff', function () {

    var staffEmail = $(this).closest('tr').find('td:eq(1)').text();

    Swal.fire({
        title: 'Delete Staff Member?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel'
    }).then((result) => {

        if (result.isConfirmed) {
            deleteStaff(staffEmail);
        }

    });

});

  // Function to handle click on update-staff link
$(document).on('click', '.update-staff', function() {
    // Get the staff data from the row
    var row = $(this).closest('tr');
    var staffEmail = row.find('td:nth-child(3)').text(); // Assuming staff email is in the second column
    console.log(staffEmail);
    // Populate the modal with existing staff data
    $('#updateStaffFirstName').val(row.find('td:nth-child(5)').text()); // Assuming first name is in the fourth column
    // Populate other fields as needed
    $('#updateStaffLastName').val(row.find('td:nth-child(6)').text());
    $('#updateStaffAddress').val(row.find('td:nth-child(7)').text());
    $('#updateStaffContactNumber').val(row.find('td:nth-child(8)').text());
    // Store the customer email in a hidden field
    $('#staffEmailToUpdate').val(staffEmail);
  
    // Show the modal
    $('#updateStaffModal').modal('show');
  });

  // Function to handle update staff button click
function updateStaff() {
    // Get updated staff data from the form
    var updatedFirstName = $('#updateStaffFirstName').val();
    var updateLastName = $('#updateStaffLastName').val();
    var updateAddress = $('#updateStaffAddress').val();
    var updateContactNumber = $('#updateStaffContactNumber').val();
    // Get customer email
    var staffEmail = $('#staffEmailToUpdate').val();

   
  
    // Perform AJAX request to update staff data
    $.ajax({
      method: "PUT", // Use PUT method as defined in your backend controller
      url: BASE_URL+"/api/v1/staff/update", // Update URL to match your backend endpoint
      contentType: "application/json", // Set content type to JSON
      data: JSON.stringify({
        staffEmail: staffEmail,
        firstName: updatedFirstName,
        lastName: updateLastName,
        address: updateAddress,
        contactNumber: updateContactNumber
        // Include other fields to update as needed
      }),
      success: function(response) {
        // Handle success response
        // Close the modal
        $('#updateStaffModal').modal('hide');
         Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Staff Member Updated successfully.',
            timer: 2000,
            showConfirmButton: false
        });
        fetchAllStaffs(); // Refresh table
      },
      error: function(error) {
        // Handle error response
        console.error("Error updating staff:", error);
        alert("error");
      }
    });
  }


  //jQuery script for filtering
  $(document).ready(function() {
    $("#emailInputRegisteredStaff").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#selectedBookEntryGrid tbody tr").filter(function() {
            $(this).toggle($(this).find("td:eq(1)").text().toLowerCase().indexOf(value) > -1);
        });
    });
});