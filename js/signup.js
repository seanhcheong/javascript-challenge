"use strict";

function initial() {
	var list = document.getElementsByName("state");
	for(var i = 0; i < usStates.length; i++){
		var single = document.createElement("option");
		single.value = usStates[i].code;
		single.text = usStates[i].name;
		list[0].appendChild(single);
	}

	var other = document.getElementById('signup').elements['occupationOther'];
	var occupationType = document.getElementById("occupation");

	function otherTest() {
		if(occupationType.value == "other") {
			other.style.display = 'block';
		} else {
			other.style.display = 'none';
		}
	}

	var confirmation = document.getElementById("cancelButton");
	var submission = document.getElementById("signup");
	var occupationChange = document.getElementById("occupation");

	function confirm() {
		var popUp = window.confirm("Are you sure???");
		if(popUp === true) {
			location.replace("http://www.google.com");
		}
		
	}

	confirmation.addEventListener('click', confirm);
	occupationChange.addEventListener('change', otherTest);
	submission.addEventListener('submit', submitCheck);	
}

function submitCheck(evt) {
	evt.returnValue = validateForm(this);
	var enteredBirthday = document.getElementById('birthdate').value;
	var enteredZip = document.getElementById('zip').value;

	try{
		ageCalculate(enteredBirthday);
	}

	catch(exception){
		alert('Invalid Birthday');
	}

	try {
		zipValidator(enteredZip);
	}

	catch(exception) {
		alert('Invalid Zip Code');
	}

	if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	if(document.getElementById("occupation").value === 'other') {
   		requiredFields.push('occupationOther');
   	} else {
   		if(requiredFields.length === 8){
   			requiredFields.pop();
   		}
   	}
    requiredFields.forEach(validateRequiredField, form);
}

function zipValidator(enteredZip) {
	var zipRegExp = new RegExp('^\\d{5}$');
	if(!zipRegExp.test(enteredZip)){
		throw new Error();
	}
}

function validateRequiredField(field) {
    if (0 === this[field].value.trim().length) {
        this[field].className = 'invalid-field form-control';
        return false;
    } else {
        this[field].className = 'form-control';
        return true;
    }
}

function ageCalculate(dob) {
	dob = new Date(dob);
	var today = new Date();
	var yearSubtraction = today.getFullYear() - dob.getUTCFullYear();
	var monthSubtraction = today.getMonth() - dob.getUTCMonth();
	var daySubtraction = today.getDate() - dob.getUTCDate();

	if(monthSubtraction > 0 || (0 === monthSubtraction && daySubtraction < 0)) {
		yearSubtraction--;
	}
	if (yearSubtraction < 13) {
		throw new Error();
	}
}

document.addEventListener('DOMContentLoaded', initial);



