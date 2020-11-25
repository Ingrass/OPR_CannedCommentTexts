// ==UserScript==
// @name         OPRcommentTextInput
// @description    更新前請記得備份你的文字! Be sure to backup your "texts" setting be updating!
// @version      1.8
// @namespace    sdfgsdfgerverververververv
// @updateURL      https://github.com/Ingrass/OPR_CannedCommentTexts/raw/master/OPRcommentTextInput.user.js
// @downloadURL    https://github.com/Ingrass/OPR_CannedCommentTexts/raw/master/OPRcommentTextInput.user.js
// @author       lokpro
// @match        https://opr.ingress.com/recon*
// @include     https://wayfarer.nianticlabs.com/review*
// @grant        none
// ==/UserScript==

/*************************************
*** 更新前請記得備份你的文字!
*** Be sure to backup your "texts" setting be updating!
*************************************/

/*
v1.8 25/11/2020
- 因為 wayFarer 更新修正

v1.7 2/Jan/2020
- fixed: works in "EDIT"

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



let html_textButtons = "";
for( let i=0; i<texts.length; i++ ){
	html_textButtons += "<button class='button cannedCommentsButton' style='font-size: 12px;padding: 5px;'>"+texts[i]+"</button>";
}

let timer_wait = setInterval(function(){
	let reviewCtrl = angular.element(document.getElementById('ReviewController')).scope().reviewCtrl;
	
	let card = document.querySelector(".comments-card > .card__body");

	if( card ){
		clearInterval(timer_wait);

		card.insertAdjacentHTML("beforebegin", "<div class='center' style='text-align: center'>" + html_textButtons + "</div>");
		let textBox  = card.querySelector("textarea");
		
		let buttons = document.getElementsByClassName("cannedCommentsButton");

		for (let i=0; i<buttons.length; i++ ) {

			buttons[i].addEventListener("click", function (event) {
				let source = event.target || event.srcElement;
				let reviewCtrl = angular.element(document.getElementById('ReviewController')).scope().reviewCtrl;
				let service = angular.element($("#ReviewController")).injector().get("ReviewResponsesService");
				let comment = service.getReviewSubmissionFormData().comment || "";
				comment += source.innerText;
				
				service.updateReviewSubmissionFormData("comment", comment);
				textBox.value = comment;
			} );
		}
		
	}else{
		return;
	}

}, 99);
