import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
 
import './body.html';
 
Template.body.helpers({
  messages: function() {
    return Tasks.find({}, {sort: {createdAt: 1}});
  },

  test: function() {
    return text;
  },

  textWithSide: function () {
    if (this.side) {
      return "<li class='right'>" + this.text + "</li>"; 
    } else {
      return  "<li class='left'>" + this.text + "</li>";
    }
  }
});



Template.body.events({
  'keypress .new-message'(event) {
    if (event.which === 13) { // if the key is enter
      event.preventDefault();
      const target = event.currentTarget;
      // const text = target.textContent;

      const text = $('.new-message').html();
      var messages = Tasks.find({}, {sort: {createdAt: -1}, limit: 1});
      var mostRecent = null;


if (text.length > 0) {

      messages.forEach(function (message) {
        mostRecent = message;
      });

      if (mostRecent) {
        console.log("inserting here");
        Tasks.insert({
          text,
          side: !mostRecent.side,
            createdAt: new Date(), // current time
        });
      } else {
       console.log("inserting now!");
       Tasks.insert({
        text,
        side: 0,
          createdAt: new Date(), // current time
      });
    }

   // debugger;
    $('.new-message').empty();

    //target.textContent = '';
    $('body').scrollTop($('body')[0].scrollHeight);

  }



    }
  },
});
  
function pasteHtmlAtCaret(html) {
//by Tim Downs at http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div

    var sel, range;
    // debugger;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);
            
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
    }
}

window.onload = function() {
makeButton('updown');
makeButton('hyper');
makeButton('sarcastic');
makeButton('ellipsis');
makeButton('nervous');
makeButton('anxious');
makeButton('sad');
makeButton('angry');
makeButton('confused');
makeButton('urgent');
makeButton('bulge');
}



function makeButton(name) {


        document.getElementById(name).onclick = function() {
            document.getElementById('input').focus();

            var buttonTest = '<span class="'+name+ ' punctumotion">.</span>&#8203;';

            pasteHtmlAtCaret(buttonTest); //need to move cursor forward to replace &nbsp;
            return false;
        };
}
