$('#updateForm').submit((event) => {
    let password_regular_expression = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!password_regular_expression.test($('#password').val())){
        showError('password','Password length must be between 6 to 15 characters long and contain at least one special character, one number, and one letter');
    } else if(!Object.keys($('#u-genres').val()).length || $('#u-genres').val().length > 3 ){
        showError('u-genres','You must choose up to 3 favorite genres.');
    } else if (!Object.keys($('#u-artists').val()).length || $('#u-artists').val().length > 3) {
        showError('u-artists','You must choose up to 3 favorite artists.');
    } else {
        $('#error').hide(); 
        $.ajax({
            url: "http://localhost:3000/users/profileUpdate",
            type: "POST",
            dataType: "json",
            data : {
                password:  $('[name="password"]').val(),
                emailAddress: $('[name="emailAddress"]').val(),
                full_name: $('[name="full_name"]').val(),
                genres_ids: $('[name="genres_ids[]"]').val(),
                artist_ids: $('[name="artist_ids[]"]').val(),
                contact: $('[name="contact"]').val()
            },
            cache: false,
            success: function (response) {
                $('#success').show();
            },
            error: function (e) {
                console.log(e)
                alert("Sorry, it seems something went wrong. Please try again later!");
            },
        });
    }
});

function deleteuser(){
    let x = confirm("Are you sure you want to delete your profile?");
    if(x){
        console.log("Hi");
        
        $.ajax({
            url: "http://localhost:3000/users/deleteAccount",
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (response) {
               window.location.reload()
            },
            error: function (e) {
                console.log(e)
                alert("Sorry, it seems something went wrong. Please try again later!");
            },
        })
    } 
}