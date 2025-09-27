radio1 = document.getElementById("time-asap");
radio2 = document.getElementById("time-specified")
timeLabel = document.getElementById("delivery-time-label");
timeBox = document.getElementById("delivery-time");
timeLabel.style.display = "none";
timeBox.style.display = "none";
		
radio1.addEventListener('change', function () {
	if (this.checked) {
		timeLabel.style.display = "none";
		timeBox.style.display = "none";
	}
});
radio2.addEventListener('change', function () {
	if (this.checked) {
		timeLabel.style.display = "flex";
		timeBox.style.display = "flex";
	}
});
