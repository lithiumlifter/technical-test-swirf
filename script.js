document.getElementById("employee-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const occupation = document.getElementById("occupation").value;

    const data = { name, id, dob, address, occupation };

    try {
        const response = await fetch("backend/submit.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            alert("Data berhasil disimpan!");
            document.getElementById("employee-form").reset();
        } else {
            document.getElementById("error-message").textContent = result.message;
        }
    } catch (error) {
        document.getElementById("error-message").textContent = "Terjadi kesalahan!";
    }
});

function fetchEmployeeData() {
    fetch('backend/fetch_data.php')
        .then(response => response.json()) 
        .then(data => {
            const tableBody = document.querySelector("#employee-table tbody");

            tableBody.innerHTML = "";

            data.forEach(employee => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${employee.name}</td>
                    <td>${employee.age}</td>
                    <td>${employee.address}</td>
                    <td>${employee.occupation}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
}

window.onload = fetchEmployeeData;
