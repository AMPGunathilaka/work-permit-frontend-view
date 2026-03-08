
//checked staff log in to the dashboard directly or correct method

var staffEmail = sessionStorage.getItem("staffEmail");

if (!staffEmail) {
   window.location.href = "index.html";
}






  $(document).ready(function() {
    // Attach click event handler to the "SERVICES" link
    $('.dz__nav__name:contains("USER ACCOUNTS")').click(function(e) {
        e.preventDefault(); // Prevent the default link behavior
      $("#adminDashBoard").hide();  
      $("#receivedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $("#isolationCompletedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();     
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide(); 
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide(); 
      $("#compltedWorkPermitLogMain").hide(); 
      $("#rejectedWorkPermitMain").hide();  
      $("#staffAccountHandling").show();
      fetchAllStaffs();
    });
});

$(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('Create New Work Permit')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();
      $("#servicesHandling").hide();
      $("#staffAccountHandling").hide(); 
      $("#sapApprovedWorkPermitMain").hide();
      $("#isolationCompletedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();   
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();     
      $("#receivedWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide(); 
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();
      $("#createWorkPermitMain").show();
      fetchAllAppointments(); // show all registered Customers when page loading
    });
  });

  $(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('Received Work Permits')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();
      $("#servicesHandling").hide();
      $("#staffAccountHandling").hide(); 
      $("#sapApprovedWorkPermitMain").hide();
      $("#isolationCompletedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();   
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide(); 
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();         
      $("#receivedWorkPermitMain").show();
      fetchAllApprovalPendingAppointments();
    });
  });

  $(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('Approved Work Permits')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();    
      $("#staffAccountHandling").hide();   
      $("#receivedWorkPermitMain").hide();
      $("#isolationCompletedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();    
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();         
      $("#sapApprovedWorkPermitMain").show();
      fetchAllSapApprovedWorkPermits();
    });
  });

  $(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('Isolation Completion List')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();   
      $("#staffAccountHandling").hide();    
      $("#receivedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();   
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();      
      $("#isolationCompletedWorkPermitMain").show();
      fetchAllApIsolatedWorkPermits();
    });
  });

  $(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('Completion List By ECP')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();   
      $("#staffAccountHandling").hide();    
      $("#receivedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();   
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();      
      $("#isolationCompletedWorkPermitMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").show();
      fetchAllCompletedWorkPermitsByECP();
    });
  });


  $(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('Completion List By SAP')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();   
      $("#staffAccountHandling").hide();    
      $("#receivedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();   
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();      
      $("#isolationCompletedWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();
      $("#completionWorkPermitListBySapMain").show();
      fetchAllCompletedWorkPermitsBySAP();
    });
  });

  $(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('DeIsolated List By AP')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();   
      $("#staffAccountHandling").hide();    
      $("#receivedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();   
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();      
      $("#isolationCompletedWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();
      $("#completionWorkPermitListByApMain").show();
      fetchAllCompletedWorkPermitsByAP();
    });
  });

  $(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('Completed Permit List')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();   
      $("#staffAccountHandling").hide();    
      $("#receivedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();   
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();      
      $("#isolationCompletedWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#rejectedWorkPermitMain").hide();
      $("#compltedWorkPermitLogMain").show();
      fetchAllCompletedWorkPermitsList();
    });
  });

  $(document).ready(function() {
    // Event listener for the "Create Appointments" link
    $(".dz__nav__dropdown-item:contains('Rejected Permit List')").click(function(e) {
      e.preventDefault(); // Prevent default link behavior

      // Hide dashboard main content and show addAppointment main content
      $("#adminDashBoard").hide();   
      $("#staffAccountHandling").hide();    
      $("#receivedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $('#reportMain').hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();   
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();      
      $("#isolationCompletedWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").show();
      fetchAllRejectedWorkPermitsList();
    });
  });



$(document).ready(function() {
  // Event listener for the Feedback link
  $(".dz__nav__dropdown-item:contains('Edit Profile')").click(function(e) {
    e.preventDefault(); // Prevent default link behavior

    // Hide dashboard main content and show addAppointment main content
    $("#receivedAppointmentMain").hide();
      $("#adminDashBoard").hide();   
      $("#staffAccountHandling").hide(); 
      $("#isolationCompletedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();
      // Toggle the display of the services handling section
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsPasswordUpdate').hide();
      $("#createWorkPermitMain").hide();
      $("#receivedWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();       
      $('#staffsProfileUpdate').show();
      getStaffDetailsToUpdate();
      
  });
});

$(document).ready(function() {
  // Event listener for the Feedback link
  $(".dz__nav__dropdown-item:contains('Change Password')").click(function(e) {
    e.preventDefault(); // Prevent default link behavior

    // Hide dashboard main content and show addAppointment main content
    $("#receivedAppointmentMain").hide();
      $("#adminDashBoard").hide();    
      $("#staffAccountHandling").hide();  
      $("#isolationCompletedWorkPermitMain").hide();
      $("#sapApprovedWorkPermitMain").hide();
      $('#reportCompletedJob').hide();
      $('#rejectedAppointmentMain').hide();
      // Toggle the display of the services handling section
      $('#invoicePageToPrint').hide();
      $('#printedInvoicePage').hide();
      $('#staffsProfileUpdate').hide();
      $("#createWorkPermitMain").hide();
      $("#receivedWorkPermitMain").hide();
      $("#completionWorkPermitListByEcpMain").hide();
      $("#completionWorkPermitListBySapMain").hide();
      $("#completionWorkPermitListByApMain").hide();
      $("#compltedWorkPermitLogMain").hide();
      $("#rejectedWorkPermitMain").hide();      
      $('#staffsPasswordUpdate').show();
      getStaffPasswordToUpdate();
  });
});

$(document).ready(function() {
  $(".dz__nav__dropdown-item:contains('Log Out')").click(function(e) {
    e.preventDefault(); // Prevent default link behavior

    // Show a confirmation dialog
    var confirmation = confirm("Are you sure you want to log out?");
    
    // If the user confirms, redirect to the logout page
    if (confirmation) {
      sessionStorage.removeItem("loggedUser");
      window.location.href = "index.html";
    }
  });
});



  $(document).ready(function() {
    // Event listener for the logout icon
    $(".log-out").click(function(e) {
        e.preventDefault(); // Prevent default link behavior
  
        // Hide addAppointmentMain and show dashboardMain    
       
        $("#receivedWorkPermitMain").hide();  
        $("#staffAccountHandling").hide();
        $('#reportCompletedJob').hide();
        $("#sapApprovedWorkPermitMain").hide();
        $("#isolationCompletedWorkPermitMain").hide();
        $('#reportMain').hide();
        $('#rejectedAppointmentMain').hide();     
        $('#invoicePageToPrint').hide();
        $('#printedInvoicePage').hide();
        $('#staffsProfileUpdate').hide();
        $('#staffsPasswordUpdate').hide();
        $('#responsedInquiryMain').hide();
        $("#createWorkPermitMain").hide();
        $("#completionWorkPermitListByEcpMain").hide();
        $("#completionWorkPermitListBySapMain").hide();
        $("#completionWorkPermitListByApMain").hide();
        $("#compltedWorkPermitLogMain").hide();
        $("#rejectedWorkPermitMain").hide();    
        $("#adminDashBoard").show();
        location.reload();
        
    });
  });

  //-------------------------------------------------------------------------------------------------------------------
  
  //staff full details download
  $(document).ready(function() {
    // Getstaff email from URL parameter
    var staffEmail = sessionStorage.getItem("staffEmail");

   

    // Make AJAX request to get staff details
    $.ajax({
        type: "GET",
        url: BASE_URL+"/api/v1/staff/get-staff-by-email?staffEmail=" + staffEmail,
        success: function(response) {

          $(".dz__sidebar__title").text(response.firstName);

          if(response.jobRole == "Customer Coordinator"){
            $("#staffAccountOption").hide();
            $("#inventoryOption").hide();
            $("#dashboardHeader").text("STAFF DASHBOARD");
          }
          if(response.jobRole == "Inventory Officer"){
            $("#staffAccountOption").hide();
            $("#appointmentOption").hide();
            $("#userAccountOption").hide();
            $("#jobLogOption").hide();
            $("#servicesOption").hide();
            $("#invoiceOption").hide();
            $("#feedbackInquiryOption").hide();
            $("#dashboardHeader").text("INVENTORY OFFICER DASHBOARD");
          }
          if(response.jobRole == "Mechanic"){
            $("#crateAppointmentOption").hide();
            $("#receivedAppointmentOption").hide();
            $("#completedAppointmentOption").hide();
            $("#userAccountOption").hide();
            $("#jobLogOption").hide();
            $("#servicesOption").hide();
            $("#invoiceOption").hide();
            $("#inventoryOption").hide();
            $("#feedbackInquiryOption").hide();
            $("#dashboardHeader").text("MECHANIC DASHBOARD");
          }

        },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.responseText);
        }
    });
});
$(document).ready(function () {

    var staffEmail = sessionStorage.getItem("staffEmail");

    if(!staffEmail){
        window.location.href = "login.html";
        return;
    }

    $.ajax({
        type: 'GET',
        url: BASE_URL + '/api/v1/staff/download?staffEmail=' + staffEmail,
        xhrFields: {
            responseType: 'blob'
        },
        success: function (response) {

            var imageUrl = URL.createObjectURL(response);
            $('#staffImage').attr('src', imageUrl);

        },
        error: function (xhr) {
            console.error(xhr.responseText);
        }
    });

});

