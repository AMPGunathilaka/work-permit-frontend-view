// ---------- OPEN FORGOT PASSWORD ----------
$("#showForgot").click(function(){
    $("#loginSection").addClass("d-none");
    $("#forgotEmailSection").removeClass("d-none");
});

// ---------- GO BACK TO LOGIN ----------
$("#backToLogin1").click(function(){
    $("#forgotEmailSection").addClass("d-none");
    $("#loginSection").removeClass("d-none");
});

// ---------- STEP 1 — SEND CODE ----------
$("#btnSendCodeStaffFP").click(function(){

     var staffEmail = $('#fp_staff_email').val();
     // Store the staffEmail in a hidden field
     $('#staffEmailForFogotPassword').val(staffEmail);

     // AJAX request
    $.ajax({
        type: "POST",
        url: BASE_URL+"/api/v1/forgotPassword/sendCodeToStaff?staffEmail=" + staffEmail,
        success: function (data) {
            if(data === 'Code has been sent'){
                    alert("Reset code has sent to the email ")
                    $("#forgotEmailSection").addClass("d-none");
                    $("#codeSection").removeClass("d-none");
            }

            if(data === 'Staff Not Found'){
                alert("Staff Not Found")
            }
        },
        error: function (error) {
            
        }
    });
   });



// ---------- STEP 2 — SUBMIT CODE (UI ONLY) ----------
$("#btnVerifyCodeFP").click(function(){
    var code = $('#fp_code').val();
    if(code === ""){
        alert("Enter code");
        return;
    }

    // AJAX request
    $.ajax({
        type: "POST",
        url: BASE_URL+"/api/v1/forgotPassword/checkCode?code=" + code,
        success: function (data) {
            if(data === 'reset code is ok'){
                    $("#codeSection").addClass("d-none");
                    $("#newPasswordSection").removeClass("d-none");
            }

            if(data === 'reset code is wrong'){
                alert("Code is wrong. Try again");
            }
        },
        error: function (error) {
            
        }
    });

    
});

// ---------- STEP 3 — RESET PASSWORD ----------
$("#btnResetFP").click(function(){

    var newP = $('#fp_new').val();
    var confirmP = $('#fp_confirm').val();
    var staffEmail = $('#staffEmailForFogotPassword').val();

    if(newP !== confirmP){
        alert("Passwords do not match");
        return;
    }

    if(newP == confirmP){
        $.ajax({
            method: "PUT", // Use PUT method as defined in your backend controller
            url: BASE_URL+"/api/v1/staff/updatePassword", // Update URL to match your backend endpoint
            contentType: "application/json", // Set content type to JSON
            data: JSON.stringify({
              staffEmail: staffEmail,
              password: newP
              // Include other fields to update as needed
            }),
            success: function(response) {
              alert("Password Reset Successfully");
              $("#newPasswordSection").addClass("d-none");
              $("#loginSection").removeClass("d-none");
            },
            error: function(error) {
              // Handle error response
              console.error("Error updating password:", error);
              alert("error");
            }
          });
    }

});
