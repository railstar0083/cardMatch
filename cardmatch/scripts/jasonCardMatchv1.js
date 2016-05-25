function jasonCardFlip (element, options) {


//set defaults
//var [Variable Name] = options.[Local Variable Name] || [Default State];

var cardCount = options.cardCount || 3;
var matchNum = options.matchNum || 2;
var cardHeight = options.cardHeight || 225;
var cardWidth = options.cardWidth || 150;
var winMSG = options.winMessage || "You're a Winner!!";
var loseMSG = options.loseMessage || "You Lose!!";
var cardBack = options.cardBack || "cardback.png";
var cardFrontWin = options.cardFrontWin || "cardfrontwin.png";
var cardFrontLose = options.cardFrontLose || "cardfrontlose.png";

//global variables
var usedValues = [];
var randomnumber = null;
var flips = 0;

/************
Build the structure
*************/
var game = $(element);
game.addClass("jasonCardFlip");

//Create card wrapper
$(".jasonCardFlip").append("<div class='jasonCardWrap'></div>");

//Create cards
for (i = 0; i <= cardCount-1; i++){
	$(".jasonCardWrap").append('<div class="jasonCard animated" id="card_'+i+'"><div class="jasonCardFront animated"></div></div>');
}

//set height and width of cards
$(".jasonCard").each( function() {
		$(this).css("height", ""+cardHeight+"");
		$(this).css("width", ""+cardWidth+"");
	});

//create Win/Lose message
$(".jasonCardFlip").append('<br/><div class="jasonWL animated" id="jasonWin"></div><div class="jasonWL animated" id="jasonLose"></div>');


//replace backgrounds
$(".jasonCard").css("background", "url(./images/"+cardBack+") center no-repeat");
$(".jasonCard").css("background-size", "100%");
$(".loseCard").css("background", "url(./images/"+cardFrontLose+") center no-repeat");
$(".loseCard").css("background-size", "100%");
$(".winCard").css("background", "url(./images/"+cardFrontWin+") center no-repeat");
$(".winCard").css("background-size", "100%");

//Assign Winning Cards
if (matchNum > cardCount){
	alert("You can not have more matches than cards.  Please check your configuarion.")
}else {
	for (i = 0; i <= matchNum-1; i++ ){
		randomnumber = Math.floor(Math.random() * (cardCount));
		if (usedValues.indexOf(randomnumber) == -1 ){
			usedValues.push(randomnumber);
		} else {
			i = i - 1;
		}
		//alert(randomnumber);
	};
	//alert(usedValues.toString());
	//Win Cards
	$(".jasonCard").each( function() {
		//Get the ID of this card
		var a = $(this).attr("id");
		//Parse out the number in the ID
		var cardID = a.match(/\d+/);
		cardID = parseInt(cardID);
		//alert(cardID);
		if (!(usedValues.indexOf(cardID) == -1) ) {
			$('#'+a+' > .jasonCardFront').addClass("winCard");
			$('#'+a+' > .jasonCardFront').attr("style", "background: url(./images/"+cardFrontWin+") center no-repeat; background-size: 100%");
		} else {
			$('#'+a+' > .jasonCardFront').addClass("loseCard");
			$('#'+a+' > .jasonCardFront').attr("style", "background: url(./images/"+cardFrontLose+") center no-repeat; background-size: 100%");
		}
	});
}//end assign cards

/****************
Click Behavior
****************/
$(".jasonCard").on('click', function(){
	//Get the ID of the dynamically created card that was clicked
	var a = $(this).attr("id");
	//Parse out the number in the ID
	var cardID = a.match(/\d+/);
	cardID = parseInt(cardID);
	//Flip dat card!
	$(this).addClass("flip");
	$('#'+a+' > .jasonCardFront').addClass("frontflip");
	flips = flips + 1;
	if (flips == cardCount){
		$("#jasonWin").html(winMSG);
		$("#jasonWin").addClass("bounceIn");
	}
});


}//End Function