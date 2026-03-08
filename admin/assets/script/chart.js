
 
$(document).ready(function () {

    // API URLs
    const urls = {
        received: BASE_URL+"/api/v1/dashboard/getCountOfReceivedWorkPermits",
        approved: BASE_URL+"/api/v1/dashboard/getCountOfApprovedWorkPermits",
        isolated: BASE_URL+"/api/v1/dashboard/getCountOfIsolationCompleteWorkPermits",
        completedByECP: BASE_URL+"/api/v1/dashboard/getCountOfCompletedByEcpWorkPermits",
        completedBySAP: BASE_URL+"/api/v1/dashboard/getCountOfCompletedBySapWorkPermits",
        deisolated: BASE_URL+"/api/v1/dashboard/getCountOfDeIsolatedByApWorkPermits"
    };

    // AJAX requests
    const receivedReq  = $.get(urls.received);
    const approvedReq  = $.get(urls.approved);
    const isolatedReq  = $.get(urls.isolated);
    const completedByECPReq = $.get(urls.completedByECP);
    const completedBySAPReq  = $.get(urls.completedBySAP);
    const deisolatedReq  = $.get(urls.deisolated);


    // Wait until all APIs finish
    $.when(receivedReq, approvedReq, isolatedReq, completedByECPReq, completedBySAPReq, deisolatedReq)
        .done(function (received, approved, isolated, completedByECP, completedBySAP, deisolated) {

            // Extract values
            const dataValues = [
                received[0],
                approved[0],
                isolated[0],
                completedByECP[0],
                completedBySAP[0],
                deisolated[0]
            ];

            drawChart(dataValues);
        })
        .fail(function () {
            alert("Failed to load dashboard data");
        });

});

function drawChart(values) {

    const ctx = document.getElementById("appointmentChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: [
                "Received",
                "Approved",
                "Isolated",
                "Completed By ECP",
                "Completed By SAP",
                "De-Isolated"
            ],
            datasets: [{
                label: "Work Permits",
                data: values,
                backgroundColor: [
                    "#36b9cc",
                    "#1cc88a",
                    "#4e73df",
                    "#d227a7",
                    "#eacd4b",
                    "#e74a3b"
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: "#cccccc"   // 👈 lighter label color
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#cccccc"   // optional (Y axis)
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#dddddd" // legend font color
                    }
                }
            }
        }
    });
}

