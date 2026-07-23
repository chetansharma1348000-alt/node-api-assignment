console.log("form.js loaded successfully");

$(document).ready(function () {

    console.log("jQuery loaded successfully");

    // Letters and spaces only
    $("#firstName, #lastName, #city, #state, #country")
        .on("input", function () {

            let value = $(this).val();

            value = value.replace(
                /[^A-Za-z\s]/g,
                ""
            );

            $(this).val(value);
        });


    // Mobile numbers only
    $("#mobile").on("input", function () {

        let value = $(this).val();

        value = value.replace(
            /[^0-9]/g,
            ""
        );

        value = value.slice(0, 10);

        $(this).val(value);
    });


    // FORM SUBMIT
    $("#userForm").submit(function (event) {

        event.preventDefault();

        console.log("Form submitted");


        // Get Form Values
        const firstName =
            $("#firstName").val().trim();

        const lastName =
            $("#lastName").val().trim();

        const mobile =
            $("#mobile").val().trim();

        const email =
            $("#email").val().trim();

        const street =
            $("#street").val().trim();

        const city =
            $("#city").val().trim();

        const state =
            $("#state").val().trim();

        const country =
            $("#country").val().trim();

        const loginId =
            $("#loginId").val().trim();

        const password =
            $("#password").val();


        // Validation Regex
        const textRegex =
            /^[A-Za-z\s]+$/;

        const mobileRegex =
            /^[0-9]{10}$/;

        const loginRegex =
            /^[A-Za-z0-9]{8}$/;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;


        // First Name
        if (!textRegex.test(firstName)) {

            showError(
                "First Name must contain letters only."
            );

            return;
        }


        // Last Name
        if (!textRegex.test(lastName)) {

            showError(
                "Last Name must contain letters only."
            );

            return;
        }


        // Mobile
        if (!mobileRegex.test(mobile)) {

            showError(
                "Mobile number must be exactly 10 digits."
            );

            return;
        }


        // City
        if (!textRegex.test(city)) {

            showError(
                "City must contain letters only."
            );

            return;
        }


        // State
        if (!textRegex.test(state)) {

            showError(
                "State must contain letters only."
            );

            return;
        }


        // Country
        if (!textRegex.test(country)) {

            showError(
                "Country must contain letters only."
            );

            return;
        }


        // Login ID
        if (!loginRegex.test(loginId)) {

            showError(
                "Login ID must be exactly 8 alphanumeric characters."
            );

            return;
        }


        // Password
        if (!passwordRegex.test(password)) {

            showError(
                "Password must contain at least 1 uppercase, " +
                "1 lowercase and 1 special character."
            );

            return;
        }


        // User Data
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


        console.log(
            "Sending Data:",
            userData
        );


        // POST Task 1 API
        $.ajax({

            url: "/api/users",

            type: "POST",

            contentType:
                "application/json",

            data:
                JSON.stringify(userData),


            // SUCCESS
            success: function (response) {

                console.log(
                    "User Created Successfully:",
                    response
                );


                if (
                    response.success === true &&
                    response.data
                ) {

                    // Save registered user
                    sessionStorage.setItem(

                        "registeredUser",

                        JSON.stringify(
                            response.data
                        )

                    );


                    console.log(
                        "User saved in sessionStorage:",
                        sessionStorage.getItem(
                            "registeredUser"
                        )
                    );


                    // Directly open Live Users page
                    window.location.replace(
                        "/users.html"
                    );

                } else {

                    showError(
                        "User created but user data was not received."
                    );

                }

            },


            // ERROR
            error: function (xhr) {

                console.error(
                    "Registration Error:",
                    xhr
                );


                const errorMessage =

                    xhr.responseJSON?.message ||

                    "Something went wrong";


                showError(
                    errorMessage
                );

            }

        });

    });


    // Error Function
    function showError(message) {

        $("#message").html(

            "<p class='error'>" +

            message +

            "</p>"

        );

    }

});