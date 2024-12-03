  // bookmark at content.js: "archive.js files go here"


  // //For dyslexia ruler
  // let rulerDiv = readerModeContext.getElementById('rulerDiv')
  // rulerDiv.src = chrome.runtime.getURL('./images/Group 11.svg')

  // rulerDiv.addEventListener('click', () => {
  //   let container = readerModeContext.getElementById('container3')
  //   container.classList.toggle('open')

  //   let container2 = readerModeContext.getElementById('container1')
  //   container2.classList.remove("open")
  // })

  // let dysleviaRulerDiv = readerModeContext.getElementById('dysleviaRulerDiv')
  // const rulerColorInput = readerModeContext.getElementById('ruler-color')
  // const rulerHeightInput = readerModeContext.getElementById('ruler-height')
  // const rulerPositionInput = readerModeContext.getElementById('ruler-position')

  // const dyslexiaRulerFlag = readerModeContext.getElementById('dyslexiaRulerFlag')
  // let statusFlag = false

  // //Default dyslexia Ruler

  // dysleviaRulerDiv.style.backgroundColor = rulerColorInput.value
  // dysleviaRulerDiv.style.height = `${rulerHeightInput.value}px`
  // dysleviaRulerDiv.style.top = `${rulerPositionInput.value}%`

  // //Extracting from local storage and updating the article Ruler
  // chrome.storage.local.get(['rulerDivProperties']).then((result) => {
  //   let rulerDivProperties = result.rulerDivProperties
  //   if(rulerDivProperties){
  //   dysleviaRulerDiv.style.backgroundColor = rulerDivProperties.rulerColor
  //   dysleviaRulerDiv.style.height = rulerDivProperties.rulerHeight
  //   dysleviaRulerDiv.style.top = rulerDivProperties.rulerPosition

  //   }
    
  //   rulerColorInput.value = rulerDivProperties.rulerColor || "#000000"
  //   rulerHeightInput.value =rulerDivProperties.rulerHeight.split("px")[0] || "250"
  //   rulerPositionInput.value=rulerDivProperties.rulerPosition.split("%")[0] || "25"

  // })

  // rulerColorInput.addEventListener('input', () => {
  //   dysleviaRulerDiv.style.backgroundColor = rulerColorInput.value
  // })

  // rulerHeightInput.addEventListener('input', () => {
  //   dysleviaRulerDiv.style.height = `${rulerHeightInput.value}px`
  // })

  // rulerPositionInput.addEventListener('input', () => {
  //   dysleviaRulerDiv.style.top = `${rulerPositionInput.value}%`
  // })

  // dyslexiaRulerFlag.addEventListener('change', (event) => {
  //   if (event.target.checked) {
  //     statusFlag = true
  //     dysleviaRulerDiv.style.display = 'block'
  //   } else {
  //     statusFlag = false
  //     dysleviaRulerDiv.style.display = 'none'
  //   }
  // })

  // const rulerSaveButton = readerModeContext.getElementById('ruler-properties-save')
  // rulerSaveButton.addEventListener('click', () => {
  //   const rulerDivProperties = {
  //     rulerColor: rulerColorInput.value,
  //     rulerHeight: `${rulerHeightInput.value}px`,
  //     rulerPosition: `${rulerPositionInput.value}%`,
  //     rulerFlag: statusFlag,
  //   }
  //   chrome.storage.local.set({ rulerDivProperties })
  //   let container = readerModeContext.getElementById('container3')
  //   container.classList.toggle('open')
  // })

