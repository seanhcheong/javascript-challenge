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
	var occupationType = document.getElementById("occupation").value;

	function otherTest() {
		if(occupationType == "other") {
			other.style.display = 'inline';
		} else {
			other.style.display = 'none';
		}
	}

	var confirmation = document.getElementById("cancelButton");
	var submission = document.getElementById("signUp");
	var occupationChange = document.getElementById("occupation");

	function confirm() {
		var popUp = window.confirm("Are you sure???");
		if(popUp === true) {
			location.replace("http://www.google.com");
		}
		
	}

	confirmation.addEventListener('click', confirm);
	occupationChange.addEventListener('click', otherTest);
	submission.addEventListener('submit', submitCheck);	

}

function submitCheck(evt) {
	var valid = validateForm(this);
	if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    requiredFields.forEach(validateRequiredField, form);
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

document.addEventListener('DOMContentLoaded', initial);



