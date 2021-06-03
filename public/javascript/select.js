$("select").on('change', function(e) {
    let id = $(this).attr('id');
    let selected_values = $(this).val();
    if(selected_values.length>=3){
        $('#'+id).find('option').each(function(s) {
            if(!selected_values.includes($(this).val())){
                $(`[value="${$(this).val()}"]`).attr('disabled',true)
            }
        });
    } else {
        $('#'+id).find('option').each(function(s) {
            if(!selected_values.includes($(this).val())){
                $(`[value="${$(this).val()}"]`).attr('disabled',false)
            }
        });
    }
});

$(document).ready(function() {
    $('.multiple-checkboxes').multiselect({
    includeSelectAllOption: false,
    });
});
