function addRemovelike(thread_id,user_id){
    console.log("inside")
    $.ajax({
        url: "http://localhost:3000/thread/likeDislikeThread/" + thread_id + "/" + user_id,
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (response) {
            console.log("dhsaabc",response)
           if(response.likeCount){
               $("#"+thread_id+"").removeClass("far");
            $("#"+thread_id+"").addClass("fas");
            $("#count-"+thread_id+"").html(response.count);
           }else{
            $("#"+thread_id+"").removeClass("fas");
            $("#"+thread_id+"").addClass("far");
            $("#count-"+thread_id+"").html(response.count);
           }
        },
        error: function (e) {
            console.log(e)
            alert("Sorry, it seems something went wrong. Please try again later!");
        },
    });
}


function editThread(comment, title, thread_id){
    $('#editTitle').val(title)
    $('#editComment').val(comment)
    $('#hiddenThreadId').val(thread_id)
    $('#myModal').modal('show')

}

function commentToggle(id){
    $('#comment-'+id).toggle()
}