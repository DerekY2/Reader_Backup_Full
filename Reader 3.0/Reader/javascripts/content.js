var title, excerpt, content,article_url,author,reading_time,tag_list, lastLogTime;
///
// Settings
var cr_theme = "cr-theme-custom";
var cr_font_family = "Arial";
var cr_font_size = 16;
var cr_line_height = 1;
var cr_letter_space = 0;
var cr_max_width = 680;
var cr_default_css = `
  #cr-body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }

  #cr-body a{
    text-decoration: none;
  }

  #cr-meta{
  }

  #cr-outline{
    width: 250px;
    position: fixed;
    top: 65px;
    left: 30px;
  }

  #cr-content-wrapper a{
    text-decoration: underline;
  }

  h1#cr-title,
  #cr-content h1,
  #cr-content h2,
  #cr-content h3,
  #cr-content h4,
  #cr-content h5,
  #cr-content h6 {
    font-weight: 700;
    line-height: 1.3em;
    font-family: inherit;
    margin-top: 1.6em;
    margin-bottom: 0.8em;
  }
  #cr-content #cr-title{
    margin-top: 40px;
  }
  #cr-content p{
    word-break: break-word;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
  #cr-content figure{
    padding: 0;
    margin: 0;
  }
  #cr-content img{
    max-width: 100% !important;
    height: auto !important;
    margin: 30px auto;
    display: block;
  }
  #cr-content table{
    border-spacing: 0px;
    border-collapse: collapse;
  }
  #cr-content table td, #cr-content table th {
    text-align: left;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(229, 229, 229);
    border-image: initial;
    padding: 17px;
  }
  #cr-content blockquote {
    text-decoration: none;
    opacity: 0.7;
  }
  #cr-content blockquote:before {
    content: '\e244';
    font-family: 'Material Icons';
    float: left;
    font-size: 350%;
    font-style: normal;
    font-weight: normal;
    line-height: 0.6;
    opacity: 0.2;
  }
`;
var cr_background_color_light = "#FFFFFF";
var cr_text_color_light = "#333333";
var cr_link_color_light = "#5F6368";
var cr_background_color_dark = "#35363a";
var default_background_color_dark = "#35363a"
var default_background_color_light = "#FFFFFF"
var cr_text_color_dark = "#E0E0E0";
var cr_link_color_dark = "#FFFFFF";
var cr_background_color = "#F8F1E3";
var cr_text_color = "#333333";
var cr_link_color = "#5F6368";
var cr_theme = "cr-theme-custom";
var cr_dark_panel = "on";
var cr_display_footer = "off";
var cr_display_outline = "off";
var cr_display_images = "on";
var cr_display_meta = "on";
var cr_display_author = "on";
var cr_display_reading_time = "on";

// Encode/Decode HTML based on LZW compression
function compressHTML(document) {
  var charCodeAt = 'charCodeAt',
    index,
    storageArray = {},
    inputChars = document.split(""),
    compressedCodes = [],
    currentSequence = inputChars[0],
    arrayIndex = 256;

  for (index = 1; index < inputChars.length; index++) {
      document = inputChars[index];

      if (null != storageArray[currentSequence + document]) {
          currentSequence += document;
      } else {
          compressedCodes.push(1 < currentSequence.length ? storageArray[currentSequence] : currentSequence[charCodeAt](0));
          storageArray[currentSequence + document] = arrayIndex;
          arrayIndex++;
          currentSequence = document;
      }
  }

    if (1 < currentSequence.length) {
      compressedCodes.push(storageArray[currentSequence]);
    } else {
      compressedCodes.push(currentSequence[charCodeAt](0));
    }
  
  for (index = 0; index < compressedCodes.length; index++) {
      compressedCodes[index] = String.fromCharCode(compressedCodes[index]);
  }

  return compressedCodes.join("");
}


function decompressHTML(doc) {
var currentChar, dictionary = {},
  inputChars = doc.split(""),
  currentSequence = firstChar = inputChars[0],
  decompressed = [firstChar],
  arrayIndex = nextCode = 256;

for (var i = 1; i < inputChars.length; i++) {
    currentChar = inputChars[i].charCodeAt(0);
    // currentChar = arrayIndex > currentChar ? inputChars[i] : (dictionary[currentChar] ? dictionary[currentChar] : firstChar + currentSequence);

    if (arrayIndex > currentChar) {
      currentChar = inputChars[i];
    } else {
      if (dictionary[currentChar]) {
          currentChar = dictionary[currentChar];
      } else {
          currentChar = firstChar + currentSequence;
      }
    }
  
    decompressed.push(currentChar);
    currentSequence = currentChar.charAt(0);
    dictionary[nextCode] = firstChar + currentSequence;
    nextCode++;
    firstChar = currentChar;
}

return decompressed.join("");
}
// Copy to clipboard
function media_clipboard(doc, item){
  $(doc).find(item).click(function(){
    let str = $(this).attr('data-clipboard-text');
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    btn_clipboard_copy = $(doc).find(item+" .fa-copy");
    $("<span class='btn-clipboard-copied'>Copied!</span>").insertBefore( btn_clipboard_copy ).fadeOut(1000, function() { $(this).remove() });
  });
}

// Tag fields
function init_tags(doc, item){
  $(doc).find(item).tagit({
    placeholderText: "Tags...",
    availableTags: ["read-it-later", "research"],
    //tagLimit: 5,
    onTagLimitExceeded: function(event, ui){
      //$(".tag-limit-alert").show();
    },
    afterTagRemoved: function(event, ui){
      tag_list = $(doc).find(item).val();
    }
  });
}

// Check if string is empty
function isEmpty(value) {
  return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

// Toggle display outline
function outlineDisplayToggle(doc) {
  var outline = $(doc).find("#cr-outline");

  // Hide Sidebar when the first page reload if mobile
  var width = $(window).width();

  if(width <= 1280){
    $(outline).hide();
    $(outline).css('width', '0');
  } else {
    $(outline).show();
    outline.css('width', '250px');
  }

  // Hide Sidebar when the first page reload if resized
  $(window).resize(function() {
    width = $(window).width();
    if(width <= 1280){
      $(outline).hide();
      $(outline).css('width', '0');
    } else {
      $(outline).show();
      $(outline).css('width', '250px');
    }
  });
}


// Return preloader html
function getPreloader(){
  var preloader = `<div id='cr-pre-loader' style='
      width: 250px;
      height: 100px;
      text-align: center;
      font-family: "Helvetica Neue";
      font-weight: 200;
      color: #c1c1c1;
      letter-spacing: 0.5;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%); /* for IE 9 */
      -webkit-transform: translate(-50%, -50%); /* for Safari */
    '>
      <style>
        @keyframes pulse {
          0% { transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3); }
          70% { transform: scale(1);box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
          100% { transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
        }
      </style>
      <div class="blobs-container text-center" style="margin: 0px auto;margin-bottom: 30px;width: 50px;">
        <div class="blob" style="
          background: #dddddd;
          border-radius: 50%;
          margin: 10px;
          height: 20px;
          width: 20px;
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
          transform: scale(1);
          animation: pulse 2s infinite;"
        >
        </div>
      </div>
      <p>Loading...</p>
    </div>`;

  return preloader
}

function rateLimitLog(message, val) {
  const currentTime = Date.now();
  
  if (currentTime - lastLogTime >= 1000) { // Check if one second has passed
    console.log(message, val);
    lastLogTime = currentTime; // Update last log time
  }
  else if(lastLogTime == null){
    lastLogTime = 0;
  }
}


// Added pre-loader
function startPreloader(doc){
  //pulse_preloader_url = chrome.runtime.getURL('assets/images/pulse-preloader.svg');
  preloader = getPreloader();
  $(doc).find("body").prepend(preloader);
}

// Create iframe
function createIframe(){
  var iframe = document.createElement('iframe');
  iframe.id = "cr-iframe";
  iframe.style.height = "100%";
  iframe.style.width="100%";
  iframe.style.position = "fixed";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.zIndex = "9000000000000000000";
  iframe.frameBorder = "none";
  iframe.style.backgroundColor = "#fff";

  preloader = getPreloader();
  $(iframe).contents().find('body').html(preloader);

  return iframe;
}

/* Get HTML Of Selected Text */
function getHTMLOfSelection () {
  var range;
  if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    return range.htmlText;
  }
  else if (window.getSelection) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      var clonedSelection = range.cloneContents();
      var div = document.createElement('div');
      div.appendChild(clonedSelection);
      return div.innerHTML;
    }
    else {
      return '';
    }
  }
  else {
    return '';
  }
}

// Parse the article
function getParsedArticle(){
  var loc = document.location;
  var uri = {
    spec: loc.href,
    host: loc.host,
    prePath: loc.protocol + "//" + loc.host,
    scheme: loc.protocol.substr(0, loc.protocol.indexOf(":")),
    pathBase: loc.protocol + "//" + loc.host + loc.pathname.substr(0, loc.pathname.lastIndexOf("/") + 1)
  };

  var doc_to_parse;

  selected_text = getHTMLOfSelection();
  if(selected_text != "") {
    doc_to_parse = new DOMParser().parseFromString(selected_text, "text/html");
  } else {
    /*
    * Readability's parse() works by modifying the DOM. This removes some elements in the web page.
    * So to avoid this, we are passing the clone of the document object while creating a Readability object.
    */
    doc_to_parse = document.cloneNode(true);
  }

  var article = new Readability(uri, doc_to_parse).parse();

  return article;
}

// Remove unnecassary stuffs from content
function trimContent(doc){
  $(doc).find("#cr-content span:contains('Image copyright')").css("display","none");
  $(doc).find("#cr-content figcaption").css("display","none");
}

// Turn title/text into url friendly slug
function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// Set Outline list
function setOutline(doc, article) {
  if (article.title && article.title != "") {
    $(doc).find("#cr-outline-list").append("<li><a href='#cr-title'>"+article.title+"</a></li>");
  }
  $(article.content).find("h1, h2, h3, h4, h5, h6").each(function(){
    var heading = $(this).text();
    var slug = slugify(heading);
    $(doc).find("#cr-outline-list").append("<li><a href='#"+slug+"'>"+heading+"</a></li>");
  });
}

// Set slug to headings for outline list
function setHeadingsForOutline(doc){
  $(doc).find("h1, h2, h3, h4, h5, h6").each(function(){
    var heading = $(this).text();
    var slug = slugify(heading);

    if ( $(this).attr("id") != "cr-title" ) {
      $(this).attr("id", slug)
    }
  });
}

// Add styletag to iframe
function addStyleTags(doc){
  style_url = chrome.runtime.getURL("styles/content.css");
  $(doc).find('head').append("<link rel='stylesheet' type='text/css' href='"+style_url+"'>");

  style_url = chrome.runtime.getURL("styles/base.css");
  $(doc).find('head').append("<link rel='stylesheet' type='text/css' href='"+style_url+"'>");

  style_url = chrome.runtime.getURL("styles/options-panel.css");
  $(doc).find('head').append("<link rel='stylesheet' type='text/css' href='"+style_url+"'>");

  style_url = chrome.runtime.getURL("styles/fontawesome-all.css");
  $(doc).find('head').append("<link rel='stylesheet' type='text/css' href='"+style_url+"'>");

  style_url = chrome.runtime.getURL("styles/tag-it.css");
  $(doc).find('head').append("<link rel='stylesheet' type='text/css' href='"+style_url+"'>");

  style_url = chrome.runtime.getURL("styles/semantic.css");
  $(doc).find('head').append("<link rel='stylesheet' type='text/css' href='"+style_url+"'>");
}

//Get status from checkbox
function getCheckboxStatus(checkbox){
  var status;
  if ($(checkbox).is(':checked')) { status = "on"; } else { status = "off"; }
  return status;
}

/*** Scrolling ***/
var scrolling = false;
function startStopScrolling(doc){
  start_btn = $(doc).find("#options-manual-scroll .start");
  stop_btn = $(doc).find("#options-manual-scroll .stop");
  speed = parseInt( $(doc).find("#options-scroll-speed input").val() );

  if (scrolling == false) {
    $(doc).find('html, body').animate({scrollTop:$(doc).height()}, speed);

    $(start_btn).hide();
    $(stop_btn).show();
    scrolling = true;
  } else {
    $(doc).find("body").stop();
    $(start_btn).show();
    $(stop_btn).hide();
    scrolling = false;
  }
}
function optionsManualScroll(doc){
  $(doc).find("#options-manual-scroll").click(function(){
    startStopScrolling(doc);
  });
}


/*** Delete & Undo Deleted Element ***/
var deleted_elements = [];
var last_element;
function startDeleteElement(doc) {
  var content_container = $(doc).find("#cr-content-container");
  var mouseFunc = function (e) {
    var selected = e.target;

    if (last_element != selected)  {
      if (last_element != null) {
        $(last_element).removeClass("deletion-mode-hovered");
      }

      $(selected).addClass("deletion-mode-hovered");
      last_element = selected;
    }
  }, clickFunc = function(e) {
    e.preventDefault();

    selected = e.target;
    $(selected).removeClass("deletion-mode-hovered");

    let actionObj;
    let parent = selected.parentNode;
    actionObj = {
      "type": "delete",
      "index": Array.from(parent.children).indexOf(selected),
      "parent": parent,
      "elem": parent.removeChild(selected)
    };
    deleted_elements.push(actionObj);
    $(doc).find("#options-delete-element-undo").show();
  }, escFunc = function(e) {
    // Listen for the "Esc" key and exit if so
    if(e.keyCode === 27) {
      exitFunc();
    }
  }, exitFunc = function() {
    $(content_container).off('mouseover', mouseFunc);
    $(content_container).off('click', clickFunc);
    $(doc).off('keydown', escFunc);

    $(doc).find(".deletion-mode-hovered").removeClass("deletion-mode-hovered");
    $(doc).find("#options-delete-element").show();
    $(doc).find("#options-delete-element-stop").hide();
  }

  $(content_container).on('mouseover', mouseFunc);
  $(content_container).on('click', clickFunc);
  $(doc).on('keydown', escFunc);

  $(doc).find("#options-delete-element-stop").click(function(){
    exitFunc();
  });
}
function undoDeletedElement(doc) {
  let actionObj = deleted_elements.pop();

  if(actionObj) {
    actionObj.parent.insertBefore(actionObj.elem, actionObj.parent.children[actionObj.index]);
  }

  if(deleted_elements.length === 0) {
    $(doc).find("#options-delete-element-undo").hide();
  }
}

/*** Toolbar ***/
var selection;
var selectedContent;
var range;
var rect;
function toolbarDisplayToggle(doc) {
  $(doc).find("#cr-content-container").mouseup(function(event) {
    selection = doc.getSelection();

    if ( (selection.type === 'Range') &&
      !$(event.target).hasClass("tlite") &&
      !$(event.target).hasClass("no-close") &&
      ( $(event.target).attr("id") != "cr-toolbar-note-form-textarea" )
    ) {
      selectedContent = selection.toString();
      range = selection.getRangeAt(0).cloneRange();
      rect = range.getBoundingClientRect();

      showToolbar(rect, doc);
    } else {
      var toolbar_id = "cr-toolbar";
      var parent = $(event.target).parent();
      if ( ($(event.target).attr("id") != toolbar_id) &&
        ($(parent).attr("id") != toolbar_id) &&
        ($(parent).parent().attr("id") != toolbar_id)
      ) {
        $(doc).find("#cr-toolbar").hide();
        $(doc).find("#cr-toolbar-note-form").hide();
      }
    }
  });
}
function showToolbar(rect, doc) {
  // toolbar element only create once
  var toolbar = doc.getElementById("cr-toolbar");

  // caculate the position of toolbar
  var toolbarWidth = toolbar.offsetWidth;
  var toolbarHeight = toolbar.offsetHeight;
  //toolbar.style.left = `${(rect.right - rect.left) / 2 + rect.left - toolbarWidth / 2}px`;
  //toolbar.style.top = `${rect.top - toolbarHeight - 4 + doc.body.scrollTop}px`;

  //toolbar.style.top = `${rect.top - toolbarHeight - 50 + doc.body.scrollTop}px`;
  //toolbar.style.left = `calc(${rect.left}px - 30%)`;

  //toolbar.style.top = $(selection).offset().top + "px";
  //toolbar.style.left = ($(selection).offset().right + $(this).width()) + "px";

  toolbar.style.left = (window.pageXOffset + rect.x + (rect.width - $(toolbar).width()) / 2)/2;
  toolbar.style.top = `${rect.top - toolbarHeight - 50 + doc.body.scrollTop}px`;

  $(toolbar).show();
}
function toolbarNoteFormToggle(doc){
  $(doc).find("#cr-toolbar-note").click(function(e){
    $(doc).find("#cr-toolbar-note-form").toggle();
  });
}
function toolbarActionsHandler(doc){
  

  // Translate
  $(doc).find("#cr-toolbar-translate").click(function(){
    if (selectedContent != ""){
      translateText(doc, selectedContent);
    } else {
      alert("Text cannot be empty!");
    }
  });

  // Search
  $(doc).find("#cr-toolbar-search").click(function(){
    if (selectedContent != ""){
      searchText(selectedContent);
    } else {
      alert("Text cannot be empty!");
    }
  });

  // Share to Twitter
  $(doc).find("#cr-toolbar-share-twitter").click(function(){
    if (selectedContent != ""){
      shareTwitter(selectedContent);
    } else {
      alert("Text cannot be empty!");
    }
  });
}

// Toggle accordian content
function optionsAccordian(doc){
  $(doc).find("#options-main-panel .options-panel-header").click(function(){
    if ( $(this).next().is(":visible") ) {
      original_state = "visible";
    } else {
      original_state = "hidden";
    }

    $(doc).find("#options-main-panel .options-panel-header").removeClass("active");
    $(doc).find("#options-main-panel .options-panel-content").removeClass("active");
    $(doc).find("#options-main-panel .options-panel-content").hide();

    if ( original_state == "visible" ) {
      $(this).removeClass("active");
      $(this).next().removeClass("active");
      $(this).next().slideUp(500);
    } else {
      $(this).addClass("active");
      $(this).next().addClass("active");
      $(this).next().slideDown(500);
    }
  });
}

// Colorpicker input field handler
function optionsColorPicker(doc){
  $(doc).on('change', 'input[type=color]', function() {
    $(this.parentNode).next().val($(this).val());
    this.parentNode.style.backgroundColor = this.value;
  });
}

function readingTime(text) {
  var wordsPerMinute = 200;
  var noOfWords = text.split(/\s/g).length;
  var minutes = noOfWords / wordsPerMinute;
  var readTime = Math.ceil(minutes);
  //var `${readTime} minute read`;
  //if (readTime == 0) || (readTime == 1) {
  //  return readTime + " minute read";
  //} else{
  //  return readTime + " minutes read";
  //}

  return readTime;
}

function shareTwitter(text) {
  var twitter_url = "https://twitter.com/intent/tweet?text=";
  var current_url = window.location.href;
  selectedText = text;
  selectedText = encodeURIComponent(text);
  var share_text = '"'+selectedText+'" - ' + current_url + ' via @readermode';
  popupwindow(twitter_url + share_text, 'Share', 550, 295);
}



/*** Search ***/
function searchText(text) {
  var search_url ='https://google.com/search?q=';
  popupwindow(search_url + encodeURIComponent(text), 'Search', 900, 540);
}

function translateText(doc, text) {
  var translate_url = 'https://translate.google.com/#auto/';
  var translate_to_language = $(doc).find("#options-translate-to select").find(":selected").val();
  popupwindow(translate_url + translate_to_language + '/' + text, 'Translate', 900, 540);
}

function popupwindow(url, title, w, h) {
  let left = screen.width / 2 - w / 2;
  let top = screen.height / 2 - h / 2;
  return window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  );
}

// Save setting's value to storage
function saveStorageValue(storage, val) {
  chrome.storage.sync.set({[storage]: val});
}

function setFontFamily(doc, val, save) {

    cr_font_family = val;
    if(save){
    chrome.storage.sync.set({cr_font_family: val});
    }
  $(doc).find('#cr-content-container').css( "font-family", val );
  $(doc).find(`#options-font-family select option[value='${val}']`).prop('selected', true);
}
function setFontSize(doc, val, save) {
 
    cr_font_size = val;
    if(save){
    chrome.storage.sync.set({cr_font_size: val});
    }
  $(doc).find("#cr-content-container").css( "font-size", val );
  $(doc).find("#options-font-size input").val(  val );
  $(doc).find("#options-font-size .val").text(  val );
}
function setLineHeight(doc, val, save) {

    cr_line_height = val;
    if(save){
    chrome.storage.sync.set({cr_line_height: val});
    }
  $(doc).find("#cr-content-container").css( "line-height", val );
  $(doc).find("#options-line-height input").val(  val );
  $(doc).find("#options-line-height .val").text(  val );
}
function setLetterSpace(doc, val, save) {

    cr_letter_space = val;
    if(save){
    chrome.storage.sync.set({cr_letter_space: val});
    }
  $(doc).find("#cr-content-container").css( "letter-spacing", val );
  $(doc).find("#options-letter-space input").val(  val );
  $(doc).find("#options-letter-space .val").text(  val );
}
function setMaxWidth(doc, val, save) {
  
    cr_max_width = val;
    if(save){
    chrome.storage.sync.set({cr_max_width: val});
    }

  cr_max_width = val;
  $(doc).find("#cr-container").css( "max-width", val );
  $(doc).find("#options-max-width .val").attr( "value", val );
  $(doc).find("#options-max-width .val").text(  val );
}
function setBackgroundColor(doc, val, theme, save) {
  if (theme == "cr-theme-light") {
    cr_background_color_light = default_background_color_light;
    console.log("set background color to ", default_background_color_light)
    if(save){
    chrome.storage.sync.set({cr_background_color_light: default_background_color_light});
    }
  } else if (theme == "cr-theme-dark"){
    cr_background_color_dark = default_background_color_dark;
    console.log("set background color to ", val)
    if(save){
    chrome.storage.sync.set({cr_background_color_dark: default_background_color_dark});
    }
  } else if (theme == "cr-theme-custom"){
    cr_background_color = val;
    rateLimitLog("set background color to ", val)
    if(save){
    chrome.storage.sync.set({cr_background_color: val});
    console.log("stored custom color ", val)
    }
  } else {
  }

  $(doc).find("#cr-body").css( "background-color", val );
  $(doc).find("#options-theme ul li a[data-theme='"+theme+"']").css("background-color", val);

  $(doc).find("#options-background-color input[name='background_color']").val( val );
  $(doc).find("#options-background-color input[type='color']").val(  val );
  $(doc).find("#options-background-color label.color").css('background-color', val);
}
function setTextColor(doc, val, theme, save) {
  if (theme == "cr-theme-light") {
    cr_text_color_light = val;
    if(save){
    chrome.storage.sync.set({cr_text_color_light: val})
    }
  } else if (theme == "cr-theme-dark"){
    cr_text_color_dark = val;
    if(save){
    chrome.storage.sync.set({cr_text_color_dark: val})
    }
  } else if (theme == "cr-theme-custom"){
    cr_text_color = val;
    if(save){
    chrome.storage.sync.set({cr_text_color: val})
    }
  } else {
  }

  $(doc).find("#cr-body").css( "color", val );

  $(doc).find("#options-text-color input[name='text_color']").val(  val );
  $(doc).find("#options-text-color input[type='color']").val(  val );
  $(doc).find("#options-text-color label.color").css('background-color', val);
}
function setLinkColor(doc, val, theme, save) {
  if (theme == "cr-theme-light") {
    cr_link_color_light = val;
    if(save){
    chrome.storage.sync.set({cr_link_color_light: val})
    }
  } else if (theme == "cr-theme-dark"){
    cr_link_color_dark = val;
    if(save){
    chrome.storage.sync.set({cr_link_color_dark: val})
    }
  } else if (theme == "cr-theme-custom"){
    cr_link_color = val;
    if(save){
    chrome.storage.sync.set({cr_link_color: val})
    }
  } else {
  }
  $(doc).find("#cr-body").find("a").css( "color", val );

  $(doc).find("#options-link-color input[name='link_color']").val(  val );
  $(doc).find("#options-link-color input[type='color']").val(  val );
  $(doc).find("#options-link-color label.color").css('background-color', val);
}

function setTheme(doc, val, save){
 
    cr_theme = val;
    if(save){
    chrome.storage.sync.set({cr_theme: val});
    }

  $(doc).find("#options-theme ul li a").each(function(){
    if ( $(this).attr("data-theme") == val ) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });
  $(doc).find("#cr-body").attr("class", val);

  if (val == "cr-theme-light") {
    setBackgroundColor(doc, cr_background_color_light, "cr-theme-light");
    setTextColor(doc, cr_text_color_light, "cr-theme-light");
    setLinkColor(doc, cr_link_color_light, "cr-theme-light");
  
  } else if (val == "cr-theme-dark"){
    setBackgroundColor(doc, cr_background_color_dark, "cr-theme-dark");
    setTextColor(doc, cr_text_color_dark, "cr-theme-dark");
    setLinkColor(doc, cr_link_color_dark, "cr-theme-dark");

  } else if (val == "cr-theme-custom"){
    setBackgroundColor(doc, cr_background_color, "cr-theme-custom");
    setTextColor(doc, cr_text_color, "cr-theme-custom");
    setLinkColor(doc, cr_link_color, "cr-theme-custom");
   
  } else {
  }
}
function setDisplayOutline(doc, status, save) {
  if (status == "on") {
    $(doc).find('#cr-outline').show();
    $(doc).find('#options-display-outline input').prop("checked", true);
  } else {
    $(doc).find('#cr-outline').hide();
    $(doc).find('#options-display-outline input').prop("checked", false);
  }
 
    cr_display_outline = status;
    if(save){
    chrome.storage.sync.set({cr_display_outline: status});
    }
  
}
function setDisplayImages(doc, status, save) {
  if (status == "on") {
    $(doc).find('#cr-content-container img').show();
    $(doc).find('#options-display-images input').prop("checked", true);
  } else {
    $(doc).find('#cr-content-container img').hide();
    $(doc).find('#options-display-images input').prop("checked", false);
  }
  if (save) {
    cr_display_images = status;
    
    chrome.storage.sync.set({cr_display_images: status});
    
  }
}

function setDisplayMeta(doc, status, save) {
  if (status == "on") {
    $(doc).find('#cr-container #cr-meta').show();
    $(doc).find('#options-display-meta input').prop("checked", true);
  } else {
    $(doc).find('#cr-container #cr-meta').hide();
    $(doc).find('#options-display-meta input').prop("checked", false);
  }
  if (save) {
    cr_display_meta = status;
    
    chrome.storage.sync.set({cr_display_meta: status});
    
  }
}
function setDisplayAuthor(doc, status, save) {
  if (status == "on") {
    $(doc).find('#cr-container #cr-meta-author').show();
    $(doc).find('#options-display-author input').prop("checked", true);
  } else {
    $(doc).find('#cr-container #cr-meta-author').hide();
    $(doc).find('#options-display-author input').prop("checked", false);
  }
  if (save) {
    cr_display_author = status;
    
    chrome.storage.sync.set({cr_display_author: status});
    
  }
}
function setDisplayReadingTime(doc, status, save) {
  if (status == "on") {
    $(doc).find('#cr-container #cr-meta-reading-time').show();
    $(doc).find('#options-display-reading-time input').prop("checked", true);
  } else {
    $(doc).find('#cr-container #cr-meta-reading-time').hide();
    $(doc).find('#options-display-reading-time input').prop("checked", false);
  }

  if (save) {
    cr_display_reading_time = status;
    
    chrome.storage.sync.set({cr_display_reading_time: status});
    
  }
}

function setDarkPanel(doc, status, save){
  if (status == "on") {
    $(doc).find("#cr-container .options-panel").addClass("options-panel-dark");
    $(doc).find("#options-dark-panel input").prop("checked", true);
  } else {
    $(doc).find("#cr-container .options-panel").attr("class", "options-panel");
    $(doc).find("#options-dark-panel input").prop("checked", false);
  }

  if (save) {
    cr_dark_panel = status;
  
    chrome.storage.sync.set({cr_dark_panel: status});
    
  }
}
function setDisplayFooter(doc, status, save) {
  if (status == "on") {
    $(doc).find('#cr-container #cr-footer').hide();
    $(doc).find('#options-display-footer input').prop("checked", true);
  } else {
    $(doc).find('#cr-container #cr-footer').show();
    $(doc).find('#options-display-footer input').prop("checked", false);
  }
  if (save) {
    cr_display_meta = status;
   
    chrome.storage.sync.set({cr_display_meta: status});
    
  }
}

function setDefaultCss(doc, val, save){
  if (save) {
    cr_default_css = val;
    chrome.storage.sync.set({'cr_default_css': val});
  }
  $(doc).find("#options-default-css textarea").html(val);
  if ($(doc).find("#cr_default_css").length == false) {
    $("<style id='cr_default_css'>").text(val).appendTo(doc.head);
  }
  $(doc).find("#cr_default_css").html(val);
}




/*** Options Listeners & Save ***/
function optionsDefaultSettings(doc) {
  // Options Style
  chrome.storage.sync.get(['cr_font_family'],function(result){setFontFamily(doc, (result.cr_font_family) ? result.cr_font_family : 'Arial', true) });
  chrome.storage.sync.get(['cr_font_size'],function(result){setFontSize(doc, (result.cr_font_size) ? result.cr_font_size : 16, true) });
  chrome.storage.sync.get(['cr_line_height'],function(result){setLineHeight(doc, (result.cr_line_height) ? result.cr_line_height : 1.84, true) });
  chrome.storage.sync.get(['cr_letter_space'],function(result){setLetterSpace(doc, (result.cr_letter_space) ? result.cr_letter_space : 0, true) });
  chrome.storage.sync.get(['cr_max_width'],function(result){setMaxWidth(doc, (result.cr_max_width) ? result.cr_max_width : 680, true) });

  // Themes
  // Theme & DefaultCSS
  chrome.storage.sync.get(['cr_default_css'], function(result) {
    if (result.cr_default_css) {
      setDefaultCss(doc, result.cr_default_css, true);
    } else {
      fetch(chrome.runtime.getURL('styles/default.css')).then(response => response.text()).then(data => {
        setDefaultCss(doc, data, true);
        cr_default_css = data;
      });
    }
  });
  // Light Theme
  chrome.storage.sync.get(['cr_background_color_light'],function(result){ setBackgroundColor(doc, (result.cr_background_color_light ? result.cr_background_color_light : "#FFFFFF"), "cr-theme-light", true) });
  chrome.storage.sync.get(['cr_text_color_light'],function(result){ setTextColor(doc, (result.cr_text_color_light ? result.cr_text_color_light : "#333333"), "cr-theme-light", true) });
  chrome.storage.sync.get(['cr_link_color_light'],function(result){ setLinkColor(doc, (result.cr_link_color_light ? result.cr_link_color_light : "#5F6368"), "cr-theme-light", true) });
   // Dark Theme
  chrome.storage.sync.get(['cr_background_color_dark'],function(result){ setBackgroundColor(doc, (result.cr_background_color_dark ? result.cr_background_color_dark : "#1A1A1A"), "cr-theme-dark", true) });
  chrome.storage.sync.get(['cr_text_color_dark'],function(result){ setTextColor(doc, (result.cr_text_color_dark ? result.cr_text_color_dark : "#E0E0E0"), "cr-theme-dark", true) });
  chrome.storage.sync.get(['cr_link_color_dark'],function(result){ setLinkColor(doc, (result.cr_link_color_dark ? result.cr_link_color_dark : "#FFFFFF"), "cr-theme-dark", true) });
   // Custom Theme
  chrome.storage.sync.get(['cr_background_color'],function(result){ setBackgroundColor(doc, (result.cr_background_color ? result.cr_background_color : "#F8F1E3"), "cr-theme-custom", true) });
  chrome.storage.sync.get(['cr_text_color'],function(result){ setTextColor(doc, (result.cr_text_color ? result.cr_text_color : "#333333"), "cr-theme-custom", true) });
  chrome.storage.sync.get(['cr_link_color'],function(result){ setLinkColor(doc, (result.cr_link_color ? result.cr_link_color : "#5F6368"), "cr-theme-custom", true) });
  // Theme (need to be down here bcoz setTheme requires themes' values)
  chrome.storage.sync.get(['cr_theme'],function(result){ setTheme(doc, (result.cr_theme) ? result.cr_theme : "cr-theme-custom", true) });

  // Reader Components
  chrome.storage.sync.get(['cr_dark_panel'],function(result){setDarkPanel(doc, (result.cr_dark_panel) ? result.cr_dark_panel : "on", true) });
  chrome.storage.sync.get(['cr_display_footer'],function(result){setDisplayFooter(doc, (result.cr_display_footer) ? result.cr_display_footer : "off", true) });
  chrome.storage.sync.get(['cr_display_outline'],function(result){setDisplayOutline(doc, (result.cr_display_outline) ? result.cr_display_outline : "off", true) });
  chrome.storage.sync.get(['cr_display_images'],function(result){setDisplayImages(doc, (result.cr_display_images) ? result.cr_display_images : "on", true) });
  chrome.storage.sync.get(['cr_display_meta'],function(result){setDisplayMeta(doc, (result.cr_display_meta) ? result.cr_display_meta : "on", true) });
  chrome.storage.sync.get(['cr_display_author'],function(result){setDisplayAuthor(doc, (result.cr_display_author) ? result.cr_display_author : "on", true) });
  chrome.storage.sync.get(['cr_display_reading_time'],function(result){setDisplayReadingTime(doc, (result.cr_display_reading_time) ? result.cr_display_reading_time : "on", true) });
  
}
function optionsMenu(iframe) {
  var doc = iframe.contentWindow.document;

  // Handle Active Menu/Panel
  $(doc).find("#options-menu li a").click(function(){
    $(doc).find("#options-menu li a").attr("class","tooltip");

    this_menu = $(this);
    $(doc).find(".options-panel").each(function(index, panel){
      if ( $(this_menu).attr("data-panel") == $(panel).attr("id") ) {
        if ( $(panel).is(":visible") ) {
          $(panel).hide();
        } else {
          $(this_menu).addClass("active");
          $(panel).show();
        }
      } else {
        $(panel).hide();
      }
    });
  });

  // Delete Element
  $(doc).find("#options-delete-element").click(function(){
    $(this).hide();
    $(doc).find("#options-delete-element-stop").show();
    startDeleteElement(doc);
  });

  // Undo Delete Element
  $(doc).find("#options-delete-element-undo").click(function(){
    undoDeletedElement(doc);
  });

  // Fullscreen
  $(doc).find('#options-fullscreen').click(function () {
    fullscreen.toggle($('#container')[0]).then(function () {
      if (fullscreen.isFullscreen) {
        $(doc).find('#options-fullscreen i.enter').hide();
        $(doc).find('#options-fullscreen i.exit').show();
      } else {
        $(doc).find('#options-fullscreen i.enter').show();
        $(doc).find('#options-fullscreen i.exit').hide();
      }
    });
  });

  // Print
  $(doc).find("#options-print").click(function(){
    iframe.contentWindow.print();
  });

  // Save Page
  // $(doc).find("#options-save-page").click(function(){
  //   savePage(doc);
  // });
  $(doc).find("#options-saved-panel a.close").click(function(){
    $(doc).find("#options-menu li a").attr("class","tooltip");
    $(doc).find("#options-saved-panel").hide();
  });

  // Close
  $(doc).find("#options-close").click(function(){
    $(iframe).hide();
  });
}
function optionsPanelCloseHandler(doc){
  $(doc).click(function(e){
    target = $(e.target);
    setTimeout(function(){
      $(doc).find(".options-panel").each(function(){
        id = "#"+$(this).attr('id');
        if ( $(doc).find(id).is(":visible") && (id != "#options-saved-panel") ) {
          if ( !target.parents( id ).length && !target.parents("#options-menu").length ) {
            $(doc).find( id ).hide();
            $(doc).find("#options-menu li a").removeClass("active");
          }
        }
      });
    }, 100);
  });
}
function optionsStyle(doc) {
  // Listeners
  $(doc).find("#options-font-family select").change(function() { setFontFamily(doc, $(this).val()); });
  $(doc).find("#options-font-size input").on("input change", function() { setFontSize(doc, $(this).val()); });
  $(doc).find("#options-line-height input").on("input change", function() { setLineHeight(doc, $(this).val()); });
  $(doc).find("#options-letter-space input").on("input change", function() { setLetterSpace(doc, $(this).val()); });
  $(doc).find("#options-max-width input").on("input change", function() { setMaxWidth(doc, $(this).val()); });

  // Save
  $(doc).find(".options-panel-content button[name='save-options-style']").click(function(e){
    cr_font_family = $(doc).find("#options-font-family select").find(":selected").val();
    cr_font_size = $(doc).find("#options-font-size input").val().trim();
    cr_line_height = $(doc).find("#options-line-height input").val().trim();
    cr_letter_space = $(doc).find("#options-letter-space input").val().trim();
    cr_max_width = $(doc).find("#options-max-width input").val().trim();

    saveStorageValue("cr_font_family", cr_font_family);
    saveStorageValue("cr_font_size", cr_font_size);
    saveStorageValue("cr_line_height", cr_line_height);
    saveStorageValue("cr_letter_space", cr_letter_space);
    saveStorageValue("cr_max_width", cr_max_width);
    syncStyles();

    $("<span class='text-info'>Saved!</span>").insertAfter( $(e.target) ).fadeOut(1500, function() { $(this).remove() });
  });
}
function getActiveTheme(doc){
  // Get active theme
  cr_theme = $(doc).find("#options-theme ul li a.active").attr("data-theme");
  return cr_theme;
}
function optionsTheme(doc) {
  $(doc).find("#options-theme ul li a").click(function() { cr_theme = $(this).attr("data-theme"); setTheme(doc, cr_theme); });
  $(doc).find("#options-background-color input").on("input change", function() { setBackgroundColor(doc, $(this).val(), getActiveTheme(doc)) });
  $(doc).find("#options-text-color input").on("input change", function() { setTextColor(doc, $(this).val(), getActiveTheme(doc)) });
  $(doc).find("#options-link-color input").on("input change", function() { setLinkColor(doc, $(this).val(), getActiveTheme(doc)) });
  

  // Save
  $(doc).find(".options-panel-content button[name='save-options-themes']").click(function(e){
    cr_theme = getActiveTheme(doc);
    cr_background_color_active = $(doc).find("#options-background-color input[name='background_color']").val().trim();
    cr_text_color_active = $(doc).find("#options-text-color input[name='text_color']").val().trim();
    cr_link_color_active = $(doc).find("#options-link-color input[name='link_color']").val().trim();
    

    saveStorageValue("cr_theme", cr_theme);
    if (cr_theme == "cr-theme-light") {
      cr_background_color_light = cr_background_color_active;
      cr_text_color_light = cr_text_color_active;
      cr_link_color_light = cr_link_color_active;
      

      saveStorageValue("cr_background_color_light", cr_background_color_active);
      saveStorageValue("cr_text_color_light", cr_text_color_active);
      saveStorageValue("cr_link_color_light", cr_link_color_active);
      
    } else if (cr_theme == "cr-theme-dark") {
      cr_background_color_dark = cr_background_color_active;
      cr_text_color_dark = cr_text_color_active;
      cr_link_color_dark = cr_link_color_active;
      

      saveStorageValue("cr_background_color_dark", cr_background_color_active);
      saveStorageValue("cr_text_color_dark", cr_text_color_active);
      saveStorageValue("cr_link_color_dark", cr_link_color_active);
     
    } else if (cr_theme == "cr-theme-custom") {
      console.log("saving custom theme(1)")
      cr_background_color_custom = cr_background_color_active;
      console.log("saving: ", cr_background_color_custom, " = ", cr_background_color_active)
      cr_text_color_custom = cr_text_color_active;
      cr_link_color_custom = cr_link_color_active;
      

      saveStorageValue("cr_background_color", cr_background_color_active);
      saveStorageValue("cr_text_color", cr_text_color_active);
      saveStorageValue("cr_link_color", cr_link_color_active);
    
    } else {
    }
    setTheme(doc, cr_theme);
    
    console.log("saved theme")
    $("<span class='text-info'>Saved!</span>").insertAfter( $(e.target) ).fadeOut(1500, function() { $(this).remove() });
  });
}
function optionsReaderComponents(doc) {
  // Listeners
  $(doc).find("#options-dark-panel input").change(function(){ setDarkPanel(doc, getCheckboxStatus($(this))); });
  $(doc).find("#options-display-footer input").change(function(){ setDisplayFooter(doc, getCheckboxStatus($(this))); });
  $(doc).find( "#options-display-outline input").change(function(){ setDisplayOutline(doc, getCheckboxStatus($(this))); });
  $(doc).find( "#options-display-images input").change(function(){ setDisplayImages(doc, getCheckboxStatus($(this))); });
  $(doc).find( "#options-display-meta input").change(function(){ setDisplayMeta(doc, getCheckboxStatus($(this))); });
  $(doc).find( "#options-display-author input").change(function(){ setDisplayAuthor(doc, getCheckboxStatus($(this))); });
  $(doc).find( "#options-display-reading-time input").change(function(){ setDisplayReadingTime(doc, getCheckboxStatus($(this))); });

  // Save
  $(doc).find(".options-panel-content button[name='save-options-reader-components']").click(function(e){
    cr_auto_dark_panel = getCheckboxStatus( $(doc).find("#options-dark-panel input") );
    cr_display_footer = getCheckboxStatus( $(doc).find("#options-display-footer input") );
    cr_scroll_speed = $(doc).find("#options-scroll-speed input").val();
    cr_display_outline = getCheckboxStatus( $(doc).find("#options-display-outline input") );
    cr_display_images = getCheckboxStatus( $(doc).find("#options-display-images input") );
    cr_display_meta = getCheckboxStatus( $(doc).find("#options-display-meta input") );
    cr_display_author = getCheckboxStatus( $(doc).find("#options-display-author input") );
    cr_display_reading_time = getCheckboxStatus( $(doc).find("#options-display-reading-time input") );
    cr_display_saved_info = getCheckboxStatus( $(doc).find("#options-display-saved-info input") );

    saveStorageValue("cr_dark_panel", cr_auto_dark_panel);
    saveStorageValue("cr_display_footer", cr_display_footer);
    saveStorageValue("cr_display_outline", cr_display_outline);
    saveStorageValue("cr_display_images", cr_display_images);
    saveStorageValue("cr_display_meta", cr_display_meta);
    saveStorageValue("cr_display_author", cr_display_author);
    saveStorageValue("cr_display_reading_time", cr_display_reading_time);
    console.log("saved changes")
    $("<span class='text-info'>Saved!</span>").insertAfter( $(e.target) ).fadeOut(1500, function() { $(this).remove() });
    
    
  });
}


function init(){
  // Initialize iframe & doc
  var iframe = document.getElementById('cr-iframe');
  var doc = iframe.contentWindow.document;

  // Get parsed article
  var article = getParsedArticle();
  title=article.title;
  excerpt = article.excerpt;
  content = article.content;

  article_url = window.location.href;
  if ( (article.byline == "") || (article.byline == "About 0 Minutes") ) {
    var author = "Unknown author";
  } else {
    var author = article.byline;
  }
  reading_time = readingTime(title+" "+content) + " min read";

  // Remove Media Playback from content
  content = content.replace("Media playback is unsupported on your device", "");

  // Fetch template for reader mode
  fetch(chrome.runtime.getURL('/content.html'))
  .then(response => response.text())
  .then(data => {

    // Add template to doc. Prevent injected links from refresh the iframe to original content
    doc.open();
    doc.write(data);
    doc.close();

    // Add preloader the second time after template was fetched
    startPreloader(doc);

    // Set article data based on current view
    // Set content outline
    setOutline(doc, article);
    // Set default main content
    $(doc).find("#cr-title").html(title);
    $(doc).find("#cr-content").html(content);
    setHeadingsForOutline(doc);
    $(doc).find("#cr-content a").attr("target", "_blank");
    // Add meta, title, and reading-time
    if (article_url) {
      $(doc).find("#cr-meta").append("<li id='cr-meta-url'><i class='fas fa-link'></i><span class='truncated'><a href='"+article_url+"' target='_blank'>"+article_url+"</a></span><li>");
    }
    if (author) {
      $(doc).find("#cr-meta").append("<li id='cr-meta-author'><i class='fas fa-pen-fancy'></i><span class='cr-author truncated'>"+author+"</span><li>");
    }
    if (reading_time) {
      $(doc).find("#cr-meta").append("<li id='cr-meta-reading-time'><i class='far fa-clock'></i><span>"+reading_time+"</span><li>");
    }

    // Trim content
    trimContent(doc);

    // Add style tag
    addStyleTags(doc);

    // Toggle display sidebar
    //outlineDisplayToggle(doc);

    // Toolbar
    toolbarDisplayToggle(doc);
    toolbarNoteFormToggle(doc);
    toolbarActionsHandler(doc);

    // Options
    optionsDefaultSettings(doc);
    optionsMenu(iframe);
    optionsPanelCloseHandler(doc);
    optionsManualScroll(doc);
    optionsAccordian(doc);
    optionsColorPicker(doc);

    // Main Options Panel;
    optionsStyle(doc);
    optionsTheme(doc);
    optionsReaderComponents(doc);

    // Make sure no injected margin around the body
    $(doc).find("body").css("margin", 0);

    // Display iframe
    $(iframe).show();
    setTimeout(function(){
      $(doc).find("#cr-pre-loader").fadeOut();
      $(doc).find("#cr-body").show();

    }, 500);
  }).catch(err => {
    alert("Ops..something wrong, please try again: " + err)
  });
}

var latest_url;
function launch() {

  // Detect past iframe - don't show another
  if(document.getElementById("cr-iframe") == null) {
    // Create iframe and append to body
    var iframe = createIframe();
    document.body.appendChild(iframe);

    latest_url = window.location.href;
    init();
  } else {
    iframe = document.getElementById("cr-iframe");
    if($(iframe).is(':visible')){
      $(iframe).fadeOut();
    } else {
      // Only parse the article if the url was changed
      if (latest_url == window.location) {
        $(iframe).fadeIn();
      } else {
        latest_url = window.location.href;
        init();
      }
    }
  }

}
launch();
