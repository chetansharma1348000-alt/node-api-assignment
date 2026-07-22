console.log("form.js loaded successfully");

$(document).ready(function () {

    console.log("jQuery loaded successfully");

    // Allow only letters and spaces while typing
    $("#firstName, #lastName, #city, #state, #country").on("input", function () {
        let value = $(this).val();

        // Remove numbers and special characters
        value = value.replace(/[^A-Za-z\s]/g, "");

        $(this).val(value);
    });

    // Allow only numbers in mobile field
    $("#mobile").on("input", function () {
        let value = $(this).val();

        value = value.replace(/[^0-9]/g, "");

        // Maximum 10 digits
        value = value.slice(0, 10);

        $(this).val(value);
    });

    $("#userForm").submit(function (event) {

        event.preventDefault();

        // Get values
        const firstName = $("#firstName").val().trim();
        const lastName = $("#lastName").val().trim();
        const mobile = $("#mobile").val().trim();
        const email = $("#email").val().trim();
        const street = $("#street").val().trim();
        const city = $("#city").val().trim();
        const state = $("#state").val().trim();
        const country = $("#country").val().trim();
        const loginId = $("#loginId").val().trim();
        const password = $("#password").val();

        // Validation Regex
        const textRegex = /^[A-Za-z\s]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const loginRegex = /^[A-Za-z0-9]{8}$/;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

        // First Name Validation
        if (!textRegex.test(firstName)) {
            $("#message").html(
                "<p class='error'>First Name must contain letters only.</p>"
            );
            return;
        }

        // Last Name Validation
        if (!textRegex.test(lastName)) {
            $("#message").html(
                "<p class='error'>Last Name must contain letters only.</p>"
            );
            return;
        }

        // Mobile Validation
        if (!mobileRegex.test(mobile)) {
            $("#message").html(
                "<p class='error'>Mobile number must be exactly 10 digits.</p>"
            );
            return;
        }

        // City Validation
        if (!textRegex.test(city)) {
            $("#message").html(
                "<p class='error'>City must contain letters only.</p>"
            );
            return;
        }

        // State Validation
        if (!textRegex.test(state)) {
            $("#message").html(
                "<p class='error'>State must contain letters only.</p>"
            );
            return;
        }

        // Country Validation
        if (!textRegex.test(country)) {
            $("#message").html(
                "<p class='error'>Country must contain letters only.</p>"
            );
            return;
        }

        // Login ID Validation
        if (!loginRegex.test(loginId)) {
            $("#message").html(
                "<p class='error'>Login ID must be exactly 8 alphanumeric characters.</p>"
            );
            return;
        }

        // Password Validation
        if (!passwordRegex.test(password)) {
            $("#message").html(
                "<p class='error'>" +
                "Password must contain at least 1 uppercase, " +
                "1 lowercase and 1 special character." +
                "</p>"
            );
            return;
        }

        // Create JSON Object
        const userData = {
            firstName,
            lastName,
            mobile,
            email,
            street,
            city,
            state,
            country,
            loginId,
            password
        };

        console.log("Sending Data:", userData);

        // AJAX POST Request
        $.ajax({
            url: "/api/users",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(userData),

            success: function (response) {

                $("#message").html(
                    "<p class='success'>" +
                    response.message +
                    "</p>"
                );

                $("#userForm")[0].reset();
            },

            error: function (xhr) {

                const errorMessage =
                    xhr.responseJSON?.message ||
                    "Something went wrong";

                $("#message").html(
                    "<p class='error'>" +
                    errorMessage +
                    "</p>"
                );
            }
        });
    });
});