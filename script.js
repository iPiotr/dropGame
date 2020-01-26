window.onload = function () {

    let score = 0;
    let BoxesDropped = 0;
    const Boxes = $('.box').length;

    // hide next step
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
    $('.box').draggable({
        containment: '.content'
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
    }
    
    // check if game has ended
    document.querySelector('#check').onclick = function () {

        if (BoxesDropped == Boxes && BoxesDropped == score) {
            
            $('#mess').addClass('correct');
            $('#mess').text("Good job");
            $('#check').text("Next");
            $('#check').click(function () {
                $('.balls').hide();
                $('.quest').show();
                score = 0;
                $('#score').text(score);
            });    
        }

        else if (BoxesDropped == Boxes && Boxes != score) {
            
            $('#mess').addClass('incorrect');
            $('#mess').text("Try again");
            $('#check').text("Reset");
            $('#check').click(function () {
                location.reload();
            });
        } 
        
        else if (BoxesDropped != Boxes) {
            $('#mess').text("Unfold all the balls");
        }
}

}