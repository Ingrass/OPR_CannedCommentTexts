// ==UserScript==
// @name         OPRcommentTextInput
// @description    更新前請記得備分你的文字! Be sure to backup your "texts" setting be updating!
// @version      1.6
// @namespace    sdfgsdfgerverververververv
// @updateURL      https://github.com/Ingrass/OPR_CannedCommentTexts/raw/master/OPRcommentTextInput.user.js
// @downloadURL    https://github.com/Ingrass/OPR_CannedCommentTexts/raw/master/OPRcommentTextInput.user.js
// @author       lokpro
// @match        https://opr.ingress.com/recon*
// @include     https://wayfarer.nianticlabs.com/review*
// @grant        none
// ==/UserScript==

/*
v1.6 11/10/2019
- fixes for new WayFarer site
*/

const texts = [
"Nice",
"school",
"not permanent",
"emergency service",
"private residential",
"hospital",
"Military Area",
];


var html_textButtons = "";
for( var i=0; i<texts.length; i++ ){
	html_textButtons += "<button class='button cannedCommentsButton' style='font-size: 12px;padding: 5px;'>"+texts[i]+"</button>";
}

var textBoxes = document.querySelectorAll("#additional-comments-card > .card__body");
textBoxes[0].insertAdjacentHTML("beforebegin", "<div class='center' style='text-align: center'>" + html_textButtons + "</div>");

var buttons = document.getElementsByClassName("cannedCommentsButton");
for (var i=0; i<buttons.length; i++ ) {
	buttons[i].addEventListener("click", function (event) {
		var source = event.target || event.srcElement;

		textBoxes[0].value = textBoxes[1].value = angular.element(document.getElementById('AnswersController')).scope().answerCtrl.formData.comment += source.innerText;
	} );
}

