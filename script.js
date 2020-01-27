window.onload = function () {

    let score = 0;
    let BoxesDropped = 0;
    const Boxes = $('.box').length;

    let AnswersDropped = 0;
    const Answers = $('.answer').length;

    // hide next step
    $('.quest').hide();
    $('#check2').hide();

    // make boxes draggable
    $('.box, .answer').draggable({
        revert: true
    });

    // make doparea droppable
    $('.droparea').droppable({
        accept: '.box',
        drop: BoxDrop
    });

    $('.answers').droppable({
        accept: '.answer',
        drop: AnswerDrop
    });

    // make limit portability
    $('.box, .answer').draggable({
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
    }

    // function that handles the answer being droppped
    function AnswerDrop(event, ui) {

        const answer = ui.draggable;
        const answerType = answer.attr('type');
        const dropArea = $(this);
        const dropAreaType = dropArea.attr('area_type');

        // Check if answer number type matches number type of drop area
        if (answerType == dropAreaType) {
            // num type matches!
            score++;

        }



        // disable dragging
        answer.position({ of: $(this), my: 'center', at: 'center' });
        answer.draggable('disable').draggable('option', 'revert', false);
        AnswersDropped++;
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

                $('#mess').removeClass('correct');
                $('#mess').text("");
                $('#check').hide();
                $('#check2').show();
                score = 0;
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
        
        else if (BoxesDropped != Boxes || AnswersDropped != Answers) {
            $('#mess').text("Unfold all the balls");
        }
}

        document.querySelector('#check2').onclick = function () {

            if (AnswersDropped == Answers && AnswersDropped == score) {
                $('.answer').addClass('correct');

                $('#mess').addClass('correct');
                $('#mess').text("Good job");
                $('#check2').text("Next");
                answer.addClass('correct');
                $('#check2').click(function () {
                    location.reload();
                    score = 0;
                });
            }

            else if (AnswersDropped == Answers && AnswersDropped != score) {

                $('#mess').addClass('incorrect');
                $('#mess').text("Try again");
                $('#check2').text("Reset");
                $('#check2').click(function () {
                    location.reload();
                });
            }
            else if (AnswersDropped != Answers) {
                $('#mess').text("Unfold all the balls");
            }
        }
}