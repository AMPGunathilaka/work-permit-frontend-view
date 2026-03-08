
$(document).ready(function () {

    const tableBody = document.getElementById("isolationTableBody");
    const addRowBtn = document.getElementById("addRowBtn");

    // Add Row
    addRowBtn.addEventListener("click", function () {

        let rowCount = tableBody.rows.length + 1;

        let newRow = `
            <tr>
                <td class="step-number">${rowCount}</td>
                <td><input type="text" class="form-control form-control-sm text-light" id="equipment"></td>
                <td><input type="text" class="form-control form-control-sm text-light" id="tag"></td>
                <td><input type="text" class="form-control form-control-sm text-light" id="present-status"></td>
                <td><input type="text" class="form-control form-control-sm text-light" id="loto-status"></td>
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm removeRow">Remove</button>
                </td>
            </tr>
        `;

        tableBody.insertAdjacentHTML("beforeend", newRow);
    });


    // Remove Row
    tableBody.addEventListener("click", function (e) {

        if (e.target.classList.contains("removeRow")) {
            e.target.closest("tr").remove();
            updateStepNumbers();
        }

    });

    function updateStepNumbers() {
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            row.querySelector(".step-number").innerText = index + 1;
        });
    }

});


