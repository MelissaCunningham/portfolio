/* File Name: main.js */
/* Programmer: Melissa Cunningham */

// GLOBAL VARS

// Global object vars
var divErrors;
var radSandwich;
var radSize;
var chkExtras;
var g_sMsg;
var txtTotal;
var divOrder;

// Other global vars
var gc_fExtrasPrice = 1.50;
var g_fTotal;
var g_sSandwich;
var g_sSize;
var g_sExtras;
var g_iToppingCount;
var g_sPaymentSelection;
var g_sCreditCardInfo;


// Hooking up event handler for window.onload to the Init function.
window.onload = Init;

function Init() {
	document.getElementById("h1Title").innerHTML = "Nick's Deli Sandwiches";

	// Assigning html objects
	divErrors = document.getElementById("divErrors");
	radSandwich = document.getElementsByName("radSandwich");
	radSize = document.getElementsByName("radSize");
	chkExtras = document.getElementsByName("chkExtras");
	txtTotal = document.getElementById("txtTotal");
	divOrder = document.getElementById("divOrder");
	
	divOrder.innerHTML = "";

	// Setting the innerHTML of spanExtrasPrice to gc_fExtrasPrice
	document.getElementById("spanExtrasPrice").innerHTML = gc_fExtrasPrice.toFixed(2);

	// Hooking up event handlers
	document.getElementById("btnCalculateTotal").onclick = CalculateTotal;
	document.getElementById("btnProcessOrder").onclick = ProcessOrder;

	g_sPaymentSelection = document.getElementById("selPayment");
	g_sCreditCardInfo = document.getElementById("divCreditCardInfo");

	g_sCreditCardInfo.style.visibility = "hidden";

	g_sPaymentSelection.onchange =
		function() {
			g_sCreditCardInfo.style.visibility = "hidden";
			// change style to visible if pmt type is credit card
			if (g_sPaymentSelection.selectedIndex === 2) {	
				g_sCreditCardInfo.style.visibility = "visible";
			}	
		};
} // end function Init()
	
function CalculateTotal() {
	// This function is called when user clicks the Calculate Total button.
	var iSandwichLength = 0;
	var bSandwichSelected;
	var iSizeLength = 0;
	var bSizeSelected;
	var sSandwichPrice;
	var iExtrasLength = 0;

	// Emptying out fields
	divErrors.innerHTML = "";
	txtTotal.value = "";
	g_sMsg = "";


	// Initializing values to zero
	g_fTotal = 0;
	g_sExtras = 0;
	
	//  Get Type of Sandwich
	iSandwichLength = radSandwich.length;  // get sandwich array length
	bSandwichSelected = false;

	for (var i=0; i < iSandwichLength; i++) {

		if (radSandwich[i].checked === true) {
			g_sSandwich = radSandwich[i].value;
			bSandwichSelected = true;
			break;
		}
	}

	if (!bSandwichSelected) {
		divErrors.innerHTML = "Select a sandwich";
		return;
	}

	// Get Sandwich Size
	iSizeLength = radSize.length;  // get size array length
	bSizeSelected = false;

	for (var j=0; j < iSizeLength; j++) {

		if (radSize[j].checked === true) {
			sSandwichPrice = radSize[j].title;
			sSandwichPrice = sSandwichPrice.substr(1);  // deleting the $ character off string
			g_fTotal = Number(sSandwichPrice);  // converting the string price to a numerical value and adding to g_fTotal

			g_sMsg = "<h3>Welcome to Nick's Deli Sandwiches!</h3>You have ordered a " + radSize[j].value + 
			" " + g_sSandwich + " with ";
			bSizeSelected = true;
			break;
		}
	}

	if (!bSizeSelected) {
		divErrors.innerHTML = "Please choose a size";
		return;
	}

	// Get Any Sandwich Extras Selected
	g_sExtras = "";  // start out with no extras in text message
	g_iToppingCount = 0;  // start out with no extras in count
	iExtrasLength = chkExtras.length;  // get size array length

	for (var k=0; k < iExtrasLength; k++) {

		if (chkExtras[k].checked === true) {

			if (g_iToppingCount > 0) {
				g_sExtras += ", ";
			}

			g_sExtras += chkExtras[k].value;
			g_fTotal += gc_fExtrasPrice;
			g_iToppingCount += 1;
		}
	}

	g_sMsg += g_sExtras + "<p>Your Total is $" + g_fTotal.toFixed(2) + "</p>";
	txtTotal.value = "$" + g_fTotal.toFixed(2);

} // end function CalculateTotal


function ProcessOrder() {

	// This function runs when ProcessOrder button is clicked.

	// Local variables
	var txtName;
	var a_sMsgPieces;
	var sPaymentType;
	var sFinalMsg;

	divErrors.innerHTML = "";  // Empty out error string

	// Get Customer Name
	txtName = document.getElementById("txtName");
	
	if (txtName.value === "") {
		divErrors.innerHTML = "Enter customer's name";
		txtName.focus();
		return;
	}

	// Get Credit Card Information

	if (document.getElementById("selPayment").selectedIndex === 0) {
		sPaymentType = document.getElementById("selPayment").value;
	}

	if (document.getElementById("selPayment").selectedIndex === 1) {
		sPaymentType = document.getElementById("selPayment").value;
	}

	if (document.getElementById("selPayment").selectedIndex === 2) {
		sPaymentType = document.getElementById("selPayment").value;
		
		if ((document.getElementById("txtCreditCardNbr").value === "") || (isNaN(document.getElementById("txtCreditCardNbr").value))) {

			divErrors.innerHTML = "Enter your card number using only digits";
			document.getElementById("txtCreditCardNbr").focus();
			return;
		}

		if ((document.getElementById("txtMonth").value === "") || (isNaN(document.getElementById("txtMonth").value))) {

			divErrors.innerHTML = "You must enter a number for the Month";
			document.getElementById("txtMonth").focus();
			return;
		}

		if (Number((document.getElementById("txtMonth").value) < 1) || (Number(document.getElementById("txtMonth").value) > 12)) {

			divErrors.innerHTML = "Month must be between 1 and 12";
			document.getElementById("txtMonth").focus();
			return;
		}

		if (document.getElementById("selYear").value === "") {

			divErrors.innerHTML = "Select a year";
			document.getElementById("selYear").focus();
			return;
		}
	}

	// Print out customer order information to webpage
	a_sMsgPieces = g_sMsg.split("!");

	sFinalMsg = a_sMsgPieces[0] + ", " + txtName.value + "!" + a_sMsgPieces[1];

	sFinalMsg += "<p>Paid by " + sPaymentType + "<p><strong>Have a nice day!</strong></p>";	
	divOrder.innerHTML = sFinalMsg;	

} // end function ProcessOrder
