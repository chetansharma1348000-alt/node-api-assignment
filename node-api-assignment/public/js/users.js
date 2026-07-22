$(document).ready(function () {

    console.log("users.js loaded successfully");

    $.ajax({
        url: "/api/users",
        type: "GET",

        success: function (response) {

            console.log("Users API Response:", response);

            const users = response.data;

            $("#userTableBody").empty();

            if (!users || users.length === 0) {
                $("#userTableBody").html(`
                    <tr>
                        <td colspan="8">No users found</td>
                    </tr>
                `);

                return;
            }

            users.forEach(function (user) {

                const address = user.address
                    ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.country}`
                    : "N/A";

                const creationTime =
                    new Date(user.creationTime).toLocaleString();

                const lastUpdated =
                    new Date(user.lastUpdatedOn).toLocaleString();

                const row = `
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.mobile}</td>
                        <td>${user.email}</td>
                        <td>${address}</td>
                        <td>${user.loginId}</td>
                        <td>${creationTime}</td>
                        <td>${lastUpdated}</td>
                    </tr>
                `;

                $("#userTableBody").append(row);
            });
        },

        error: function (xhr) {

            console.log("GET API Error:", xhr);
            console.log("Error Response:", xhr.responseText);

            $("#userTableBody").html(`
                <tr>
                    <td colspan="8" class="error">
                        Unable to load users
                    </td>
                </tr>
            `);
        }
    });
});