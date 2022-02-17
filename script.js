$(document).ready(function() {
    $('.saveBtn').on('click', function() {
        let time = $(this).parent().attr('id');
        let description = $(this).siblings('.description').val();

        localStorage.setItem(time, description)
    })

    function compareHour() {
        var currentHour = moment().hours();
        $('.time-block').each(function() {
            // ParseInt converts the time-block id 'hour-9' into a integer after it splits the
            // ID at the the '-' and targets the arrays second position for the string integer.
            var blockHour = parseInt($(this).attr('id').split('-')[1])
            if(blockHour<currentHour) {
                $(this).addClass('past')
            } else if(blockHour === currentHour) {
                $(this).removeClass('past')
                $(this).addClass('present')
            }else {
                $(this).removeClass('past')
                $(this).removeClass('present')
                $(this).addClass('future')
            }
        })
        console.log('hour checked')
    }
    // This will call the compare hour function every 5 seconds.
    // SetInterval takes two value, the action to take place as the first value and the second value being time in milliseconds
    setInterval(compareHour, 5000)

    compareHour();
    $('#currentDay').text(moment().format('dddd, MMM Do'))

})

// Starting the for loop at 9 starts at the first hour of the work day.
// This will start with hour 9 and go all the way till it gets to 17 which is 5pm
// We pass i into the string to target the hour-block id and the textarea child with
// the description class. It then pulls the key with hour-'i' from localStorage and 
// sets the text area value to it.
for(var i=9; i<=17; i++) {
    $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`))
}