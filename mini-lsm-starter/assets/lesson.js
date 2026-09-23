/* ============================================================================
   lesson.js — shared interactive components for the Mini-LSM teaching workspace.
   Declarative: lessons write HTML, this file wires behaviour. No dependencies,
   works over file://.

   Components
   ----------
   1. Quiz            <div class="quiz"> with <ul class="quiz-opts"> of
                      <li data-correct="true|false" data-why="...">.
                      Immediate feedback; one attempt; explains every option.

   2. Free recall     <div class="recall" data-min="60"> with a <textarea> and a
                      <div class="recall-model"> holding the model answer. The
                      reveal button unlocks only after data-min characters are
                      typed — retrieval before reading is the point.

   3. Score line      <div class="scoreline"> anywhere on the page, auto-updated.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- scoring */

  var score = { asked: 0, right: 0 };

  function paintScore() {
    var els = document.querySelectorAll('.scoreline');
    if (!els.length) return;
    var total = document.querySelectorAll('.quiz').length;
    var text = score.asked === 0
      ? total + ' questions below — answer from memory, not by scrolling up'
      : 'answered ' + score.asked + '/' + total + ' · correct ' + score.right;
    for (var i = 0; i < els.length; i++) els[i].textContent = text;
  }

  /* ------------------------------------------------------------------- quiz */

  function wireQuiz(quiz) {
    var opts = quiz.querySelectorAll('.quiz-opts li');
    var why = quiz.querySelector('.quiz-why');
    var answered = false;

    function choose(li) {
      if (answered) return;
      answered = true;

      var correct = li.getAttribute('data-correct') === 'true';
      score.asked += 1;
      if (correct) score.right += 1;

      for (var i = 0; i < opts.length; i++) {
        var o = opts[i];
        o.classList.add('locked');
        o.setAttribute('aria-disabled', 'true');
        if (o.getAttribute('data-correct') === 'true') o.classList.add('reveal-right');
      }
      li.classList.add(correct ? 'chosen-right' : 'chosen-wrong');

      if (why) {
        var verdict = document.createElement('p');
        verdict.className = 'tight';
        verdict.innerHTML = '<span class="verdict ' + (correct ? 'right">Correct' : 'wrong">Not quite') +
          '</span>';
        why.insertBefore(verdict, why.firstChild);

        // Explain the chosen option first, then the right one if they differ.
        var chosenWhy = li.getAttribute('data-why');
        if (chosenWhy) {
          var p = document.createElement('p');
          p.innerHTML = chosenWhy;
          why.insertBefore(p, verdict.nextSibling);
        }
        if (!correct) {
          for (var j = 0; j < opts.length; j++) {
            if (opts[j].getAttribute('data-correct') === 'true') {
              var rw = opts[j].getAttribute('data-why');
              if (rw) {
                var pr = document.createElement('p');
                pr.innerHTML = '<b>The answer:</b> ' + rw;
                why.insertBefore(pr, verdict.nextSibling.nextSibling || null);
              }
              break;
            }
          }
        }
        why.classList.add('shown');
      }
      paintScore();
    }

    for (var i = 0; i < opts.length; i++) {
      (function (li) {
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');
        li.addEventListener('click', function () { choose(li); });
        li.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(li); }
        });
      })(opts[i]);
    }
  }

  /* ----------------------------------------------------------- free recall */

  function wireRecall(box) {
    var ta = box.querySelector('textarea');
    var btn = box.querySelector('button');
    var gate = box.querySelector('.recall-gate');
    var model = box.querySelector('.recall-model');
    var min = parseInt(box.getAttribute('data-min') || '60', 10);
    if (!ta || !btn) return;

    function refresh() {
      var n = ta.value.trim().length;
      var ok = n >= min;
      btn.disabled = !ok;
      if (gate) {
        gate.textContent = ok
          ? 'ready — compare your answer'
          : (min - n) + ' more characters to unlock';
      }
    }

    ta.addEventListener('input', refresh);
    btn.addEventListener('click', function () {
      if (btn.disabled || !model) return;
      model.classList.add('shown');
      btn.disabled = true;
      btn.textContent = 'Revealed';
      if (gate) gate.textContent = 'now read for what you missed, not for what you got';
    });
    refresh();
  }

  /* ------------------------------------------------------------------- boot */

  function boot() {
    var quizzes = document.querySelectorAll('.quiz');
    for (var i = 0; i < quizzes.length; i++) wireQuiz(quizzes[i]);

    var recalls = document.querySelectorAll('.recall');
    for (var j = 0; j < recalls.length; j++) wireRecall(recalls[j]);

    paintScore();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
