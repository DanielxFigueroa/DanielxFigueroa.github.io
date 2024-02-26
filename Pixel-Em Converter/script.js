let inpBase = document.getElementById("inp-base-px");
let inpPx = document.getElementById("inp-px");
let inpEM = document.getElementById("inp-em");

// Convert pixels to em function
let pxToEm = () => {
  let inpBaseValue = inpBase.value;
  let pxValue = inpPx.value;

  // Check if input field is not empty. If not, calculate EM value. If empty, clear EM field.
  if (pxValue.length != 0) {
    inpEM.value = pxValue / inpBaseValue;
  } else {
    inpEM.value = "";
  }
};

// Convert Em to pixel function
let emToPx = () => {
  let inpBaseValue = inpBase.value;
  let emValue = inpEM.value;

  // Check if input field is not empty. If not, calculate PX value. If empty, clear PX field.
  if (emValue.length != 0) {
    inpPx.value = emValue * inpBaseValue;
  } else {
    inpPx.value = "";
  }
};

// Calculate EM and PX when Base Font Size is changed function
let calcEmPx = () => {
  // Check if input field is not empty. If not empty, run emToPx(). Else, clear PX and EM fields.
  if (inpBase.value.length != 0) {
    emToPx();
  } else {
    inpPx.value = "";
    inpEM.value = "";
  }
};

// Adding oninput event to each input field
inpPx.oninput = pxToEm;
inpEM.oninput = emToPx;
inpBase.oninput = calcEmPx;
