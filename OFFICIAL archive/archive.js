// Handle Highlighting & Taking Note
$(doc).find("#cr-toolbar-highlight, #cr-toolbar-note-form button[name='add_note']").click(function(e){
  if (selectedContent != ""){
    // Restore selection
    let new_range = new Range();
    new_range.setStart(range.startContainer, range.startOffset);
    new_range.setEnd(range.endContainer, range.endOffset);
    doc.getSelection().removeAllRanges();
    doc.getSelection().addRange(new_range);

    var textarea = $(doc).find("#cr-toolbar-note-form textarea");
    var note = $(textarea).val().trim();

    //if (note != "") {
      var note_wrapper = doc.createElement('span');

      highlighter_color = $(doc).find("#options-highlighter-color input[name='highlighter_color']").val();
      datetime = new Date().getTime();
      data_note_id = "cr-note-wrapper-"+datetime;

      highlighter = rangy.createHighlighter(doc);
      applier = rangy.createClassApplier("cr-note-wrapper", {
          elementProperties: {
            title: note
          },
          elementAttributes: {
            style: "background-color: "+highlighter_color,
            "data-note-id": data_note_id
          }
        }
      );
      highlighter.addClassApplier(applier);
      highlighter.highlightSelection("cr-note-wrapper");

      $(textarea).val("");
      $(doc).find("#cr-toolbar").hide();

      notesToggle(doc, data_note_id);
    //} else {
    //  alert("Note cannot be empty!");
    //}

    //if (note != "") {
      notesUpdateList(doc);
      savePage(doc, true);
    //}

    // Deselect all selected text
    doc.getSelection().removeAllRanges();
  }
});

function setHighlighterColor(doc, val, theme, save) {
  if (theme == "cr-theme-light") {
    cr_highlighter_color_light = val;
    save ? chrome.storage.sync.set({cr_highlighter_color_light: val}) : null;
  } else if (theme == "cr-theme-dark"){
    cr_highlighter_color_dark = val;
    save ? chrome.storage.sync.set({cr_highlighter_color_dark: val}) : null;
  } else if (theme == "cr-theme-custom"){
    cr_highlighter_color = val;
    save ? chrome.storage.sync.set({cr_highlighter_color: val}) : null;
  } else {
  }
  $(doc).find("#cr-body .cr-note-wrapper").css( "background-color", val );
  $(doc).find("#cr-body #cr-notes blockquote").css("border-left", "5px solid "+val);

  $(doc).find("#options-highlighter-color input[name='highlighter_color']").val(  val );
  $(doc).find("#options-highlighter-color input[type='color']").val(  val );
  $(doc).find("#options-highlighter-color label.color").css('background-color', val);
}

/*** Folders ***/
function folderGetSelected(doc){
  // Selected Folder
  selected_folder = $(doc).find("#osp-folders select option:selected");
  folder = {
    id: $(selected_folder).attr("data-id"),
    parent_id: $(selected_folder).attr("data-parent-id"),
    level: $(selected_folder).attr("data-level")
  }

  return folder;
}
function folderCreate(doc, folder, level){
  chrome.storage.local.get(['cr_user'], function(result) {
    if (result.cr_user) {
      chrome.runtime.sendMessage({query: "create-folder", user: current_user, folder: folder}, function(response) {
        if (response.data.status == 200) {
          data_folder = response.data.folder;

          if (parseInt(level) == 1) {
            option = `<option value="${folder.name}" data-id="${data_folder.id}" data-parent-id="${folder.parent_id}" data-level="1" selected>📁 ${folder.name}</option>`;
            $(doc).find("#osp-folders select").append(option);
          } else {
            dashes = "";
            for(var d = 1; d < level; d++) {
              dashes = dashes + "-";
            }
            option = `<option value="${folder.name}" data-id="${data_folder.id}" data-parent-id="${folder.parent_id}" data-level="${level}" selected>${dashes} 📁 ${folder.name}</option>`;
            parent_folder = $(doc).find("#osp-folders select option[data-id='"+folder.parent_id+"']");
            $(parent_folder).after(option);
          }
        } else if (response.data.status == 404) {
          alert("Oppss...Either there's no internet connection or our servers are offline");
        }  else {
          alert("Oppss...Something wrong. Please try again later");
        }

        $(doc).find("#osp-form-new button[name='add']").html("Add");
        $(doc).find("#osp-actions-new-toggle").removeClass("active");
        $(doc).find("#osp-form-new input[name='folder_name']").val("");
        $(doc).find("#osp-form-new input[name='folder_type'][value='folder']").prop("checked", true);
        $(doc).find("#osp-form-new").hide();

        savePage(doc);
      });
    } else {
      console.log("No user found");

      $(doc).find("#osp-form-new button[name='add']").html("Add");
      $(doc).find("#osp-actions-new-toggle").removeClass("active");
      $(doc).find("#osp-form-new input[name='folder_name']").val("");
      $(doc).find("#osp-form-new input[name='folder_type'][value='folder']").prop("checked", true);
      $(doc).find("#osp-form-new").hide();
    }
  });
}
function folderUpdate(doc, folder){
  chrome.storage.local.get(['cr_user'], function(result) {
    if (result.cr_user) {
      chrome.runtime.sendMessage({query: "update-folder", user: current_user, folder: folder}, function(response) {
        if (response.data.status == 200) {
          if (parseInt(level) == 1) {
            $(doc).find("#osp-folders select option[data-id='"+folder.id+"']").val(`${folder.name}`);
            $(doc).find("#osp-folders select option[data-id='"+folder.id+"']").text(`📁 ${folder.name}`);
          } else {
            dashes = "";
            for(var d = 1; d < level; d++) {
              dashes = dashes + "-";
            }
            $(doc).find("#osp-folders select option[data-id='"+folder.id+"']").val(`${folder.name}`);
            $(doc).find("#osp-folders select option[data-id='"+folder.id+"']").text(`${dashes}📁 ${folder.name}`);
          }

          $(doc).find("#options-saved-panel .loading-status").html("<i class='fas fa-check-circle'></i> &nbsp;Folder updated");
          $(doc).find("#osp-form-edit button[name='update']").html("Update");
          $(doc).find("#osp-actions-edit-toggle").removeClass("active");
          $(doc).find("#osp-form-edit").hide();
        } else if (response.data.status == 404) {
          alert("Oppss...Either there's no internet connection or our servers are offline");
        }  else {
          alert("Oppss...Something wrong. Please try again later");
        }
      });
    } else {
      alert("No user found. Please refresh and try again");
      $(doc).find("#osp-form-edit button[name='update']").html("Update");
    }
  });
}
function folderDelete(doc, folder){
  chrome.storage.local.get(['cr_user'], function(result) {
    if (result.cr_user) {
      chrome.runtime.sendMessage({query: "delete-folder", user: current_user, folder: folder}, function(response) {
        if (response.data.status == 200) {
          $(doc).find("#osp-folders select option[data-id='"+folder.id+"']").remove();
          $(doc).find("#osp-folders select option[data-parent-id='"+folder.id+"']").remove();

          $(doc).find("#osp-folders select option").first().attr("selected", "selected");
          optionsOspFormEditPreFill(doc);
        } else if (response.data.status == 404) {
          alert("Oppss...Either there's no internet connection or our servers are offline");
        }  else {
          alert("Oppss...Something wrong. Please try again later");
        }

        $(doc).find("#options-saved-panel .loading-status").html("<i class='fas fa-check-circle'></i> &nbsp;Folder deleted");
        $(doc).find("#osp-actions-edit-toggle").removeClass("active");
        $(doc).find("#osp-form-edit").hide();
        $(doc).find("#osp-form-edit a[name='delete']").html("<i class='fas fa-trash'></i>");
      });
    } else {
      alert("No user found. Please refresh and try again");
      $(doc).find("#osp-form-edit a[name='delete']").html("<i class='fas fa-trash'></i>");
    }
  });
}

/*** Articles ***/


function savePage(doc) {
  $(doc).find("#cr-saved-notice").html("<span class='loading-dots'>Saving</span>...").show();
  $(doc).find("#options-saved-panel .loading-status").html("<span class='loading-dots'>Saving</span>...").fadeIn("Show");
  $(doc).find("#options-saved-panel").show();

  // Get encoded current url
  encodedURL = getEncodedCurrentURL();

  //Compress current_html & save as backup in storage
  current_html = $(doc).find("#cr-content-wrapper").html();
  var compressed_html = compressHTML(current_html);
  chrome.storage.local.set({
      //Use encodedURL as the key
      [encodedURL]: compressed_html
  });

  // Saved encodedURL to saved_pages list
  var current_page_url = window.location.href;
  var current_page = {
      "url": current_page_url,
      "encodedURL": encodedURL
  };
  pages = [];
  chrome.storage.local.get(['cr_saved_pages'], function(result) {
      let default_val = result.cr_saved_pages;
      if (default_val) {
          pages = JSON.parse(default_val);

          // Loop through json here and only save new page if it's not already in storage
          var page_existed_in_storage = false;
          Object.keys(pages).forEach(function(key) {
              if (pages[key]) {
                  if (pages[key]["url"] == current_page_url) {
                      page_existed_in_storage = true;
                  }
              }
          });
          if (page_existed_in_storage == false) {
              pages.push(current_page);
              pages_as_string = JSON.stringify(pages);
              chrome.storage.local.set({
                  cr_saved_pages: pages_as_string
              });
          }
      } else {
          pages.push(current_page);
          pages_as_string = JSON.stringify(pages);
          chrome.storage.local.set({
              cr_saved_pages: pages_as_string
          });
      }

      // Put data-encoded-url to the remove-page link
      $(doc).find(".remove-saved-article").attr("data-encoded-url", encodedURL);

      // Show saved info & status
      $(doc).find("#cr-saved-notice").html("<i class='fas fa-check-circle m-r-3'></i> Saved");
      $(doc).find('#cr-container .saved-version-notice').fadeIn();
      $(doc).find("#options-saved-panel .loading-status").html("<i class='fas fa-check-circle m-r-3'></i> Saved");

      // Hide options-saved-panel
      setTimeout(function() {
          $(doc).find("#options-saved-panel").hide();
          $(doc).find("#options-menu li a").attr("class", "tooltip");
      }, 7000);
  });
}


// function savePage(doc, run_in_background) {
//   $(doc).find("#cr-saved-notice").html("<span class='loading-dots'>Saving</span>...").show();

//   if (!run_in_background) {
//     $(doc).find("#options-saved-panel .loading-status").html("<span class='loading-dots'>Saving</span>...").fadeIn("Show");
//     $(doc).find("#options-saved-panel").show();
//   }

//   // Get latest updated data
//   current_html = $(doc).find("#cr-content-wrapper").html();
//   title = $(doc).find("#osp-title").val();
//   excerpt = $(doc).find("#osp-excerpt").val();
//   author = $(doc).find("#osp-author").val();
//   tag_list = $(doc).find("#osp-tag-list").val();
//   folder = folderGetSelected(doc);

//   article = {
//     url: article_url,
//     html: current_html,
//     title: title,
//     excerpt: excerpt,
//     author: author,
//     reading_time: reading_time,
//     tag_list: tag_list
//   }

//   if ( !$.isEmptyObject(current_user) ) {
//     chrome.runtime.sendMessage({query: "save-article", user: current_user, article: article, folder: folder}, function(response) {
//       if (response.data.status == 200) {
//         $(doc).find("#cr-saved-notice").html("<i class='fas fa-check-circle m-r-3'></i> Saved");

//         if (!run_in_background) {
//           // Put article_url to view on ReaderMode
//           cloud_article_url = response.data.article_url;
//           $(doc).find(".view-saved-article").attr("href", cloud_article_url);

//           // Show saved info & status
//           $(doc).find('#cr-container .saved-version-notice').fadeIn();
//           $(doc).find("#options-saved-panel .loading-status").html("<i class='fas fa-check-circle m-r-3'></i> Saved");
//         }
//       } else if (response.data.status == 404) {
//         if (!run_in_background) {
//           alert("Oppss...Either there's no internet connection or our servers are offline");

//           $(doc).find("#cr-saved-notice").hide();
//           $(doc).find("#options-saved-panel").hide();
//           $(doc).find("#options-menu li a").attr("class","tooltip");
//         }
//       }  else {
//         if (!run_in_background) {
//           alert("Oppss...Something wrong. Please refresh and try again");

//           $(doc).find("#cr-saved-notice").hide();
//           $(doc).find("#options-saved-panel").hide();
//           $(doc).find("#options-menu li a").attr("class","tooltip");
//         }
//       }
//     });
//   } else {
//     setTimeout(function(){
//       //alert("No user found. Please refresh and try again. Or uninstall & reinstall the extension, and then try again.");

//       $(doc).find("#options-saved-panel").hide();
//       $(doc).find("#options-menu li a").attr("class","tooltip");
//     }, 500);
//   }
// }


function removeSavedArticle(doc){
  // Remove article from local storage
  $(doc).find(".remove-saved-article").click(function(){
    var result = confirm("Are you sure you want to delete this article?");
    if (result) {
      $(doc).find('#cr-container #options-saved-panel-header .loading-status').html("<span class='loading-dots'>Deleting</span>...");
      $(doc).find('#cr-container #options-saved-panel').show();

      // Remove article from server if any
      if ( !$.isEmptyObject(current_user) ) {
        chrome.runtime.sendMessage({query: "remove-article", user: current_user, url: article_url}, function(response) {
          if (response.data.status == 200) {
            $(doc).find('#cr-container #options-saved-panel-header .loading-status').html("<i class='fas fa-info-circle'></i> &nbsp;Deleted.");
            $(doc).find('#cr-container .saved-version-notice').fadeOut();
            $(doc).find('#cr-saved-notice').fadeOut();
            //alert("This page has been successfully removed. ");
          } else if (response.data.status == 404) {
            alert("Oppss...Either there's no internet connection or our servers are offline");
          }  else {
            alert("Oppss...Something wrong. Please try again later");
          }
        });
      }

      // Hide options-saved-panel
      setTimeout(function(){
        $(doc).find("#cr-container #options-saved-panel").hide();
      }, 7000);
    }
  });
}


function optionsRuler(doc) {
  // Listeners
  $(doc).find("#options-display-ruler input").change(function(){ setDisplayRuler(doc, getCheckboxStatus($(this))); });
  $(doc).find("#options-ruler-color input").on("input change", function() { setRulerColor(doc, $(this).val()); });
  $(doc).find("#options-ruler-height input").on("input change", function() { setRulerHeight(doc, $(this).val()); });
  $(doc).find("#options-ruler-position input").on("input change", function() { setRulerPosition(doc, $(this).val()); });

  // Save
  $(doc).find(".options-panel-content button[name='save-options-ruler']").click(function(e){
    cr_display_ruler = getCheckboxStatus( $(doc).find("#options-display-ruler input") );
    cr_ruler_color = $(doc).find("#options-ruler-color input[name='ruler_color']").val();
    cr_ruler_height = $(doc).find("#options-ruler-height .val").val();
    cr_ruler_position = $(doc).find("#options-ruler-position .val").val();

    saveStorageValue("cr_display_ruler", cr_display_ruler);
    saveStorageValue("cr_ruler_color", cr_ruler_color);
    saveStorageValue("cr_ruler_height", cr_ruler_height);
    saveStorageValue("cr_ruler_position", cr_ruler_position);
    syncRuler();

    $("<span class='text-info'>Saved!</span>").insertAfter( $(e.target) ).fadeOut(1500, function() { $(this).remove() });
  });
}
function optionsAutoRunRules(doc) {
  add_new_rule_toggle_btn = $(doc).find("#options-auto-run button[name='add_new_rule_toggle']");
  add_new_rule_panel = $(doc).find("#options-auto-run-add-new-rule-panel");
  add_new_rule_btn = $(doc).find("#options-auto-run button[name='add_new_rule']");
  cancel_new_rule_btn = $(doc).find("#options-auto-run button[name='cancel_new_rule']");

  $(add_new_rule_toggle_btn).click(function(){
    add_new_rule_panel = $(doc).find("#options-auto-run-add-new-rule-panel");
    $(add_new_rule_panel).show();
    $(this).hide();
  });
  $(add_new_rule_btn).click(function(){
    // Set and insert new rule to storage
    var auto_run_option = $(doc).find("#options-auto-run");
    var domain_name_is = $(auto_run_option).find("input[name='domain_name_is']").val();
    var url_is = $(auto_run_option).find("input[name='url_is']").val();
    var url_is_not = $(auto_run_option).find("input[name='url_is_not']").val();
    var url_contains = $(auto_run_option).find("input[name='url_contains']").val();
    var url_does_not_contain = $(auto_run_option).find("input[name='url_does_not_contain']").val();
    var url_starts_with = $(auto_run_option).find("input[name='url_starts_with']").val();
    var url_ends_with = $(auto_run_option).find("input[name='url_ends_with']").val();

    var rule_in_words = [];
    if (isEmpty(domain_name_is) == false) { rule_in_words.push("domain name is "+domain_name_is) }
    if (isEmpty(url_is) == false) { rule_in_words.push("url is "+url_is) }
    if (isEmpty(url_is_not) == false) { rule_in_words.push("url is  not "+url_is_not) }
    if (isEmpty(url_contains) == false) { rule_in_words.push("url contains "+url_contains) }
    if (isEmpty(url_does_not_contain) == false) { rule_in_words.push("url does not contain "+url_does_not_contain) }
    if (isEmpty(url_starts_with) == false) { rule_in_words.push("url starts with "+url_starts_with) }
    if (isEmpty(url_ends_with) == false) { rule_in_words.push("url ends with "+url_ends_with) }
    if (rule_in_words.length > 0) {
      var rules = [];
      var new_rule = {
        "id": 0,
        "domain_name_is": domain_name_is,
        "url_is": url_is,
        "url_is_not": url_is_not,
        "url_contains": url_contains,
        "url_does_not_contain": url_does_not_contain,
        "url_starts_with": url_starts_with,
        "url_ends_with": url_starts_with,
        "url_rule_in_sentence": ""
      };
      url_rule_in_sentence = "the page "+rule_in_words.join(" <b>and</b> ");
      new_rule["url_rule_in_sentence"] = url_rule_in_sentence;

      // Get default auto_run rules
      chrome.storage.sync.get(['cr_auto_run_rules'], function(result) {
        let default_val = result.cr_auto_run_rules;
        var default_rules;
        if (default_val) {
          default_rules = JSON.parse(default_val);
          if (default_rules.length > 0) {
            last_id = default_rules[ default_rules.length - 1 ]["id"];
            new_rule["id"] = last_id + 1;
            default_rules.push(new_rule);
          } else {
            new_rule["id"] = 1;
            default_rules.push(new_rule);
          }
        } else {
          new_rule["id"] = 1;
          default_rules = [];
          default_rules.push(new_rule);
        }

        rules_as_string = JSON.stringify(default_rules);
        setAutoRunRules(doc, rules_as_string, true);

        cr_auto_run_rules = rules_as_string;
        syncAutoRunRules();
      });
    } else {
      alert("Rules cannot be empty!");
    }
  });

  $(cancel_new_rule_btn).click(function(){
    $(add_new_rule_toggle_btn).show();
    $(add_new_rule_panel).hide();
  });
}
function optionsDefaultCss(doc){
  $(doc).find("#options-default-css button").click(function(e){
    cr_default_css = $(doc).find("#options-default-css textarea").val();

    setDefaultCss(doc, cr_default_css, true);
    syncDefaultCss();

    $("<span class='text-info'>Updated!</span>").insertAfter( $(e.target) ).fadeOut(1500, function() { $(this).remove() });
  });
}
function optionsTranslate (doc) {
  // Listeners
  $(doc).find("#options-translate-to select").change(function() { setTranslateTo(doc, $(this).val()); });

  // Save
  $(doc).find(".options-panel-content button[name='save-options-translate']").click(function(e){
    cr_translate_to = $(doc).find("#options-translate-to select").find(":selected").val();

    saveStorageValue("cr_translate_to", cr_translate_to);
    syncTranslate();

    $("<span class='text-info'>Saved!</span>").insertAfter( $(e.target) ).fadeOut(1500, function() { $(this).remove() });
  });
}
function optionsArticulate(doc) {
  // Listeners
  $(doc).find("#options-articulate-voice select").on("change", function() { setArticulateVoice(doc, $(this).val()); });
  $(doc).find("#options-articulate-rate input").on("input change", function() { setArticulateRate(doc, $(this).val()); });
  $(doc).find("#options-articulate-pitch input").on("input change", function() { setArticulatePitch(doc, $(this).val()); });
  $(doc).find("#options-articulate-volume input").on("input change", function() { setArticulateVolume(doc, $(this).val()); });

  // Save
  $(doc).find(".options-panel-content button[name='save-options-articulate']").click(function(e){
    cr_articulate_voice = $(doc).find("#options-articulate-voice select").find(":selected").val();
    cr_articulate_rate = $(doc).find("#options-articulate-rate input").val().trim();
    cr_articulate_pitch = $(doc).find("#options-articulate-pitch input").val().trim();
    cr_articulate_volume = $(doc).find("#options-articulate-volume input").val().trim();

    saveStorageValue("cr_articulate_voice", cr_articulate_voice);
    saveStorageValue("cr_articulate_rate", cr_articulate_rate);
    saveStorageValue("cr_articulate_pitch", cr_articulate_pitch);
    saveStorageValue("cr_articulate_volume", cr_articulate_volume);
    syncArticulate();

    $("<span class='text-info'>Saved!</span>").insertBefore( $(e.target) ).fadeOut(1500, function() { $(this).remove() });
    $(doc).find(".options-panel-content #articulate-stop").trigger("click");
  });
}
function optionsArticulateProcess(doc){
  var voices = $().articulate('getVoices');
  var select = $(doc).find("#options-articulate-voice select");
  for (i = 0; i < voices.length; i++) {
    voiceName = voices[i].name;
    voiceLang = voices[i].language;

    $(select).append("<option value='"+voiceName+"' data-articulate-language='"+voiceLang+"'>"+voiceName+" ("+voiceLang+")</option>");
  }

  var btn_play = $(doc).find("#options-articulate-panel .options-panel-content button[name='play']");
  var btn_pause = $(doc).find("#options-articulate-panel .options-panel-content button[name='pause']");

  $(doc).find("#articulate-speak, #articulate-pause").click(function(){
    articulateTextChanged(doc);

    // Get the parameter values from the input sliders
    var vn = $(doc).find("#options-articulate-voice select option:selected").val();
    var vl = $(doc).find("#options-articulate-voice select option:selected").attr("data-articulate-language");
    var r = parseFloat($(doc).find('#options-articulate-rate input').val());
    var p = parseFloat($(doc).find('#options-articulate-pitch input').val());
    var v = parseFloat($(doc).find('#options-articulate-volume input').val());

    var speaking = $().articulate('isSpeaking');
    var paused = $().articulate('isPaused');

    if (speaking) {
      if (paused) {
        $().articulate('resume');

        $(btn_play).hide();
        $(btn_pause).show();
      } else {
        $().articulate('pause');

        $(btn_play).show();
        $(btn_pause).hide();
      }
    } else {
      var synth = window.speechSynthesis;

      articulateTextChanged(doc);

      utterance = new SpeechSynthesisUtterance();
      utterance.lang = vl;
      utterance.rate = r;
      utterance.pitch = p;
      utterance.volume = v;

      var wrappedText = [];
      var elems = $(doc).find("#cr-content-container").find("p, h1, h2, h3, h4, h5, h6");
      $(elems).each(function(){
        var element_name = $(this).prop("tagName");
        var rawText = $(this).html();
        var rawText = rawText.replace(/<[^>]*>/g, "");
        text = rawText.split(" ");

        for (i = 0; i < text.length; i++) {
          var word = text[i].trim();

          if (i == text.length - 1) {
            if (element_name == "H1" || element_name == "H2" || element_name == "H3" || element_name == "H4" || element_name == "H5" || element_name == "H6") {
              if (word.includes(".") == false ) {
                word = word+".";
              }
            }
          }

          wrappedText.push(word);
        }
      });
      wrappedText = wrappedText.join(" ");
      utterance.text = wrappedText;

      utterance.onboundary = function(event) {
        clearHighlight(doc);
        var current = $(doc).find("span[data-count='" + event.charIndex + "']")[0];

        if (current) {
          $(current).addClass("active");
        }
      }

      synth.speak(utterance);

      $(btn_play).hide();
      $(btn_pause).show();
    };
  });

  $(doc).find("#articulate-stop").click(function(){
    $().articulate('stop');
    articulateReset(doc);

    $(btn_play).show();
    $(btn_pause).hide();
  });
}
function optionsOspFormEditPreFill(doc){
  selected_folder = $(doc).find("#osp-folders select option:selected");
  id = $(selected_folder).attr("data-id");
  name = $(selected_folder).val();
  level = $(selected_folder).attr("data-level");
  $(doc).find("#osp-form-edit").find("input[name='folder_id']").val(id);
  $(doc).find("#osp-form-edit").find("input[name='folder_name']").val(name);
  $(doc).find("#osp-form-edit").find("input[name='folder_level']").val(level);

  if ( $(doc).find("#osp-folders select option:nth-child(1)").is(":selected") ) {
    $(doc).find("#osp-form-edit input[name='folder_name']").addClass("disabled");
    $(doc).find("#osp-form-edit input[name='folder_name']").prop("disabled", true);
  } else {
    $(doc).find("#osp-form-edit input[name='folder_name']").removeClass("disabled");
    $(doc).find("#osp-form-edit input[name='folder_name']").prop("disabled", false);
  }
}
function optionsOspSetFields(doc, author, tag_list){
  $(doc).find(".cr-title").val(title);
  $(doc).find(".cr-excerpt").val(excerpt);

  $(doc).find(".cr-author").val(author);
  if ( (author != "") && (typeof author !== "undefined") && (author !== null) ) {
    author = author.trim().replace(/\s\s+/g, ' ');
    if ( author != "" && author != "Unknown author" ) {
      $(doc).find(".cr-author").html(author);
      $(doc).find("#osp-author").val(author);
    } else {
      $(doc).find(".cr-author").html("Unknown author");
    }
  } else {
    $(doc).find(".cr-author").html("Unknown author");
  }

  if ( (typeof tag_list !== "undefined") ) {
    $(doc).find(".cr-tag-list").val(tag_list.join(","));
  }
}
function optionsOspActions(doc){
  setTimeout(function(){
    optionsOspFormEditPreFill(doc);
  }, 3000);

  $(doc).find("#osp-tag-list").on("change", function(){
    tag_list = $(doc).find("#osp-tag-list").val();
  });

  $(doc).find("#osp-title").on("input change", function(){
    title = $(doc).find("#osp-title").val();
    $(doc).find("#cr-title").html(title);
  });

  $(doc).find("#osp-excerpt").on("input change", function(){
    excerpt = $(doc).find("#osp-excerpt").val();
  });

  $(doc).find("#osp-author").on("input change", function(){
    author = $(doc).find("#osp-author").val();
    if ( (author != "") && (typeof author !== "undefined") && (author !== null) ) {
      author = author.trim().replace(/\s\s+/g, ' ');
      if ( author != "" ) {
        $(doc).find(".cr-author").html(author);
      } else {
        $(doc).find(".cr-author").html("Unknown author");
      }
    } else {
      $(doc).find(".cr-author").html("Unknown author");
    }
  });

  $(doc).find("#osp-folders select").on("change", function(){
    optionsOspFormEditPreFill(doc);
    changeFolder(doc);
  });

  $(doc).find("#osp-actions-edit-toggle").click(function(){
    optionsOspFormEditPreFill(doc);
    if ( $(this).hasClass("active") ){
      $(this).removeClass("active");
      $(doc).find("#osp-form-edit").hide();
    } else {
      $(this).addClass("active");
      $(doc).find("#osp-form-edit").show();
      $(doc).find("#osp-form-new").hide();
      $(doc).find("#osp-actions-new-toggle").removeClass("active");
    }
    //$(doc).find("#osp-forms .form").hide();
  });

  $(doc).find("#osp-actions-new-toggle").click(function(){
    if ( $(this).hasClass("active") ){
      $(this).removeClass("active");
      $(doc).find("#osp-form-new").hide();
    } else {
      $(this).addClass("active");
      $(doc).find("#osp-form-new").show();
      $(doc).find("#osp-form-edit").hide();
      $(doc).find("#osp-actions-edit-toggle").removeClass("active");
    }
    //$(doc).find("#osp-forms .form").hide();
  });

  $(doc).find("#osp-forms button[name='cancel']").click(function(){
    $(this).parents(".form").toggle();
  });

  // $(doc).find("#osp-actions-save").click(function(){
  //   $(doc).find("a#options-save-page").click();
  // });
}
function optionsFolderCreate(doc){
  $(doc).find("#osp-form-new button[name='add']").click(function(){
    selected_folder = $(doc).find("#osp-folders select option:selected");
    parent_folder_id = $(selected_folder).attr("data-id");
    parent_folder_level = $(selected_folder).attr("data-level");

    new_folder_type = $(doc).find("#osp-form-new input[name='folder_type']:checked").val();
    new_folder_name = $(doc).find("#osp-form-new input[name='folder_name']").val();

    if (!new_folder_name) {
      alert("Name cannot be empty");
    } else if ( (new_folder_type == "sub_folder") && ($(doc).find("#osp-folders select")[0].selectedIndex === 0) ) {
      alert("You cannot create subfolder for this reserved folder");
    }  else {
      $(this).html("<i class='fas fa-spinner fa-spin'></i> Adding...");
      if (new_folder_type == "folder") {
        folder = {
          name: new_folder_name,
          type: new_folder_type,
          parent_id: null,
          level: 1
        }
      } else {
        level = parseInt(parent_folder_level)+1
        folder = {
          name: new_folder_name,
          type: new_folder_type,
          parent_id: parent_folder_id,
          level: level
        }
      }
      folderCreate(doc, folder, level);
    }
  });
}
function optionsFolderUpdate(doc){
  $(doc).find("#osp-form-edit button[name='update']").click(function(){
    if ( $(doc).find("#osp-folders select option:nth-child(1)").is(":selected") ) {
      alert("This default folder is reserved and cannot be modified");
    } else {
      $(this).html("<i class='fas fa-spinner fa-spin'></i> Updating...");

      form_edit = $(doc).find("#osp-form-edit");
      id = $(form_edit).find("input[name='folder_id']").val();
      name = $(form_edit).find("input[name='folder_name']").val();
      level = $(form_edit).find("input[name='folder_level']").val();

      if (!name) {
        alert("Name cannot be empty");
        $(this).html("Update");
      } else {
        folder = {
          id: id,
          name: name,
          level: level
        }
        folderUpdate(doc, folder);
      }
    }
  });
}
function optionsFolderDelete(doc){
  $(doc).find("#osp-form-edit a[name='delete']").click(function(){
    if ( $(doc).find("#osp-folders select option:nth-child(1)").is(":selected") ) {
      alert("This default folder is reserved and cannot be deleted");
    } else {
      $(this).html("<i class='fas fa-spinner fa-spin'></i>");

      form_edit = $(doc).find("#osp-form-edit");
      id = $(form_edit).find("input[name='folder_id']").val();

      folder = {
        id: id
      }
      if (confirm("Are you sure you want to delete this folder?")){
        folderDelete(doc, folder);
      }
    }
  });
}



// Syncing folders from server
function syncFolders(doc){
  chrome.storage.local.get(['cr_user'], function(result) {
    if (result.cr_user) {
      chrome.runtime.sendMessage({query: "pull-folders", user: current_user}, function(response) {
        if (response.data.status == 200) {
          $(doc).find("#osp-folders select").html("");

          folders = response.data.folders;
          $.each(folders, function(i, folder) {
            id = folder[0].id;
            parent_id = folder[0].parent_id;
            name = folder[0].name;
            level = folder[1];

            dashes = "";
            for(var d = 1; d < level; d++) {
              dashes = dashes + "-";
            }
            if (level == 1) {
              option = `<option value="${name}" data-id="${id}" data-parent-id="${parent_id}" data-level="${level}">📁 ${name}</option>`;
            } else {
              option = `<option value="${name}" data-id="${id}" data-parent-id="${parent_id}" data-level="${level}">${dashes} 📁 ${name}</option>`;
            }

            $(doc).find("#osp-folders select").append(option);
          });
        } else if (response.data.status == 404) {
          //alert("Oppss...Either there's no internet connection or our servers are offline");
        }  else {
          //alert("Oppss...Something wrong. Please try again later");
        }
      });
    } else {
      //console.log("No user found");
    }
  });
}


function syncRuler() {
  settings = {
    display_ruler: cr_display_ruler,
    ruler_color: cr_ruler_color,
    ruler_height: cr_ruler_height,
    ruler_position: cr_ruler_position
  }

  chrome.runtime.sendMessage({query: "update-ruler", user: current_user, settings: settings}, function(response) {
    if (response.data.status == 200) {
      //alert(`Settings have been successfully synced`);
    } else if (response.data.status == 404) {
      //alert("Oppss...Either there's no internet connection or our servers are offline");
    }  else {
      //alert("Oppss...Something wrong. Please try again later");
    }
  });
}
function syncAutoRunRules() {
  settings = {
    auto_run_rules: cr_auto_run_rules
  }

  chrome.runtime.sendMessage({query: "update-auto-run-rules", user: current_user, settings: settings}, function(response) {
    if (response.data.status == 200) {
      //alert(`Settings have been successfully synced`);
    } else if (response.data.status == 404) {
      //alert("Oppss...Either there's no internet connection or our servers are offline");
    }  else {
      //alert("Oppss...Something wrong. Please try again later");
    }
  });
}
function syncDefaultCss() {
  settings = {
    default_css: cr_default_css
  }

  chrome.runtime.sendMessage({query: "update-default-css", user: current_user, settings: settings}, function(response) {
    if (response.data.status == 200) {
      //alert(`Settings have been successfully synced`);
    } else if (response.data.status == 404) {
      //alert("Oppss...Either there's no internet connection or our servers are offline");
    }  else {
      //alert("Oppss...Something wrong. Please try again later");
    }
  });
}
function syncTranslate() {
  settings = {
    translate_to: cr_translate_to
  }

  chrome.runtime.sendMessage({query: "update-translate", user: current_user, settings: settings}, function(response) {
    if (response.data.status == 200) {
      //alert(`Settings have been successfully synced`);
    } else if (response.data.status == 404) {
      //alert("Oppss...Either there's no internet connection or our servers are offline");
    }  else {
      //alert("Oppss...Something wrong. Please try again later");
    }
  });
}
function syncArticulate() {
  settings = {
    articulate_voice: cr_articulate_voice,
    articulate_rate: cr_articulate_rate,
    articulate_pitch: cr_articulate_pitch,
    articulate_volume: cr_articulate_volume
  }

  chrome.runtime.sendMessage({query: "update-articulate", user: current_user, settings: settings}, function(response) {
    if (response.data.status == 200) {
      //alert(`Settings have been successfully synced`);
    } else if (response.data.status == 404) {
      //alert("Oppss...Either there's no internet connection or our servers are offline");
    }  else {
      //alert("Oppss...Something wrong. Please try again later");
    }
  });
}


    // Set article data based on storage if any
    // If saved article/content is found from the server, replace the default content
    setTimeout(function(){
      // if ( !$.isEmptyObject(current_user) ) {
      //   chrome.runtime.sendMessage({query: "get-article", user: current_user, url: article_url}, function(response) {
      //     if (typeof response.data.source !== "undefined") {
      //       data = response.data;
      //       html = data.html;
      //       title = data.title;
      //       excerpt = data.excerpt;
      //       author = data.author;
      //       tag_list = data.tag_list;
      //       url = data.source;
      //       cloud_article_url = `${server}/read/${data.hash_id}`;
      //       folder_id = data.folder_id;

      //       if ( (url != "undefined" && url != "") && (url == article_url) ) {
      //         //console.log("Saved article found and applied");
      //         $(doc).find("#cr-content-wrapper").html(html);
      //         $(doc).find(".view-saved-article").attr("href", cloud_article_url);
      //         $(doc).find(".saved-version-notice").show();
      //         $(doc).find(".view-saved-article").show();
      //         $(doc).find(".remove-saved-article").show();
      //         $(doc).find("#cr-saved-notice").show();

      //         optionsOspSetFields(doc, author, tag_list);

      //         notesToggle(doc);
      //         notesUpdateList(doc);
      //         removeInlineElemStyles(doc);

      //         // Find folder and select folder dropdown automaticaly
      //         setTimeout(function(){
      //           chrome.storage.local.get(['cr_user'], function(result) {
      //             $(doc).find("#osp-folders select option[data-id='"+folder_id+"']").attr("selected","selected");
      //           });
      //         }, 1000);
      //       }
      //     }

      //     init_tags(doc, "#osp-tag-list");
      //   });
      // }
    }, 1000);



    
/*** notesUpdateList ***/
function notesListActionsToggle(doc){
  $(doc).find("#cr-notes-list li").on({
    mouseenter: function () {
      $(this).find(".notes-list-actions").show();
    },
    mouseleave: function () {
      $(this).find(".notes-list-actions").hide();
    }
  });
}
    function notesUpdateList(doc){
      highlighter_color = $(doc).find("#options-highlighter-color input[name='highlighter_color']").val();
      notes_list = $(doc).find("#cr-notes-list");
      $(notes_list).html("");
    
      notes = {};
      $(doc).find(".cr-note-wrapper").each(function(){
        note_id = $(this).attr("data-note-id");
    
        if (notes[note_id]) {
          notes[note_id].original_text = notes[note_id].original_text + " " + $(this).html();
        } else {
          notes[note_id] = {
            original_text: $(this).html(),
            note: $(this).attr("title")
          }
        }
      });
    
      if ( $.isEmptyObject(notes) == true ) {
        $(doc).find("#cr-notes .text-default").show();
      } else {
        $(doc).find("#cr-notes .text-default").hide();
    
        $.each(notes, function(index, obj) {
          note_id = index;
          original_text = obj.original_text;
          original_note = obj.note;
          escaped_text = original_text.replace(/"|'/g,'');
    
          $(notes_list).append(`
            <li>
              <div class="notes-list-actions" style="display:none;">
                <span class="btn-clipboard" data-clipboard-action="copy" data-clipboard-text="${escaped_text}">
                  <i class="fas fa-copy"></i>
                </span>
              </div>
              <div id="${note_id}">
                <blockquote class='notes-list-text' style='border-left: 5px solid ${highlighter_color}'>${original_text}</blockquote>
              </div>
              <div class='notes-list-note'>${original_note}</div>
            </li>
          `);
        });
      }
    
      media_clipboard(doc, '.btn-clipboard');
      notesListActionsToggle(doc);
    }