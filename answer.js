$(document).ready(function () {

    let score = 0;
    let AnswersDropped = 0;
    const Answers = $('.answer').length;

    // hide end game message and reset button

    // make Answers draggable

    $('.answer').draggable({
        revert: true
    });

    // make doparea droppable
    $('.answers').droppable({
        accept: '.answer',
        drop: AnswerDrop
    });


    $(".answer").draggable({
        containment: ".content"
    });

    // function that handles the answer being droppped
    function AnswerDrop(event, ui) {

        const answer = ui.draggable;
        const answerType = answer.attr('type');
        const dropArea = $(this);
        const dropAreaType = dropArea.attr('area_type');

        // Check if answer number type matches number type of drop area
        if (answerType == dropAreaType) {
            // num type matches!
            answer.addClass('correct');
            answer.addClass('dropped');
            score++;

        } else {
            // num type does NOT match!
            answer.addClass('incorrect');
            answer.addClass('dropped');
        }



        // disable dragging
        answer.position({ of: $(this), my: 'center', at: 'center' });
        answer.draggable('disable').draggable('option', 'revert', false);
        AnswersDropped++;

        // output score
        $('#score').text(score);

        // check if game has ended
        if (AnswersDropped == Answers && AnswersDropped == score) {

            $('#check').text("Next");
            $('#button').click(function () {
                $('.quest').hide();
                $('#button').hide();
                // $('.quest').show();
                score = 0;
                $('#score').text(score);
            });

        }
        if (AnswersDropped == Answers && Answers != score) {

            $('#button').text("Reset");
            $('#button').click(function () {
                location.reload();
            });
        }

        console.log(AnswersDropped);
        console.log(Answers);
        
    }

    // answer



});