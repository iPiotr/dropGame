$(document).ready(function () {

    let score = 0;
    let BoxesDropped = 0;
    const Boxes = $('.box').length;

    // hide end game message and reset button
    $('#mess').hide();
    $('#reset').hide();

    // make boxes draggable
    $('.box').draggable({
        revert: true
    });

    // make doparea droppable
    $('.droparea').droppable({
        accept: '.box',
        drop: handleBoxDrop
    });

    // function that handles the box being droppped
    function handleBoxDrop(event, ui) {

        const box = ui.draggable;
        const boxType = box.attr('type');
        const dropArea = $(this);
        const dropAreaType = dropArea.attr('area_type');

        // Check if box number type matches number type of drop area
        if (boxType == dropAreaType) {
            // num type matches!
            box.addClass('correct');
            score++;
        } else {
            // num type does NOT match!
            box.addClass('incorrect');
        }

        // disable dragging
        box.draggable('disable').draggable('option', 'revert', false);
        BoxesDropped++;

        // output score
        $('#score').text(score);

        // check if game has ended
        $('#reset').click(function () {
            location.reload();
        });

        if (BoxesDropped == Boxes && BoxesDropped == score) {
            $('#mess').show();
            $('#mess').text("Good job");
            $('#mess').css("color", "green");
            $('#reset').show();
        }
        if (BoxesDropped == Boxes && Boxes != score) {
            $('#mess').show();
            $('#mess').text("Game End");
            $('#reset').show();
        }
    }

});