//VARIABLES USED
let responseFromApi
let readerModeHTML
let extractedFinalData
let readerModeSavedPages = []

//Current Page URL
let currentPageURL = window.location.href

chrome.storage.local.get(["currentPageURL"]).then((result) => {
  currentPageURL=result.currentPageURL
  console.log("Processing request - ", currentPageURL)
  console.log(chrome.storage)
})

//Updating of saved pages
chrome.storage.local.get(['readerModeSavedPages']).then((result) => {
  if (result.readerModeSavedPages) {
    readerModeSavedPages = result.readerModeSavedPages
  }
})

//Iframe for Reader Mode
let readerModeIframe = document.createElement('iframe')
readerModeIframe.setAttribute('id', 'myframe')

let blurryDiv = document.createElement('div')
blurryDiv.setAttribute('id', 'blurryDiv')
blurryDiv.classList.add('blurryDivDesign')

//FETCHING CURRENT PAGE URL -
let FetchApi = (page) => {
    
  return new Promise((resolve, reject) => {
    fetch(page)
      .then((res) => res.text())
      .then((data) => {
        makeReaderModeContent(data)
        console.log("makeReaderModeContent()");
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

//FOR DISABLING THE OUTERPAGE SCROLL
const disableScroll = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop)
  }
}


//ReaderMode content
const makeReaderModeContent = async (actualResponseFromApi) => {
  readerModeIframe.classList.add('ReaderModeIframeDesign')
  document.body.append(blurryDiv)
  disableScroll()
  console.log("makeReaderModeContent initializing...")

  document.body.prepend(readerModeIframe)
  responseFromApi = actualResponseFromApi

  //Virtual DOM for modifying data
  const DOMparser = new DOMParser()
  let virtualDOM = DOMparser.parseFromString(responseFromApi, 'text/html')

  const deleteElements = (array) => {
    for (eachTag of array) {
      eachTag.remove()
    }
  }

  //Function to remove all the necessary common elements in the page
  const modifyReadablePage = () => {
    const footerTag = virtualDOM.querySelectorAll('footer')
    const navTag = virtualDOM.querySelectorAll('nav')
    const frameElements = virtualDOM.querySelectorAll('iframe')
    const adFrames = virtualDOM.querySelectorAll('ins')
    console.log("entered modifyReadablePage");
    adFrames.forEach((eachEle) => {
      if (eachEle.className.includes('ad')) {
        console.log(eachEle)
        eachEle.remove()
      }
    })

    if (footerTag) {
      console.log(footerTag)
      deleteElements(footerTag)
    }

    if (navTag) {
      console.log(navTag)
      deleteElements(navTag)
    }
    frameElements.forEach((eachEle) => {
      console.log(eachEle)
      eachEle.remove()
    })

    const delTags = [
      'menu',
      'comments',
      'nav',
      'catlinks',
      'trending',
      'navigation',
      'foot',
    ]
    //To remove menus in the page
    const removeMenus = virtualDOM.querySelectorAll('div')
    for (el of removeMenus) {
      if (el.className.includes('td-header-template-wrap')) {
        el.remove()
      }
      if (el.id.includes('login')) {
        el.remove()
      }
      if (el.outerText == '' || el.outerText == ' ') {
        el.remove()
      }
      if (el.id.includes(delTags[0])) {
        el.remove()
      }
      if (el.className.includes(delTags[0])) {
        el.remove()
      }
      if (el.className.includes(delTags[1])) {
        el.remove()
      }
      if (el.role == delTags[5]) {
        el.style.display = 'none'
      }
      if (el.className.includes(delTags[3])) {
        el.remove()
      }
      if (el.className.includes(delTags[2])) {
        el.remove()
      }
      if (el.id.includes(delTags[2])) {
        if (!el.id.includes('belowtopnav')) el.remove()
      }
      if (el.className.includes(delTags[4])) {
        el.remove()
      }
      if (el.className.includes(delTags[6])) {
        el.remove()
      }
    }
  }

  // For removing empty elements like ad containers
  const emptySpans = virtualDOM.querySelectorAll('span')
  emptySpans.forEach((ele) => {
    if (ele.outerText.trim() === '') {
      ele.remove()
    }
  })

  // For removing lazy loading property of images
  const lazyImages = virtualDOM.querySelectorAll('img')
  lazyImages.forEach((image) => {
    image.removeAttribute('loading')
  })

  // Lazy loading images are getting converted to base64 images
  const imagesOnPage = virtualDOM.querySelectorAll('img[data-src]')
  imagesOnPage.forEach((imag) => {
    imag.src = imag.dataset.src
  })

  //If we had article tag in the page then we will directly append that article element
  let articleElement = virtualDOM.querySelector('article')
  let articlesEle= virtualDOM.querySelector('#articleBody')
  let mainTagElemet = virtualDOM.querySelector('main')

  if(currentPageURL==="https://techcrunch.com/"){
       let homePageTag = virtualDOM.querySelector(".river--homepage")
       modifyReadablePage()
       extractedFinalData = homePageTag.outerHTML
    }
  else if(currentPageURL==="https://www.scoopwhoop.com/"){
      let homePageContent =virtualDOM.querySelector(".content-story-list")
      modifyReadablePage()
      extractedFinalData=homePageContent.outerHTML
    }

  
   else if (mainTagElemet) {
    console.log("mainTagElement - ", mainTagElemet)
    modifyReadablePage()
    extractedFinalData = mainTagElemet.outerHTML

  } 
  else if(articlesEle){
    console.log("articlesEle - ", articlesEle)
    modifyReadablePage()
    extractedFinalData = articlesEle.outerHTML
  }
  else if (articleElement) {
    console.log("articleElement - ", articleElement)
    modifyReadablePage()
    extractedFinalData = articleElement.outerHTML
  }
  else if (currentPageURL.includes('google.com')) {
    const allDivs = virtualDOM.querySelectorAll('div')
    for (ele of allDivs) {
      if (ele.id == 'search' || ele.id.includes('menu')) {
        const gCards = virtualDOM.getElementsByTagName('g-card')
        for (el of gCards) {
          el.remove()
        }
        extractedFinalData = ele.outerHTML
      }
    }
  } 
  else {
    const headerTag = virtualDOM.querySelectorAll('header')
    if (headerTag) {
      for (eachTag of headerTag) {
        eachTag.remove()
      }
    }
    console.log("headerTag - ", headerTag)
    modifyReadablePage()
    extractedFinalData = virtualDOM.querySelectorAll('body')[0].outerHTML
  }

  readerModeHTML = `<!DOCTYPE html>
  <html>
    <head>
        <style>
        h1{
          margin-bottom: 0.3rem;
          border-bottom: 2px solid #8e8e8e;
          margin-top: 0;
          font-size: 24px;
        }
        h2,h3 {
          font-size: 21px;
          margin-top: 1.125em;
          border-bottom: 1px solid #8e8e8e;
          padding-bottom: 0.25rem;
          margin-top: 0;
          border-bottom: 2px solid #8e8e8e;
        }
        p  {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        li{
        font-size: 16px/1.4;
        font-family: georgia
        }
        #readerModeContent img{
          max-width:100%;
          height: auto;
          object-fit: cover;
        }
        a {
          color: black;
      }
      em{
        color: #222;
        font-size: 10.5px;
        font-family: georgia;
      }   
        #readerModeContent{
          margin-left:25%;
          margin-right:25%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          font-family: sans-serif;
          font-size: 16px;
          line-height: 1.84;
          letter-spacing: 0px;
      }
        }
        #readerModeBody{
          margin-left: 25%;
          margin-right: 25%;
          background-color: rgb(255, 255, 255);
          color: rgb(51, 51, 51);
        }

        #editOptions{
          top: 0;
          display: flex;
          width: 100%;
          justify-content: flex-end;
          position: sticky;
          z-index: 99999999;
        }
        
        .image-container {
          position: relative;
          display: inline-block;
        }
        .image-container img {
          cursor: pointer;
        }
        .overlay {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #f9f9f9;
          min-width: 150px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
        .overlay2 {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #f9f9f9;
          min-width: 150px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
        #container1.open .overlay {
          display: block;
        }
        #container3.open .overlay2 {
          display: block;
        }
                   
        .options label {
          display: block;
        }
            
        .options span {
          display: inline-block;
        }
        
        .custom-div {
          
          padding-left: 20px;
        padding-top: 33px;
        padding-right: 11px;
        }
        
        .toggle {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 30px;
        }
        
        .toggle input {
          display: none;
        }
        
        .slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          border-radius: 30px;
          cursor: pointer;
          transition: background-color 0.4s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 24px;
          width: 24px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.4s;
        }
        
        input:checked + .slider {
          background-color: #050505;;
        }
        
        input:checked + .slider:before {
          transform: translateX(30px);
        }

        #rulerContainer{
          width: 422px;
          height: 225px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 3px solid #707070;
          border-radius: 20px;
          opacity: 1;
          margin-top: 4px;
          left: -235px;
        }

        #rulerColorTitle{
          margin-top: 2%;
        width: 107px;
        height: 27px;
        text-align: left;
        font: normal normal normal 20px/27px Segoe UI;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        margin-right: 175px;
        }
        
        #rulerHeightTitle{
          width: 115px;
        height: 27px;
        text-align: left;
        font: normal normal normal 20px/27px Segoe UI;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        margin-right: 171px;
        }
        
        #rulerPositionTitle{
          width: 126px;
        height: 27px;
        text-align: left;
        font: normal normal normal 20px/27px Segoe UI;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        margin-right: 160px;
        }
        
        #ruler-properties-save{
          display: flex;
          justify-content: center;
          width: 121px;
          height: 39px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 8px;
          margin-left: 155px;
          margin-right: 146px;
          text-align: center;
          font: normal normal normal 20px/27px Segoe UI;
          letter-spacing: 0px;
          color: #707070;
          opacity: 1;
          cursor:pointer;
        }

        #rulerTitle{
          width: 46px;
          height: 27px;
          text-align: left;
          font: normal normal normal 20px/27px Segoe UI;
          letter-spacing: 0px;
          color: #707070;
          opacity: 1;
          margin-right: 263px;
        }

        #ruler-height{
          width: 79px;
        height: 30px;
        border: 2px solid #CECECE;
        opacity: 1;
        font: normal normal normal 20px/27px Segoe UI;
        }

        #ruler-color{
          width: 87px;
          height: 36px;
          border: 2px solid #707070;
          opacity: 1;
        }

        #ruler-position{
          width: 79px;
        height: 30px;
        border: 2px solid #CECECE;
        opacity: 1;
        font: normal normal normal 20px/27px Segoe UI;
        }

        #toggleButtonDesign{
          width: 60px;
          height: 30px;
          opacity: 1;
        }
        

        #font-style-select{
          width: 391px;
        height: 46px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 2px solid #CECECE;
        padding-left: 16px;
        padding-top: 5px;
        padding-bottom: 10px;
        margin-bottom: 12px;
        font: normal normal normal 20px/27px Segoe UI;
        text-align: left;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        cursor:pointer;
        }


        #font-size-input{
          width: 101px;
        height: 43px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 2px solid #CECECE;
        padding: 0px 0px 0px 20px;
            font: normal normal normal 20px/27px Segoe UI;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        }

        #letter-space-input{
              width: 60px;
        height: 41px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 2px solid #CECECE;
        opacity: 1;
        font: normal normal normal 20px/27px Segoe UI;
        text-align: center;

        }

        #line-height-input{
          width: 68px;
          height: 41px;
          font: normal normal normal 20px/27px Segoe UI;
          text-align: center;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 2px solid #CECECE;
          opacity: 1;
          padding: 0px 0px 0px 0px;
        }

        #stylesContainer{
          margin-top: 4px;
          width: 422px;
          height: 219px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 3px solid #707070;
          border-radius: 20px;
          opacity: 1;
          left: -300px;
        }

        #save-button{
            width: 121px;
        height: 39px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #707070;
        border-radius: 8px;
        margin-left: 155px;
        margin-right: 146px;
        margin-bottom: 19px;
        margin-top: 23px;
        text-align: center;
        font: normal normal normal 20px/27px Segoe UI;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        display: flex;
        justify-content: center;
        cursor:pointer;
        }

        .options{
          padding-left: 29px;
        padding-top: 13px;
        padding-right: 24px;
        }

        #letterSpaceInput{
          margin-left: 27px;
          margin-right: 8px;
          
        }
        #lineHeightInput{
          margin-left: 28px;
          margin-right: 8px;
        }
    
</style>

</head>
<body>
  <div id="readerModeBody">
  <div id="dysleviaRulerDiv" style="width: 100%;display:none;position: fixed;left: 0%;opacity: 0.5;"></div>
  <div id="editOptions">
    <img id="printBtn" alt="Print" title="Print" style="margin-right: 10px; cursor: pointer;"/>
    <img id="saveBtn" alt="Save" title="Save" style="margin-right: 10px; cursor: pointer;"/>
    <img id="themeDiv" alt="ThemeChange" title="Change Mode" style="margin-right: 10px; cursor: pointer;"/>
    <img id="fullPage" alt="fullPage" title="Fullscreen" style="margin-right: 10px; cursor: pointer;"/>


    <div class="image-container" id="container3">
      <img id="rulerDiv" alt="ruler" title="Dyslexia Ruler" style="margin-right: 10px;"/>
      <div class="overlay2" id="rulerContainer">

        <div class="options">

        <div style="display: flex;  margin-top:1%; margin-bottom:2%">
        <span id="rulerTitle">Ruler</span>
        <label class="toggle">
          <input id="dyslexiaRulerFlag" type="checkbox">
          <span id="toggleButtonDesign" class="slider"></span>
        </label>
        </div>

        <div style="display: flex;  margin-bottom:2%">
          <label id="rulerColorTitle" for="ruler-color">Ruler Color</label>
          <input type="color" id="ruler-color"/>
        </div>
        
          <div style="display: flex;  margin-bottom:2%">
            <label id="rulerHeightTitle" for="ruler-height">Ruler Height</label>
            <input type="number" id="ruler-height" min="10" max="250" step="1" value="100" />
          </div>


          <div style="display: flex;">
            <label id="rulerPositionTitle" for="ruler-position">Ruler Position</label>
            <input type="number" id="ruler-position" min="10" max="90" step="1" value="10" />
          </div>
      </div>

        <button id="ruler-properties-save">save</button>
      </div>
    </div>

    <div class="image-container" id="container1">
      <img id="checkingDiv" alt="StyleChange" title="Change Styles" style="margin-right: 10px;"/>
      <div class="overlay" id="stylesContainer">
        <div class="custom-div">
            <select id="font-style-select">
              <option value="Sans-serif" selected>Sans-serif</option>
              <option value="Verdana">Verdana</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="monospace">Monospace</option>
              <option value="Georgia">Georgia</option>
              <option value="cursive">Cursive</option>
              <option value="Roboto">Roboto</option>
            </select>

            <div style="display:flex;">
            <input type="number" id="font-size-input" placeholder="Font Size" value="20" />

            <img id="letterSpaceInput" alt="letter space input" title="Letter space input" />

            <input type="number" id="letter-space-input" placeholder="Letter Space" value="0" />


            <img id="lineHeightInput" alt="letter Height input" title="Letter Height input" />

            <input type="number" id="line-height-input" placeholder="Line Height" value="1.84" />

            
           </div>
        </div>
        <button id="save-button">Save</button>
      </div>
    </div>

    <img id="closeBtn" alt="Close" title="Close" style="margin-right: 10px; cursor: pointer;"/>
  
</div>
  

  <div id=readerModeContent>

  <div style="margin-bottom: 5%;display: flex;flex-direction: column;">
    <a id="pageURL" target="_blank" style="color: #ff4d4d;"></a>
    <span style="margin-top: 2%;" id="readingTime"></span>
  </div>

      ${extractedFinalData}
  </div>  
</div>
</body>
</html>`

  let readerModeContentWindow =
    readerModeIframe.contentWindow || readerModeIframe.contentDocument.document || readerModeIframe.contentDocument
  readerModeContentWindow.document.open()
  readerModeContentWindow.document.write(readerModeHTML)

  let readerModeContext = document.querySelector('#myframe').contentWindow.document
  let editReaderModeContent = readerModeContext.querySelector('#readerModeContent')

  const letterSpaceInputImg = readerModeContext.getElementById('letterSpaceInput')
  const lineHeightInputImg = readerModeContext.getElementById('lineHeightInput')

  letterSpaceInputImg.src = chrome.runtime.getURL('./images/spacing (1).svg')
  lineHeightInputImg.src = chrome.runtime.getURL('./images/spacing.svg')

  //Reading Time Calculation and Updatin the current page Link
  const pageURLEle = readerModeContext.getElementById('pageURL')
  const readingTimeEle = readerModeContext.getElementById('readingTime')

  const calculateReadingTime = () => {
    const mainContent = editReaderModeContent.innerText
    const wordsPerMinute = 225
    const totalWords = mainContent.trim().split(/\s+/).length
    const readingTime = Math.ceil(totalWords / wordsPerMinute)
    return readingTime
  }

  readingTimeEle.textContent = calculateReadingTime() + ' min read'
  pageURLEle.href = currentPageURL
  pageURLEle.textContent = currentPageURL


  //For Style Div element
  let styleDiv = readerModeContext.getElementById('checkingDiv')
  styleDiv.src = chrome.runtime.getURL('./images/Group 12.svg')

  const fontStyleSelect = readerModeContext.getElementById('font-style-select')
  const fontSizeInput = readerModeContext.getElementById('font-size-input')
  const letterSpaceInput = readerModeContext.getElementById('letter-space-input')
  const lineHeightInput = readerModeContext.getElementById('line-height-input')

  //Extracting from local storage and updating the New page
  chrome.storage.local.get(['styleDivProperties']).then((result) => {
    let styleDivProperties = result.styleDivProperties

    if (styleDivProperties) {
      editReaderModeContent.style.fontFamily = styleDivProperties.fontStyle
      editReaderModeContent.style.fontSize = styleDivProperties.fontSize
      editReaderModeContent.style.letterSpacing = styleDivProperties.letterSpace
      editReaderModeContent.style.lineHeight = styleDivProperties.lineHeight

      fontStyleSelect.value = styleDivProperties.fontStyle
      fontSizeInput.value = styleDivProperties.fontSize
      letterSpaceInput.value = styleDivProperties.letterSpace
      lineHeightInput.value = styleDivProperties.lineHeight
    }
  })

  styleDiv.addEventListener('click', () => {
    let container = readerModeContext.getElementById('container1')
    container.classList.toggle('open')

    let container2 = readerModeContext.getElementById('container3')
    container2.classList.remove("open")
  })

  const applyStyleUpdate = (inputElement, styleProperty) => {
    if (inputElement) {
      inputElement.addEventListener('input', (event) => {
        const newValue = event.target.value

        if(styleProperty== "fontSize"){
          editReaderModeContent.style[styleProperty] = `${newValue}px`
        }
        else if(styleProperty== "letterSpacing"){
          editReaderModeContent.style[styleProperty] = `${newValue}px`
        }
        else{
          editReaderModeContent.style[styleProperty] = newValue
        }       
      })
    }
  }

  applyStyleUpdate(fontStyleSelect, 'fontFamily')
  applyStyleUpdate(fontSizeInput, 'fontSize')
  applyStyleUpdate(letterSpaceInput, 'letterSpacing')
  applyStyleUpdate(lineHeightInput, 'lineHeight')

  //Saving selected options to storage
  const saveButton = readerModeContext.getElementById('save-button')
  saveButton.addEventListener('click', () => {
    const styleDivProperties = {
      fontStyle: fontStyleSelect.value,
      fontSize: fontSizeInput.value,
      letterSpace: letterSpaceInput.value,
      lineHeight: lineHeightInput.value,
    }
    //Saving into storage
    chrome.storage.local.set({ styleDivProperties })

    let container = readerModeContext.getElementById('container1')
      container.classList.toggle('open')

  })


  // //For changing from dark mode to light mode
  // let themeMode = 'light'
  // let themeDiv = readerModeContext.getElementById('themeDiv')
  // themeDiv.src = chrome.runtime.getURL('./images/Group9.svg')

  // let changeThemeEditOptions = readerModeContext.querySelector('#editOptions')

  // const setTheme = (theme) => {
  //   const bodyStyle = readerModeContext.body.style
  //   const aTags = readerModeContext.querySelectorAll('a')

  //   if (theme === 'light') {
  //     bodyStyle.color = 'black'
  //     bodyStyle.backgroundColor = 'white'

  //     aTags.forEach((aTag) => {
  //       aTag.style.color = 'black'
  //     })
  //   } else if (theme === 'dark') {
  //     bodyStyle.color = 'white'
  //     bodyStyle.backgroundColor = 'black'
  //     aTags.forEach((aTag) => {
  //       aTag.style.color = 'white'
  //     })
  //   }
  // }

  // themeDiv.addEventListener('click', () => {
  //   if (themeDiv.src.includes('Group9.svg')) {
  //     setTheme('dark')
  //     themeMode = 'dark'

  //     styleDiv.src = chrome.runtime.getURL('./images/Group 21.svg')
  //     themeDiv.src = chrome.runtime.getURL('./images/Group14.svg')
  //     rulerDiv.src = chrome.runtime.getURL('./images/Group 20.svg')
  //     readerModePrint.src = chrome.runtime.getURL('./images/Group 16.svg')
  //     readerModeSave.src = chrome.runtime.getURL('./images/Group 17.svg')
  //     readerModeFullScreen.src = chrome.runtime.getURL('./images/Group19.svg')
  //     readerModeClose.src = chrome.runtime.getURL('./images/Group 23.svg')

  //     chrome.storage.local.set({ themeMode })
  //     themeDiv.src = chrome.runtime.getURL('./images/Group24.svg')
  //   } else {
  //     setTheme('light')
  //     themeMode = 'light'
  //     styleDiv.src = chrome.runtime.getURL('./images/Group 12.svg')
  //     themeDiv.src = chrome.runtime.getURL('./images/Group24.svg')
  //     rulerDiv.src = chrome.runtime.getURL('./images/Group 11.svg')
  //     readerModePrint.src = chrome.runtime.getURL('./images/Group 7.svg')
  //     readerModeSave.src = chrome.runtime.getURL('./images/Group 8.svg')
  //     readerModeFullScreen.src = chrome.runtime.getURL('./images/Group10.svg')
  //     readerModeClose.src = chrome.runtime.getURL('./images/Group 13.svg')

  //     chrome.storage.local.set({ themeMode })
  //     themeDiv.src = chrome.runtime.getURL('./images/Group9.svg')
  //   }
  // })

  // chrome.storage.local.get(['themeMode']).then((result) => {
  //   let themeMode = result.themeMode
  //   setTheme(themeMode)
  // })


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



  let readerModeClose = readerModeContext.getElementById('closeBtn')
  readerModeClose.src = chrome.runtime.getURL('./images/Group 13.svg')

  let readerModePrint = readerModeContext.getElementById('printBtn')
  readerModePrint.src = chrome.runtime.getURL('./images/Group 7.svg')

  let readerModeSave = readerModeContext.getElementById('saveBtn')
  readerModeSave.src = chrome.runtime.getURL('./images/Group 8.svg')

  let readerModeFullScreen = readerModeContext.getElementById('fullPage')
  readerModeFullScreen.src = chrome.runtime.getURL('./images/Group10.svg')

  //PRINTING AND DISCARDING
  let readerModePrintable = document.querySelector('#myframe').contentWindow

  readerModeSave.addEventListener('click', () => {
    chrome.storage.local.get(["readerModeSavedPages"]).then((result) => {
      readerModeSavedPages=result.readerModeSavedPages
    })
    if (!readerModeSavedPages.includes(currentPageURL)) {
      readerModeSavedPages.push(currentPageURL)
      alert("Page saved and can be seen in Options page")
      chrome.runtime.sendMessage({ action: 'openOptionsPage' });
      chrome.storage.local.set({ readerModeSavedPages })
    }
    else{
      alert("Page already saved and can be seen in Options page")
      chrome.runtime.sendMessage({ action: 'openOptionsPage' });
    }
  })

  readerModePrint.addEventListener('click', () => {
    editReaderModeContent.style.marginLeft = '0px'
    editReaderModeContent.style.marginRight = '0px'
    changeThemeEditOptions.style.display = 'none'
    dysleviaRulerDiv.style.display = 'none'

    readerModePrintable.print()

    editReaderModeContent.style.marginLeft = '25%'
    editReaderModeContent.style.marginRight = '25%'
    changeThemeEditOptions.style.display = 'flex'
    if (statusFlag) {
      dysleviaRulerDiv.style.display = 'block'
    }
  })

  readerModeClose.addEventListener('click', () => {
    document.getElementById('myframe').remove()
    document.getElementById('blurryDiv').remove()

    //FOR ENABLING THE SCROLLING IN ORIGINAL WEBSITE
    window.onscroll = function () {}
  })

  readerModeFullScreen.addEventListener('click', () => {
    if (readerModeFullScreen.src.includes('Group10.svg')) {
      document.documentElement.requestFullscreen()
      readerModeFullScreen.src = chrome.runtime.getURL('./images/Group15.svg')
    } else if (readerModeFullScreen.src.includes('Group15.svg')) {
      readerModeFullScreen.src = chrome.runtime.getURL('./images/Group10.svg')
      document.exitFullscreen()
    } else if (readerModeFullScreen.src.includes('Group19.svg')) {
      document.documentElement.requestFullscreen()
      readerModeFullScreen.src = chrome.runtime.getURL('./images/Group25.svg')
    } else if (readerModeFullScreen.src.includes('Group25.svg')) {
      readerModeFullScreen.src = chrome.runtime.getURL('./images/Group19.svg')
      document.exitFullscreen()
    }
  })

  //DISABLING RIGHT CLICK WHEN OUR IFRAME IS OPEN
  readerModeContentWindow.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });
}

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.message == 'start') {

    //MOVING TO TOP
    window.scrollTo(0, 0)
    currentPageURL = window.location.href
    console.log("about to store ", currentPageURL)
    chrome.storage.local.set({currentPageURL});
    console.log("2 - Request received! - ", currentPageURL)
    await FetchApi(currentPageURL)
  }
})
