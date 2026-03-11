function loginEmployee() {
    var staffEmail = $('#userName').val();
    var password = $('#employeePassword').val();
    
    $("#loginLoader").show();
    
    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: BASE_URL+"/api/v1/staff/staffLogIn",
        async: true,
        data: JSON.stringify({
            "staffEmail": staffEmail,
            "password": password
        }),
        success: function (response) {
            if (response === 'ok') {
               // store logged user
                sessionStorage.setItem("staffEmail", staffEmail);

    // go to dashboard
                 window.location.href = "dashboard.html";
            } else {
                Swal.fire({
                icon: 'warning',
                title: 'Failed!',
                text: 'Please Enter Correct Email Password',
                timer: 2000,
                showConfirmButton: false
            });
            }
        },
        error: function (error) {
            console.error("Error during login:", error);
            alert("Error during login. Please try again.");
        }
    });
}