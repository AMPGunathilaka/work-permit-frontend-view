 // Function to handle send Email to customer
 function sendEmailToCustomer(customersEmail,message,subject) {
    var customersEmail = customersEmail;
    var message = message;
    var subject = subject;

        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: BASE_URL+"/api/v1/email/save",
            async: true,
            data: JSON.stringify({
      
                "toMail": customersEmail,
                "message": message,
                "subject": subject  
        
            }),
            success: function (data) {
               
            },
            error: function (error) {
                
            }
        });
        }