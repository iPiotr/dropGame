window.onload = function () {

    let score = 0;
    let BoxesDropped = 0;
    const Boxes = $('.box').length;

    // hide end game message and reset button
    $('.quest').hide();

    // make boxes draggable
    $('.box').draggable({
        revert: true
    });

    // make doparea droppable
    $('.droparea').droppable({
        accept: '.box',
        drop: BoxDrop
    });

    // make limit portability
    $(".box").draggable({
        containment: ".content"
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
            box.addClass('dropped');
            score++;
            
        } else {
            // num type does NOT match!
            box.addClass('dropped');
        }

        

        // disable dragging
        box.draggable('disable').draggable('option', 'revert', false);
        BoxesDropped++;

        // output score
        $('#score').text(score);

        // check if game has ended
        

        }

    // answer
    

    document.getElementById("check").onclick = function fun() {

        if (BoxesDropped == Boxes && BoxesDropped == score) {
            
            $('.content').addClass('correct');

            $('#mess').text("Next");
            $('#check').text("Next");
            $('#check').click(function () {
                $('.balls').hide();
                $('.quest').show();
                score = 0;
                $('#score').text(score);
            });

        
    }

        if (BoxesDropped == Boxes && Boxes != score) {
            
            $('.content').addClass('incorrect');

            $('#check').text("Reset");
            $('#check').click(function () {
                location.reload();
            });
        }
}

}