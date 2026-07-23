$(document).ready(function () {

    console.log("users.js loaded successfully");

    // ==========================================
    // 1. LOAD ALL REGISTERED USERS FROM TASK 1
    // ==========================================

    function loadAllUsers() {

        $.ajax({

            url: "/api/users",
            type: "GET",

            success: function (response) {

                console.log(
                    "All Registered Users:",
                    response
                );

                const users = response.data;

                $("#userTableBody").empty();

                if (!users || users.length === 0) {

                    $("#userTableBody").html(`
                        <tr>
                            <td colspan="7">
                                No registered users found
                            </td>
                        </tr>
                    `);

                    return;
                }


                users.forEach(function (user) {

                    const city =
                        user.address?.city || "N/A";

                    const state =
                        user.address?.state || "N/A";

                    const country =
                        user.address?.country || "N/A";


                    const row = `

                        <tr>

                            <td>
                                ${user.firstName}
                            </td>

                            <td>
                                ${user.lastName}
                            </td>

                            <td>
                                ${user.mobile}
                            </td>

                            <td>
                                ${user.email}
                            </td>

                            <td>
                                ${city}
                            </td>

                            <td>
                                ${state}
                            </td>

                            <td>
                                ${country}
                            </td>

                        </tr>

                    `;


                    $("#userTableBody").append(row);

                });

            },


            error: function (xhr) {

                console.error(
                    "Unable to load registered users:",
                    xhr
                );

                $("#userTableBody").html(`
                    <tr>
                        <td colspan="7">
                            Unable to load users
                        </td>
                    </tr>
                `);

            }

        });

    }


    // Load Task 1 users
    loadAllUsers();



    // ==========================================
    // 2. SOCKET.IO CONNECTION
    // ==========================================

    const socket = io();


    socket.on("connect", function () {

        console.log(
            "Socket Connected:",
            socket.id
        );


        // Get newly registered Task 1 user
        const registeredUserString =
            sessionStorage.getItem(
                "registeredUser"
            );


        if (!registeredUserString) {

            console.log(
                "No registered user found in sessionStorage"
            );

            return;
        }


        try {

            const registeredUser =
                JSON.parse(
                    registeredUserString
                );


            console.log(
                "Registered User:",
                registeredUser
            );


            if (
                registeredUser &&
                registeredUser._id
            ) {

                // Join live_users room
                socket.emit(
                    "joinLiveUsers",
                    registeredUser
                );

            }

        } catch (error) {

            console.error(
                "Unable to read registered user:",
                error
            );

        }

    });



    // ==========================================
    // 3. RECEIVE LIVE USERS
    // ==========================================

    socket.on(
        "liveUsersList",
        function (users) {

            console.log(
                "Live Users:",
                users
            );


            $("#liveUsersBody").empty();


            if (
                !users ||
                users.length === 0
            ) {

                $("#liveUsersBody").html(`
                    <p>
                        No live users
                    </p>
                `);

                return;
            }


            users.forEach(function (user) {

                const fullName =
                    `${user.firstName} ${user.lastName}`;


                const card = `

                    <div class="live-user-card">

                        <h3>
                            ${fullName}
                        </h3>


                        <p>

                            <strong>
                                Email:
                            </strong>

                            <a
                                href="#"
                                class="view-user"
                                data-user-id="${user.userId}"
                            >
                                ${user.email}
                            </a>

                        </p>


                        <p>

                            <strong>
                                Socket ID:
                            </strong>

                            <a
                                href="#"
                                class="view-user"
                                data-user-id="${user.userId}"
                            >
                                ${user.socketId}
                            </a>

                        </p>

                    </div>

                `;


                $("#liveUsersBody").append(
                    card
                );

            });

        }
    );



    // ==========================================
    // 4. EMAIL / SOCKET ID CLICK
    // ==========================================

    $(document).on(
        "click",
        ".view-user",
        function (event) {

            event.preventDefault();


            const userId =
                $(this).data(
                    "user-id"
                );


            console.log(
                "Getting User Details:",
                userId
            );


            $.ajax({

                url:
                    "/api/users/" +
                    userId,

                type: "GET",


                success: function (response) {

                    const user =
                        response.data;


                    const address =
                        user.address
                            ?
                            `${user.address.street},
                            ${user.address.city},
                            ${user.address.state},
                            ${user.address.country}`
                            :
                            "N/A";


                    $("#userDetails").html(`

                        <p>
                            <strong>
                                Name:
                            </strong>

                            ${user.firstName}
                            ${user.lastName}

                        </p>


                        <p>

                            <strong>
                                Mobile:
                            </strong>

                            ${user.mobile}

                        </p>


                        <p>

                            <strong>
                                Email:
                            </strong>

                            ${user.email}

                        </p>


                        <p>

                            <strong>
                                Address:
                            </strong>

                            ${address}

                        </p>


                        <p>

                            <strong>
                                Login ID:
                            </strong>

                            ${user.loginId}

                        </p>


                        <p>

                            <strong>
                                Creation Time:
                            </strong>

                            ${new Date(
                                user.creationTime
                            ).toLocaleString()}

                        </p>

                    `);


                    $("#userModal").show();

                },


                error: function (xhr) {

                    console.error(
                        "Unable to load user details:",
                        xhr
                    );

                    alert(
                        "Unable to load user details"
                    );

                }

            });

        }
    );



    // ==========================================
    // 5. CLOSE POPUP
    // ==========================================

    $("#closeModal").click(
        function () {

            $("#userModal").hide();

        }
    );


    $("#userModal").click(
        function (event) {

            if (
                event.target.id ===
                "userModal"
            ) {

                $("#userModal").hide();

            }

        }
    );

});