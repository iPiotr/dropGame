$(document).ready(function () {

    let score = 0;
    let BoxesDropped = 0;
    const Boxes = $('.box').length;

    // hide end game message and reset button
    $('#mess').hide();
    $('#button').hide();
    $('.questions').hide();

    // make boxes draggable
    $('.box').draggable({
        revert: true
    });

    // make doparea droppable
    $('.droparea').droppable({
        accept: '.box',
        drop: BoxDrop
    });

    $(".box").draggable({
        containment: ".balls"
    });

    // function that handles the box being droppped
    function BoxDrop(event, ui) {

        const box = ui.draggable;
        const boxType = box.attr('type');
        const dropArea = $(this);
        const dropAreaType = dropArea.attr('area_type');

        // Check if box number type matches number type of drop area
        if (boxType == dropAreaType) {
            // num type matches!
            box.addClass('correct');
            box.addClass('dropped');
            score++;
            
        } else {
            // num type does NOT match!
            box.addClass('incorrect');
            box.addClass('dropped');
        }

        

        // disable dragging
        // box.position({ of: $(this), my: 'center', at: 'center' });
        box.draggable('disable').draggable('option', 'revert', false);
        BoxesDropped++;

        // output score
        $('#score').text(score);

        // check if game has ended
        if (BoxesDropped == Boxes && BoxesDropped == score) {
            $('#mess').show();
            $('#mess').text("Good job");
            $('#mess').css("color", "green");
            
            $('#button').show();
            $('#button').text("Next");
            $('#button').click(function () {
                $('.balls').hide();
                $('#mess').hide();
                $('#button').hide();
                $('.questions').show();
            });
        }
        if (BoxesDropped == Boxes && Boxes != score) {
            $('#mess').show();
            $('#mess').text("Try again");

            $('#button').show();
            $('#button').text("Reset");
            $('#button').click(function () {
                location.reload();
            });
        }
    }
});