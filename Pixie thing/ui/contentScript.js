(() => {
  var e = {
          7893: e => {
              var t = {
                  unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
                  okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i
              };

              function n(e) {
                  return (!e.style || "none" != e.style.display) && !e.hasAttribute("hidden") && (!e.hasAttribute("aria-hidden") || "true" != e.getAttribute("aria-hidden") || e.className && e.className.indexOf && -1 !== e.className.indexOf("fallback-image"))
              }
              e.exports = function(e, i = {}) {
                  "function" == typeof i && (i = {
                      visibilityChecker: i
                  });
                  var r = {
                      minScore: 20,
                      minContentLength: 140,
                      visibilityChecker: n
                  };
                  i = Object.assign(r, i);
                  var o = e.querySelectorAll("p, pre, article"),
                      a = e.querySelectorAll("div > br");
                  if (a.length) {
                      var s = new Set(o);
                      [].forEach.call(a, (function(e) {
                          s.add(e.parentNode)
                      })), o = Array.from(s)
                  }
                  var l = 0;
                  return [].some.call(o, (function(e) {
                      if (!i.visibilityChecker(e)) return !1;
                      var n = e.className + " " + e.id;
                      if (t.unlikelyCandidates.test(n) && !t.okMaybeItsACandidate.test(n)) return !1;
                      if (e.matches("li p")) return !1;
                      var r = e.textContent.trim().length;
                      return !(r < i.minContentLength) && (l += Math.sqrt(r - i.minContentLength)) > i.minScore
                  }))
              }
          },
          4174: e => {
              function t(e, t) {
                  if (t && t.documentElement) e = t, t = arguments[2];
                  else if (!e || !e.documentElement) throw new Error("First argument to Readability constructor should be a document object.");
                  if (t = t || {}, this._doc = e, this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__, this._articleTitle = null, this._articleByline = null, this._articleDir = null, this._articleSiteName = null, this._attempts = [], this._debug = !!t.debug, this._maxElemsToParse = t.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE, this._nbTopCandidates = t.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES, this._charThreshold = t.charThreshold || this.DEFAULT_CHAR_THRESHOLD, this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(t.classesToPreserve || []), this._keepClasses = !!t.keepClasses, this._serializer = t.serializer || function(e) {
                          return e.innerHTML
                      }, this._disableJSONLD = !!t.disableJSONLD, this._allowedVideoRegex = t.allowedVideoRegex || this.REGEXPS.videos, this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY, this._debug) {
                      let e = function(e) {
                          if (e.nodeType == e.TEXT_NODE) return `${e.nodeName} ("${e.textContent}")`;
                          let t = Array.from(e.attributes || [], (function(e) {
                              return `${e.name}="${e.value}"`
                          })).join(" ");
                          return `<${e.localName} ${t}>`
                      };
                      this.log = function() {
                          if ("undefined" != typeof console) {
                              Array.from(arguments, (t => t && t.nodeType == this.ELEMENT_NODE ? e(t) : t)).unshift("Reader: (Readability)")
                          } else if ("undefined" != typeof dump) {
                              var t = Array.prototype.map.call(arguments, (function(t) {
                                  return t && t.nodeName ? e(t) : t
                              })).join(" ");
                              dump("Reader: (Readability) " + t + "\n")
                          }
                      }
                  } else this.log = function() {}
              }
              t.prototype = {
                  FLAG_STRIP_UNLIKELYS: 1,
                  FLAG_WEIGHT_CLASSES: 2,
                  FLAG_CLEAN_CONDITIONALLY: 4,
                  ELEMENT_NODE: 1,
                  TEXT_NODE: 3,
                  DEFAULT_MAX_ELEMS_TO_PARSE: 0,
                  DEFAULT_N_TOP_CANDIDATES: 5,
                  DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),
                  DEFAULT_CHAR_THRESHOLD: 500,
                  REGEXPS: {
                      unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
                      okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
                      positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
                      negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
                      extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
                      byline: /byline|author|dateline|writtenby|p-author/i,
                      replaceFonts: /<(\/?)font[^>]*>/gi,
                      normalize: /\s{2,}/g,
                      videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
                      shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
                      nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
                      prevLink: /(prev|earl|old|new|<|«)/i,
                      tokenize: /\W+/g,
                      whitespace: /^\s*$/,
                      hasContent: /\S$/,
                      hashUrl: /^#.+/,
                      srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
                      b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
                      jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/
                  },
                  UNLIKELY_ROLES: ["menu", "menubar", "complementary", "navigation", "alert", "alertdialog", "dialog"],
                  DIV_TO_P_ELEMS: new Set(["BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL"]),
                  ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],
                  PRESENTATIONAL_ATTRIBUTES: ["align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace"],
                  DEPRECATED_SIZE_ATTRIBUTE_ELEMS: ["TABLE", "TH", "TD", "HR", "PRE"],
                  PHRASING_ELEMS: ["ABBR", "AUDIO", "B", "BDO", "BR", "BUTTON", "CITE", "CODE", "DATA", "DATALIST", "DFN", "EM", "EMBED", "I", "IMG", "INPUT", "KBD", "LABEL", "MARK", "MATH", "METER", "NOSCRIPT", "OBJECT", "OUTPUT", "PROGRESS", "Q", "RUBY", "SAMP", "SCRIPT", "SELECT", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "TEXTAREA", "TIME", "VAR", "WBR"],
                  CLASSES_TO_PRESERVE: ["page"],
                  HTML_ESCAPE_MAP: {
                      lt: "<",
                      gt: ">",
                      amp: "&",
                      quot: '"',
                      apos: "'"
                  },
                  _postProcessContent: function(e) {
                      this._fixRelativeUris(e), this._simplifyNestedElements(e), this._keepClasses || this._cleanClasses(e)
                  },
                  _removeNodes: function(e, t) {
                      if (this._docJSDOMParser && e._isLiveNodeList) throw new Error("Do not pass live node lists to _removeNodes");
                      for (var n = e.length - 1; n >= 0; n--) {
                          var i = e[n],
                              r = i.parentNode;
                          r && (t && !t.call(this, i, n, e) || r.removeChild(i))
                      }
                  },
                  _replaceNodeTags: function(e, t) {
                      if (this._docJSDOMParser && e._isLiveNodeList) throw new Error("Do not pass live node lists to _replaceNodeTags");
                      for (const n of e) this._setNodeTag(n, t)
                  },
                  _forEachNode: function(e, t) {
                      Array.prototype.forEach.call(e, t, this)
                  },
                  _findNode: function(e, t) {
                      return Array.prototype.find.call(e, t, this)
                  },
                  _someNode: function(e, t) {
                      return Array.prototype.some.call(e, t, this)
                  },
                  _everyNode: function(e, t) {
                      return Array.prototype.every.call(e, t, this)
                  },
                  _concatNodeLists: function() {
                      var e = Array.prototype.slice,
                          t = e.call(arguments).map((function(t) {
                              return e.call(t)
                          }));
                      return Array.prototype.concat.apply([], t)
                  },
                  _getAllNodesWithTag: function(e, t) {
                      return e.querySelectorAll ? e.querySelectorAll(t.join(",")) : [].concat.apply([], t.map((function(t) {
                          var n = e.getElementsByTagName(t);
                          return Array.isArray(n) ? n : Array.from(n)
                      })))
                  },
                  _cleanClasses: function(e) {
                      var t = this._classesToPreserve,
                          n = (e.getAttribute("class") || "").split(/\s+/).filter((function(e) {
                              return -1 != t.indexOf(e)
                          })).join(" ");
                      for (n ? e.setAttribute("class", n) : e.removeAttribute("class"), e = e.firstElementChild; e; e = e.nextElementSibling) this._cleanClasses(e)
                  },
                  _fixRelativeUris: function(e) {
                      var t = this._doc.baseURI,
                          n = this._doc.documentURI;

                      function i(e) {
                          if (t == n && "#" == e.charAt(0)) return e;
                          try {
                              return new URL(e, t).href
                          } catch (e) {}
                          return e
                      }
                      var r = this._getAllNodesWithTag(e, ["a"]);
                      this._forEachNode(r, (function(e) {
                          var t = e.getAttribute("href");
                          if (t)
                              if (0 === t.indexOf("javascript:"))
                                  if (1 === e.childNodes.length && e.childNodes[0].nodeType === this.TEXT_NODE) {
                                      var n = this._doc.createTextNode(e.textContent);
                                      e.parentNode.replaceChild(n, e)
                                  } else {
                                      for (var r = this._doc.createElement("span"); e.firstChild;) r.appendChild(e.firstChild);
                                      e.parentNode.replaceChild(r, e)
                                  }
                          else e.setAttribute("href", i(t))
                      }));
                      var o = this._getAllNodesWithTag(e, ["img", "picture", "figure", "video", "audio", "source"]);
                      this._forEachNode(o, (function(e) {
                          var t = e.getAttribute("src"),
                              n = e.getAttribute("poster"),
                              r = e.getAttribute("srcset");
                          if (t && e.setAttribute("src", i(t)), n && e.setAttribute("poster", i(n)), r) {
                              var o = r.replace(this.REGEXPS.srcsetUrl, (function(e, t, n, r) {
                                  return i(t) + (n || "") + r
                              }));
                              e.setAttribute("srcset", o)
                          }
                      }))
                  },
                  _simplifyNestedElements: function(e) {
                      for (var t = e; t;) {
                          if (t.parentNode && ["DIV", "SECTION"].includes(t.tagName) && (!t.id || !t.id.startsWith("readability"))) {
                              if (this._isElementWithoutContent(t)) {
                                  t = this._removeAndGetNext(t);
                                  continue
                              }
                              if (this._hasSingleTagInsideElement(t, "DIV") || this._hasSingleTagInsideElement(t, "SECTION")) {
                                  for (var n = t.children[0], i = 0; i < t.attributes.length; i++) n.setAttribute(t.attributes[i].name, t.attributes[i].value);
                                  t.parentNode.replaceChild(n, t), t = n;
                                  continue
                              }
                          }
                          t = this._getNextNode(t)
                      }
                  },
                  _getArticleTitle: function() {
                      var e = this._doc,
                          t = "",
                          n = "";
                      try {
                          "string" != typeof(t = n = e.title.trim()) && (t = n = this._getInnerText(e.getElementsByTagName("title")[0]))
                      } catch (e) {}
                      var i = !1;

                      function r(e) {
                          return e.split(/\s+/).length
                      }
                      if (/ [\|\-\\\/>»] /.test(t)) i = / [\\\/>»] /.test(t), r(t = n.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1")) < 3 && (t = n.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1"));
                      else if (-1 !== t.indexOf(": ")) {
                          var o = this._concatNodeLists(e.getElementsByTagName("h1"), e.getElementsByTagName("h2")),
                              a = t.trim();
                          this._someNode(o, (function(e) {
                              return e.textContent.trim() === a
                          })) || (r(t = n.substring(n.lastIndexOf(":") + 1)) < 3 ? t = n.substring(n.indexOf(":") + 1) : r(n.substr(0, n.indexOf(":"))) > 5 && (t = n))
                      } else if (t.length > 150 || t.length < 15) {
                          var s = e.getElementsByTagName("h1");
                          1 === s.length && (t = this._getInnerText(s[0]))
                      }
                      var l = r(t = t.trim().replace(this.REGEXPS.normalize, " "));
                      return l <= 4 && (!i || l != r(n.replace(/[\|\-\\\/>»]+/g, "")) - 1) && (t = n), t
                  },
                  _prepDocument: function() {
                      var e = this._doc;
                      this._removeNodes(this._getAllNodesWithTag(e, ["style"])), e.body && this._replaceBrs(e.body), this._replaceNodeTags(this._getAllNodesWithTag(e, ["font"]), "SPAN")
                  },
                  _nextNode: function(e) {
                      for (var t = e; t && t.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(t.textContent);) t = t.nextSibling;
                      return t
                  },
                  _replaceBrs: function(e) {
                      this._forEachNode(this._getAllNodesWithTag(e, ["br"]), (function(e) {
                          for (var t = e.nextSibling, n = !1;
                              (t = this._nextNode(t)) && "BR" == t.tagName;) {
                              n = !0;
                              var i = t.nextSibling;
                              t.parentNode.removeChild(t), t = i
                          }
                          if (n) {
                              var r = this._doc.createElement("p");
                              for (e.parentNode.replaceChild(r, e), t = r.nextSibling; t;) {
                                  if ("BR" == t.tagName) {
                                      var o = this._nextNode(t.nextSibling);
                                      if (o && "BR" == o.tagName) break
                                  }
                                  if (!this._isPhrasingContent(t)) break;
                                  var a = t.nextSibling;
                                  r.appendChild(t), t = a
                              }
                              for (; r.lastChild && this._isWhitespace(r.lastChild);) r.removeChild(r.lastChild);
                              "P" === r.parentNode.tagName && this._setNodeTag(r.parentNode, "DIV")
                          }
                      }))
                  },
                  _setNodeTag: function(e, t) {
                      if (this.log("_setNodeTag", e, t), this._docJSDOMParser) return e.localName = t.toLowerCase(), e.tagName = t.toUpperCase(), e;
                      for (var n = e.ownerDocument.createElement(t); e.firstChild;) n.appendChild(e.firstChild);
                      e.parentNode.replaceChild(n, e), e.readability && (n.readability = e.readability);
                      for (var i = 0; i < e.attributes.length; i++) try {
                          n.setAttribute(e.attributes[i].name, e.attributes[i].value)
                      } catch (e) {}
                      return n
                  },
                  _prepArticle: function(e) {
                      this._cleanStyles(e), this._markDataTables(e), this._fixLazyImages(e), this._cleanConditionally(e, "form"), this._cleanConditionally(e, "fieldset"), this._clean(e, "object"), this._clean(e, "embed"), this._clean(e, "footer"), this._clean(e, "link"), this._clean(e, "aside");
                      var t = this.DEFAULT_CHAR_THRESHOLD;
                      this._forEachNode(e.children, (function(e) {
                          this._cleanMatchedNodes(e, (function(e, n) {
                              return this.REGEXPS.shareElements.test(n) && e.textContent.length < t
                          }))
                      })), this._clean(e, "iframe"), this._clean(e, "input"), this._clean(e, "textarea"), this._clean(e, "select"), this._clean(e, "button"), this._cleanHeaders(e), this._cleanConditionally(e, "table"), this._cleanConditionally(e, "ul"), this._cleanConditionally(e, "div"), this._replaceNodeTags(this._getAllNodesWithTag(e, ["h1"]), "h2"), this._removeNodes(this._getAllNodesWithTag(e, ["p"]), (function(e) {
                          return 0 === e.getElementsByTagName("img").length + e.getElementsByTagName("embed").length + e.getElementsByTagName("object").length + e.getElementsByTagName("iframe").length && !this._getInnerText(e, !1)
                      })), this._forEachNode(this._getAllNodesWithTag(e, ["br"]), (function(e) {
                          var t = this._nextNode(e.nextSibling);
                          t && "P" == t.tagName && e.parentNode.removeChild(e)
                      })), this._forEachNode(this._getAllNodesWithTag(e, ["table"]), (function(e) {
                          var t = this._hasSingleTagInsideElement(e, "TBODY") ? e.firstElementChild : e;
                          if (this._hasSingleTagInsideElement(t, "TR")) {
                              var n = t.firstElementChild;
                              if (this._hasSingleTagInsideElement(n, "TD")) {
                                  var i = n.firstElementChild;
                                  i = this._setNodeTag(i, this._everyNode(i.childNodes, this._isPhrasingContent) ? "P" : "DIV"), e.parentNode.replaceChild(i, e)
                              }
                          }
                      }))
                  },
                  _initializeNode: function(e) {
                      switch (e.readability = {
                              contentScore: 0
                          }, e.tagName) {
                          case "DIV":
                              e.readability.contentScore += 5;
                              break;
                          case "PRE":
                          case "TD":
                          case "BLOCKQUOTE":
                              e.readability.contentScore += 3;
                              break;
                          case "ADDRESS":
                          case "OL":
                          case "UL":
                          case "DL":
                          case "DD":
                          case "DT":
                          case "LI":
                          case "FORM":
                              e.readability.contentScore -= 3;
                              break;
                          case "H1":
                          case "H2":
                          case "H3":
                          case "H4":
                          case "H5":
                          case "H6":
                          case "TH":
                              e.readability.contentScore -= 5
                      }
                      e.readability.contentScore += this._getClassWeight(e)
                  },
                  _removeAndGetNext: function(e) {
                      var t = this._getNextNode(e, !0);
                      return e.parentNode.removeChild(e), t
                  },
                  _getNextNode: function(e, t) {
                      if (!t && e.firstElementChild) return e.firstElementChild;
                      if (e.nextElementSibling) return e.nextElementSibling;
                      do {
                          e = e.parentNode
                      } while (e && !e.nextElementSibling);
                      return e && e.nextElementSibling
                  },
                  _textSimilarity: function(e, t) {
                      var n = e.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean),
                          i = t.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
                      return n.length && i.length ? 1 - i.filter((e => !n.includes(e))).join(" ").length / i.join(" ").length : 0
                  },
                  _checkByline: function(e, t) {
                      if (this._articleByline) return !1;
                      if (void 0 !== e.getAttribute) var n = e.getAttribute("rel"),
                          i = e.getAttribute("itemprop");
                      return !(!("author" === n || i && -1 !== i.indexOf("author") || this.REGEXPS.byline.test(t)) || !this._isValidByline(e.textContent)) && (this._articleByline = e.textContent.trim(), !0)
                  },
                  _getNodeAncestors: function(e, t) {
                      t = t || 0;
                      for (var n = 0, i = []; e.parentNode && (i.push(e.parentNode), !t || ++n !== t);) e = e.parentNode;
                      return i
                  },
                  _grabArticle: function(e) {
                      this.log("**** grabArticle ****");
                      var t = this._doc,
                          n = null !== e;
                      if (!(e = e || this._doc.body)) return this.log("No body found in document. Abort."), null;
                      for (var i = e.innerHTML;;) {
                          this.log("Starting grabArticle loop");
                          var r = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS),
                              o = [],
                              a = this._doc.documentElement;
                          let V = !0;
                          for (; a;) {
                              "HTML" === a.tagName && (this._articleLang = a.getAttribute("lang"));
                              var s = a.className + " " + a.id;
                              if (this._isProbablyVisible(a))
                                  if ("true" != a.getAttribute("aria-modal") || "dialog" != a.getAttribute("role"))
                                      if (this._checkByline(a, s)) a = this._removeAndGetNext(a);
                                      else if (V && this._headerDuplicatesTitle(a)) this.log("Removing header: ", a.textContent.trim(), this._articleTitle.trim()), V = !1, a = this._removeAndGetNext(a);
                              else {
                                  if (r) {
                                      if (this.REGEXPS.unlikelyCandidates.test(s) && !this.REGEXPS.okMaybeItsACandidate.test(s) && !this._hasAncestorTag(a, "table") && !this._hasAncestorTag(a, "code") && "BODY" !== a.tagName && "A" !== a.tagName) {
                                          this.log("Removing unlikely candidate - " + s), a = this._removeAndGetNext(a);
                                          continue
                                      }
                                      if (this.UNLIKELY_ROLES.includes(a.getAttribute("role"))) {
                                          this.log("Removing content with role " + a.getAttribute("role") + " - " + s), a = this._removeAndGetNext(a);
                                          continue
                                      }
                                  }
                                  if ("DIV" !== a.tagName && "SECTION" !== a.tagName && "HEADER" !== a.tagName && "H1" !== a.tagName && "H2" !== a.tagName && "H3" !== a.tagName && "H4" !== a.tagName && "H5" !== a.tagName && "H6" !== a.tagName || !this._isElementWithoutContent(a)) {
                                      if (-1 !== this.DEFAULT_TAGS_TO_SCORE.indexOf(a.tagName) && o.push(a), "DIV" === a.tagName) {
                                          for (var l = null, c = a.firstChild; c;) {
                                              var u = c.nextSibling;
                                              if (this._isPhrasingContent(c)) null !== l ? l.appendChild(c) : this._isWhitespace(c) || (l = t.createElement("p"), a.replaceChild(l, c), l.appendChild(c));
                                              else if (null !== l) {
                                                  for (; l.lastChild && this._isWhitespace(l.lastChild);) l.removeChild(l.lastChild);
                                                  l = null
                                              }
                                              c = u
                                          }
                                          if (this._hasSingleTagInsideElement(a, "P") && this._getLinkDensity(a) < .25) {
                                              var d = a.children[0];
                                              a.parentNode.replaceChild(d, a), a = d, o.push(a)
                                          } else this._hasChildBlockElement(a) || (a = this._setNodeTag(a, "P"), o.push(a))
                                      }
                                      a = this._getNextNode(a)
                                  } else a = this._removeAndGetNext(a)
                              } else a = this._removeAndGetNext(a);
                              else this.log("Removing hidden node - " + s), a = this._removeAndGetNext(a)
                          }
                          var f = [];
                          this._forEachNode(o, (function(e) {
                              if (e.parentNode && void 0 !== e.parentNode.tagName) {
                                  var t = this._getInnerText(e);
                                  if (!(t.length < 25)) {
                                      var n = this._getNodeAncestors(e, 5);
                                      if (0 !== n.length) {
                                          var i = 0;
                                          i += 1, i += t.split(",").length, i += Math.min(Math.floor(t.length / 100), 3), this._forEachNode(n, (function(e, t) {
                                              if (e.tagName && e.parentNode && void 0 !== e.parentNode.tagName) {
                                                  if (void 0 === e.readability && (this._initializeNode(e), f.push(e)), 0 === t) var n = 1;
                                                  else n = 1 === t ? 2 : 3 * t;
                                                  e.readability.contentScore += i / n
                                              }
                                          }))
                                      }
                                  }
                              }
                          }));
                          for (var p = [], h = 0, g = f.length; h < g; h += 1) {
                              var m = f[h],
                                  v = m.readability.contentScore * (1 - this._getLinkDensity(m));
                              m.readability.contentScore = v, this.log("Candidate:", m, "with score " + v);
                              for (var y = 0; y < this._nbTopCandidates; y++) {
                                  var b = p[y];
                                  if (!b || v > b.readability.contentScore) {
                                      p.splice(y, 0, m), p.length > this._nbTopCandidates && p.pop();
                                      break
                                  }
                              }
                          }
                          var x, T = p[0] || null,
                              w = !1;
                          if (null === T || "BODY" === T.tagName) {
                              for (T = t.createElement("DIV"), w = !0; e.firstChild;) this.log("Moving child out:", e.firstChild), T.appendChild(e.firstChild);
                              e.appendChild(T), this._initializeNode(T)
                          } else if (T) {
                              for (var E = [], _ = 1; _ < p.length; _++) p[_].readability.contentScore / T.readability.contentScore >= .75 && E.push(this._getNodeAncestors(p[_]));
                              if (E.length >= 3)
                                  for (x = T.parentNode;
                                      "BODY" !== x.tagName;) {
                                      for (var N = 0, A = 0; A < E.length && N < 3; A++) N += Number(E[A].includes(x));
                                      if (N >= 3) {
                                          T = x;
                                          break
                                      }
                                      x = x.parentNode
                                  }
                              T.readability || this._initializeNode(T), x = T.parentNode;
                              for (var C = T.readability.contentScore, S = C / 3;
                                  "BODY" !== x.tagName;)
                                  if (x.readability) {
                                      var D = x.readability.contentScore;
                                      if (D < S) break;
                                      if (D > C) {
                                          T = x;
                                          break
                                      }
                                      C = x.readability.contentScore, x = x.parentNode
                                  } else x = x.parentNode;
                              for (x = T.parentNode;
                                  "BODY" != x.tagName && 1 == x.children.length;) x = (T = x).parentNode;
                              T.readability || this._initializeNode(T)
                          }
                          var L = t.createElement("DIV");
                          n && (L.id = "readability-content");
                          for (var O = Math.max(10, .2 * T.readability.contentScore), k = (x = T.parentNode).children, R = 0, j = k.length; R < j; R++) {
                              var I = k[R],
                                  P = !1;
                              if (this.log("Looking at sibling node:", I, I.readability ? "with score " + I.readability.contentScore : ""), this.log("Sibling has score", I.readability ? I.readability.contentScore : "Unknown"), I === T) P = !0;
                              else {
                                  var M = 0;
                                  if (I.className === T.className && "" !== T.className && (M += .2 * T.readability.contentScore), I.readability && I.readability.contentScore + M >= O) P = !0;
                                  else if ("P" === I.nodeName) {
                                      var H = this._getLinkDensity(I),
                                          $ = this._getInnerText(I),
                                          B = $.length;
                                      (B > 80 && H < .25 || B < 80 && B > 0 && 0 === H && -1 !== $.search(/\.( |$)/)) && (P = !0)
                                  }
                              }
                              P && (this.log("Appending node:", I), -1 === this.ALTER_TO_DIV_EXCEPTIONS.indexOf(I.nodeName) && (this.log("Altering sibling:", I, "to div."), I = this._setNodeTag(I, "DIV")), L.appendChild(I), k = x.children, R -= 1, j -= 1)
                          }
                          if (this._debug && this.log("Article content pre-prep: " + L.innerHTML), this._prepArticle(L), this._debug && this.log("Article content post-prep: " + L.innerHTML), w) T.id = "readability-page-1", T.className = "page";
                          else {
                              var q = t.createElement("DIV");
                              for (q.id = "readability-page-1", q.className = "page"; L.firstChild;) q.appendChild(L.firstChild);
                              L.appendChild(q)
                          }
                          this._debug && this.log("Article content after paging: " + L.innerHTML);
                          var W = !0,
                              F = this._getInnerText(L, !0).length;
                          if (F < this._charThreshold)
                              if (W = !1, e.innerHTML = i, this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) this._removeFlag(this.FLAG_STRIP_UNLIKELYS), this._attempts.push({
                                  articleContent: L,
                                  textLength: F
                              });
                              else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) this._removeFlag(this.FLAG_WEIGHT_CLASSES), this._attempts.push({
                              articleContent: L,
                              textLength: F
                          });
                          else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY), this._attempts.push({
                              articleContent: L,
                              textLength: F
                          });
                          else {
                              if (this._attempts.push({
                                      articleContent: L,
                                      textLength: F
                                  }), this._attempts.sort((function(e, t) {
                                      return t.textLength - e.textLength
                                  })), !this._attempts[0].textLength) return null;
                              L = this._attempts[0].articleContent, W = !0
                          }
                          if (W) {
                              var U = [x, T].concat(this._getNodeAncestors(x));
                              return this._someNode(U, (function(e) {
                                  if (!e.tagName) return !1;
                                  var t = e.getAttribute("dir");
                                  return !!t && (this._articleDir = t, !0)
                              })), L
                          }
                      }
                  },
                  _isValidByline: function(e) {
                      return ("string" == typeof e || e instanceof String) && ((e = e.trim()).length > 0 && e.length < 100)
                  },
                  _unescapeHtmlEntities: function(e) {
                      if (!e) return e;
                      var t = this.HTML_ESCAPE_MAP;
                      return e.replace(/&(quot|amp|apos|lt|gt);/g, (function(e, n) {
                          return t[n]
                      })).replace(/&#(?:x([0-9a-z]{1,4})|([0-9]{1,4}));/gi, (function(e, t, n) {
                          var i = parseInt(t || n, t ? 16 : 10);
                          return String.fromCharCode(i)
                      }))
                  },
                  _getJSONLD: function(e) {
                      var t, n = this._getAllNodesWithTag(e, ["script"]);
                      return this._forEachNode(n, (function(e) {
                          if (!t && "application/ld+json" === e.getAttribute("type")) try {
                              var n = e.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, ""),
                                  i = JSON.parse(n);
                              if (!i["@context"] || !i["@context"].match(/^https?\:\/\/schema\.org$/)) return;
                              if (!i["@type"] && Array.isArray(i["@graph"]) && (i = i["@graph"].find((function(e) {
                                      return (e["@type"] || "").match(this.REGEXPS.jsonLdArticleTypes)
                                  }))), !i || !i["@type"] || !i["@type"].match(this.REGEXPS.jsonLdArticleTypes)) return;
                              if (t = {}, "string" == typeof i.name && "string" == typeof i.headline && i.name !== i.headline) {
                                  var r = this._getArticleTitle(),
                                      o = this._textSimilarity(i.name, r) > .75,
                                      a = this._textSimilarity(i.headline, r) > .75;
                                  t.title = a && !o ? i.headline : i.name
                              } else "string" == typeof i.name ? t.title = i.name.trim() : "string" == typeof i.headline && (t.title = i.headline.trim());
                              return i.author && ("string" == typeof i.author.name ? t.byline = i.author.name.trim() : Array.isArray(i.author) && i.author[0] && "string" == typeof i.author[0].name && (t.byline = i.author.filter((function(e) {
                                  return e && "string" == typeof e.name
                              })).map((function(e) {
                                  return e.name.trim()
                              })).join(", "))), "string" == typeof i.description && (t.excerpt = i.description.trim()), void(i.publisher && "string" == typeof i.publisher.name && (t.siteName = i.publisher.name.trim()))
                          } catch (e) {
                              this.log(e.message)
                          }
                      })), t || {}
                  },
                  _getArticleMetadata: function(e) {
                      var t = {},
                          n = {},
                          i = this._doc.getElementsByTagName("meta"),
                          r = /\s*(dc|dcterm|og|twitter)\s*:\s*(author|creator|description|title|site_name)\s*/gi,
                          o = /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;
                      return this._forEachNode(i, (function(e) {
                          var t = e.getAttribute("name"),
                              i = e.getAttribute("property"),
                              a = e.getAttribute("content");
                          if (a) {
                              var s = null,
                                  l = null;
                              i && (s = i.match(r)) && (l = s[0].toLowerCase().replace(/\s/g, ""), n[l] = a.trim()), !s && t && o.test(t) && (l = t, a && (l = l.toLowerCase().replace(/\s/g, "").replace(/\./g, ":"), n[l] = a.trim()))
                          }
                      })), t.title = e.title || n["dc:title"] || n["dcterm:title"] || n["og:title"] || n["weibo:article:title"] || n["weibo:webpage:title"] || n.title || n["twitter:title"], t.title || (t.title = this._getArticleTitle()), t.byline = e.byline || n["dc:creator"] || n["dcterm:creator"] || n.author, t.excerpt = e.excerpt || n["dc:description"] || n["dcterm:description"] || n["og:description"] || n["weibo:article:description"] || n["weibo:webpage:description"] || n.description || n["twitter:description"], t.siteName = e.siteName || n["og:site_name"], t.title = this._unescapeHtmlEntities(t.title), t.byline = this._unescapeHtmlEntities(t.byline), t.excerpt = this._unescapeHtmlEntities(t.excerpt), t.siteName = this._unescapeHtmlEntities(t.siteName), t
                  },
                  _isSingleImage: function(e) {
                      return "IMG" === e.tagName || 1 === e.children.length && "" === e.textContent.trim() && this._isSingleImage(e.children[0])
                  },
                  _unwrapNoscriptImages: function(e) {
                      var t = Array.from(e.getElementsByTagName("img"));
                      this._forEachNode(t, (function(e) {
                          for (var t = 0; t < e.attributes.length; t++) {
                              var n = e.attributes[t];
                              switch (n.name) {
                                  case "src":
                                  case "srcset":
                                  case "data-src":
                                  case "data-srcset":
                                      return
                              }
                              if (/\.(jpg|jpeg|png|webp)/i.test(n.value)) return
                          }
                          e.parentNode.removeChild(e)
                      }));
                      var n = Array.from(e.getElementsByTagName("noscript"));
                      this._forEachNode(n, (function(t) {
                          var n = e.createElement("div");
                          if (n.innerHTML = t.innerHTML, this._isSingleImage(n)) {
                              var i = t.previousElementSibling;
                              if (i && this._isSingleImage(i)) {
                                  var r = i;
                                  "IMG" !== r.tagName && (r = i.getElementsByTagName("img")[0]);
                                  for (var o = n.getElementsByTagName("img")[0], a = 0; a < r.attributes.length; a++) {
                                      var s = r.attributes[a];
                                      if ("" !== s.value && ("src" === s.name || "srcset" === s.name || /\.(jpg|jpeg|png|webp)/i.test(s.value))) {
                                          if (o.getAttribute(s.name) === s.value) continue;
                                          var l = s.name;
                                          o.hasAttribute(l) && (l = "data-old-" + l), o.setAttribute(l, s.value)
                                      }
                                  }
                                  t.parentNode.replaceChild(n.firstElementChild, i)
                              }
                          }
                      }))
                  },
                  _removeScripts: function(e) {
                      this._removeNodes(this._getAllNodesWithTag(e, ["script", "noscript"]))
                  },
                  _hasSingleTagInsideElement: function(e, t) {
                      return 1 == e.children.length && e.children[0].tagName === t && !this._someNode(e.childNodes, (function(e) {
                          return e.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(e.textContent)
                      }))
                  },
                  _isElementWithoutContent: function(e) {
                      return e.nodeType === this.ELEMENT_NODE && 0 == e.textContent.trim().length && (0 == e.children.length || e.children.length == e.getElementsByTagName("br").length + e.getElementsByTagName("hr").length)
                  },
                  _hasChildBlockElement: function(e) {
                      return this._someNode(e.childNodes, (function(e) {
                          return this.DIV_TO_P_ELEMS.has(e.tagName) || this._hasChildBlockElement(e)
                      }))
                  },
                  _isPhrasingContent: function(e) {
                      return e.nodeType === this.TEXT_NODE || -1 !== this.PHRASING_ELEMS.indexOf(e.tagName) || ("A" === e.tagName || "DEL" === e.tagName || "INS" === e.tagName) && this._everyNode(e.childNodes, this._isPhrasingContent)
                  },
                  _isWhitespace: function(e) {
                      return e.nodeType === this.TEXT_NODE && 0 === e.textContent.trim().length || e.nodeType === this.ELEMENT_NODE && "BR" === e.tagName
                  },
                  _getInnerText: function(e, t) {
                      t = void 0 === t || t;
                      var n = e.textContent.trim();
                      return t ? n.replace(this.REGEXPS.normalize, " ") : n
                  },
                  _getCharCount: function(e, t) {
                      return t = t || ",", this._getInnerText(e).split(t).length - 1
                  },
                  _cleanStyles: function(e) {
                      if (e && "svg" !== e.tagName.toLowerCase()) {
                          for (var t = 0; t < this.PRESENTATIONAL_ATTRIBUTES.length; t++) e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[t]); - 1 !== this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) && (e.removeAttribute("width"), e.removeAttribute("height"));
                          for (var n = e.firstElementChild; null !== n;) this._cleanStyles(n), n = n.nextElementSibling
                      }
                  },
                  _getLinkDensity: function(e) {
                      var t = this._getInnerText(e).length;
                      if (0 === t) return 0;
                      var n = 0;
                      return this._forEachNode(e.getElementsByTagName("a"), (function(e) {
                          var t = e.getAttribute("href"),
                              i = t && this.REGEXPS.hashUrl.test(t) ? .3 : 1;
                          n += this._getInnerText(e).length * i
                      })), n / t
                  },
                  _getClassWeight: function(e) {
                      if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) return 0;
                      var t = 0;
                      return "string" == typeof e.className && "" !== e.className && (this.REGEXPS.negative.test(e.className) && (t -= 25), this.REGEXPS.positive.test(e.className) && (t += 25)), "string" == typeof e.id && "" !== e.id && (this.REGEXPS.negative.test(e.id) && (t -= 25), this.REGEXPS.positive.test(e.id) && (t += 25)), t
                  },
                  _clean: function(e, t) {
                      var n = -1 !== ["object", "embed", "iframe"].indexOf(t);
                      this._removeNodes(this._getAllNodesWithTag(e, [t]), (function(e) {
                          if (n) {
                              for (var t = 0; t < e.attributes.length; t++)
                                  if (this._allowedVideoRegex.test(e.attributes[t].value)) return !1;
                              if ("object" === e.tagName && this._allowedVideoRegex.test(e.innerHTML)) return !1
                          }
                          return !0
                      }))
                  },
                  _hasAncestorTag: function(e, t, n, i) {
                      n = n || 3, t = t.toUpperCase();
                      for (var r = 0; e.parentNode;) {
                          if (n > 0 && r > n) return !1;
                          if (e.parentNode.tagName === t && (!i || i(e.parentNode))) return !0;
                          e = e.parentNode, r++
                      }
                      return !1
                  },
                  _getRowAndColumnCount: function(e) {
                      for (var t = 0, n = 0, i = e.getElementsByTagName("tr"), r = 0; r < i.length; r++) {
                          var o = i[r].getAttribute("rowspan") || 0;
                          o && (o = parseInt(o, 10)), t += o || 1;
                          for (var a = 0, s = i[r].getElementsByTagName("td"), l = 0; l < s.length; l++) {
                              var c = s[l].getAttribute("colspan") || 0;
                              c && (c = parseInt(c, 10)), a += c || 1
                          }
                          n = Math.max(n, a)
                      }
                      return {
                          rows: t,
                          columns: n
                      }
                  },
                  _markDataTables: function(e) {
                      for (var t = e.getElementsByTagName("table"), n = 0; n < t.length; n++) {
                          var i = t[n];
                          if ("presentation" != i.getAttribute("role"))
                              if ("0" != i.getAttribute("datatable"))
                                  if (i.getAttribute("summary")) i._readabilityDataTable = !0;
                                  else {
                                      var r = i.getElementsByTagName("caption")[0];
                                      if (r && r.childNodes.length > 0) i._readabilityDataTable = !0;
                                      else {
                                          if (["col", "colgroup", "tfoot", "thead", "th"].some((function(e) {
                                                  return !!i.getElementsByTagName(e)[0]
                                              }))) this.log("Data table because found data-y descendant"), i._readabilityDataTable = !0;
                                          else if (i.getElementsByTagName("table")[0]) i._readabilityDataTable = !1;
                                          else {
                                              var o = this._getRowAndColumnCount(i);
                                              o.rows >= 10 || o.columns > 4 ? i._readabilityDataTable = !0 : i._readabilityDataTable = o.rows * o.columns > 10
                                          }
                                      }
                                  }
                          else i._readabilityDataTable = !1;
                          else i._readabilityDataTable = !1
                      }
                  },
                  _fixLazyImages: function(e) {
                      this._forEachNode(this._getAllNodesWithTag(e, ["img", "picture", "figure"]), (function(e) {
                          if (e.src && this.REGEXPS.b64DataUrl.test(e.src)) {
                              if ("image/svg+xml" === this.REGEXPS.b64DataUrl.exec(e.src)[1]) return;
                              for (var t = !1, n = 0; n < e.attributes.length; n++) {
                                  var i = e.attributes[n];
                                  if ("src" !== i.name && /\.(jpg|jpeg|png|webp)/i.test(i.value)) {
                                      t = !0;
                                      break
                                  }
                              }
                              if (t) {
                                  var r = e.src.search(/base64\s*/i) + 7;
                                  e.src.length - r < 133 && e.removeAttribute("src")
                              }
                          }
                          if (!(e.src || e.srcset && "null" != e.srcset) || -1 !== e.className.toLowerCase().indexOf("lazy"))
                              for (var o = 0; o < e.attributes.length; o++)
                                  if ("src" !== (i = e.attributes[o]).name && "srcset" !== i.name && "alt" !== i.name) {
                                      var a = null;
                                      if (/\.(jpg|jpeg|png|webp)\s+\d/.test(i.value) ? a = "srcset" : /^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(i.value) && (a = "src"), a)
                                          if ("IMG" === e.tagName || "PICTURE" === e.tagName) e.setAttribute(a, i.value);
                                          else if ("FIGURE" === e.tagName && !this._getAllNodesWithTag(e, ["img", "picture"]).length) {
                                          var s = this._doc.createElement("img");
                                          s.setAttribute(a, i.value), e.appendChild(s)
                                      }
                                  }
                      }))
                  },
                  _getTextDensity: function(e, t) {
                      var n = this._getInnerText(e, !0).length;
                      if (0 === n) return 0;
                      var i = 0,
                          r = this._getAllNodesWithTag(e, t);
                      return this._forEachNode(r, (e => i += this._getInnerText(e, !0).length)), i / n
                  },
                  _cleanConditionally: function(e, t) {
                      this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY) && this._removeNodes(this._getAllNodesWithTag(e, [t]), (function(e) {
                          var n = function(e) {
                                  return e._readabilityDataTable
                              },
                              i = "ul" === t || "ol" === t;
                          if (!i) {
                              var r = 0,
                                  o = this._getAllNodesWithTag(e, ["ul", "ol"]);
                              this._forEachNode(o, (e => r += this._getInnerText(e).length)), i = r / this._getInnerText(e).length > .9
                          }
                          if ("table" === t && n(e)) return !1;
                          if (this._hasAncestorTag(e, "table", -1, n)) return !1;
                          if (this._hasAncestorTag(e, "code")) return !1;
                          var a = this._getClassWeight(e);
                          this.log("Cleaning Conditionally", e);
                          if (a + 0 < 0) return !0;
                          if (this._getCharCount(e, ",") < 10) {
                              for (var s = e.getElementsByTagName("p").length, l = e.getElementsByTagName("img").length, c = e.getElementsByTagName("li").length - 100, u = e.getElementsByTagName("input").length, d = this._getTextDensity(e, ["h1", "h2", "h3", "h4", "h5", "h6"]), f = 0, p = this._getAllNodesWithTag(e, ["object", "embed", "iframe"]), h = 0; h < p.length; h++) {
                                  for (var g = 0; g < p[h].attributes.length; g++)
                                      if (this._allowedVideoRegex.test(p[h].attributes[g].value)) return !1;
                                  if ("object" === p[h].tagName && this._allowedVideoRegex.test(p[h].innerHTML)) return !1;
                                  f++
                              }
                              var m = this._getLinkDensity(e),
                                  v = this._getInnerText(e).length,
                                  y = l > 1 && s / l < .5 && !this._hasAncestorTag(e, "figure") || !i && c > s || u > Math.floor(s / 3) || !i && d < .9 && v < 25 && (0 === l || l > 2) && !this._hasAncestorTag(e, "figure") || !i && a < 25 && m > .2 || a >= 25 && m > .5 || 1 === f && v < 75 || f > 1;
                              if (i && y) {
                                  for (var b = 0; b < e.children.length; b++) {
                                      if (e.children[b].children.length > 1) return y
                                  }
                                  if (l == e.getElementsByTagName("li").length) return !1
                              }
                              return y
                          }
                          return !1
                      }))
                  },
                  _cleanMatchedNodes: function(e, t) {
                      for (var n = this._getNextNode(e, !0), i = this._getNextNode(e); i && i != n;) i = t.call(this, i, i.className + " " + i.id) ? this._removeAndGetNext(i) : this._getNextNode(i)
                  },
                  _cleanHeaders: function(e) {
                      let t = this._getAllNodesWithTag(e, ["h1", "h2"]);
                      this._removeNodes(t, (function(e) {
                          let t = this._getClassWeight(e) < 0;
                          return t && this.log("Removing header with low class weight:", e), t
                      }))
                  },
                  _headerDuplicatesTitle: function(e) {
                      if ("H1" != e.tagName && "H2" != e.tagName) return !1;
                      var t = this._getInnerText(e, !1);
                      return this.log("Evaluating similarity of header:", t, this._articleTitle), this._textSimilarity(this._articleTitle, t) > .75
                  },
                  _flagIsActive: function(e) {
                      return (this._flags & e) > 0
                  },
                  _removeFlag: function(e) {
                      this._flags = this._flags & ~e
                  },
                  _isProbablyVisible: function(e) {
                      return (!e.style || "none" != e.style.display) && !e.hasAttribute("hidden") && (!e.hasAttribute("aria-hidden") || "true" != e.getAttribute("aria-hidden") || e.className && e.className.indexOf && -1 !== e.className.indexOf("fallback-image"))
                  },
                  parse: function() {
                      if (this._maxElemsToParse > 0) {
                          var e = this._doc.getElementsByTagName("*").length;
                          if (e > this._maxElemsToParse) throw new Error("Aborting parsing document; " + e + " elements found")
                      }
                      this._unwrapNoscriptImages(this._doc);
                      var t = this._disableJSONLD ? {} : this._getJSONLD(this._doc);
                      this._removeScripts(this._doc), this._prepDocument();
                      var n = this._getArticleMetadata(t);
                      this._articleTitle = n.title;
                      var i = this._grabArticle();
                      if (!i) return null;
                      if (this.log("Grabbed: " + i.innerHTML), this._postProcessContent(i), !n.excerpt) {
                          var r = i.getElementsByTagName("p");
                          r.length > 0 && (n.excerpt = r[0].textContent.trim())
                      }
                      var o = i.textContent;
                      return {
                          title: this._articleTitle,
                          byline: n.byline || this._articleByline,
                          dir: this._articleDir,
                          lang: this._articleLang,
                          content: this._serializer(i),
                          textContent: o,
                          length: o.length,
                          excerpt: n.excerpt,
                          siteName: n.siteName || this._articleSiteName
                      }
                  }
              }, e.exports = t
          },
          6107: (e, t, n) => {
              var i = n(4174),
                  r = n(7893);
              e.exports = {
                  Readability: i,
                  isProbablyReaderable: r
              }
          },
          9755: function(e, t) {
              var n;
              /*!
               * jQuery JavaScript Library v3.7.0
               * https://jquery.com/
               *
               * Copyright OpenJS Foundation and other contributors
               * Released under the MIT license
               * https://jquery.org/license
               *
               * Date: 2023-05-11T18:29Z
               */
              ! function(t, n) {
                  "use strict";
                  "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(e) {
                      if (!e.document) throw new Error("jQuery requires a window with a document");
                      return n(e)
                  } : n(t)
              }("undefined" != typeof window ? window : this, (function(i, r) {
                  "use strict";
                  var o = [],
                      a = Object.getPrototypeOf,
                      s = o.slice,
                      l = o.flat ? function(e) {
                          return o.flat.call(e)
                      } : function(e) {
                          return o.concat.apply([], e)
                      },
                      c = o.push,
                      u = o.indexOf,
                      d = {},
                      f = d.toString,
                      p = d.hasOwnProperty,
                      h = p.toString,
                      g = h.call(Object),
                      m = {},
                      v = function(e) {
                          return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
                      },
                      y = function(e) {
                          return null != e && e === e.window
                      },
                      b = i.document,
                      x = {
                          type: !0,
                          src: !0,
                          nonce: !0,
                          noModule: !0
                      };

                  function T(e, t, n) {
                      var i, r, o = (n = n || b).createElement("script");
                      if (o.text = e, t)
                          for (i in x)(r = t[i] || t.getAttribute && t.getAttribute(i)) && o.setAttribute(i, r);
                      n.head.appendChild(o).parentNode.removeChild(o)
                  }

                  function w(e) {
                      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[f.call(e)] || "object" : typeof e
                  }
                  var E = "3.7.0",
                      _ = /HTML$/i,
                      N = function(e, t) {
                          return new N.fn.init(e, t)
                      };

                  function A(e) {
                      var t = !!e && "length" in e && e.length,
                          n = w(e);
                      return !v(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
                  }

                  function C(e, t) {
                      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                  }
                  N.fn = N.prototype = {
                      jquery: E,
                      constructor: N,
                      length: 0,
                      toArray: function() {
                          return s.call(this)
                      },
                      get: function(e) {
                          return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
                      },
                      pushStack: function(e) {
                          var t = N.merge(this.constructor(), e);
                          return t.prevObject = this, t
                      },
                      each: function(e) {
                          return N.each(this, e)
                      },
                      map: function(e) {
                          return this.pushStack(N.map(this, (function(t, n) {
                              return e.call(t, n, t)
                          })))
                      },
                      slice: function() {
                          return this.pushStack(s.apply(this, arguments))
                      },
                      first: function() {
                          return this.eq(0)
                      },
                      last: function() {
                          return this.eq(-1)
                      },
                      even: function() {
                          return this.pushStack(N.grep(this, (function(e, t) {
                              return (t + 1) % 2
                          })))
                      },
                      odd: function() {
                          return this.pushStack(N.grep(this, (function(e, t) {
                              return t % 2
                          })))
                      },
                      eq: function(e) {
                          var t = this.length,
                              n = +e + (e < 0 ? t : 0);
                          return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                      },
                      end: function() {
                          return this.prevObject || this.constructor()
                      },
                      push: c,
                      sort: o.sort,
                      splice: o.splice
                  }, N.extend = N.fn.extend = function() {
                      var e, t, n, i, r, o, a = arguments[0] || {},
                          s = 1,
                          l = arguments.length,
                          c = !1;
                      for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || v(a) || (a = {}), s === l && (a = this, s--); s < l; s++)
                          if (null != (e = arguments[s]))
                              for (t in e) i = e[t], "__proto__" !== t && a !== i && (c && i && (N.isPlainObject(i) || (r = Array.isArray(i))) ? (n = a[t], o = r && !Array.isArray(n) ? [] : r || N.isPlainObject(n) ? n : {}, r = !1, a[t] = N.extend(c, o, i)) : void 0 !== i && (a[t] = i));
                      return a
                  }, N.extend({
                      expando: "jQuery" + (E + Math.random()).replace(/\D/g, ""),
                      isReady: !0,
                      error: function(e) {
                          throw new Error(e)
                      },
                      noop: function() {},
                      isPlainObject: function(e) {
                          var t, n;
                          return !(!e || "[object Object]" !== f.call(e)) && (!(t = a(e)) || "function" == typeof(n = p.call(t, "constructor") && t.constructor) && h.call(n) === g)
                      },
                      isEmptyObject: function(e) {
                          var t;
                          for (t in e) return !1;
                          return !0
                      },
                      globalEval: function(e, t, n) {
                          T(e, {
                              nonce: t && t.nonce
                          }, n)
                      },
                      each: function(e, t) {
                          var n, i = 0;
                          if (A(e))
                              for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
                          else
                              for (i in e)
                                  if (!1 === t.call(e[i], i, e[i])) break;
                          return e
                      },
                      text: function(e) {
                          var t, n = "",
                              i = 0,
                              r = e.nodeType;
                          if (r) {
                              if (1 === r || 9 === r || 11 === r) return e.textContent;
                              if (3 === r || 4 === r) return e.nodeValue
                          } else
                              for (; t = e[i++];) n += N.text(t);
                          return n
                      },
                      makeArray: function(e, t) {
                          var n = t || [];
                          return null != e && (A(Object(e)) ? N.merge(n, "string" == typeof e ? [e] : e) : c.call(n, e)), n
                      },
                      inArray: function(e, t, n) {
                          return null == t ? -1 : u.call(t, e, n)
                      },
                      isXMLDoc: function(e) {
                          var t = e && e.namespaceURI,
                              n = e && (e.ownerDocument || e).documentElement;
                          return !_.test(t || n && n.nodeName || "HTML")
                      },
                      merge: function(e, t) {
                          for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
                          return e.length = r, e
                      },
                      grep: function(e, t, n) {
                          for (var i = [], r = 0, o = e.length, a = !n; r < o; r++) !t(e[r], r) !== a && i.push(e[r]);
                          return i
                      },
                      map: function(e, t, n) {
                          var i, r, o = 0,
                              a = [];
                          if (A(e))
                              for (i = e.length; o < i; o++) null != (r = t(e[o], o, n)) && a.push(r);
                          else
                              for (o in e) null != (r = t(e[o], o, n)) && a.push(r);
                          return l(a)
                      },
                      guid: 1,
                      support: m
                  }), "function" == typeof Symbol && (N.fn[Symbol.iterator] = o[Symbol.iterator]), N.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                      d["[object " + t + "]"] = t.toLowerCase()
                  }));
                  var S = o.pop,
                      D = o.sort,
                      L = o.splice,
                      O = "[\\x20\\t\\r\\n\\f]",
                      k = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g");
                  N.contains = function(e, t) {
                      var n = t && t.parentNode;
                      return e === n || !(!n || 1 !== n.nodeType || !(e.contains ? e.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
                  };
                  var R = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

                  function j(e, t) {
                      return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                  }
                  N.escapeSelector = function(e) {
                      return (e + "").replace(R, j)
                  };
                  var I = b,
                      P = c;
                  ! function() {
                      var e, t, n, r, a, l, c, d, f, h, g = P,
                          v = N.expando,
                          y = 0,
                          b = 0,
                          x = ee(),
                          T = ee(),
                          w = ee(),
                          E = ee(),
                          _ = function(e, t) {
                              return e === t && (a = !0), 0
                          },
                          A = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                          R = "(?:\\\\[\\da-fA-F]{1,6}" + O + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                          j = "\\[" + O + "*(" + R + ")(?:" + O + "*([*^$|!~]?=)" + O + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + O + "*\\]",
                          M = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + j + ")*)|.*)\\)|)",
                          H = new RegExp(O + "+", "g"),
                          $ = new RegExp("^" + O + "*," + O + "*"),
                          B = new RegExp("^" + O + "*([>+~]|" + O + ")" + O + "*"),
                          q = new RegExp(O + "|>"),
                          W = new RegExp(M),
                          F = new RegExp("^" + R + "$"),
                          U = {
                              ID: new RegExp("^#(" + R + ")"),
                              CLASS: new RegExp("^\\.(" + R + ")"),
                              TAG: new RegExp("^(" + R + "|[*])"),
                              ATTR: new RegExp("^" + j),
                              PSEUDO: new RegExp("^" + M),
                              CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
                              bool: new RegExp("^(?:" + A + ")$", "i"),
                              needsContext: new RegExp("^" + O + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", "i")
                          },
                          V = /^(?:input|select|textarea|button)$/i,
                          G = /^h\d$/i,
                          X = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                          z = /[+~]/,
                          Y = new RegExp("\\\\[\\da-fA-F]{1,6}" + O + "?|\\\\([^\\r\\n\\f])", "g"),
                          J = function(e, t) {
                              var n = "0x" + e.slice(1) - 65536;
                              return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
                          },
                          K = function() {
                              le()
                          },
                          Q = fe((function(e) {
                              return !0 === e.disabled && C(e, "fieldset")
                          }), {
                              dir: "parentNode",
                              next: "legend"
                          });
                      try {
                          g.apply(o = s.call(I.childNodes), I.childNodes), o[I.childNodes.length].nodeType
                      } catch (e) {
                          g = {
                              apply: function(e, t) {
                                  P.apply(e, s.call(t))
                              },
                              call: function(e) {
                                  P.apply(e, s.call(arguments, 1))
                              }
                          }
                      }

                      function Z(e, t, n, i) {
                          var r, o, a, s, c, u, p, h = t && t.ownerDocument,
                              y = t ? t.nodeType : 9;
                          if (n = n || [], "string" != typeof e || !e || 1 !== y && 9 !== y && 11 !== y) return n;
                          if (!i && (le(t), t = t || l, d)) {
                              if (11 !== y && (c = X.exec(e)))
                                  if (r = c[1]) {
                                      if (9 === y) {
                                          if (!(a = t.getElementById(r))) return n;
                                          if (a.id === r) return g.call(n, a), n
                                      } else if (h && (a = h.getElementById(r)) && Z.contains(t, a) && a.id === r) return g.call(n, a), n
                                  } else {
                                      if (c[2]) return g.apply(n, t.getElementsByTagName(e)), n;
                                      if ((r = c[3]) && t.getElementsByClassName) return g.apply(n, t.getElementsByClassName(r)), n
                                  } if (!(E[e + " "] || f && f.test(e))) {
                                  if (p = e, h = t, 1 === y && (q.test(e) || B.test(e))) {
                                      for ((h = z.test(e) && se(t.parentNode) || t) == t && m.scope || ((s = t.getAttribute("id")) ? s = N.escapeSelector(s) : t.setAttribute("id", s = v)), o = (u = ue(e)).length; o--;) u[o] = (s ? "#" + s : ":scope") + " " + de(u[o]);
                                      p = u.join(",")
                                  }
                                  try {
                                      return g.apply(n, h.querySelectorAll(p)), n
                                  } catch (t) {
                                      E(e, !0)
                                  } finally {
                                      s === v && t.removeAttribute("id")
                                  }
                              }
                          }
                          return ye(e.replace(k, "$1"), t, n, i)
                      }

                      function ee() {
                          var e = [];
                          return function n(i, r) {
                              return e.push(i + " ") > t.cacheLength && delete n[e.shift()], n[i + " "] = r
                          }
                      }

                      function te(e) {
                          return e[v] = !0, e
                      }

                      function ne(e) {
                          var t = l.createElement("fieldset");
                          try {
                              return !!e(t)
                          } catch (e) {
                              return !1
                          } finally {
                              t.parentNode && t.parentNode.removeChild(t), t = null
                          }
                      }

                      function ie(e) {
                          return function(t) {
                              return C(t, "input") && t.type === e
                          }
                      }

                      function re(e) {
                          return function(t) {
                              return (C(t, "input") || C(t, "button")) && t.type === e
                          }
                      }

                      function oe(e) {
                          return function(t) {
                              return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Q(t) === e : t.disabled === e : "label" in t && t.disabled === e
                          }
                      }

                      function ae(e) {
                          return te((function(t) {
                              return t = +t, te((function(n, i) {
                                  for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                              }))
                          }))
                      }

                      function se(e) {
                          return e && void 0 !== e.getElementsByTagName && e
                      }

                      function le(e) {
                          var n, i = e ? e.ownerDocument || e : I;
                          return i != l && 9 === i.nodeType && i.documentElement ? (c = (l = i).documentElement, d = !N.isXMLDoc(l), h = c.matches || c.webkitMatchesSelector || c.msMatchesSelector, I != l && (n = l.defaultView) && n.top !== n && n.addEventListener("unload", K), m.getById = ne((function(e) {
                              return c.appendChild(e).id = N.expando, !l.getElementsByName || !l.getElementsByName(N.expando).length
                          })), m.disconnectedMatch = ne((function(e) {
                              return h.call(e, "*")
                          })), m.scope = ne((function() {
                              return l.querySelectorAll(":scope")
                          })), m.cssHas = ne((function() {
                              try {
                                  return l.querySelector(":has(*,:jqfake)"), !1
                              } catch (e) {
                                  return !0
                              }
                          })), m.getById ? (t.filter.ID = function(e) {
                              var t = e.replace(Y, J);
                              return function(e) {
                                  return e.getAttribute("id") === t
                              }
                          }, t.find.ID = function(e, t) {
                              if (void 0 !== t.getElementById && d) {
                                  var n = t.getElementById(e);
                                  return n ? [n] : []
                              }
                          }) : (t.filter.ID = function(e) {
                              var t = e.replace(Y, J);
                              return function(e) {
                                  var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                  return n && n.value === t
                              }
                          }, t.find.ID = function(e, t) {
                              if (void 0 !== t.getElementById && d) {
                                  var n, i, r, o = t.getElementById(e);
                                  if (o) {
                                      if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                                      for (r = t.getElementsByName(e), i = 0; o = r[i++];)
                                          if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                                  }
                                  return []
                              }
                          }), t.find.TAG = function(e, t) {
                              return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : t.querySelectorAll(e)
                          }, t.find.CLASS = function(e, t) {
                              if (void 0 !== t.getElementsByClassName && d) return t.getElementsByClassName(e)
                          }, f = [], ne((function(e) {
                              var t;
                              c.appendChild(e).innerHTML = "<a id='" + v + "' href='' disabled='disabled'></a><select id='" + v + "-\r\\' disabled='disabled'><option selected=''></option></select>", e.querySelectorAll("[selected]").length || f.push("\\[" + O + "*(?:value|" + A + ")"), e.querySelectorAll("[id~=" + v + "-]").length || f.push("~="), e.querySelectorAll("a#" + v + "+*").length || f.push(".#.+[+~]"), e.querySelectorAll(":checked").length || f.push(":checked"), (t = l.createElement("input")).setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), c.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && f.push(":enabled", ":disabled"), (t = l.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || f.push("\\[" + O + "*name" + O + "*=" + O + "*(?:''|\"\")")
                          })), m.cssHas || f.push(":has"), f = f.length && new RegExp(f.join("|")), _ = function(e, t) {
                              if (e === t) return a = !0, 0;
                              var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                              return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !m.sortDetached && t.compareDocumentPosition(e) === n ? e === l || e.ownerDocument == I && Z.contains(I, e) ? -1 : t === l || t.ownerDocument == I && Z.contains(I, t) ? 1 : r ? u.call(r, e) - u.call(r, t) : 0 : 4 & n ? -1 : 1)
                          }, l) : l
                      }
                      for (e in Z.matches = function(e, t) {
                              return Z(e, null, null, t)
                          }, Z.matchesSelector = function(e, t) {
                              if (le(e), d && !E[t + " "] && (!f || !f.test(t))) try {
                                  var n = h.call(e, t);
                                  if (n || m.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                              } catch (e) {
                                  E(t, !0)
                              }
                              return Z(t, l, null, [e]).length > 0
                          }, Z.contains = function(e, t) {
                              return (e.ownerDocument || e) != l && le(e), N.contains(e, t)
                          }, Z.attr = function(e, n) {
                              (e.ownerDocument || e) != l && le(e);
                              var i = t.attrHandle[n.toLowerCase()],
                                  r = i && p.call(t.attrHandle, n.toLowerCase()) ? i(e, n, !d) : void 0;
                              return void 0 !== r ? r : e.getAttribute(n)
                          }, Z.error = function(e) {
                              throw new Error("Syntax error, unrecognized expression: " + e)
                          }, N.uniqueSort = function(e) {
                              var t, n = [],
                                  i = 0,
                                  o = 0;
                              if (a = !m.sortStable, r = !m.sortStable && s.call(e, 0), D.call(e, _), a) {
                                  for (; t = e[o++];) t === e[o] && (i = n.push(o));
                                  for (; i--;) L.call(e, n[i], 1)
                              }
                              return r = null, e
                          }, N.fn.uniqueSort = function() {
                              return this.pushStack(N.uniqueSort(s.apply(this)))
                          }, t = N.expr = {
                              cacheLength: 50,
                              createPseudo: te,
                              match: U,
                              attrHandle: {},
                              find: {},
                              relative: {
                                  ">": {
                                      dir: "parentNode",
                                      first: !0
                                  },
                                  " ": {
                                      dir: "parentNode"
                                  },
                                  "+": {
                                      dir: "previousSibling",
                                      first: !0
                                  },
                                  "~": {
                                      dir: "previousSibling"
                                  }
                              },
                              preFilter: {
                                  ATTR: function(e) {
                                      return e[1] = e[1].replace(Y, J), e[3] = (e[3] || e[4] || e[5] || "").replace(Y, J), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                                  },
                                  CHILD: function(e) {
                                      return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || Z.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && Z.error(e[0]), e
                                  },
                                  PSEUDO: function(e) {
                                      var t, n = !e[6] && e[2];
                                      return U.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && W.test(n) && (t = ue(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                                  }
                              },
                              filter: {
                                  TAG: function(e) {
                                      var t = e.replace(Y, J).toLowerCase();
                                      return "*" === e ? function() {
                                          return !0
                                      } : function(e) {
                                          return C(e, t)
                                      }
                                  },
                                  CLASS: function(e) {
                                      var t = x[e + " "];
                                      return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && x(e, (function(e) {
                                          return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                                      }))
                                  },
                                  ATTR: function(e, t, n) {
                                      return function(i) {
                                          var r = Z.attr(i, e);
                                          return null == r ? "!=" === t : !t || (r += "", "=" === t ? r === n : "!=" === t ? r !== n : "^=" === t ? n && 0 === r.indexOf(n) : "*=" === t ? n && r.indexOf(n) > -1 : "$=" === t ? n && r.slice(-n.length) === n : "~=" === t ? (" " + r.replace(H, " ") + " ").indexOf(n) > -1 : "|=" === t && (r === n || r.slice(0, n.length + 1) === n + "-"))
                                      }
                                  },
                                  CHILD: function(e, t, n, i, r) {
                                      var o = "nth" !== e.slice(0, 3),
                                          a = "last" !== e.slice(-4),
                                          s = "of-type" === t;
                                      return 1 === i && 0 === r ? function(e) {
                                          return !!e.parentNode
                                      } : function(t, n, l) {
                                          var c, u, d, f, p, h = o !== a ? "nextSibling" : "previousSibling",
                                              g = t.parentNode,
                                              m = s && t.nodeName.toLowerCase(),
                                              b = !l && !s,
                                              x = !1;
                                          if (g) {
                                              if (o) {
                                                  for (; h;) {
                                                      for (d = t; d = d[h];)
                                                          if (s ? C(d, m) : 1 === d.nodeType) return !1;
                                                      p = h = "only" === e && !p && "nextSibling"
                                                  }
                                                  return !0
                                              }
                                              if (p = [a ? g.firstChild : g.lastChild], a && b) {
                                                  for (x = (f = (c = (u = g[v] || (g[v] = {}))[e] || [])[0] === y && c[1]) && c[2], d = f && g.childNodes[f]; d = ++f && d && d[h] || (x = f = 0) || p.pop();)
                                                      if (1 === d.nodeType && ++x && d === t) {
                                                          u[e] = [y, f, x];
                                                          break
                                                      }
                                              } else if (b && (x = f = (c = (u = t[v] || (t[v] = {}))[e] || [])[0] === y && c[1]), !1 === x)
                                                  for (;
                                                      (d = ++f && d && d[h] || (x = f = 0) || p.pop()) && (!(s ? C(d, m) : 1 === d.nodeType) || !++x || (b && ((u = d[v] || (d[v] = {}))[e] = [y, x]), d !== t)););
                                              return (x -= r) === i || x % i == 0 && x / i >= 0
                                          }
                                      }
                                  },
                                  PSEUDO: function(e, n) {
                                      var i, r = t.pseudos[e] || t.setFilters[e.toLowerCase()] || Z.error("unsupported pseudo: " + e);
                                      return r[v] ? r(n) : r.length > 1 ? (i = [e, e, "", n], t.setFilters.hasOwnProperty(e.toLowerCase()) ? te((function(e, t) {
                                          for (var i, o = r(e, n), a = o.length; a--;) e[i = u.call(e, o[a])] = !(t[i] = o[a])
                                      })) : function(e) {
                                          return r(e, 0, i)
                                      }) : r
                                  }
                              },
                              pseudos: {
                                  not: te((function(e) {
                                      var t = [],
                                          n = [],
                                          i = ve(e.replace(k, "$1"));
                                      return i[v] ? te((function(e, t, n, r) {
                                          for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                                      })) : function(e, r, o) {
                                          return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                                      }
                                  })),
                                  has: te((function(e) {
                                      return function(t) {
                                          return Z(e, t).length > 0
                                      }
                                  })),
                                  contains: te((function(e) {
                                      return e = e.replace(Y, J),
                                          function(t) {
                                              return (t.textContent || N.text(t)).indexOf(e) > -1
                                          }
                                  })),
                                  lang: te((function(e) {
                                      return F.test(e || "") || Z.error("unsupported lang: " + e), e = e.replace(Y, J).toLowerCase(),
                                          function(t) {
                                              var n;
                                              do {
                                                  if (n = d ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                              } while ((t = t.parentNode) && 1 === t.nodeType);
                                              return !1
                                          }
                                  })),
                                  target: function(e) {
                                      var t = i.location && i.location.hash;
                                      return t && t.slice(1) === e.id
                                  },
                                  root: function(e) {
                                      return e === c
                                  },
                                  focus: function(e) {
                                      return e === function() {
                                          try {
                                              return l.activeElement
                                          } catch (e) {}
                                      }() && l.hasFocus() && !!(e.type || e.href || ~e.tabIndex)
                                  },
                                  enabled: oe(!1),
                                  disabled: oe(!0),
                                  checked: function(e) {
                                      return C(e, "input") && !!e.checked || C(e, "option") && !!e.selected
                                  },
                                  selected: function(e) {
                                      return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                                  },
                                  empty: function(e) {
                                      for (e = e.firstChild; e; e = e.nextSibling)
                                          if (e.nodeType < 6) return !1;
                                      return !0
                                  },
                                  parent: function(e) {
                                      return !t.pseudos.empty(e)
                                  },
                                  header: function(e) {
                                      return G.test(e.nodeName)
                                  },
                                  input: function(e) {
                                      return V.test(e.nodeName)
                                  },
                                  button: function(e) {
                                      return C(e, "input") && "button" === e.type || C(e, "button")
                                  },
                                  text: function(e) {
                                      var t;
                                      return C(e, "input") && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                                  },
                                  first: ae((function() {
                                      return [0]
                                  })),
                                  last: ae((function(e, t) {
                                      return [t - 1]
                                  })),
                                  eq: ae((function(e, t, n) {
                                      return [n < 0 ? n + t : n]
                                  })),
                                  even: ae((function(e, t) {
                                      for (var n = 0; n < t; n += 2) e.push(n);
                                      return e
                                  })),
                                  odd: ae((function(e, t) {
                                      for (var n = 1; n < t; n += 2) e.push(n);
                                      return e
                                  })),
                                  lt: ae((function(e, t, n) {
                                      var i;
                                      for (i = n < 0 ? n + t : n > t ? t : n; --i >= 0;) e.push(i);
                                      return e
                                  })),
                                  gt: ae((function(e, t, n) {
                                      for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                                      return e
                                  }))
                              }
                          }, t.pseudos.nth = t.pseudos.eq, {
                              radio: !0,
                              checkbox: !0,
                              file: !0,
                              password: !0,
                              image: !0
                          }) t.pseudos[e] = ie(e);
                      for (e in {
                              submit: !0,
                              reset: !0
                          }) t.pseudos[e] = re(e);

                      function ce() {}

                      function ue(e, n) {
                          var i, r, o, a, s, l, c, u = T[e + " "];
                          if (u) return n ? 0 : u.slice(0);
                          for (s = e, l = [], c = t.preFilter; s;) {
                              for (a in i && !(r = $.exec(s)) || (r && (s = s.slice(r[0].length) || s), l.push(o = [])), i = !1, (r = B.exec(s)) && (i = r.shift(), o.push({
                                      value: i,
                                      type: r[0].replace(k, " ")
                                  }), s = s.slice(i.length)), t.filter) !(r = U[a].exec(s)) || c[a] && !(r = c[a](r)) || (i = r.shift(), o.push({
                                  value: i,
                                  type: a,
                                  matches: r
                              }), s = s.slice(i.length));
                              if (!i) break
                          }
                          return n ? s.length : s ? Z.error(e) : T(e, l).slice(0)
                      }

                      function de(e) {
                          for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                          return i
                      }

                      function fe(e, t, n) {
                          var i = t.dir,
                              r = t.next,
                              o = r || i,
                              a = n && "parentNode" === o,
                              s = b++;
                          return t.first ? function(t, n, r) {
                              for (; t = t[i];)
                                  if (1 === t.nodeType || a) return e(t, n, r);
                              return !1
                          } : function(t, n, l) {
                              var c, u, d = [y, s];
                              if (l) {
                                  for (; t = t[i];)
                                      if ((1 === t.nodeType || a) && e(t, n, l)) return !0
                              } else
                                  for (; t = t[i];)
                                      if (1 === t.nodeType || a)
                                          if (u = t[v] || (t[v] = {}), r && C(t, r)) t = t[i] || t;
                                          else {
                                              if ((c = u[o]) && c[0] === y && c[1] === s) return d[2] = c[2];
                                              if (u[o] = d, d[2] = e(t, n, l)) return !0
                                          } return !1
                          }
                      }

                      function pe(e) {
                          return e.length > 1 ? function(t, n, i) {
                              for (var r = e.length; r--;)
                                  if (!e[r](t, n, i)) return !1;
                              return !0
                          } : e[0]
                      }

                      function he(e, t, n, i, r) {
                          for (var o, a = [], s = 0, l = e.length, c = null != t; s < l; s++)(o = e[s]) && (n && !n(o, i, r) || (a.push(o), c && t.push(s)));
                          return a
                      }

                      function ge(e, t, n, i, r, o) {
                          return i && !i[v] && (i = ge(i)), r && !r[v] && (r = ge(r, o)), te((function(o, a, s, l) {
                              var c, d, f, p, h = [],
                                  m = [],
                                  v = a.length,
                                  y = o || function(e, t, n) {
                                      for (var i = 0, r = t.length; i < r; i++) Z(e, t[i], n);
                                      return n
                                  }(t || "*", s.nodeType ? [s] : s, []),
                                  b = !e || !o && t ? y : he(y, h, e, s, l);
                              if (n ? n(b, p = r || (o ? e : v || i) ? [] : a, s, l) : p = b, i)
                                  for (c = he(p, m), i(c, [], s, l), d = c.length; d--;)(f = c[d]) && (p[m[d]] = !(b[m[d]] = f));
                              if (o) {
                                  if (r || e) {
                                      if (r) {
                                          for (c = [], d = p.length; d--;)(f = p[d]) && c.push(b[d] = f);
                                          r(null, p = [], c, l)
                                      }
                                      for (d = p.length; d--;)(f = p[d]) && (c = r ? u.call(o, f) : h[d]) > -1 && (o[c] = !(a[c] = f))
                                  }
                              } else p = he(p === a ? p.splice(v, p.length) : p), r ? r(null, a, p, l) : g.apply(a, p)
                          }))
                      }

                      function me(e) {
                          for (var i, r, o, a = e.length, s = t.relative[e[0].type], l = s || t.relative[" "], c = s ? 1 : 0, d = fe((function(e) {
                                  return e === i
                              }), l, !0), f = fe((function(e) {
                                  return u.call(i, e) > -1
                              }), l, !0), p = [function(e, t, r) {
                                  var o = !s && (r || t != n) || ((i = t).nodeType ? d(e, t, r) : f(e, t, r));
                                  return i = null, o
                              }]; c < a; c++)
                              if (r = t.relative[e[c].type]) p = [fe(pe(p), r)];
                              else {
                                  if ((r = t.filter[e[c].type].apply(null, e[c].matches))[v]) {
                                      for (o = ++c; o < a && !t.relative[e[o].type]; o++);
                                      return ge(c > 1 && pe(p), c > 1 && de(e.slice(0, c - 1).concat({
                                          value: " " === e[c - 2].type ? "*" : ""
                                      })).replace(k, "$1"), r, c < o && me(e.slice(c, o)), o < a && me(e = e.slice(o)), o < a && de(e))
                                  }
                                  p.push(r)
                              } return pe(p)
                      }

                      function ve(e, i) {
                          var r, o = [],
                              a = [],
                              s = w[e + " "];
                          if (!s) {
                              for (i || (i = ue(e)), r = i.length; r--;)(s = me(i[r]))[v] ? o.push(s) : a.push(s);
                              s = w(e, function(e, i) {
                                  var r = i.length > 0,
                                      o = e.length > 0,
                                      a = function(a, s, c, u, f) {
                                          var p, h, m, v = 0,
                                              b = "0",
                                              x = a && [],
                                              T = [],
                                              w = n,
                                              E = a || o && t.find.TAG("*", f),
                                              _ = y += null == w ? 1 : Math.random() || .1,
                                              A = E.length;
                                          for (f && (n = s == l || s || f); b !== A && null != (p = E[b]); b++) {
                                              if (o && p) {
                                                  for (h = 0, s || p.ownerDocument == l || (le(p), c = !d); m = e[h++];)
                                                      if (m(p, s || l, c)) {
                                                          g.call(u, p);
                                                          break
                                                      } f && (y = _)
                                              }
                                              r && ((p = !m && p) && v--, a && x.push(p))
                                          }
                                          if (v += b, r && b !== v) {
                                              for (h = 0; m = i[h++];) m(x, T, s, c);
                                              if (a) {
                                                  if (v > 0)
                                                      for (; b--;) x[b] || T[b] || (T[b] = S.call(u));
                                                  T = he(T)
                                              }
                                              g.apply(u, T), f && !a && T.length > 0 && v + i.length > 1 && N.uniqueSort(u)
                                          }
                                          return f && (y = _, n = w), x
                                      };
                                  return r ? te(a) : a
                              }(a, o)), s.selector = e
                          }
                          return s
                      }

                      function ye(e, n, i, r) {
                          var o, a, s, l, c, u = "function" == typeof e && e,
                              f = !r && ue(e = u.selector || e);
                          if (i = i || [], 1 === f.length) {
                              if ((a = f[0] = f[0].slice(0)).length > 2 && "ID" === (s = a[0]).type && 9 === n.nodeType && d && t.relative[a[1].type]) {
                                  if (!(n = (t.find.ID(s.matches[0].replace(Y, J), n) || [])[0])) return i;
                                  u && (n = n.parentNode), e = e.slice(a.shift().value.length)
                              }
                              for (o = U.needsContext.test(e) ? 0 : a.length; o-- && (s = a[o], !t.relative[l = s.type]);)
                                  if ((c = t.find[l]) && (r = c(s.matches[0].replace(Y, J), z.test(a[0].type) && se(n.parentNode) || n))) {
                                      if (a.splice(o, 1), !(e = r.length && de(a))) return g.apply(i, r), i;
                                      break
                                  }
                          }
                          return (u || ve(e, f))(r, n, !d, i, !n || z.test(e) && se(n.parentNode) || n), i
                      }
                      ce.prototype = t.filters = t.pseudos, t.setFilters = new ce, m.sortStable = v.split("").sort(_).join("") === v, le(), m.sortDetached = ne((function(e) {
                          return 1 & e.compareDocumentPosition(l.createElement("fieldset"))
                      })), N.find = Z, N.expr[":"] = N.expr.pseudos, N.unique = N.uniqueSort, Z.compile = ve, Z.select = ye, Z.setDocument = le, Z.escape = N.escapeSelector, Z.getText = N.text, Z.isXML = N.isXMLDoc, Z.selectors = N.expr, Z.support = N.support, Z.uniqueSort = N.uniqueSort
                  }();
                  var M = function(e, t, n) {
                          for (var i = [], r = void 0 !== n;
                              (e = e[t]) && 9 !== e.nodeType;)
                              if (1 === e.nodeType) {
                                  if (r && N(e).is(n)) break;
                                  i.push(e)
                              } return i
                      },
                      H = function(e, t) {
                          for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                          return n
                      },
                      $ = N.expr.match.needsContext,
                      B = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

                  function q(e, t, n) {
                      return v(t) ? N.grep(e, (function(e, i) {
                          return !!t.call(e, i, e) !== n
                      })) : t.nodeType ? N.grep(e, (function(e) {
                          return e === t !== n
                      })) : "string" != typeof t ? N.grep(e, (function(e) {
                          return u.call(t, e) > -1 !== n
                      })) : N.filter(t, e, n)
                  }
                  N.filter = function(e, t, n) {
                      var i = t[0];
                      return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? N.find.matchesSelector(i, e) ? [i] : [] : N.find.matches(e, N.grep(t, (function(e) {
                          return 1 === e.nodeType
                      })))
                  }, N.fn.extend({
                      find: function(e) {
                          var t, n, i = this.length,
                              r = this;
                          if ("string" != typeof e) return this.pushStack(N(e).filter((function() {
                              for (t = 0; t < i; t++)
                                  if (N.contains(r[t], this)) return !0
                          })));
                          for (n = this.pushStack([]), t = 0; t < i; t++) N.find(e, r[t], n);
                          return i > 1 ? N.uniqueSort(n) : n
                      },
                      filter: function(e) {
                          return this.pushStack(q(this, e || [], !1))
                      },
                      not: function(e) {
                          return this.pushStack(q(this, e || [], !0))
                      },
                      is: function(e) {
                          return !!q(this, "string" == typeof e && $.test(e) ? N(e) : e || [], !1).length
                      }
                  });
                  var W, F = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
                  (N.fn.init = function(e, t, n) {
                      var i, r;
                      if (!e) return this;
                      if (n = n || W, "string" == typeof e) {
                          if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : F.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                          if (i[1]) {
                              if (t = t instanceof N ? t[0] : t, N.merge(this, N.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : b, !0)), B.test(i[1]) && N.isPlainObject(t))
                                  for (i in t) v(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                              return this
                          }
                          return (r = b.getElementById(i[2])) && (this[0] = r, this.length = 1), this
                      }
                      return e.nodeType ? (this[0] = e, this.length = 1, this) : v(e) ? void 0 !== n.ready ? n.ready(e) : e(N) : N.makeArray(e, this)
                  }).prototype = N.fn, W = N(b);
                  var U = /^(?:parents|prev(?:Until|All))/,
                      V = {
                          children: !0,
                          contents: !0,
                          next: !0,
                          prev: !0
                      };

                  function G(e, t) {
                      for (;
                          (e = e[t]) && 1 !== e.nodeType;);
                      return e
                  }
                  N.fn.extend({
                      has: function(e) {
                          var t = N(e, this),
                              n = t.length;
                          return this.filter((function() {
                              for (var e = 0; e < n; e++)
                                  if (N.contains(this, t[e])) return !0
                          }))
                      },
                      closest: function(e, t) {
                          var n, i = 0,
                              r = this.length,
                              o = [],
                              a = "string" != typeof e && N(e);
                          if (!$.test(e))
                              for (; i < r; i++)
                                  for (n = this[i]; n && n !== t; n = n.parentNode)
                                      if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && N.find.matchesSelector(n, e))) {
                                          o.push(n);
                                          break
                                      } return this.pushStack(o.length > 1 ? N.uniqueSort(o) : o)
                      },
                      index: function(e) {
                          return e ? "string" == typeof e ? u.call(N(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                      },
                      add: function(e, t) {
                          return this.pushStack(N.uniqueSort(N.merge(this.get(), N(e, t))))
                      },
                      addBack: function(e) {
                          return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                      }
                  }), N.each({
                      parent: function(e) {
                          var t = e.parentNode;
                          return t && 11 !== t.nodeType ? t : null
                      },
                      parents: function(e) {
                          return M(e, "parentNode")
                      },
                      parentsUntil: function(e, t, n) {
                          return M(e, "parentNode", n)
                      },
                      next: function(e) {
                          return G(e, "nextSibling")
                      },
                      prev: function(e) {
                          return G(e, "previousSibling")
                      },
                      nextAll: function(e) {
                          return M(e, "nextSibling")
                      },
                      prevAll: function(e) {
                          return M(e, "previousSibling")
                      },
                      nextUntil: function(e, t, n) {
                          return M(e, "nextSibling", n)
                      },
                      prevUntil: function(e, t, n) {
                          return M(e, "previousSibling", n)
                      },
                      siblings: function(e) {
                          return H((e.parentNode || {}).firstChild, e)
                      },
                      children: function(e) {
                          return H(e.firstChild)
                      },
                      contents: function(e) {
                          return null != e.contentDocument && a(e.contentDocument) ? e.contentDocument : (C(e, "template") && (e = e.content || e), N.merge([], e.childNodes))
                      }
                  }, (function(e, t) {
                      N.fn[e] = function(n, i) {
                          var r = N.map(this, t, n);
                          return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = N.filter(i, r)), this.length > 1 && (V[e] || N.uniqueSort(r), U.test(e) && r.reverse()), this.pushStack(r)
                      }
                  }));
                  var X = /[^\x20\t\r\n\f]+/g;

                  function z(e) {
                      return e
                  }

                  function Y(e) {
                      throw e
                  }

                  function J(e, t, n, i) {
                      var r;
                      try {
                          e && v(r = e.promise) ? r.call(e).done(t).fail(n) : e && v(r = e.then) ? r.call(e, t, n) : t.apply(void 0, [e].slice(i))
                      } catch (e) {
                          n.apply(void 0, [e])
                      }
                  }
                  N.Callbacks = function(e) {
                      e = "string" == typeof e ? function(e) {
                          var t = {};
                          return N.each(e.match(X) || [], (function(e, n) {
                              t[n] = !0
                          })), t
                      }(e) : N.extend({}, e);
                      var t, n, i, r, o = [],
                          a = [],
                          s = -1,
                          l = function() {
                              for (r = r || e.once, i = t = !0; a.length; s = -1)
                                  for (n = a.shift(); ++s < o.length;) !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
                              e.memory || (n = !1), t = !1, r && (o = n ? [] : "")
                          },
                          c = {
                              add: function() {
                                  return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                                      N.each(n, (function(n, i) {
                                          v(i) ? e.unique && c.has(i) || o.push(i) : i && i.length && "string" !== w(i) && t(i)
                                      }))
                                  }(arguments), n && !t && l()), this
                              },
                              remove: function() {
                                  return N.each(arguments, (function(e, t) {
                                      for (var n;
                                          (n = N.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= s && s--
                                  })), this
                              },
                              has: function(e) {
                                  return e ? N.inArray(e, o) > -1 : o.length > 0
                              },
                              empty: function() {
                                  return o && (o = []), this
                              },
                              disable: function() {
                                  return r = a = [], o = n = "", this
                              },
                              disabled: function() {
                                  return !o
                              },
                              lock: function() {
                                  return r = a = [], n || t || (o = n = ""), this
                              },
                              locked: function() {
                                  return !!r
                              },
                              fireWith: function(e, n) {
                                  return r || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || l()), this
                              },
                              fire: function() {
                                  return c.fireWith(this, arguments), this
                              },
                              fired: function() {
                                  return !!i
                              }
                          };
                      return c
                  }, N.extend({
                      Deferred: function(e) {
                          var t = [
                                  ["notify", "progress", N.Callbacks("memory"), N.Callbacks("memory"), 2],
                                  ["resolve", "done", N.Callbacks("once memory"), N.Callbacks("once memory"), 0, "resolved"],
                                  ["reject", "fail", N.Callbacks("once memory"), N.Callbacks("once memory"), 1, "rejected"]
                              ],
                              n = "pending",
                              r = {
                                  state: function() {
                                      return n
                                  },
                                  always: function() {
                                      return o.done(arguments).fail(arguments), this
                                  },
                                  catch: function(e) {
                                      return r.then(null, e)
                                  },
                                  pipe: function() {
                                      var e = arguments;
                                      return N.Deferred((function(n) {
                                          N.each(t, (function(t, i) {
                                              var r = v(e[i[4]]) && e[i[4]];
                                              o[i[1]]((function() {
                                                  var e = r && r.apply(this, arguments);
                                                  e && v(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[i[0] + "With"](this, r ? [e] : arguments)
                                              }))
                                          })), e = null
                                      })).promise()
                                  },
                                  then: function(e, n, r) {
                                      var o = 0;

                                      function a(e, t, n, r) {
                                          return function() {
                                              var s = this,
                                                  l = arguments,
                                                  c = function() {
                                                      var i, c;
                                                      if (!(e < o)) {
                                                          if ((i = n.apply(s, l)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                                          c = i && ("object" == typeof i || "function" == typeof i) && i.then, v(c) ? r ? c.call(i, a(o, t, z, r), a(o, t, Y, r)) : (o++, c.call(i, a(o, t, z, r), a(o, t, Y, r), a(o, t, z, t.notifyWith))) : (n !== z && (s = void 0, l = [i]), (r || t.resolveWith)(s, l))
                                                      }
                                                  },
                                                  u = r ? c : function() {
                                                      try {
                                                          c()
                                                      } catch (i) {
                                                          N.Deferred.exceptionHook && N.Deferred.exceptionHook(i, u.error), e + 1 >= o && (n !== Y && (s = void 0, l = [i]), t.rejectWith(s, l))
                                                      }
                                                  };
                                              e ? u() : (N.Deferred.getErrorHook ? u.error = N.Deferred.getErrorHook() : N.Deferred.getStackHook && (u.error = N.Deferred.getStackHook()), i.setTimeout(u))
                                          }
                                      }
                                      return N.Deferred((function(i) {
                                          t[0][3].add(a(0, i, v(r) ? r : z, i.notifyWith)), t[1][3].add(a(0, i, v(e) ? e : z)), t[2][3].add(a(0, i, v(n) ? n : Y))
                                      })).promise()
                                  },
                                  promise: function(e) {
                                      return null != e ? N.extend(e, r) : r
                                  }
                              },
                              o = {};
                          return N.each(t, (function(e, i) {
                              var a = i[2],
                                  s = i[5];
                              r[i[1]] = a.add, s && a.add((function() {
                                  n = s
                              }), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), a.add(i[3].fire), o[i[0]] = function() {
                                  return o[i[0] + "With"](this === o ? void 0 : this, arguments), this
                              }, o[i[0] + "With"] = a.fireWith
                          })), r.promise(o), e && e.call(o, o), o
                      },
                      when: function(e) {
                          var t = arguments.length,
                              n = t,
                              i = Array(n),
                              r = s.call(arguments),
                              o = N.Deferred(),
                              a = function(e) {
                                  return function(n) {
                                      i[e] = this, r[e] = arguments.length > 1 ? s.call(arguments) : n, --t || o.resolveWith(i, r)
                                  }
                              };
                          if (t <= 1 && (J(e, o.done(a(n)).resolve, o.reject, !t), "pending" === o.state() || v(r[n] && r[n].then))) return o.then();
                          for (; n--;) J(r[n], a(n), o.reject);
                          return o.promise()
                      }
                  });
                  var K = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                  N.Deferred.exceptionHook = function(e, t) {
                      i.console && i.console.warn && e && K.test(e.name) && i.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
                  }, N.readyException = function(e) {
                      i.setTimeout((function() {
                          throw e
                      }))
                  };
                  var Q = N.Deferred();

                  function Z() {
                      b.removeEventListener("DOMContentLoaded", Z), i.removeEventListener("load", Z), N.ready()
                  }
                  N.fn.ready = function(e) {
                      return Q.then(e).catch((function(e) {
                          N.readyException(e)
                      })), this
                  }, N.extend({
                      isReady: !1,
                      readyWait: 1,
                      ready: function(e) {
                          (!0 === e ? --N.readyWait : N.isReady) || (N.isReady = !0, !0 !== e && --N.readyWait > 0 || Q.resolveWith(b, [N]))
                      }
                  }), N.ready.then = Q.then, "complete" === b.readyState || "loading" !== b.readyState && !b.documentElement.doScroll ? i.setTimeout(N.ready) : (b.addEventListener("DOMContentLoaded", Z), i.addEventListener("load", Z));
                  var ee = function(e, t, n, i, r, o, a) {
                          var s = 0,
                              l = e.length,
                              c = null == n;
                          if ("object" === w(n))
                              for (s in r = !0, n) ee(e, t, s, n[s], !0, o, a);
                          else if (void 0 !== i && (r = !0, v(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
                                  return c.call(N(e), n)
                              })), t))
                              for (; s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                          return r ? e : c ? t.call(e) : l ? t(e[0], n) : o
                      },
                      te = /^-ms-/,
                      ne = /-([a-z])/g;

                  function ie(e, t) {
                      return t.toUpperCase()
                  }

                  function re(e) {
                      return e.replace(te, "ms-").replace(ne, ie)
                  }
                  var oe = function(e) {
                      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
                  };

                  function ae() {
                      this.expando = N.expando + ae.uid++
                  }
                  ae.uid = 1, ae.prototype = {
                      cache: function(e) {
                          var t = e[this.expando];
                          return t || (t = {}, oe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                              value: t,
                              configurable: !0
                          }))), t
                      },
                      set: function(e, t, n) {
                          var i, r = this.cache(e);
                          if ("string" == typeof t) r[re(t)] = n;
                          else
                              for (i in t) r[re(i)] = t[i];
                          return r
                      },
                      get: function(e, t) {
                          return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][re(t)]
                      },
                      access: function(e, t, n) {
                          return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
                      },
                      remove: function(e, t) {
                          var n, i = e[this.expando];
                          if (void 0 !== i) {
                              if (void 0 !== t) {
                                  n = (t = Array.isArray(t) ? t.map(re) : (t = re(t)) in i ? [t] : t.match(X) || []).length;
                                  for (; n--;) delete i[t[n]]
                              }(void 0 === t || N.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                          }
                      },
                      hasData: function(e) {
                          var t = e[this.expando];
                          return void 0 !== t && !N.isEmptyObject(t)
                      }
                  };
                  var se = new ae,
                      le = new ae,
                      ce = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                      ue = /[A-Z]/g;

                  function de(e, t, n) {
                      var i;
                      if (void 0 === n && 1 === e.nodeType)
                          if (i = "data-" + t.replace(ue, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(i))) {
                              try {
                                  n = function(e) {
                                      return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ce.test(e) ? JSON.parse(e) : e)
                                  }(n)
                              } catch (e) {}
                              le.set(e, t, n)
                          } else n = void 0;
                      return n
                  }
                  N.extend({
                      hasData: function(e) {
                          return le.hasData(e) || se.hasData(e)
                      },
                      data: function(e, t, n) {
                          return le.access(e, t, n)
                      },
                      removeData: function(e, t) {
                          le.remove(e, t)
                      },
                      _data: function(e, t, n) {
                          return se.access(e, t, n)
                      },
                      _removeData: function(e, t) {
                          se.remove(e, t)
                      }
                  }), N.fn.extend({
                      data: function(e, t) {
                          var n, i, r, o = this[0],
                              a = o && o.attributes;
                          if (void 0 === e) {
                              if (this.length && (r = le.get(o), 1 === o.nodeType && !se.get(o, "hasDataAttrs"))) {
                                  for (n = a.length; n--;) a[n] && 0 === (i = a[n].name).indexOf("data-") && (i = re(i.slice(5)), de(o, i, r[i]));
                                  se.set(o, "hasDataAttrs", !0)
                              }
                              return r
                          }
                          return "object" == typeof e ? this.each((function() {
                              le.set(this, e)
                          })) : ee(this, (function(t) {
                              var n;
                              if (o && void 0 === t) return void 0 !== (n = le.get(o, e)) || void 0 !== (n = de(o, e)) ? n : void 0;
                              this.each((function() {
                                  le.set(this, e, t)
                              }))
                          }), null, t, arguments.length > 1, null, !0)
                      },
                      removeData: function(e) {
                          return this.each((function() {
                              le.remove(this, e)
                          }))
                      }
                  }), N.extend({
                      queue: function(e, t, n) {
                          var i;
                          if (e) return t = (t || "fx") + "queue", i = se.get(e, t), n && (!i || Array.isArray(n) ? i = se.access(e, t, N.makeArray(n)) : i.push(n)), i || []
                      },
                      dequeue: function(e, t) {
                          t = t || "fx";
                          var n = N.queue(e, t),
                              i = n.length,
                              r = n.shift(),
                              o = N._queueHooks(e, t);
                          "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, (function() {
                              N.dequeue(e, t)
                          }), o)), !i && o && o.empty.fire()
                      },
                      _queueHooks: function(e, t) {
                          var n = t + "queueHooks";
                          return se.get(e, n) || se.access(e, n, {
                              empty: N.Callbacks("once memory").add((function() {
                                  se.remove(e, [t + "queue", n])
                              }))
                          })
                      }
                  }), N.fn.extend({
                      queue: function(e, t) {
                          var n = 2;
                          return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? N.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                              var n = N.queue(this, e, t);
                              N._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && N.dequeue(this, e)
                          }))
                      },
                      dequeue: function(e) {
                          return this.each((function() {
                              N.dequeue(this, e)
                          }))
                      },
                      clearQueue: function(e) {
                          return this.queue(e || "fx", [])
                      },
                      promise: function(e, t) {
                          var n, i = 1,
                              r = N.Deferred(),
                              o = this,
                              a = this.length,
                              s = function() {
                                  --i || r.resolveWith(o, [o])
                              };
                          for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = se.get(o[a], e + "queueHooks")) && n.empty && (i++, n.empty.add(s));
                          return s(), r.promise(t)
                      }
                  });
                  var fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                      pe = new RegExp("^(?:([+-])=|)(" + fe + ")([a-z%]*)$", "i"),
                      he = ["Top", "Right", "Bottom", "Left"],
                      ge = b.documentElement,
                      me = function(e) {
                          return N.contains(e.ownerDocument, e)
                      },
                      ve = {
                          composed: !0
                      };
                  ge.getRootNode && (me = function(e) {
                      return N.contains(e.ownerDocument, e) || e.getRootNode(ve) === e.ownerDocument
                  });
                  var ye = function(e, t) {
                      return "none" === (e = t || e).style.display || "" === e.style.display && me(e) && "none" === N.css(e, "display")
                  };

                  function be(e, t, n, i) {
                      var r, o, a = 20,
                          s = i ? function() {
                              return i.cur()
                          } : function() {
                              return N.css(e, t, "")
                          },
                          l = s(),
                          c = n && n[3] || (N.cssNumber[t] ? "" : "px"),
                          u = e.nodeType && (N.cssNumber[t] || "px" !== c && +l) && pe.exec(N.css(e, t));
                      if (u && u[3] !== c) {
                          for (l /= 2, c = c || u[3], u = +l || 1; a--;) N.style(e, t, u + c), (1 - o) * (1 - (o = s() / l || .5)) <= 0 && (a = 0), u /= o;
                          u *= 2, N.style(e, t, u + c), n = n || []
                      }
                      return n && (u = +u || +l || 0, r = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = r)), r
                  }
                  var xe = {};

                  function Te(e) {
                      var t, n = e.ownerDocument,
                          i = e.nodeName,
                          r = xe[i];
                      return r || (t = n.body.appendChild(n.createElement(i)), r = N.css(t, "display"), t.parentNode.removeChild(t), "none" === r && (r = "block"), xe[i] = r, r)
                  }

                  function we(e, t) {
                      for (var n, i, r = [], o = 0, a = e.length; o < a; o++)(i = e[o]).style && (n = i.style.display, t ? ("none" === n && (r[o] = se.get(i, "display") || null, r[o] || (i.style.display = "")), "" === i.style.display && ye(i) && (r[o] = Te(i))) : "none" !== n && (r[o] = "none", se.set(i, "display", n)));
                      for (o = 0; o < a; o++) null != r[o] && (e[o].style.display = r[o]);
                      return e
                  }
                  N.fn.extend({
                      show: function() {
                          return we(this, !0)
                      },
                      hide: function() {
                          return we(this)
                      },
                      toggle: function(e) {
                          return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                              ye(this) ? N(this).show() : N(this).hide()
                          }))
                      }
                  });
                  var Ee, _e, Ne = /^(?:checkbox|radio)$/i,
                      Ae = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
                      Ce = /^$|^module$|\/(?:java|ecma)script/i;
                  Ee = b.createDocumentFragment().appendChild(b.createElement("div")), (_e = b.createElement("input")).setAttribute("type", "radio"), _e.setAttribute("checked", "checked"), _e.setAttribute("name", "t"), Ee.appendChild(_e), m.checkClone = Ee.cloneNode(!0).cloneNode(!0).lastChild.checked, Ee.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!Ee.cloneNode(!0).lastChild.defaultValue, Ee.innerHTML = "<option></option>", m.option = !!Ee.lastChild;
                  var Se = {
                      thead: [1, "<table>", "</table>"],
                      col: [2, "<table><colgroup>", "</colgroup></table>"],
                      tr: [2, "<table><tbody>", "</tbody></table>"],
                      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                      _default: [0, "", ""]
                  };

                  function De(e, t) {
                      var n;
                      return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && C(e, t) ? N.merge([e], n) : n
                  }

                  function Le(e, t) {
                      for (var n = 0, i = e.length; n < i; n++) se.set(e[n], "globalEval", !t || se.get(t[n], "globalEval"))
                  }
                  Se.tbody = Se.tfoot = Se.colgroup = Se.caption = Se.thead, Se.th = Se.td, m.option || (Se.optgroup = Se.option = [1, "<select multiple='multiple'>", "</select>"]);
                  var Oe = /<|&#?\w+;/;

                  function ke(e, t, n, i, r) {
                      for (var o, a, s, l, c, u, d = t.createDocumentFragment(), f = [], p = 0, h = e.length; p < h; p++)
                          if ((o = e[p]) || 0 === o)
                              if ("object" === w(o)) N.merge(f, o.nodeType ? [o] : o);
                              else if (Oe.test(o)) {
                          for (a = a || d.appendChild(t.createElement("div")), s = (Ae.exec(o) || ["", ""])[1].toLowerCase(), l = Se[s] || Se._default, a.innerHTML = l[1] + N.htmlPrefilter(o) + l[2], u = l[0]; u--;) a = a.lastChild;
                          N.merge(f, a.childNodes), (a = d.firstChild).textContent = ""
                      } else f.push(t.createTextNode(o));
                      for (d.textContent = "", p = 0; o = f[p++];)
                          if (i && N.inArray(o, i) > -1) r && r.push(o);
                          else if (c = me(o), a = De(d.appendChild(o), "script"), c && Le(a), n)
                          for (u = 0; o = a[u++];) Ce.test(o.type || "") && n.push(o);
                      return d
                  }
                  var Re = /^([^.]*)(?:\.(.+)|)/;

                  function je() {
                      return !0
                  }

                  function Ie() {
                      return !1
                  }

                  function Pe(e, t, n, i, r, o) {
                      var a, s;
                      if ("object" == typeof t) {
                          for (s in "string" != typeof n && (i = i || n, n = void 0), t) Pe(e, s, n, i, t[s], o);
                          return e
                      }
                      if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), !1 === r) r = Ie;
                      else if (!r) return e;
                      return 1 === o && (a = r, r = function(e) {
                          return N().off(e), a.apply(this, arguments)
                      }, r.guid = a.guid || (a.guid = N.guid++)), e.each((function() {
                          N.event.add(this, t, r, i, n)
                      }))
                  }

                  function Me(e, t, n) {
                      n ? (se.set(e, t, !1), N.event.add(e, t, {
                          namespace: !1,
                          handler: function(e) {
                              var n, i = se.get(this, t);
                              if (1 & e.isTrigger && this[t]) {
                                  if (i)(N.event.special[t] || {}).delegateType && e.stopPropagation();
                                  else if (i = s.call(arguments), se.set(this, t, i), this[t](), n = se.get(this, t), se.set(this, t, !1), i !== n) return e.stopImmediatePropagation(), e.preventDefault(), n
                              } else i && (se.set(this, t, N.event.trigger(i[0], i.slice(1), this)), e.stopPropagation(), e.isImmediatePropagationStopped = je)
                          }
                      })) : void 0 === se.get(e, t) && N.event.add(e, t, je)
                  }
                  N.event = {
                      global: {},
                      add: function(e, t, n, i, r) {
                          var o, a, s, l, c, u, d, f, p, h, g, m = se.get(e);
                          if (oe(e))
                              for (n.handler && (n = (o = n).handler, r = o.selector), r && N.find.matchesSelector(ge, r), n.guid || (n.guid = N.guid++), (l = m.events) || (l = m.events = Object.create(null)), (a = m.handle) || (a = m.handle = function(t) {
                                      return void 0 !== N && N.event.triggered !== t.type ? N.event.dispatch.apply(e, arguments) : void 0
                                  }), c = (t = (t || "").match(X) || [""]).length; c--;) p = g = (s = Re.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), p && (d = N.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, d = N.event.special[p] || {}, u = N.extend({
                                  type: p,
                                  origType: g,
                                  data: i,
                                  handler: n,
                                  guid: n.guid,
                                  selector: r,
                                  needsContext: r && N.expr.match.needsContext.test(r),
                                  namespace: h.join(".")
                              }, o), (f = l[p]) || ((f = l[p] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, i, h, a) || e.addEventListener && e.addEventListener(p, a)), d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), r ? f.splice(f.delegateCount++, 0, u) : f.push(u), N.event.global[p] = !0)
                      },
                      remove: function(e, t, n, i, r) {
                          var o, a, s, l, c, u, d, f, p, h, g, m = se.hasData(e) && se.get(e);
                          if (m && (l = m.events)) {
                              for (c = (t = (t || "").match(X) || [""]).length; c--;)
                                  if (p = g = (s = Re.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                                      for (d = N.event.special[p] || {}, f = l[p = (i ? d.delegateType : d.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length; o--;) u = f[o], !r && g !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (f.splice(o, 1), u.selector && f.delegateCount--, d.remove && d.remove.call(e, u));
                                      a && !f.length && (d.teardown && !1 !== d.teardown.call(e, h, m.handle) || N.removeEvent(e, p, m.handle), delete l[p])
                                  } else
                                      for (p in l) N.event.remove(e, p + t[c], n, i, !0);
                              N.isEmptyObject(l) && se.remove(e, "handle events")
                          }
                      },
                      dispatch: function(e) {
                          var t, n, i, r, o, a, s = new Array(arguments.length),
                              l = N.event.fix(e),
                              c = (se.get(this, "events") || Object.create(null))[l.type] || [],
                              u = N.event.special[l.type] || {};
                          for (s[0] = l, t = 1; t < arguments.length; t++) s[t] = arguments[t];
                          if (l.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, l)) {
                              for (a = N.event.handlers.call(this, l, c), t = 0;
                                  (r = a[t++]) && !l.isPropagationStopped();)
                                  for (l.currentTarget = r.elem, n = 0;
                                      (o = r.handlers[n++]) && !l.isImmediatePropagationStopped();) l.rnamespace && !1 !== o.namespace && !l.rnamespace.test(o.namespace) || (l.handleObj = o, l.data = o.data, void 0 !== (i = ((N.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s)) && !1 === (l.result = i) && (l.preventDefault(), l.stopPropagation()));
                              return u.postDispatch && u.postDispatch.call(this, l), l.result
                          }
                      },
                      handlers: function(e, t) {
                          var n, i, r, o, a, s = [],
                              l = t.delegateCount,
                              c = e.target;
                          if (l && c.nodeType && !("click" === e.type && e.button >= 1))
                              for (; c !== this; c = c.parentNode || this)
                                  if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                                      for (o = [], a = {}, n = 0; n < l; n++) void 0 === a[r = (i = t[n]).selector + " "] && (a[r] = i.needsContext ? N(r, this).index(c) > -1 : N.find(r, this, null, [c]).length), a[r] && o.push(i);
                                      o.length && s.push({
                                          elem: c,
                                          handlers: o
                                      })
                                  } return c = this, l < t.length && s.push({
                              elem: c,
                              handlers: t.slice(l)
                          }), s
                      },
                      addProp: function(e, t) {
                          Object.defineProperty(N.Event.prototype, e, {
                              enumerable: !0,
                              configurable: !0,
                              get: v(t) ? function() {
                                  if (this.originalEvent) return t(this.originalEvent)
                              } : function() {
                                  if (this.originalEvent) return this.originalEvent[e]
                              },
                              set: function(t) {
                                  Object.defineProperty(this, e, {
                                      enumerable: !0,
                                      configurable: !0,
                                      writable: !0,
                                      value: t
                                  })
                              }
                          })
                      },
                      fix: function(e) {
                          return e[N.expando] ? e : new N.Event(e)
                      },
                      special: {
                          load: {
                              noBubble: !0
                          },
                          click: {
                              setup: function(e) {
                                  var t = this || e;
                                  return Ne.test(t.type) && t.click && C(t, "input") && Me(t, "click", !0), !1
                              },
                              trigger: function(e) {
                                  var t = this || e;
                                  return Ne.test(t.type) && t.click && C(t, "input") && Me(t, "click"), !0
                              },
                              _default: function(e) {
                                  var t = e.target;
                                  return Ne.test(t.type) && t.click && C(t, "input") && se.get(t, "click") || C(t, "a")
                              }
                          },
                          beforeunload: {
                              postDispatch: function(e) {
                                  void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                              }
                          }
                      }
                  }, N.removeEvent = function(e, t, n) {
                      e.removeEventListener && e.removeEventListener(t, n)
                  }, N.Event = function(e, t) {
                      if (!(this instanceof N.Event)) return new N.Event(e, t);
                      e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? je : Ie, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && N.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[N.expando] = !0
                  }, N.Event.prototype = {
                      constructor: N.Event,
                      isDefaultPrevented: Ie,
                      isPropagationStopped: Ie,
                      isImmediatePropagationStopped: Ie,
                      isSimulated: !1,
                      preventDefault: function() {
                          var e = this.originalEvent;
                          this.isDefaultPrevented = je, e && !this.isSimulated && e.preventDefault()
                      },
                      stopPropagation: function() {
                          var e = this.originalEvent;
                          this.isPropagationStopped = je, e && !this.isSimulated && e.stopPropagation()
                      },
                      stopImmediatePropagation: function() {
                          var e = this.originalEvent;
                          this.isImmediatePropagationStopped = je, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
                      }
                  }, N.each({
                      altKey: !0,
                      bubbles: !0,
                      cancelable: !0,
                      changedTouches: !0,
                      ctrlKey: !0,
                      detail: !0,
                      eventPhase: !0,
                      metaKey: !0,
                      pageX: !0,
                      pageY: !0,
                      shiftKey: !0,
                      view: !0,
                      char: !0,
                      code: !0,
                      charCode: !0,
                      key: !0,
                      keyCode: !0,
                      button: !0,
                      buttons: !0,
                      clientX: !0,
                      clientY: !0,
                      offsetX: !0,
                      offsetY: !0,
                      pointerId: !0,
                      pointerType: !0,
                      screenX: !0,
                      screenY: !0,
                      targetTouches: !0,
                      toElement: !0,
                      touches: !0,
                      which: !0
                  }, N.event.addProp), N.each({
                      focus: "focusin",
                      blur: "focusout"
                  }, (function(e, t) {
                      function n(e) {
                          if (b.documentMode) {
                              var n = se.get(this, "handle"),
                                  i = N.event.fix(e);
                              i.type = "focusin" === e.type ? "focus" : "blur", i.isSimulated = !0, n(e), i.target === i.currentTarget && n(i)
                          } else N.event.simulate(t, e.target, N.event.fix(e))
                      }
                      N.event.special[e] = {
                          setup: function() {
                              var i;
                              if (Me(this, e, !0), !b.documentMode) return !1;
                              (i = se.get(this, t)) || this.addEventListener(t, n), se.set(this, t, (i || 0) + 1)
                          },
                          trigger: function() {
                              return Me(this, e), !0
                          },
                          teardown: function() {
                              var e;
                              if (!b.documentMode) return !1;
                              (e = se.get(this, t) - 1) ? se.set(this, t, e): (this.removeEventListener(t, n), se.remove(this, t))
                          },
                          _default: function(t) {
                              return se.get(t.target, e)
                          },
                          delegateType: t
                      }, N.event.special[t] = {
                          setup: function() {
                              var i = this.ownerDocument || this.document || this,
                                  r = b.documentMode ? this : i,
                                  o = se.get(r, t);
                              o || (b.documentMode ? this.addEventListener(t, n) : i.addEventListener(e, n, !0)), se.set(r, t, (o || 0) + 1)
                          },
                          teardown: function() {
                              var i = this.ownerDocument || this.document || this,
                                  r = b.documentMode ? this : i,
                                  o = se.get(r, t) - 1;
                              o ? se.set(r, t, o) : (b.documentMode ? this.removeEventListener(t, n) : i.removeEventListener(e, n, !0), se.remove(r, t))
                          }
                      }
                  })), N.each({
                      mouseenter: "mouseover",
                      mouseleave: "mouseout",
                      pointerenter: "pointerover",
                      pointerleave: "pointerout"
                  }, (function(e, t) {
                      N.event.special[e] = {
                          delegateType: t,
                          bindType: t,
                          handle: function(e) {
                              var n, i = e.relatedTarget,
                                  r = e.handleObj;
                              return i && (i === this || N.contains(this, i)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
                          }
                      }
                  })), N.fn.extend({
                      on: function(e, t, n, i) {
                          return Pe(this, e, t, n, i)
                      },
                      one: function(e, t, n, i) {
                          return Pe(this, e, t, n, i, 1)
                      },
                      off: function(e, t, n) {
                          var i, r;
                          if (e && e.preventDefault && e.handleObj) return i = e.handleObj, N(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                          if ("object" == typeof e) {
                              for (r in e) this.off(r, t, e[r]);
                              return this
                          }
                          return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Ie), this.each((function() {
                              N.event.remove(this, e, n, t)
                          }))
                      }
                  });
                  var He = /<script|<style|<link/i,
                      $e = /checked\s*(?:[^=]|=\s*.checked.)/i,
                      Be = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

                  function qe(e, t) {
                      return C(e, "table") && C(11 !== t.nodeType ? t : t.firstChild, "tr") && N(e).children("tbody")[0] || e
                  }

                  function We(e) {
                      return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
                  }

                  function Fe(e) {
                      return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
                  }

                  function Ue(e, t) {
                      var n, i, r, o, a, s;
                      if (1 === t.nodeType) {
                          if (se.hasData(e) && (s = se.get(e).events))
                              for (r in se.remove(t, "handle events"), s)
                                  for (n = 0, i = s[r].length; n < i; n++) N.event.add(t, r, s[r][n]);
                          le.hasData(e) && (o = le.access(e), a = N.extend({}, o), le.set(t, a))
                      }
                  }

                  function Ve(e, t) {
                      var n = t.nodeName.toLowerCase();
                      "input" === n && Ne.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
                  }

                  function Ge(e, t, n, i) {
                      t = l(t);
                      var r, o, a, s, c, u, d = 0,
                          f = e.length,
                          p = f - 1,
                          h = t[0],
                          g = v(h);
                      if (g || f > 1 && "string" == typeof h && !m.checkClone && $e.test(h)) return e.each((function(r) {
                          var o = e.eq(r);
                          g && (t[0] = h.call(this, r, o.html())), Ge(o, t, n, i)
                      }));
                      if (f && (o = (r = ke(t, e[0].ownerDocument, !1, e, i)).firstChild, 1 === r.childNodes.length && (r = o), o || i)) {
                          for (s = (a = N.map(De(r, "script"), We)).length; d < f; d++) c = r, d !== p && (c = N.clone(c, !0, !0), s && N.merge(a, De(c, "script"))), n.call(e[d], c, d);
                          if (s)
                              for (u = a[a.length - 1].ownerDocument, N.map(a, Fe), d = 0; d < s; d++) c = a[d], Ce.test(c.type || "") && !se.access(c, "globalEval") && N.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? N._evalUrl && !c.noModule && N._evalUrl(c.src, {
                                  nonce: c.nonce || c.getAttribute("nonce")
                              }, u) : T(c.textContent.replace(Be, ""), c, u))
                      }
                      return e
                  }

                  function Xe(e, t, n) {
                      for (var i, r = t ? N.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || N.cleanData(De(i)), i.parentNode && (n && me(i) && Le(De(i, "script")), i.parentNode.removeChild(i));
                      return e
                  }
                  N.extend({
                      htmlPrefilter: function(e) {
                          return e
                      },
                      clone: function(e, t, n) {
                          var i, r, o, a, s = e.cloneNode(!0),
                              l = me(e);
                          if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || N.isXMLDoc(e)))
                              for (a = De(s), i = 0, r = (o = De(e)).length; i < r; i++) Ve(o[i], a[i]);
                          if (t)
                              if (n)
                                  for (o = o || De(e), a = a || De(s), i = 0, r = o.length; i < r; i++) Ue(o[i], a[i]);
                              else Ue(e, s);
                          return (a = De(s, "script")).length > 0 && Le(a, !l && De(e, "script")), s
                      },
                      cleanData: function(e) {
                          for (var t, n, i, r = N.event.special, o = 0; void 0 !== (n = e[o]); o++)
                              if (oe(n)) {
                                  if (t = n[se.expando]) {
                                      if (t.events)
                                          for (i in t.events) r[i] ? N.event.remove(n, i) : N.removeEvent(n, i, t.handle);
                                      n[se.expando] = void 0
                                  }
                                  n[le.expando] && (n[le.expando] = void 0)
                              }
                      }
                  }), N.fn.extend({
                      detach: function(e) {
                          return Xe(this, e, !0)
                      },
                      remove: function(e) {
                          return Xe(this, e)
                      },
                      text: function(e) {
                          return ee(this, (function(e) {
                              return void 0 === e ? N.text(this) : this.empty().each((function() {
                                  1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                              }))
                          }), null, e, arguments.length)
                      },
                      append: function() {
                          return Ge(this, arguments, (function(e) {
                              1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e).appendChild(e)
                          }))
                      },
                      prepend: function() {
                          return Ge(this, arguments, (function(e) {
                              if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                  var t = qe(this, e);
                                  t.insertBefore(e, t.firstChild)
                              }
                          }))
                      },
                      before: function() {
                          return Ge(this, arguments, (function(e) {
                              this.parentNode && this.parentNode.insertBefore(e, this)
                          }))
                      },
                      after: function() {
                          return Ge(this, arguments, (function(e) {
                              this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                          }))
                      },
                      empty: function() {
                          for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (N.cleanData(De(e, !1)), e.textContent = "");
                          return this
                      },
                      clone: function(e, t) {
                          return e = null != e && e, t = null == t ? e : t, this.map((function() {
                              return N.clone(this, e, t)
                          }))
                      },
                      html: function(e) {
                          return ee(this, (function(e) {
                              var t = this[0] || {},
                                  n = 0,
                                  i = this.length;
                              if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                              if ("string" == typeof e && !He.test(e) && !Se[(Ae.exec(e) || ["", ""])[1].toLowerCase()]) {
                                  e = N.htmlPrefilter(e);
                                  try {
                                      for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (N.cleanData(De(t, !1)), t.innerHTML = e);
                                      t = 0
                                  } catch (e) {}
                              }
                              t && this.empty().append(e)
                          }), null, e, arguments.length)
                      },
                      replaceWith: function() {
                          var e = [];
                          return Ge(this, arguments, (function(t) {
                              var n = this.parentNode;
                              N.inArray(this, e) < 0 && (N.cleanData(De(this)), n && n.replaceChild(t, this))
                          }), e)
                      }
                  }), N.each({
                      appendTo: "append",
                      prependTo: "prepend",
                      insertBefore: "before",
                      insertAfter: "after",
                      replaceAll: "replaceWith"
                  }, (function(e, t) {
                      N.fn[e] = function(e) {
                          for (var n, i = [], r = N(e), o = r.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), N(r[a])[t](n), c.apply(i, n.get());
                          return this.pushStack(i)
                      }
                  }));
                  var ze = new RegExp("^(" + fe + ")(?!px)[a-z%]+$", "i"),
                      Ye = /^--/,
                      Je = function(e) {
                          var t = e.ownerDocument.defaultView;
                          return t && t.opener || (t = i), t.getComputedStyle(e)
                      },
                      Ke = function(e, t, n) {
                          var i, r, o = {};
                          for (r in t) o[r] = e.style[r], e.style[r] = t[r];
                          for (r in i = n.call(e), t) e.style[r] = o[r];
                          return i
                      },
                      Qe = new RegExp(he.join("|"), "i");

                  function Ze(e, t, n) {
                      var i, r, o, a, s = Ye.test(t),
                          l = e.style;
                      return (n = n || Je(e)) && (a = n.getPropertyValue(t) || n[t], s && a && (a = a.replace(k, "$1") || void 0), "" !== a || me(e) || (a = N.style(e, t)), !m.pixelBoxStyles() && ze.test(a) && Qe.test(t) && (i = l.width, r = l.minWidth, o = l.maxWidth, l.minWidth = l.maxWidth = l.width = a, a = n.width, l.width = i, l.minWidth = r, l.maxWidth = o)), void 0 !== a ? a + "" : a
                  }

                  function et(e, t) {
                      return {
                          get: function() {
                              if (!e()) return (this.get = t).apply(this, arguments);
                              delete this.get
                          }
                      }
                  }! function() {
                      function e() {
                          if (u) {
                              c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ge.appendChild(c).appendChild(u);
                              var e = i.getComputedStyle(u);
                              n = "1%" !== e.top, l = 12 === t(e.marginLeft), u.style.right = "60%", a = 36 === t(e.right), r = 36 === t(e.width), u.style.position = "absolute", o = 12 === t(u.offsetWidth / 3), ge.removeChild(c), u = null
                          }
                      }

                      function t(e) {
                          return Math.round(parseFloat(e))
                      }
                      var n, r, o, a, s, l, c = b.createElement("div"),
                          u = b.createElement("div");
                      u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === u.style.backgroundClip, N.extend(m, {
                          boxSizingReliable: function() {
                              return e(), r
                          },
                          pixelBoxStyles: function() {
                              return e(), a
                          },
                          pixelPosition: function() {
                              return e(), n
                          },
                          reliableMarginLeft: function() {
                              return e(), l
                          },
                          scrollboxSize: function() {
                              return e(), o
                          },
                          reliableTrDimensions: function() {
                              var e, t, n, r;
                              return null == s && (e = b.createElement("table"), t = b.createElement("tr"), n = b.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", ge.appendChild(e).appendChild(t).appendChild(n), r = i.getComputedStyle(t), s = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, ge.removeChild(e)), s
                          }
                      }))
                  }();
                  var tt = ["Webkit", "Moz", "ms"],
                      nt = b.createElement("div").style,
                      it = {};

                  function rt(e) {
                      var t = N.cssProps[e] || it[e];
                      return t || (e in nt ? e : it[e] = function(e) {
                          for (var t = e[0].toUpperCase() + e.slice(1), n = tt.length; n--;)
                              if ((e = tt[n] + t) in nt) return e
                      }(e) || e)
                  }
                  var ot = /^(none|table(?!-c[ea]).+)/,
                      at = {
                          position: "absolute",
                          visibility: "hidden",
                          display: "block"
                      },
                      st = {
                          letterSpacing: "0",
                          fontWeight: "400"
                      };

                  function lt(e, t, n) {
                      var i = pe.exec(t);
                      return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
                  }

                  function ct(e, t, n, i, r, o) {
                      var a = "width" === t ? 1 : 0,
                          s = 0,
                          l = 0,
                          c = 0;
                      if (n === (i ? "border" : "content")) return 0;
                      for (; a < 4; a += 2) "margin" === n && (c += N.css(e, n + he[a], !0, r)), i ? ("content" === n && (l -= N.css(e, "padding" + he[a], !0, r)), "margin" !== n && (l -= N.css(e, "border" + he[a] + "Width", !0, r))) : (l += N.css(e, "padding" + he[a], !0, r), "padding" !== n ? l += N.css(e, "border" + he[a] + "Width", !0, r) : s += N.css(e, "border" + he[a] + "Width", !0, r));
                      return !i && o >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - s - .5)) || 0), l + c
                  }

                  function ut(e, t, n) {
                      var i = Je(e),
                          r = (!m.boxSizingReliable() || n) && "border-box" === N.css(e, "boxSizing", !1, i),
                          o = r,
                          a = Ze(e, t, i),
                          s = "offset" + t[0].toUpperCase() + t.slice(1);
                      if (ze.test(a)) {
                          if (!n) return a;
                          a = "auto"
                      }
                      return (!m.boxSizingReliable() && r || !m.reliableTrDimensions() && C(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === N.css(e, "display", !1, i)) && e.getClientRects().length && (r = "border-box" === N.css(e, "boxSizing", !1, i), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + ct(e, t, n || (r ? "border" : "content"), o, i, a) + "px"
                  }

                  function dt(e, t, n, i, r) {
                      return new dt.prototype.init(e, t, n, i, r)
                  }
                  N.extend({
                      cssHooks: {
                          opacity: {
                              get: function(e, t) {
                                  if (t) {
                                      var n = Ze(e, "opacity");
                                      return "" === n ? "1" : n
                                  }
                              }
                          }
                      },
                      cssNumber: {
                          animationIterationCount: !0,
                          aspectRatio: !0,
                          borderImageSlice: !0,
                          columnCount: !0,
                          flexGrow: !0,
                          flexShrink: !0,
                          fontWeight: !0,
                          gridArea: !0,
                          gridColumn: !0,
                          gridColumnEnd: !0,
                          gridColumnStart: !0,
                          gridRow: !0,
                          gridRowEnd: !0,
                          gridRowStart: !0,
                          lineHeight: !0,
                          opacity: !0,
                          order: !0,
                          orphans: !0,
                          scale: !0,
                          widows: !0,
                          zIndex: !0,
                          zoom: !0,
                          fillOpacity: !0,
                          floodOpacity: !0,
                          stopOpacity: !0,
                          strokeMiterlimit: !0,
                          strokeOpacity: !0
                      },
                      cssProps: {},
                      style: function(e, t, n, i) {
                          if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                              var r, o, a, s = re(t),
                                  l = Ye.test(t),
                                  c = e.style;
                              if (l || (t = rt(s)), a = N.cssHooks[t] || N.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : c[t];
                              "string" === (o = typeof n) && (r = pe.exec(n)) && r[1] && (n = be(e, t, r), o = "number"), null != n && n == n && ("number" !== o || l || (n += r && r[3] || (N.cssNumber[s] ? "" : "px")), m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (l ? c.setProperty(t, n) : c[t] = n))
                          }
                      },
                      css: function(e, t, n, i) {
                          var r, o, a, s = re(t);
                          return Ye.test(t) || (t = rt(s)), (a = N.cssHooks[t] || N.cssHooks[s]) && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = Ze(e, t, i)), "normal" === r && t in st && (r = st[t]), "" === n || n ? (o = parseFloat(r), !0 === n || isFinite(o) ? o || 0 : r) : r
                      }
                  }), N.each(["height", "width"], (function(e, t) {
                      N.cssHooks[t] = {
                          get: function(e, n, i) {
                              if (n) return !ot.test(N.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? ut(e, t, i) : Ke(e, at, (function() {
                                  return ut(e, t, i)
                              }))
                          },
                          set: function(e, n, i) {
                              var r, o = Je(e),
                                  a = !m.scrollboxSize() && "absolute" === o.position,
                                  s = (a || i) && "border-box" === N.css(e, "boxSizing", !1, o),
                                  l = i ? ct(e, t, i, s, o) : 0;
                              return s && a && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - ct(e, t, "border", !1, o) - .5)), l && (r = pe.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = N.css(e, t)), lt(0, n, l)
                          }
                      }
                  })), N.cssHooks.marginLeft = et(m.reliableMarginLeft, (function(e, t) {
                      if (t) return (parseFloat(Ze(e, "marginLeft")) || e.getBoundingClientRect().left - Ke(e, {
                          marginLeft: 0
                      }, (function() {
                          return e.getBoundingClientRect().left
                      }))) + "px"
                  })), N.each({
                      margin: "",
                      padding: "",
                      border: "Width"
                  }, (function(e, t) {
                      N.cssHooks[e + t] = {
                          expand: function(n) {
                              for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[e + he[i] + t] = o[i] || o[i - 2] || o[0];
                              return r
                          }
                      }, "margin" !== e && (N.cssHooks[e + t].set = lt)
                  })), N.fn.extend({
                      css: function(e, t) {
                          return ee(this, (function(e, t, n) {
                              var i, r, o = {},
                                  a = 0;
                              if (Array.isArray(t)) {
                                  for (i = Je(e), r = t.length; a < r; a++) o[t[a]] = N.css(e, t[a], !1, i);
                                  return o
                              }
                              return void 0 !== n ? N.style(e, t, n) : N.css(e, t)
                          }), e, t, arguments.length > 1)
                      }
                  }), N.Tween = dt, dt.prototype = {
                      constructor: dt,
                      init: function(e, t, n, i, r, o) {
                          this.elem = e, this.prop = n, this.easing = r || N.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (N.cssNumber[n] ? "" : "px")
                      },
                      cur: function() {
                          var e = dt.propHooks[this.prop];
                          return e && e.get ? e.get(this) : dt.propHooks._default.get(this)
                      },
                      run: function(e) {
                          var t, n = dt.propHooks[this.prop];
                          return this.options.duration ? this.pos = t = N.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : dt.propHooks._default.set(this), this
                      }
                  }, dt.prototype.init.prototype = dt.prototype, dt.propHooks = {
                      _default: {
                          get: function(e) {
                              var t;
                              return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = N.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                          },
                          set: function(e) {
                              N.fx.step[e.prop] ? N.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !N.cssHooks[e.prop] && null == e.elem.style[rt(e.prop)] ? e.elem[e.prop] = e.now : N.style(e.elem, e.prop, e.now + e.unit)
                          }
                      }
                  }, dt.propHooks.scrollTop = dt.propHooks.scrollLeft = {
                      set: function(e) {
                          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                      }
                  }, N.easing = {
                      linear: function(e) {
                          return e
                      },
                      swing: function(e) {
                          return .5 - Math.cos(e * Math.PI) / 2
                      },
                      _default: "swing"
                  }, N.fx = dt.prototype.init, N.fx.step = {};
                  var ft, pt, ht = /^(?:toggle|show|hide)$/,
                      gt = /queueHooks$/;

                  function mt() {
                      pt && (!1 === b.hidden && i.requestAnimationFrame ? i.requestAnimationFrame(mt) : i.setTimeout(mt, N.fx.interval), N.fx.tick())
                  }

                  function vt() {
                      return i.setTimeout((function() {
                          ft = void 0
                      })), ft = Date.now()
                  }

                  function yt(e, t) {
                      var n, i = 0,
                          r = {
                              height: e
                          };
                      for (t = t ? 1 : 0; i < 4; i += 2 - t) r["margin" + (n = he[i])] = r["padding" + n] = e;
                      return t && (r.opacity = r.width = e), r
                  }

                  function bt(e, t, n) {
                      for (var i, r = (xt.tweeners[t] || []).concat(xt.tweeners["*"]), o = 0, a = r.length; o < a; o++)
                          if (i = r[o].call(n, t, e)) return i
                  }

                  function xt(e, t, n) {
                      var i, r, o = 0,
                          a = xt.prefilters.length,
                          s = N.Deferred().always((function() {
                              delete l.elem
                          })),
                          l = function() {
                              if (r) return !1;
                              for (var t = ft || vt(), n = Math.max(0, c.startTime + c.duration - t), i = 1 - (n / c.duration || 0), o = 0, a = c.tweens.length; o < a; o++) c.tweens[o].run(i);
                              return s.notifyWith(e, [c, i, n]), i < 1 && a ? n : (a || s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c]), !1)
                          },
                          c = s.promise({
                              elem: e,
                              props: N.extend({}, t),
                              opts: N.extend(!0, {
                                  specialEasing: {},
                                  easing: N.easing._default
                              }, n),
                              originalProperties: t,
                              originalOptions: n,
                              startTime: ft || vt(),
                              duration: n.duration,
                              tweens: [],
                              createTween: function(t, n) {
                                  var i = N.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                                  return c.tweens.push(i), i
                              },
                              stop: function(t) {
                                  var n = 0,
                                      i = t ? c.tweens.length : 0;
                                  if (r) return this;
                                  for (r = !0; n < i; n++) c.tweens[n].run(1);
                                  return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                              }
                          }),
                          u = c.props;
                      for (! function(e, t) {
                              var n, i, r, o, a;
                              for (n in e)
                                  if (r = t[i = re(n)], o = e[n], Array.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), (a = N.cssHooks[i]) && "expand" in a)
                                      for (n in o = a.expand(o), delete e[i], o) n in e || (e[n] = o[n], t[n] = r);
                                  else t[i] = r
                          }(u, c.opts.specialEasing); o < a; o++)
                          if (i = xt.prefilters[o].call(c, e, u, c.opts)) return v(i.stop) && (N._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
                      return N.map(u, bt, c), v(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), N.fx.timer(N.extend(l, {
                          elem: e,
                          anim: c,
                          queue: c.opts.queue
                      })), c
                  }
                  N.Animation = N.extend(xt, {
                          tweeners: {
                              "*": [function(e, t) {
                                  var n = this.createTween(e, t);
                                  return be(n.elem, e, pe.exec(t), n), n
                              }]
                          },
                          tweener: function(e, t) {
                              v(e) ? (t = e, e = ["*"]) : e = e.match(X);
                              for (var n, i = 0, r = e.length; i < r; i++) n = e[i], xt.tweeners[n] = xt.tweeners[n] || [], xt.tweeners[n].unshift(t)
                          },
                          prefilters: [function(e, t, n) {
                              var i, r, o, a, s, l, c, u, d = "width" in t || "height" in t,
                                  f = this,
                                  p = {},
                                  h = e.style,
                                  g = e.nodeType && ye(e),
                                  m = se.get(e, "fxshow");
                              for (i in n.queue || (null == (a = N._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                                      a.unqueued || s()
                                  }), a.unqueued++, f.always((function() {
                                      f.always((function() {
                                          a.unqueued--, N.queue(e, "fx").length || a.empty.fire()
                                      }))
                                  }))), t)
                                  if (r = t[i], ht.test(r)) {
                                      if (delete t[i], o = o || "toggle" === r, r === (g ? "hide" : "show")) {
                                          if ("show" !== r || !m || void 0 === m[i]) continue;
                                          g = !0
                                      }
                                      p[i] = m && m[i] || N.style(e, i)
                                  } if ((l = !N.isEmptyObject(t)) || !N.isEmptyObject(p))
                                  for (i in d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = m && m.display) && (c = se.get(e, "display")), "none" === (u = N.css(e, "display")) && (c ? u = c : (we([e], !0), c = e.style.display || c, u = N.css(e, "display"), we([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === N.css(e, "float") && (l || (f.done((function() {
                                          h.display = c
                                      })), null == c && (u = h.display, c = "none" === u ? "" : u)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", f.always((function() {
                                          h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                                      }))), l = !1, p) l || (m ? "hidden" in m && (g = m.hidden) : m = se.access(e, "fxshow", {
                                      display: c
                                  }), o && (m.hidden = !g), g && we([e], !0), f.done((function() {
                                      for (i in g || we([e]), se.remove(e, "fxshow"), p) N.style(e, i, p[i])
                                  }))), l = bt(g ? m[i] : 0, i, f), i in m || (m[i] = l.start, g && (l.end = l.start, l.start = 0))
                          }],
                          prefilter: function(e, t) {
                              t ? xt.prefilters.unshift(e) : xt.prefilters.push(e)
                          }
                      }), N.speed = function(e, t, n) {
                          var i = e && "object" == typeof e ? N.extend({}, e) : {
                              complete: n || !n && t || v(e) && e,
                              duration: e,
                              easing: n && t || t && !v(t) && t
                          };
                          return N.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in N.fx.speeds ? i.duration = N.fx.speeds[i.duration] : i.duration = N.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                              v(i.old) && i.old.call(this), i.queue && N.dequeue(this, i.queue)
                          }, i
                      }, N.fn.extend({
                          fadeTo: function(e, t, n, i) {
                              return this.filter(ye).css("opacity", 0).show().end().animate({
                                  opacity: t
                              }, e, n, i)
                          },
                          animate: function(e, t, n, i) {
                              var r = N.isEmptyObject(e),
                                  o = N.speed(t, n, i),
                                  a = function() {
                                      var t = xt(this, N.extend({}, e), o);
                                      (r || se.get(this, "finish")) && t.stop(!0)
                                  };
                              return a.finish = a, r || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
                          },
                          stop: function(e, t, n) {
                              var i = function(e) {
                                  var t = e.stop;
                                  delete e.stop, t(n)
                              };
                              return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each((function() {
                                  var t = !0,
                                      r = null != e && e + "queueHooks",
                                      o = N.timers,
                                      a = se.get(this);
                                  if (r) a[r] && a[r].stop && i(a[r]);
                                  else
                                      for (r in a) a[r] && a[r].stop && gt.test(r) && i(a[r]);
                                  for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                                  !t && n || N.dequeue(this, e)
                              }))
                          },
                          finish: function(e) {
                              return !1 !== e && (e = e || "fx"), this.each((function() {
                                  var t, n = se.get(this),
                                      i = n[e + "queue"],
                                      r = n[e + "queueHooks"],
                                      o = N.timers,
                                      a = i ? i.length : 0;
                                  for (n.finish = !0, N.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                                  for (t = 0; t < a; t++) i[t] && i[t].finish && i[t].finish.call(this);
                                  delete n.finish
                              }))
                          }
                      }), N.each(["toggle", "show", "hide"], (function(e, t) {
                          var n = N.fn[t];
                          N.fn[t] = function(e, i, r) {
                              return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(yt(t, !0), e, i, r)
                          }
                      })), N.each({
                          slideDown: yt("show"),
                          slideUp: yt("hide"),
                          slideToggle: yt("toggle"),
                          fadeIn: {
                              opacity: "show"
                          },
                          fadeOut: {
                              opacity: "hide"
                          },
                          fadeToggle: {
                              opacity: "toggle"
                          }
                      }, (function(e, t) {
                          N.fn[e] = function(e, n, i) {
                              return this.animate(t, e, n, i)
                          }
                      })), N.timers = [], N.fx.tick = function() {
                          var e, t = 0,
                              n = N.timers;
                          for (ft = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
                          n.length || N.fx.stop(), ft = void 0
                      }, N.fx.timer = function(e) {
                          N.timers.push(e), N.fx.start()
                      }, N.fx.interval = 13, N.fx.start = function() {
                          pt || (pt = !0, mt())
                      }, N.fx.stop = function() {
                          pt = null
                      }, N.fx.speeds = {
                          slow: 600,
                          fast: 200,
                          _default: 400
                      }, N.fn.delay = function(e, t) {
                          return e = N.fx && N.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, n) {
                              var r = i.setTimeout(t, e);
                              n.stop = function() {
                                  i.clearTimeout(r)
                              }
                          }))
                      },
                      function() {
                          var e = b.createElement("input"),
                              t = b.createElement("select").appendChild(b.createElement("option"));
                          e.type = "checkbox", m.checkOn = "" !== e.value, m.optSelected = t.selected, (e = b.createElement("input")).value = "t", e.type = "radio", m.radioValue = "t" === e.value
                      }();
                  var Tt, wt = N.expr.attrHandle;
                  N.fn.extend({
                      attr: function(e, t) {
                          return ee(this, N.attr, e, t, arguments.length > 1)
                      },
                      removeAttr: function(e) {
                          return this.each((function() {
                              N.removeAttr(this, e)
                          }))
                      }
                  }), N.extend({
                      attr: function(e, t, n) {
                          var i, r, o = e.nodeType;
                          if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? N.prop(e, t, n) : (1 === o && N.isXMLDoc(e) || (r = N.attrHooks[t.toLowerCase()] || (N.expr.match.bool.test(t) ? Tt : void 0)), void 0 !== n ? null === n ? void N.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : null == (i = N.find.attr(e, t)) ? void 0 : i)
                      },
                      attrHooks: {
                          type: {
                              set: function(e, t) {
                                  if (!m.radioValue && "radio" === t && C(e, "input")) {
                                      var n = e.value;
                                      return e.setAttribute("type", t), n && (e.value = n), t
                                  }
                              }
                          }
                      },
                      removeAttr: function(e, t) {
                          var n, i = 0,
                              r = t && t.match(X);
                          if (r && 1 === e.nodeType)
                              for (; n = r[i++];) e.removeAttribute(n)
                      }
                  }), Tt = {
                      set: function(e, t, n) {
                          return !1 === t ? N.removeAttr(e, n) : e.setAttribute(n, n), n
                      }
                  }, N.each(N.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                      var n = wt[t] || N.find.attr;
                      wt[t] = function(e, t, i) {
                          var r, o, a = t.toLowerCase();
                          return i || (o = wt[a], wt[a] = r, r = null != n(e, t, i) ? a : null, wt[a] = o), r
                      }
                  }));
                  var Et = /^(?:input|select|textarea|button)$/i,
                      _t = /^(?:a|area)$/i;

                  function Nt(e) {
                      return (e.match(X) || []).join(" ")
                  }

                  function At(e) {
                      return e.getAttribute && e.getAttribute("class") || ""
                  }

                  function Ct(e) {
                      return Array.isArray(e) ? e : "string" == typeof e && e.match(X) || []
                  }
                  N.fn.extend({
                      prop: function(e, t) {
                          return ee(this, N.prop, e, t, arguments.length > 1)
                      },
                      removeProp: function(e) {
                          return this.each((function() {
                              delete this[N.propFix[e] || e]
                          }))
                      }
                  }), N.extend({
                      prop: function(e, t, n) {
                          var i, r, o = e.nodeType;
                          if (3 !== o && 8 !== o && 2 !== o) return 1 === o && N.isXMLDoc(e) || (t = N.propFix[t] || t, r = N.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
                      },
                      propHooks: {
                          tabIndex: {
                              get: function(e) {
                                  var t = N.find.attr(e, "tabindex");
                                  return t ? parseInt(t, 10) : Et.test(e.nodeName) || _t.test(e.nodeName) && e.href ? 0 : -1
                              }
                          }
                      },
                      propFix: {
                          for: "htmlFor",
                          class: "className"
                      }
                  }), m.optSelected || (N.propHooks.selected = {
                      get: function(e) {
                          var t = e.parentNode;
                          return t && t.parentNode && t.parentNode.selectedIndex, null
                      },
                      set: function(e) {
                          var t = e.parentNode;
                          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                      }
                  }), N.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
                      N.propFix[this.toLowerCase()] = this
                  })), N.fn.extend({
                      addClass: function(e) {
                          var t, n, i, r, o, a;
                          return v(e) ? this.each((function(t) {
                              N(this).addClass(e.call(this, t, At(this)))
                          })) : (t = Ct(e)).length ? this.each((function() {
                              if (i = At(this), n = 1 === this.nodeType && " " + Nt(i) + " ") {
                                  for (o = 0; o < t.length; o++) r = t[o], n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                                  a = Nt(n), i !== a && this.setAttribute("class", a)
                              }
                          })) : this
                      },
                      removeClass: function(e) {
                          var t, n, i, r, o, a;
                          return v(e) ? this.each((function(t) {
                              N(this).removeClass(e.call(this, t, At(this)))
                          })) : arguments.length ? (t = Ct(e)).length ? this.each((function() {
                              if (i = At(this), n = 1 === this.nodeType && " " + Nt(i) + " ") {
                                  for (o = 0; o < t.length; o++)
                                      for (r = t[o]; n.indexOf(" " + r + " ") > -1;) n = n.replace(" " + r + " ", " ");
                                  a = Nt(n), i !== a && this.setAttribute("class", a)
                              }
                          })) : this : this.attr("class", "")
                      },
                      toggleClass: function(e, t) {
                          var n, i, r, o, a = typeof e,
                              s = "string" === a || Array.isArray(e);
                          return v(e) ? this.each((function(n) {
                              N(this).toggleClass(e.call(this, n, At(this), t), t)
                          })) : "boolean" == typeof t && s ? t ? this.addClass(e) : this.removeClass(e) : (n = Ct(e), this.each((function() {
                              if (s)
                                  for (o = N(this), r = 0; r < n.length; r++) i = n[r], o.hasClass(i) ? o.removeClass(i) : o.addClass(i);
                              else void 0 !== e && "boolean" !== a || ((i = At(this)) && se.set(this, "__className__", i), this.setAttribute && this.setAttribute("class", i || !1 === e ? "" : se.get(this, "__className__") || ""))
                          })))
                      },
                      hasClass: function(e) {
                          var t, n, i = 0;
                          for (t = " " + e + " "; n = this[i++];)
                              if (1 === n.nodeType && (" " + Nt(At(n)) + " ").indexOf(t) > -1) return !0;
                          return !1
                      }
                  });
                  var St = /\r/g;
                  N.fn.extend({
                      val: function(e) {
                          var t, n, i, r = this[0];
                          return arguments.length ? (i = v(e), this.each((function(n) {
                              var r;
                              1 === this.nodeType && (null == (r = i ? e.call(this, n, N(this).val()) : e) ? r = "" : "number" == typeof r ? r += "" : Array.isArray(r) && (r = N.map(r, (function(e) {
                                  return null == e ? "" : e + ""
                              }))), (t = N.valHooks[this.type] || N.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                          }))) : r ? (t = N.valHooks[r.type] || N.valHooks[r.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : "string" == typeof(n = r.value) ? n.replace(St, "") : null == n ? "" : n : void 0
                      }
                  }), N.extend({
                      valHooks: {
                          option: {
                              get: function(e) {
                                  var t = N.find.attr(e, "value");
                                  return null != t ? t : Nt(N.text(e))
                              }
                          },
                          select: {
                              get: function(e) {
                                  var t, n, i, r = e.options,
                                      o = e.selectedIndex,
                                      a = "select-one" === e.type,
                                      s = a ? null : [],
                                      l = a ? o + 1 : r.length;
                                  for (i = o < 0 ? l : a ? o : 0; i < l; i++)
                                      if (((n = r[i]).selected || i === o) && !n.disabled && (!n.parentNode.disabled || !C(n.parentNode, "optgroup"))) {
                                          if (t = N(n).val(), a) return t;
                                          s.push(t)
                                      } return s
                              },
                              set: function(e, t) {
                                  for (var n, i, r = e.options, o = N.makeArray(t), a = r.length; a--;)((i = r[a]).selected = N.inArray(N.valHooks.option.get(i), o) > -1) && (n = !0);
                                  return n || (e.selectedIndex = -1), o
                              }
                          }
                      }
                  }), N.each(["radio", "checkbox"], (function() {
                      N.valHooks[this] = {
                          set: function(e, t) {
                              if (Array.isArray(t)) return e.checked = N.inArray(N(e).val(), t) > -1
                          }
                      }, m.checkOn || (N.valHooks[this].get = function(e) {
                          return null === e.getAttribute("value") ? "on" : e.value
                      })
                  }));
                  var Dt = i.location,
                      Lt = {
                          guid: Date.now()
                      },
                      Ot = /\?/;
                  N.parseXML = function(e) {
                      var t, n;
                      if (!e || "string" != typeof e) return null;
                      try {
                          t = (new i.DOMParser).parseFromString(e, "text/xml")
                      } catch (e) {}
                      return n = t && t.getElementsByTagName("parsererror")[0], t && !n || N.error("Invalid XML: " + (n ? N.map(n.childNodes, (function(e) {
                          return e.textContent
                      })).join("\n") : e)), t
                  };
                  var kt = /^(?:focusinfocus|focusoutblur)$/,
                      Rt = function(e) {
                          e.stopPropagation()
                      };
                  N.extend(N.event, {
                      trigger: function(e, t, n, r) {
                          var o, a, s, l, c, u, d, f, h = [n || b],
                              g = p.call(e, "type") ? e.type : e,
                              m = p.call(e, "namespace") ? e.namespace.split(".") : [];
                          if (a = f = s = n = n || b, 3 !== n.nodeType && 8 !== n.nodeType && !kt.test(g + N.event.triggered) && (g.indexOf(".") > -1 && (m = g.split("."), g = m.shift(), m.sort()), c = g.indexOf(":") < 0 && "on" + g, (e = e[N.expando] ? e : new N.Event(g, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : N.makeArray(t, [e]), d = N.event.special[g] || {}, r || !d.trigger || !1 !== d.trigger.apply(n, t))) {
                              if (!r && !d.noBubble && !y(n)) {
                                  for (l = d.delegateType || g, kt.test(l + g) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                                  s === (n.ownerDocument || b) && h.push(s.defaultView || s.parentWindow || i)
                              }
                              for (o = 0;
                                  (a = h[o++]) && !e.isPropagationStopped();) f = a, e.type = o > 1 ? l : d.bindType || g, (u = (se.get(a, "events") || Object.create(null))[e.type] && se.get(a, "handle")) && u.apply(a, t), (u = c && a[c]) && u.apply && oe(a) && (e.result = u.apply(a, t), !1 === e.result && e.preventDefault());
                              return e.type = g, r || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(h.pop(), t) || !oe(n) || c && v(n[g]) && !y(n) && ((s = n[c]) && (n[c] = null), N.event.triggered = g, e.isPropagationStopped() && f.addEventListener(g, Rt), n[g](), e.isPropagationStopped() && f.removeEventListener(g, Rt), N.event.triggered = void 0, s && (n[c] = s)), e.result
                          }
                      },
                      simulate: function(e, t, n) {
                          var i = N.extend(new N.Event, n, {
                              type: e,
                              isSimulated: !0
                          });
                          N.event.trigger(i, null, t)
                      }
                  }), N.fn.extend({
                      trigger: function(e, t) {
                          return this.each((function() {
                              N.event.trigger(e, t, this)
                          }))
                      },
                      triggerHandler: function(e, t) {
                          var n = this[0];
                          if (n) return N.event.trigger(e, t, n, !0)
                      }
                  });
                  var jt = /\[\]$/,
                      It = /\r?\n/g,
                      Pt = /^(?:submit|button|image|reset|file)$/i,
                      Mt = /^(?:input|select|textarea|keygen)/i;

                  function Ht(e, t, n, i) {
                      var r;
                      if (Array.isArray(t)) N.each(t, (function(t, r) {
                          n || jt.test(e) ? i(e, r) : Ht(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
                      }));
                      else if (n || "object" !== w(t)) i(e, t);
                      else
                          for (r in t) Ht(e + "[" + r + "]", t[r], n, i)
                  }
                  N.param = function(e, t) {
                      var n, i = [],
                          r = function(e, t) {
                              var n = v(t) ? t() : t;
                              i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                          };
                      if (null == e) return "";
                      if (Array.isArray(e) || e.jquery && !N.isPlainObject(e)) N.each(e, (function() {
                          r(this.name, this.value)
                      }));
                      else
                          for (n in e) Ht(n, e[n], t, r);
                      return i.join("&")
                  }, N.fn.extend({
                      serialize: function() {
                          return N.param(this.serializeArray())
                      },
                      serializeArray: function() {
                          return this.map((function() {
                              var e = N.prop(this, "elements");
                              return e ? N.makeArray(e) : this
                          })).filter((function() {
                              var e = this.type;
                              return this.name && !N(this).is(":disabled") && Mt.test(this.nodeName) && !Pt.test(e) && (this.checked || !Ne.test(e))
                          })).map((function(e, t) {
                              var n = N(this).val();
                              return null == n ? null : Array.isArray(n) ? N.map(n, (function(e) {
                                  return {
                                      name: t.name,
                                      value: e.replace(It, "\r\n")
                                  }
                              })) : {
                                  name: t.name,
                                  value: n.replace(It, "\r\n")
                              }
                          })).get()
                      }
                  });
                  var $t = /%20/g,
                      Bt = /#.*$/,
                      qt = /([?&])_=[^&]*/,
                      Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                      Ft = /^(?:GET|HEAD)$/,
                      Ut = /^\/\//,
                      Vt = {},
                      Gt = {},
                      Xt = "*/".concat("*"),
                      zt = b.createElement("a");

                  function Yt(e) {
                      return function(t, n) {
                          "string" != typeof t && (n = t, t = "*");
                          var i, r = 0,
                              o = t.toLowerCase().match(X) || [];
                          if (v(n))
                              for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
                      }
                  }

                  function Jt(e, t, n, i) {
                      var r = {},
                          o = e === Gt;

                      function a(s) {
                          var l;
                          return r[s] = !0, N.each(e[s] || [], (function(e, s) {
                              var c = s(t, n, i);
                              return "string" != typeof c || o || r[c] ? o ? !(l = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1)
                          })), l
                      }
                      return a(t.dataTypes[0]) || !r["*"] && a("*")
                  }

                  function Kt(e, t) {
                      var n, i, r = N.ajaxSettings.flatOptions || {};
                      for (n in t) void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
                      return i && N.extend(!0, e, i), e
                  }
                  zt.href = Dt.href, N.extend({
                      active: 0,
                      lastModified: {},
                      etag: {},
                      ajaxSettings: {
                          url: Dt.href,
                          type: "GET",
                          isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Dt.protocol),
                          global: !0,
                          processData: !0,
                          async: !0,
                          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                          accepts: {
                              "*": Xt,
                              text: "text/plain",
                              html: "text/html",
                              xml: "application/xml, text/xml",
                              json: "application/json, text/javascript"
                          },
                          contents: {
                              xml: /\bxml\b/,
                              html: /\bhtml/,
                              json: /\bjson\b/
                          },
                          responseFields: {
                              xml: "responseXML",
                              text: "responseText",
                              json: "responseJSON"
                          },
                          converters: {
                              "* text": String,
                              "text html": !0,
                              "text json": JSON.parse,
                              "text xml": N.parseXML
                          },
                          flatOptions: {
                              url: !0,
                              context: !0
                          }
                      },
                      ajaxSetup: function(e, t) {
                          return t ? Kt(Kt(e, N.ajaxSettings), t) : Kt(N.ajaxSettings, e)
                      },
                      ajaxPrefilter: Yt(Vt),
                      ajaxTransport: Yt(Gt),
                      ajax: function(e, t) {
                          "object" == typeof e && (t = e, e = void 0), t = t || {};
                          var n, r, o, a, s, l, c, u, d, f, p = N.ajaxSetup({}, t),
                              h = p.context || p,
                              g = p.context && (h.nodeType || h.jquery) ? N(h) : N.event,
                              m = N.Deferred(),
                              v = N.Callbacks("once memory"),
                              y = p.statusCode || {},
                              x = {},
                              T = {},
                              w = "canceled",
                              E = {
                                  readyState: 0,
                                  getResponseHeader: function(e) {
                                      var t;
                                      if (c) {
                                          if (!a)
                                              for (a = {}; t = Wt.exec(o);) a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                          t = a[e.toLowerCase() + " "]
                                      }
                                      return null == t ? null : t.join(", ")
                                  },
                                  getAllResponseHeaders: function() {
                                      return c ? o : null
                                  },
                                  setRequestHeader: function(e, t) {
                                      return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, x[e] = t), this
                                  },
                                  overrideMimeType: function(e) {
                                      return null == c && (p.mimeType = e), this
                                  },
                                  statusCode: function(e) {
                                      var t;
                                      if (e)
                                          if (c) E.always(e[E.status]);
                                          else
                                              for (t in e) y[t] = [y[t], e[t]];
                                      return this
                                  },
                                  abort: function(e) {
                                      var t = e || w;
                                      return n && n.abort(t), _(0, t), this
                                  }
                              };
                          if (m.promise(E), p.url = ((e || p.url || Dt.href) + "").replace(Ut, Dt.protocol + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(X) || [""], null == p.crossDomain) {
                              l = b.createElement("a");
                              try {
                                  l.href = p.url, l.href = l.href, p.crossDomain = zt.protocol + "//" + zt.host != l.protocol + "//" + l.host
                              } catch (e) {
                                  p.crossDomain = !0
                              }
                          }
                          if (p.data && p.processData && "string" != typeof p.data && (p.data = N.param(p.data, p.traditional)), Jt(Vt, p, t, E), c) return E;
                          for (d in (u = N.event && p.global) && 0 == N.active++ && N.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Ft.test(p.type), r = p.url.replace(Bt, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace($t, "+")) : (f = p.url.slice(r.length), p.data && (p.processData || "string" == typeof p.data) && (r += (Ot.test(r) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (r = r.replace(qt, "$1"), f = (Ot.test(r) ? "&" : "?") + "_=" + Lt.guid++ + f), p.url = r + f), p.ifModified && (N.lastModified[r] && E.setRequestHeader("If-Modified-Since", N.lastModified[r]), N.etag[r] && E.setRequestHeader("If-None-Match", N.etag[r])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && E.setRequestHeader("Content-Type", p.contentType), E.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Xt + "; q=0.01" : "") : p.accepts["*"]), p.headers) E.setRequestHeader(d, p.headers[d]);
                          if (p.beforeSend && (!1 === p.beforeSend.call(h, E, p) || c)) return E.abort();
                          if (w = "abort", v.add(p.complete), E.done(p.success), E.fail(p.error), n = Jt(Gt, p, t, E)) {
                              if (E.readyState = 1, u && g.trigger("ajaxSend", [E, p]), c) return E;
                              p.async && p.timeout > 0 && (s = i.setTimeout((function() {
                                  E.abort("timeout")
                              }), p.timeout));
                              try {
                                  c = !1, n.send(x, _)
                              } catch (e) {
                                  if (c) throw e;
                                  _(-1, e)
                              }
                          } else _(-1, "No Transport");

                          function _(e, t, a, l) {
                              var d, f, b, x, T, w = t;
                              c || (c = !0, s && i.clearTimeout(s), n = void 0, o = l || "", E.readyState = e > 0 ? 4 : 0, d = e >= 200 && e < 300 || 304 === e, a && (x = function(e, t, n) {
                                  for (var i, r, o, a, s = e.contents, l = e.dataTypes;
                                      "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                                  if (i)
                                      for (r in s)
                                          if (s[r] && s[r].test(i)) {
                                              l.unshift(r);
                                              break
                                          } if (l[0] in n) o = l[0];
                                  else {
                                      for (r in n) {
                                          if (!l[0] || e.converters[r + " " + l[0]]) {
                                              o = r;
                                              break
                                          }
                                          a || (a = r)
                                      }
                                      o = o || a
                                  }
                                  if (o) return o !== l[0] && l.unshift(o), n[o]
                              }(p, E, a)), !d && N.inArray("script", p.dataTypes) > -1 && N.inArray("json", p.dataTypes) < 0 && (p.converters["text script"] = function() {}), x = function(e, t, n, i) {
                                  var r, o, a, s, l, c = {},
                                      u = e.dataTypes.slice();
                                  if (u[1])
                                      for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
                                  for (o = u.shift(); o;)
                                      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = u.shift())
                                          if ("*" === o) o = l;
                                          else if ("*" !== l && l !== o) {
                                      if (!(a = c[l + " " + o] || c["* " + o]))
                                          for (r in c)
                                              if ((s = r.split(" "))[1] === o && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                                                  !0 === a ? a = c[r] : !0 !== c[r] && (o = s[0], u.unshift(s[1]));
                                                  break
                                              } if (!0 !== a)
                                          if (a && e.throws) t = a(t);
                                          else try {
                                              t = a(t)
                                          } catch (e) {
                                              return {
                                                  state: "parsererror",
                                                  error: a ? e : "No conversion from " + l + " to " + o
                                              }
                                          }
                                  }
                                  return {
                                      state: "success",
                                      data: t
                                  }
                              }(p, x, E, d), d ? (p.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (N.lastModified[r] = T), (T = E.getResponseHeader("etag")) && (N.etag[r] = T)), 204 === e || "HEAD" === p.type ? w = "nocontent" : 304 === e ? w = "notmodified" : (w = x.state, f = x.data, d = !(b = x.error))) : (b = w, !e && w || (w = "error", e < 0 && (e = 0))), E.status = e, E.statusText = (t || w) + "", d ? m.resolveWith(h, [f, w, E]) : m.rejectWith(h, [E, w, b]), E.statusCode(y), y = void 0, u && g.trigger(d ? "ajaxSuccess" : "ajaxError", [E, p, d ? f : b]), v.fireWith(h, [E, w]), u && (g.trigger("ajaxComplete", [E, p]), --N.active || N.event.trigger("ajaxStop")))
                          }
                          return E
                      },
                      getJSON: function(e, t, n) {
                          return N.get(e, t, n, "json")
                      },
                      getScript: function(e, t) {
                          return N.get(e, void 0, t, "script")
                      }
                  }), N.each(["get", "post"], (function(e, t) {
                      N[t] = function(e, n, i, r) {
                          return v(n) && (r = r || i, i = n, n = void 0), N.ajax(N.extend({
                              url: e,
                              type: t,
                              dataType: r,
                              data: n,
                              success: i
                          }, N.isPlainObject(e) && e))
                      }
                  })), N.ajaxPrefilter((function(e) {
                      var t;
                      for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
                  })), N._evalUrl = function(e, t, n) {
                      return N.ajax({
                          url: e,
                          type: "GET",
                          dataType: "script",
                          cache: !0,
                          async: !1,
                          global: !1,
                          converters: {
                              "text script": function() {}
                          },
                          dataFilter: function(e) {
                              N.globalEval(e, t, n)
                          }
                      })
                  }, N.fn.extend({
                      wrapAll: function(e) {
                          var t;
                          return this[0] && (v(e) && (e = e.call(this[0])), t = N(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                              for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                              return e
                          })).append(this)), this
                      },
                      wrapInner: function(e) {
                          return v(e) ? this.each((function(t) {
                              N(this).wrapInner(e.call(this, t))
                          })) : this.each((function() {
                              var t = N(this),
                                  n = t.contents();
                              n.length ? n.wrapAll(e) : t.append(e)
                          }))
                      },
                      wrap: function(e) {
                          var t = v(e);
                          return this.each((function(n) {
                              N(this).wrapAll(t ? e.call(this, n) : e)
                          }))
                      },
                      unwrap: function(e) {
                          return this.parent(e).not("body").each((function() {
                              N(this).replaceWith(this.childNodes)
                          })), this
                      }
                  }), N.expr.pseudos.hidden = function(e) {
                      return !N.expr.pseudos.visible(e)
                  }, N.expr.pseudos.visible = function(e) {
                      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
                  }, N.ajaxSettings.xhr = function() {
                      try {
                          return new i.XMLHttpRequest
                      } catch (e) {}
                  };
                  var Qt = {
                          0: 200,
                          1223: 204
                      },
                      Zt = N.ajaxSettings.xhr();
                  m.cors = !!Zt && "withCredentials" in Zt, m.ajax = Zt = !!Zt, N.ajaxTransport((function(e) {
                      var t, n;
                      if (m.cors || Zt && !e.crossDomain) return {
                          send: function(r, o) {
                              var a, s = e.xhr();
                              if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                                  for (a in e.xhrFields) s[a] = e.xhrFields[a];
                              for (a in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), r) s.setRequestHeader(a, r[a]);
                              t = function(e) {
                                  return function() {
                                      t && (t = n = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Qt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                          binary: s.response
                                      } : {
                                          text: s.responseText
                                      }, s.getAllResponseHeaders()))
                                  }
                              }, s.onload = t(), n = s.onerror = s.ontimeout = t("error"), void 0 !== s.onabort ? s.onabort = n : s.onreadystatechange = function() {
                                  4 === s.readyState && i.setTimeout((function() {
                                      t && n()
                                  }))
                              }, t = t("abort");
                              try {
                                  s.send(e.hasContent && e.data || null)
                              } catch (e) {
                                  if (t) throw e
                              }
                          },
                          abort: function() {
                              t && t()
                          }
                      }
                  })), N.ajaxPrefilter((function(e) {
                      e.crossDomain && (e.contents.script = !1)
                  })), N.ajaxSetup({
                      accepts: {
                          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                      },
                      contents: {
                          script: /\b(?:java|ecma)script\b/
                      },
                      converters: {
                          "text script": function(e) {
                              return N.globalEval(e), e
                          }
                      }
                  }), N.ajaxPrefilter("script", (function(e) {
                      void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
                  })), N.ajaxTransport("script", (function(e) {
                      var t, n;
                      if (e.crossDomain || e.scriptAttrs) return {
                          send: function(i, r) {
                              t = N("<script>").attr(e.scriptAttrs || {}).prop({
                                  charset: e.scriptCharset,
                                  src: e.url
                              }).on("load error", n = function(e) {
                                  t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type)
                              }), b.head.appendChild(t[0])
                          },
                          abort: function() {
                              n && n()
                          }
                      }
                  }));
                  var en, tn = [],
                      nn = /(=)\?(?=&|$)|\?\?/;
                  N.ajaxSetup({
                      jsonp: "callback",
                      jsonpCallback: function() {
                          var e = tn.pop() || N.expando + "_" + Lt.guid++;
                          return this[e] = !0, e
                      }
                  }), N.ajaxPrefilter("json jsonp", (function(e, t, n) {
                      var r, o, a, s = !1 !== e.jsonp && (nn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && nn.test(e.data) && "data");
                      if (s || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(nn, "$1" + r) : !1 !== e.jsonp && (e.url += (Ot.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                          return a || N.error(r + " was not called"), a[0]
                      }, e.dataTypes[0] = "json", o = i[r], i[r] = function() {
                          a = arguments
                      }, n.always((function() {
                          void 0 === o ? N(i).removeProp(r) : i[r] = o, e[r] && (e.jsonpCallback = t.jsonpCallback, tn.push(r)), a && v(o) && o(a[0]), a = o = void 0
                      })), "script"
                  })), m.createHTMLDocument = ((en = b.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === en.childNodes.length), N.parseHTML = function(e, t, n) {
                      return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (m.createHTMLDocument ? ((i = (t = b.implementation.createHTMLDocument("")).createElement("base")).href = b.location.href, t.head.appendChild(i)) : t = b), o = !n && [], (r = B.exec(e)) ? [t.createElement(r[1])] : (r = ke([e], t, o), o && o.length && N(o).remove(), N.merge([], r.childNodes)));
                      var i, r, o
                  }, N.fn.load = function(e, t, n) {
                      var i, r, o, a = this,
                          s = e.indexOf(" ");
                      return s > -1 && (i = Nt(e.slice(s)), e = e.slice(0, s)), v(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && N.ajax({
                          url: e,
                          type: r || "GET",
                          dataType: "html",
                          data: t
                      }).done((function(e) {
                          o = arguments, a.html(i ? N("<div>").append(N.parseHTML(e)).find(i) : e)
                      })).always(n && function(e, t) {
                          a.each((function() {
                              n.apply(this, o || [e.responseText, t, e])
                          }))
                      }), this
                  }, N.expr.pseudos.animated = function(e) {
                      return N.grep(N.timers, (function(t) {
                          return e === t.elem
                      })).length
                  }, N.offset = {
                      setOffset: function(e, t, n) {
                          var i, r, o, a, s, l, c = N.css(e, "position"),
                              u = N(e),
                              d = {};
                          "static" === c && (e.style.position = "relative"), s = u.offset(), o = N.css(e, "top"), l = N.css(e, "left"), ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1 ? (a = (i = u.position()).top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), v(t) && (t = t.call(e, n, N.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + r), "using" in t ? t.using.call(e, d) : u.css(d)
                      }
                  }, N.fn.extend({
                      offset: function(e) {
                          if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                              N.offset.setOffset(this, e, t)
                          }));
                          var t, n, i = this[0];
                          return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
                              top: t.top + n.pageYOffset,
                              left: t.left + n.pageXOffset
                          }) : {
                              top: 0,
                              left: 0
                          } : void 0
                      },
                      position: function() {
                          if (this[0]) {
                              var e, t, n, i = this[0],
                                  r = {
                                      top: 0,
                                      left: 0
                                  };
                              if ("fixed" === N.css(i, "position")) t = i.getBoundingClientRect();
                              else {
                                  for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === N.css(e, "position");) e = e.parentNode;
                                  e && e !== i && 1 === e.nodeType && ((r = N(e).offset()).top += N.css(e, "borderTopWidth", !0), r.left += N.css(e, "borderLeftWidth", !0))
                              }
                              return {
                                  top: t.top - r.top - N.css(i, "marginTop", !0),
                                  left: t.left - r.left - N.css(i, "marginLeft", !0)
                              }
                          }
                      },
                      offsetParent: function() {
                          return this.map((function() {
                              for (var e = this.offsetParent; e && "static" === N.css(e, "position");) e = e.offsetParent;
                              return e || ge
                          }))
                      }
                  }), N.each({
                      scrollLeft: "pageXOffset",
                      scrollTop: "pageYOffset"
                  }, (function(e, t) {
                      var n = "pageYOffset" === t;
                      N.fn[e] = function(i) {
                          return ee(this, (function(e, i, r) {
                              var o;
                              if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === r) return o ? o[t] : e[i];
                              o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r
                          }), e, i, arguments.length)
                      }
                  })), N.each(["top", "left"], (function(e, t) {
                      N.cssHooks[t] = et(m.pixelPosition, (function(e, n) {
                          if (n) return n = Ze(e, t), ze.test(n) ? N(e).position()[t] + "px" : n
                      }))
                  })), N.each({
                      Height: "height",
                      Width: "width"
                  }, (function(e, t) {
                      N.each({
                          padding: "inner" + e,
                          content: t,
                          "": "outer" + e
                      }, (function(n, i) {
                          N.fn[i] = function(r, o) {
                              var a = arguments.length && (n || "boolean" != typeof r),
                                  s = n || (!0 === r || !0 === o ? "margin" : "border");
                              return ee(this, (function(t, n, r) {
                                  var o;
                                  return y(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === r ? N.css(t, n, s) : N.style(t, n, r, s)
                              }), t, a ? r : void 0, a)
                          }
                      }))
                  })), N.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
                      N.fn[t] = function(e) {
                          return this.on(t, e)
                      }
                  })), N.fn.extend({
                      bind: function(e, t, n) {
                          return this.on(e, null, t, n)
                      },
                      unbind: function(e, t) {
                          return this.off(e, null, t)
                      },
                      delegate: function(e, t, n, i) {
                          return this.on(t, e, n, i)
                      },
                      undelegate: function(e, t, n) {
                          return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                      },
                      hover: function(e, t) {
                          return this.mouseenter(e).mouseleave(t || e)
                      }
                  }), N.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
                      N.fn[t] = function(e, n) {
                          return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                      }
                  }));
                  var rn = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
                  N.proxy = function(e, t) {
                      var n, i, r;
                      if ("string" == typeof t && (n = e[t], t = e, e = n), v(e)) return i = s.call(arguments, 2), r = function() {
                          return e.apply(t || this, i.concat(s.call(arguments)))
                      }, r.guid = e.guid = e.guid || N.guid++, r
                  }, N.holdReady = function(e) {
                      e ? N.readyWait++ : N.ready(!0)
                  }, N.isArray = Array.isArray, N.parseJSON = JSON.parse, N.nodeName = C, N.isFunction = v, N.isWindow = y, N.camelCase = re, N.type = w, N.now = Date.now, N.isNumeric = function(e) {
                      var t = N.type(e);
                      return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
                  }, N.trim = function(e) {
                      return null == e ? "" : (e + "").replace(rn, "$1")
                  }, void 0 === (n = function() {
                      return N
                  }.apply(t, [])) || (e.exports = n);
                  var on = i.jQuery,
                      an = i.$;
                  return N.noConflict = function(e) {
                      return i.$ === N && (i.$ = an), e && i.jQuery === N && (i.jQuery = on), N
                  }, void 0 === r && (i.jQuery = i.$ = N), N
              }))
          }
      },
      t = {};

  function n(i) {
      var r = t[i];
      if (void 0 !== r) return r.exports;
      var o = t[i] = {
          exports: {}
      };
      return e[i].call(o.exports, o, o.exports, n), o.exports
  }
  n.n = e => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, {
          a: t
      }), t
  }, n.d = (e, t) => {
      for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, {
          enumerable: !0,
          get: t[i]
      })
  }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
      "use strict";
      var e = n(9755),
          t = n.n(e);

      function i(e) {
          if (null == e) return window;
          if ("[object Window]" !== e.toString()) {
              var t = e.ownerDocument;
              return t && t.defaultView || window
          }
          return e
      }

      function r(e) {
          return e instanceof i(e).Element || e instanceof Element
      }

      function o(e) {
          return e instanceof i(e).HTMLElement || e instanceof HTMLElement
      }

      function a(e) {
          return "undefined" != typeof ShadowRoot && (e instanceof i(e).ShadowRoot || e instanceof ShadowRoot)
      }
      var s = Math.max,
          l = Math.min,
          c = Math.round;

      function u() {
          var e = navigator.userAgentData;
          return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map((function(e) {
              return e.brand + "/" + e.version
          })).join(" ") : navigator.userAgent
      }

      function d() {
          return !/^((?!chrome|android).)*safari/i.test(u())
      }

      function f(e, t, n) {
          void 0 === t && (t = !1), void 0 === n && (n = !1);
          var a = e.getBoundingClientRect(),
              s = 1,
              l = 1;
          t && o(e) && (s = e.offsetWidth > 0 && c(a.width) / e.offsetWidth || 1, l = e.offsetHeight > 0 && c(a.height) / e.offsetHeight || 1);
          var u = (r(e) ? i(e) : window).visualViewport,
              f = !d() && n,
              p = (a.left + (f && u ? u.offsetLeft : 0)) / s,
              h = (a.top + (f && u ? u.offsetTop : 0)) / l,
              g = a.width / s,
              m = a.height / l;
          return {
              width: g,
              height: m,
              top: h,
              right: p + g,
              bottom: h + m,
              left: p,
              x: p,
              y: h
          }
      }

      function p(e) {
          var t = i(e);
          return {
              scrollLeft: t.pageXOffset,
              scrollTop: t.pageYOffset
          }
      }

      function h(e) {
          return e ? (e.nodeName || "").toLowerCase() : null
      }

      function g(e) {
          return ((r(e) ? e.ownerDocument : e.document) || window.document).documentElement
      }

      function m(e) {
          return f(g(e)).left + p(e).scrollLeft
      }

      function v(e) {
          return i(e).getComputedStyle(e)
      }

      function y(e) {
          var t = v(e),
              n = t.overflow,
              i = t.overflowX,
              r = t.overflowY;
          return /auto|scroll|overlay|hidden/.test(n + r + i)
      }

      function b(e, t, n) {
          void 0 === n && (n = !1);
          var r, a, s = o(t),
              l = o(t) && function(e) {
                  var t = e.getBoundingClientRect(),
                      n = c(t.width) / e.offsetWidth || 1,
                      i = c(t.height) / e.offsetHeight || 1;
                  return 1 !== n || 1 !== i
              }(t),
              u = g(t),
              d = f(e, l, n),
              v = {
                  scrollLeft: 0,
                  scrollTop: 0
              },
              b = {
                  x: 0,
                  y: 0
              };
          return (s || !s && !n) && (("body" !== h(t) || y(u)) && (v = (r = t) !== i(r) && o(r) ? {
              scrollLeft: (a = r).scrollLeft,
              scrollTop: a.scrollTop
          } : p(r)), o(t) ? ((b = f(t, !0)).x += t.clientLeft, b.y += t.clientTop) : u && (b.x = m(u))), {
              x: d.left + v.scrollLeft - b.x,
              y: d.top + v.scrollTop - b.y,
              width: d.width,
              height: d.height
          }
      }

      function x(e) {
          var t = f(e),
              n = e.offsetWidth,
              i = e.offsetHeight;
          return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
              x: e.offsetLeft,
              y: e.offsetTop,
              width: n,
              height: i
          }
      }

      function T(e) {
          return "html" === h(e) ? e : e.assignedSlot || e.parentNode || (a(e) ? e.host : null) || g(e)
      }

      function w(e) {
          return ["html", "body", "#document"].indexOf(h(e)) >= 0 ? e.ownerDocument.body : o(e) && y(e) ? e : w(T(e))
      }

      function E(e, t) {
          var n;
          void 0 === t && (t = []);
          var r = w(e),
              o = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
              a = i(r),
              s = o ? [a].concat(a.visualViewport || [], y(r) ? r : []) : r,
              l = t.concat(s);
          return o ? l : l.concat(E(T(s)))
      }

      function _(e) {
          return ["table", "td", "th"].indexOf(h(e)) >= 0
      }

      function N(e) {
          return o(e) && "fixed" !== v(e).position ? e.offsetParent : null
      }

      function A(e) {
          for (var t = i(e), n = N(e); n && _(n) && "static" === v(n).position;) n = N(n);
          return n && ("html" === h(n) || "body" === h(n) && "static" === v(n).position) ? t : n || function(e) {
              var t = /firefox/i.test(u());
              if (/Trident/i.test(u()) && o(e) && "fixed" === v(e).position) return null;
              var n = T(e);
              for (a(n) && (n = n.host); o(n) && ["html", "body"].indexOf(h(n)) < 0;) {
                  var i = v(n);
                  if ("none" !== i.transform || "none" !== i.perspective || "paint" === i.contain || -1 !== ["transform", "perspective"].indexOf(i.willChange) || t && "filter" === i.willChange || t && i.filter && "none" !== i.filter) return n;
                  n = n.parentNode
              }
              return null
          }(e) || t
      }
      var C = "top",
          S = "bottom",
          D = "right",
          L = "left",
          O = "auto",
          k = [C, S, D, L],
          R = "start",
          j = "end",
          I = "clippingParents",
          P = "viewport",
          M = "popper",
          H = "reference",
          $ = k.reduce((function(e, t) {
              return e.concat([t + "-" + R, t + "-" + j])
          }), []),
          B = [].concat(k, [O]).reduce((function(e, t) {
              return e.concat([t, t + "-" + R, t + "-" + j])
          }), []),
          q = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

      function W(e) {
          var t = new Map,
              n = new Set,
              i = [];

          function r(e) {
              n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function(e) {
                  if (!n.has(e)) {
                      var i = t.get(e);
                      i && r(i)
                  }
              })), i.push(e)
          }
          return e.forEach((function(e) {
              t.set(e.name, e)
          })), e.forEach((function(e) {
              n.has(e.name) || r(e)
          })), i
      }
      var F = {
          placement: "bottom",
          modifiers: [],
          strategy: "absolute"
      };

      function U() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
          return !t.some((function(e) {
              return !(e && "function" == typeof e.getBoundingClientRect)
          }))
      }

      function V(e) {
          void 0 === e && (e = {});
          var t = e,
              n = t.defaultModifiers,
              i = void 0 === n ? [] : n,
              o = t.defaultOptions,
              a = void 0 === o ? F : o;
          return function(e, t, n) {
              void 0 === n && (n = a);
              var o, s, l = {
                      placement: "bottom",
                      orderedModifiers: [],
                      options: Object.assign({}, F, a),
                      modifiersData: {},
                      elements: {
                          reference: e,
                          popper: t
                      },
                      attributes: {},
                      styles: {}
                  },
                  c = [],
                  u = !1,
                  d = {
                      state: l,
                      setOptions: function(n) {
                          var o = "function" == typeof n ? n(l.options) : n;
                          f(), l.options = Object.assign({}, a, l.options, o), l.scrollParents = {
                              reference: r(e) ? E(e) : e.contextElement ? E(e.contextElement) : [],
                              popper: E(t)
                          };
                          var s, u, p = function(e) {
                              var t = W(e);
                              return q.reduce((function(e, n) {
                                  return e.concat(t.filter((function(e) {
                                      return e.phase === n
                                  })))
                              }), [])
                          }((s = [].concat(i, l.options.modifiers), u = s.reduce((function(e, t) {
                              var n = e[t.name];
                              return e[t.name] = n ? Object.assign({}, n, t, {
                                  options: Object.assign({}, n.options, t.options),
                                  data: Object.assign({}, n.data, t.data)
                              }) : t, e
                          }), {}), Object.keys(u).map((function(e) {
                              return u[e]
                          }))));
                          return l.orderedModifiers = p.filter((function(e) {
                              return e.enabled
                          })), l.orderedModifiers.forEach((function(e) {
                              var t = e.name,
                                  n = e.options,
                                  i = void 0 === n ? {} : n,
                                  r = e.effect;
                              if ("function" == typeof r) {
                                  var o = r({
                                          state: l,
                                          name: t,
                                          instance: d,
                                          options: i
                                      }),
                                      a = function() {};
                                  c.push(o || a)
                              }
                          })), d.update()
                      },
                      forceUpdate: function() {
                          if (!u) {
                              var e = l.elements,
                                  t = e.reference,
                                  n = e.popper;
                              if (U(t, n)) {
                                  l.rects = {
                                      reference: b(t, A(n), "fixed" === l.options.strategy),
                                      popper: x(n)
                                  }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach((function(e) {
                                      return l.modifiersData[e.name] = Object.assign({}, e.data)
                                  }));
                                  for (var i = 0; i < l.orderedModifiers.length; i++)
                                      if (!0 !== l.reset) {
                                          var r = l.orderedModifiers[i],
                                              o = r.fn,
                                              a = r.options,
                                              s = void 0 === a ? {} : a,
                                              c = r.name;
                                          "function" == typeof o && (l = o({
                                              state: l,
                                              options: s,
                                              name: c,
                                              instance: d
                                          }) || l)
                                      } else l.reset = !1, i = -1
                              }
                          }
                      },
                      update: (o = function() {
                          return new Promise((function(e) {
                              d.forceUpdate(), e(l)
                          }))
                      }, function() {
                          return s || (s = new Promise((function(e) {
                              Promise.resolve().then((function() {
                                  s = void 0, e(o())
                              }))
                          }))), s
                      }),
                      destroy: function() {
                          f(), u = !0
                      }
                  };
              if (!U(e, t)) return d;

              function f() {
                  c.forEach((function(e) {
                      return e()
                  })), c = []
              }
              return d.setOptions(n).then((function(e) {
                  !u && n.onFirstUpdate && n.onFirstUpdate(e)
              })), d
          }
      }
      var G = {
          passive: !0
      };

      function X(e) {
          return e.split("-")[0]
      }

      function z(e) {
          return e.split("-")[1]
      }

      function Y(e) {
          return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
      }

      function J(e) {
          var t, n = e.reference,
              i = e.element,
              r = e.placement,
              o = r ? X(r) : null,
              a = r ? z(r) : null,
              s = n.x + n.width / 2 - i.width / 2,
              l = n.y + n.height / 2 - i.height / 2;
          switch (o) {
              case C:
                  t = {
                      x: s,
                      y: n.y - i.height
                  };
                  break;
              case S:
                  t = {
                      x: s,
                      y: n.y + n.height
                  };
                  break;
              case D:
                  t = {
                      x: n.x + n.width,
                      y: l
                  };
                  break;
              case L:
                  t = {
                      x: n.x - i.width,
                      y: l
                  };
                  break;
              default:
                  t = {
                      x: n.x,
                      y: n.y
                  }
          }
          var c = o ? Y(o) : null;
          if (null != c) {
              var u = "y" === c ? "height" : "width";
              switch (a) {
                  case R:
                      t[c] = t[c] - (n[u] / 2 - i[u] / 2);
                      break;
                  case j:
                      t[c] = t[c] + (n[u] / 2 - i[u] / 2)
              }
          }
          return t
      }
      var K = {
          top: "auto",
          right: "auto",
          bottom: "auto",
          left: "auto"
      };

      function Q(e) {
          var t, n = e.popper,
              r = e.popperRect,
              o = e.placement,
              a = e.variation,
              s = e.offsets,
              l = e.position,
              u = e.gpuAcceleration,
              d = e.adaptive,
              f = e.roundOffsets,
              p = e.isFixed,
              h = s.x,
              m = void 0 === h ? 0 : h,
              y = s.y,
              b = void 0 === y ? 0 : y,
              x = "function" == typeof f ? f({
                  x: m,
                  y: b
              }) : {
                  x: m,
                  y: b
              };
          m = x.x, b = x.y;
          var T = s.hasOwnProperty("x"),
              w = s.hasOwnProperty("y"),
              E = L,
              _ = C,
              N = window;
          if (d) {
              var O = A(n),
                  k = "clientHeight",
                  R = "clientWidth";
              if (O === i(n) && "static" !== v(O = g(n)).position && "absolute" === l && (k = "scrollHeight", R = "scrollWidth"), o === C || (o === L || o === D) && a === j) _ = S, b -= (p && O === N && N.visualViewport ? N.visualViewport.height : O[k]) - r.height, b *= u ? 1 : -1;
              if (o === L || (o === C || o === S) && a === j) E = D, m -= (p && O === N && N.visualViewport ? N.visualViewport.width : O[R]) - r.width, m *= u ? 1 : -1
          }
          var I, P = Object.assign({
                  position: l
              }, d && K),
              M = !0 === f ? function(e, t) {
                  var n = e.x,
                      i = e.y,
                      r = t.devicePixelRatio || 1;
                  return {
                      x: c(n * r) / r || 0,
                      y: c(i * r) / r || 0
                  }
              }({
                  x: m,
                  y: b
              }, i(n)) : {
                  x: m,
                  y: b
              };
          return m = M.x, b = M.y, u ? Object.assign({}, P, ((I = {})[_] = w ? "0" : "", I[E] = T ? "0" : "", I.transform = (N.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + b + "px)" : "translate3d(" + m + "px, " + b + "px, 0)", I)) : Object.assign({}, P, ((t = {})[_] = w ? b + "px" : "", t[E] = T ? m + "px" : "", t.transform = "", t))
      }
      const Z = {
          name: "applyStyles",
          enabled: !0,
          phase: "write",
          fn: function(e) {
              var t = e.state;
              Object.keys(t.elements).forEach((function(e) {
                  var n = t.styles[e] || {},
                      i = t.attributes[e] || {},
                      r = t.elements[e];
                  o(r) && h(r) && (Object.assign(r.style, n), Object.keys(i).forEach((function(e) {
                      var t = i[e];
                      !1 === t ? r.removeAttribute(e) : r.setAttribute(e, !0 === t ? "" : t)
                  })))
              }))
          },
          effect: function(e) {
              var t = e.state,
                  n = {
                      popper: {
                          position: t.options.strategy,
                          left: "0",
                          top: "0",
                          margin: "0"
                      },
                      arrow: {
                          position: "absolute"
                      },
                      reference: {}
                  };
              return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                  function() {
                      Object.keys(t.elements).forEach((function(e) {
                          var i = t.elements[e],
                              r = t.attributes[e] || {},
                              a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                                  return e[t] = "", e
                              }), {});
                          o(i) && h(i) && (Object.assign(i.style, a), Object.keys(r).forEach((function(e) {
                              i.removeAttribute(e)
                          })))
                      }))
                  }
          },
          requires: ["computeStyles"]
      };
      const ee = {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function(e) {
              var t = e.state,
                  n = e.options,
                  i = e.name,
                  r = n.offset,
                  o = void 0 === r ? [0, 0] : r,
                  a = B.reduce((function(e, n) {
                      return e[n] = function(e, t, n) {
                          var i = X(e),
                              r = [L, C].indexOf(i) >= 0 ? -1 : 1,
                              o = "function" == typeof n ? n(Object.assign({}, t, {
                                  placement: e
                              })) : n,
                              a = o[0],
                              s = o[1];
                          return a = a || 0, s = (s || 0) * r, [L, D].indexOf(i) >= 0 ? {
                              x: s,
                              y: a
                          } : {
                              x: a,
                              y: s
                          }
                      }(n, t.rects, o), e
                  }), {}),
                  s = a[t.placement],
                  l = s.x,
                  c = s.y;
              null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[i] = a
          }
      };
      var te = {
          left: "right",
          right: "left",
          bottom: "top",
          top: "bottom"
      };

      function ne(e) {
          return e.replace(/left|right|bottom|top/g, (function(e) {
              return te[e]
          }))
      }
      var ie = {
          start: "end",
          end: "start"
      };

      function re(e) {
          return e.replace(/start|end/g, (function(e) {
              return ie[e]
          }))
      }

      function oe(e, t) {
          var n = t.getRootNode && t.getRootNode();
          if (e.contains(t)) return !0;
          if (n && a(n)) {
              var i = t;
              do {
                  if (i && e.isSameNode(i)) return !0;
                  i = i.parentNode || i.host
              } while (i)
          }
          return !1
      }

      function ae(e) {
          return Object.assign({}, e, {
              left: e.x,
              top: e.y,
              right: e.x + e.width,
              bottom: e.y + e.height
          })
      }

      function se(e, t, n) {
          return t === P ? ae(function(e, t) {
              var n = i(e),
                  r = g(e),
                  o = n.visualViewport,
                  a = r.clientWidth,
                  s = r.clientHeight,
                  l = 0,
                  c = 0;
              if (o) {
                  a = o.width, s = o.height;
                  var u = d();
                  (u || !u && "fixed" === t) && (l = o.offsetLeft, c = o.offsetTop)
              }
              return {
                  width: a,
                  height: s,
                  x: l + m(e),
                  y: c
              }
          }(e, n)) : r(t) ? function(e, t) {
              var n = f(e, !1, "fixed" === t);
              return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n
          }(t, n) : ae(function(e) {
              var t, n = g(e),
                  i = p(e),
                  r = null == (t = e.ownerDocument) ? void 0 : t.body,
                  o = s(n.scrollWidth, n.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0),
                  a = s(n.scrollHeight, n.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0),
                  l = -i.scrollLeft + m(e),
                  c = -i.scrollTop;
              return "rtl" === v(r || n).direction && (l += s(n.clientWidth, r ? r.clientWidth : 0) - o), {
                  width: o,
                  height: a,
                  x: l,
                  y: c
              }
          }(g(e)))
      }

      function le(e, t, n, i) {
          var a = "clippingParents" === t ? function(e) {
                  var t = E(T(e)),
                      n = ["absolute", "fixed"].indexOf(v(e).position) >= 0 && o(e) ? A(e) : e;
                  return r(n) ? t.filter((function(e) {
                      return r(e) && oe(e, n) && "body" !== h(e)
                  })) : []
              }(e) : [].concat(t),
              c = [].concat(a, [n]),
              u = c[0],
              d = c.reduce((function(t, n) {
                  var r = se(e, n, i);
                  return t.top = s(r.top, t.top), t.right = l(r.right, t.right), t.bottom = l(r.bottom, t.bottom), t.left = s(r.left, t.left), t
              }), se(e, u, i));
          return d.width = d.right - d.left, d.height = d.bottom - d.top, d.x = d.left, d.y = d.top, d
      }

      function ce(e) {
          return Object.assign({}, {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
          }, e)
      }

      function ue(e, t) {
          return t.reduce((function(t, n) {
              return t[n] = e, t
          }), {})
      }

      function de(e, t) {
          void 0 === t && (t = {});
          var n = t,
              i = n.placement,
              o = void 0 === i ? e.placement : i,
              a = n.strategy,
              s = void 0 === a ? e.strategy : a,
              l = n.boundary,
              c = void 0 === l ? I : l,
              u = n.rootBoundary,
              d = void 0 === u ? P : u,
              p = n.elementContext,
              h = void 0 === p ? M : p,
              m = n.altBoundary,
              v = void 0 !== m && m,
              y = n.padding,
              b = void 0 === y ? 0 : y,
              x = ce("number" != typeof b ? b : ue(b, k)),
              T = h === M ? H : M,
              w = e.rects.popper,
              E = e.elements[v ? T : h],
              _ = le(r(E) ? E : E.contextElement || g(e.elements.popper), c, d, s),
              N = f(e.elements.reference),
              A = J({
                  reference: N,
                  element: w,
                  strategy: "absolute",
                  placement: o
              }),
              L = ae(Object.assign({}, w, A)),
              O = h === M ? L : N,
              R = {
                  top: _.top - O.top + x.top,
                  bottom: O.bottom - _.bottom + x.bottom,
                  left: _.left - O.left + x.left,
                  right: O.right - _.right + x.right
              },
              j = e.modifiersData.offset;
          if (h === M && j) {
              var $ = j[o];
              Object.keys(R).forEach((function(e) {
                  var t = [D, S].indexOf(e) >= 0 ? 1 : -1,
                      n = [C, S].indexOf(e) >= 0 ? "y" : "x";
                  R[e] += $[n] * t
              }))
          }
          return R
      }

      function fe(e, t, n) {
          return s(e, l(t, n))
      }
      const pe = {
          name: "preventOverflow",
          enabled: !0,
          phase: "main",
          fn: function(e) {
              var t = e.state,
                  n = e.options,
                  i = e.name,
                  r = n.mainAxis,
                  o = void 0 === r || r,
                  a = n.altAxis,
                  c = void 0 !== a && a,
                  u = n.boundary,
                  d = n.rootBoundary,
                  f = n.altBoundary,
                  p = n.padding,
                  h = n.tether,
                  g = void 0 === h || h,
                  m = n.tetherOffset,
                  v = void 0 === m ? 0 : m,
                  y = de(t, {
                      boundary: u,
                      rootBoundary: d,
                      padding: p,
                      altBoundary: f
                  }),
                  b = X(t.placement),
                  T = z(t.placement),
                  w = !T,
                  E = Y(b),
                  _ = "x" === E ? "y" : "x",
                  N = t.modifiersData.popperOffsets,
                  O = t.rects.reference,
                  k = t.rects.popper,
                  j = "function" == typeof v ? v(Object.assign({}, t.rects, {
                      placement: t.placement
                  })) : v,
                  I = "number" == typeof j ? {
                      mainAxis: j,
                      altAxis: j
                  } : Object.assign({
                      mainAxis: 0,
                      altAxis: 0
                  }, j),
                  P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
                  M = {
                      x: 0,
                      y: 0
                  };
              if (N) {
                  if (o) {
                      var H, $ = "y" === E ? C : L,
                          B = "y" === E ? S : D,
                          q = "y" === E ? "height" : "width",
                          W = N[E],
                          F = W + y[$],
                          U = W - y[B],
                          V = g ? -k[q] / 2 : 0,
                          G = T === R ? O[q] : k[q],
                          J = T === R ? -k[q] : -O[q],
                          K = t.elements.arrow,
                          Q = g && K ? x(K) : {
                              width: 0,
                              height: 0
                          },
                          Z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                              top: 0,
                              right: 0,
                              bottom: 0,
                              left: 0
                          },
                          ee = Z[$],
                          te = Z[B],
                          ne = fe(0, O[q], Q[q]),
                          ie = w ? O[q] / 2 - V - ne - ee - I.mainAxis : G - ne - ee - I.mainAxis,
                          re = w ? -O[q] / 2 + V + ne + te + I.mainAxis : J + ne + te + I.mainAxis,
                          oe = t.elements.arrow && A(t.elements.arrow),
                          ae = oe ? "y" === E ? oe.clientTop || 0 : oe.clientLeft || 0 : 0,
                          se = null != (H = null == P ? void 0 : P[E]) ? H : 0,
                          le = W + re - se,
                          ce = fe(g ? l(F, W + ie - se - ae) : F, W, g ? s(U, le) : U);
                      N[E] = ce, M[E] = ce - W
                  }
                  if (c) {
                      var ue, pe = "x" === E ? C : L,
                          he = "x" === E ? S : D,
                          ge = N[_],
                          me = "y" === _ ? "height" : "width",
                          ve = ge + y[pe],
                          ye = ge - y[he],
                          be = -1 !== [C, L].indexOf(b),
                          xe = null != (ue = null == P ? void 0 : P[_]) ? ue : 0,
                          Te = be ? ve : ge - O[me] - k[me] - xe + I.altAxis,
                          we = be ? ge + O[me] + k[me] - xe - I.altAxis : ye,
                          Ee = g && be ? function(e, t, n) {
                              var i = fe(e, t, n);
                              return i > n ? n : i
                          }(Te, ge, we) : fe(g ? Te : ve, ge, g ? we : ye);
                      N[_] = Ee, M[_] = Ee - ge
                  }
                  t.modifiersData[i] = M
              }
          },
          requiresIfExists: ["offset"]
      };
      const he = {
          name: "arrow",
          enabled: !0,
          phase: "main",
          fn: function(e) {
              var t, n = e.state,
                  i = e.name,
                  r = e.options,
                  o = n.elements.arrow,
                  a = n.modifiersData.popperOffsets,
                  s = X(n.placement),
                  l = Y(s),
                  c = [L, D].indexOf(s) >= 0 ? "height" : "width";
              if (o && a) {
                  var u = function(e, t) {
                          return ce("number" != typeof(e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                              placement: t.placement
                          })) : e) ? e : ue(e, k))
                      }(r.padding, n),
                      d = x(o),
                      f = "y" === l ? C : L,
                      p = "y" === l ? S : D,
                      h = n.rects.reference[c] + n.rects.reference[l] - a[l] - n.rects.popper[c],
                      g = a[l] - n.rects.reference[l],
                      m = A(o),
                      v = m ? "y" === l ? m.clientHeight || 0 : m.clientWidth || 0 : 0,
                      y = h / 2 - g / 2,
                      b = u[f],
                      T = v - d[c] - u[p],
                      w = v / 2 - d[c] / 2 + y,
                      E = fe(b, w, T),
                      _ = l;
                  n.modifiersData[i] = ((t = {})[_] = E, t.centerOffset = E - w, t)
              }
          },
          effect: function(e) {
              var t = e.state,
                  n = e.options.element,
                  i = void 0 === n ? "[data-popper-arrow]" : n;
              null != i && ("string" != typeof i || (i = t.elements.popper.querySelector(i))) && oe(t.elements.popper, i) && (t.elements.arrow = i)
          },
          requires: ["popperOffsets"],
          requiresIfExists: ["preventOverflow"]
      };

      function ge(e, t, n) {
          return void 0 === n && (n = {
              x: 0,
              y: 0
          }), {
              top: e.top - t.height - n.y,
              right: e.right - t.width + n.x,
              bottom: e.bottom - t.height + n.y,
              left: e.left - t.width - n.x
          }
      }

      function me(e) {
          return [C, D, S, L].some((function(t) {
              return e[t] >= 0
          }))
      }
      var ve = V({
              defaultModifiers: [{
                  name: "eventListeners",
                  enabled: !0,
                  phase: "write",
                  fn: function() {},
                  effect: function(e) {
                      var t = e.state,
                          n = e.instance,
                          r = e.options,
                          o = r.scroll,
                          a = void 0 === o || o,
                          s = r.resize,
                          l = void 0 === s || s,
                          c = i(t.elements.popper),
                          u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                      return a && u.forEach((function(e) {
                              e.addEventListener("scroll", n.update, G)
                          })), l && c.addEventListener("resize", n.update, G),
                          function() {
                              a && u.forEach((function(e) {
                                  e.removeEventListener("scroll", n.update, G)
                              })), l && c.removeEventListener("resize", n.update, G)
                          }
                  },
                  data: {}
              }, {
                  name: "popperOffsets",
                  enabled: !0,
                  phase: "read",
                  fn: function(e) {
                      var t = e.state,
                          n = e.name;
                      t.modifiersData[n] = J({
                          reference: t.rects.reference,
                          element: t.rects.popper,
                          strategy: "absolute",
                          placement: t.placement
                      })
                  },
                  data: {}
              }, {
                  name: "computeStyles",
                  enabled: !0,
                  phase: "beforeWrite",
                  fn: function(e) {
                      var t = e.state,
                          n = e.options,
                          i = n.gpuAcceleration,
                          r = void 0 === i || i,
                          o = n.adaptive,
                          a = void 0 === o || o,
                          s = n.roundOffsets,
                          l = void 0 === s || s,
                          c = {
                              placement: X(t.placement),
                              variation: z(t.placement),
                              popper: t.elements.popper,
                              popperRect: t.rects.popper,
                              gpuAcceleration: r,
                              isFixed: "fixed" === t.options.strategy
                          };
                      null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, Q(Object.assign({}, c, {
                          offsets: t.modifiersData.popperOffsets,
                          position: t.options.strategy,
                          adaptive: a,
                          roundOffsets: l
                      })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, Q(Object.assign({}, c, {
                          offsets: t.modifiersData.arrow,
                          position: "absolute",
                          adaptive: !1,
                          roundOffsets: l
                      })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                          "data-popper-placement": t.placement
                      })
                  },
                  data: {}
              }, Z, ee, {
                  name: "flip",
                  enabled: !0,
                  phase: "main",
                  fn: function(e) {
                      var t = e.state,
                          n = e.options,
                          i = e.name;
                      if (!t.modifiersData[i]._skip) {
                          for (var r = n.mainAxis, o = void 0 === r || r, a = n.altAxis, s = void 0 === a || a, l = n.fallbackPlacements, c = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, h = void 0 === p || p, g = n.allowedAutoPlacements, m = t.options.placement, v = X(m), y = l || (v === m || !h ? [ne(m)] : function(e) {
                                  if (X(e) === O) return [];
                                  var t = ne(e);
                                  return [re(e), t, re(t)]
                              }(m)), b = [m].concat(y).reduce((function(e, n) {
                                  return e.concat(X(n) === O ? function(e, t) {
                                      void 0 === t && (t = {});
                                      var n = t,
                                          i = n.placement,
                                          r = n.boundary,
                                          o = n.rootBoundary,
                                          a = n.padding,
                                          s = n.flipVariations,
                                          l = n.allowedAutoPlacements,
                                          c = void 0 === l ? B : l,
                                          u = z(i),
                                          d = u ? s ? $ : $.filter((function(e) {
                                              return z(e) === u
                                          })) : k,
                                          f = d.filter((function(e) {
                                              return c.indexOf(e) >= 0
                                          }));
                                      0 === f.length && (f = d);
                                      var p = f.reduce((function(t, n) {
                                          return t[n] = de(e, {
                                              placement: n,
                                              boundary: r,
                                              rootBoundary: o,
                                              padding: a
                                          })[X(n)], t
                                      }), {});
                                      return Object.keys(p).sort((function(e, t) {
                                          return p[e] - p[t]
                                      }))
                                  }(t, {
                                      placement: n,
                                      boundary: u,
                                      rootBoundary: d,
                                      padding: c,
                                      flipVariations: h,
                                      allowedAutoPlacements: g
                                  }) : n)
                              }), []), x = t.rects.reference, T = t.rects.popper, w = new Map, E = !0, _ = b[0], N = 0; N < b.length; N++) {
                              var A = b[N],
                                  j = X(A),
                                  I = z(A) === R,
                                  P = [C, S].indexOf(j) >= 0,
                                  M = P ? "width" : "height",
                                  H = de(t, {
                                      placement: A,
                                      boundary: u,
                                      rootBoundary: d,
                                      altBoundary: f,
                                      padding: c
                                  }),
                                  q = P ? I ? D : L : I ? S : C;
                              x[M] > T[M] && (q = ne(q));
                              var W = ne(q),
                                  F = [];
                              if (o && F.push(H[j] <= 0), s && F.push(H[q] <= 0, H[W] <= 0), F.every((function(e) {
                                      return e
                                  }))) {
                                  _ = A, E = !1;
                                  break
                              }
                              w.set(A, F)
                          }
                          if (E)
                              for (var U = function(e) {
                                      var t = b.find((function(t) {
                                          var n = w.get(t);
                                          if (n) return n.slice(0, e).every((function(e) {
                                              return e
                                          }))
                                      }));
                                      if (t) return _ = t, "break"
                                  }, V = h ? 3 : 1; V > 0; V--) {
                                  if ("break" === U(V)) break
                              }
                          t.placement !== _ && (t.modifiersData[i]._skip = !0, t.placement = _, t.reset = !0)
                      }
                  },
                  requiresIfExists: ["offset"],
                  data: {
                      _skip: !1
                  }
              }, pe, he, {
                  name: "hide",
                  enabled: !0,
                  phase: "main",
                  requiresIfExists: ["preventOverflow"],
                  fn: function(e) {
                      var t = e.state,
                          n = e.name,
                          i = t.rects.reference,
                          r = t.rects.popper,
                          o = t.modifiersData.preventOverflow,
                          a = de(t, {
                              elementContext: "reference"
                          }),
                          s = de(t, {
                              altBoundary: !0
                          }),
                          l = ge(a, i),
                          c = ge(s, r, o),
                          u = me(l),
                          d = me(c);
                      t.modifiersData[n] = {
                          referenceClippingOffsets: l,
                          popperEscapeOffsets: c,
                          isReferenceHidden: u,
                          hasPopperEscaped: d
                      }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                          "data-popper-reference-hidden": u,
                          "data-popper-escaped": d
                      })
                  }
              }]
          }),
          ye = "tippy-content",
          be = "tippy-backdrop",
          xe = "tippy-arrow",
          Te = "tippy-svg-arrow",
          we = {
              passive: !0,
              capture: !0
          },
          Ee = function() {
              return document.body
          };

      function _e(e, t, n) {
          if (Array.isArray(e)) {
              var i = e[t];
              return null == i ? Array.isArray(n) ? n[t] : n : i
          }
          return e
      }

      function Ne(e, t) {
          var n = {}.toString.call(e);
          return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1
      }

      function Ae(e, t) {
          return "function" == typeof e ? e.apply(void 0, t) : e
      }

      function Ce(e, t) {
          return 0 === t ? e : function(i) {
              clearTimeout(n), n = setTimeout((function() {
                  e(i)
              }), t)
          };
          var n
      }

      function Se(e) {
          return [].concat(e)
      }

      function De(e, t) {
          -1 === e.indexOf(t) && e.push(t)
      }

      function Le(e) {
          return e.split("-")[0]
      }

      function Oe(e) {
          return [].slice.call(e)
      }

      function ke(e) {
          return Object.keys(e).reduce((function(t, n) {
              return void 0 !== e[n] && (t[n] = e[n]), t
          }), {})
      }

      function Re() {
          return document.createElement("div")
      }

      function je(e) {
          return ["Element", "Fragment"].some((function(t) {
              return Ne(e, t)
          }))
      }

      function Ie(e) {
          return Ne(e, "MouseEvent")
      }

      function Pe(e) {
          return !(!e || !e._tippy || e._tippy.reference !== e)
      }

      function Me(e) {
          return je(e) ? [e] : function(e) {
              return Ne(e, "NodeList")
          }(e) ? Oe(e) : Array.isArray(e) ? e : Oe(document.querySelectorAll(e))
      }

      function He(e, t) {
          e.forEach((function(e) {
              e && (e.style.transitionDuration = t + "ms")
          }))
      }

      function $e(e, t) {
          e.forEach((function(e) {
              e && e.setAttribute("data-state", t)
          }))
      }

      function Be(e) {
          var t, n = Se(e)[0];
          return null != n && null != (t = n.ownerDocument) && t.body ? n.ownerDocument : document
      }

      function qe(e, t, n) {
          var i = t + "EventListener";
          ["transitionend", "webkitTransitionEnd"].forEach((function(t) {
              e[i](t, n)
          }))
      }

      function We(e, t) {
          for (var n = t; n;) {
              var i;
              if (e.contains(n)) return !0;
              n = null == n.getRootNode || null == (i = n.getRootNode()) ? void 0 : i.host
          }
          return !1
      }
      var Fe = {
              isTouch: !1
          },
          Ue = 0;

      function Ve() {
          Fe.isTouch || (Fe.isTouch = !0, window.performance && document.addEventListener("mousemove", Ge))
      }

      function Ge() {
          var e = performance.now();
          e - Ue < 20 && (Fe.isTouch = !1, document.removeEventListener("mousemove", Ge)), Ue = e
      }

      function Xe() {
          var e = document.activeElement;
          if (Pe(e)) {
              var t = e._tippy;
              e.blur && !t.state.isVisible && e.blur()
          }
      }
      var ze = !!("undefined" != typeof window && "undefined" != typeof document) && !!window.msCrypto;
      var Ye = {
              animateFill: !1,
              followCursor: !1,
              inlinePositioning: !1,
              sticky: !1
          },
          Je = Object.assign({
              appendTo: Ee,
              aria: {
                  content: "auto",
                  expanded: "auto"
              },
              delay: 0,
              duration: [300, 250],
              getReferenceClientRect: null,
              hideOnClick: !0,
              ignoreAttributes: !1,
              interactive: !1,
              interactiveBorder: 2,
              interactiveDebounce: 0,
              moveTransition: "",
              offset: [0, 10],
              onAfterUpdate: function() {},
              onBeforeUpdate: function() {},
              onCreate: function() {},
              onDestroy: function() {},
              onHidden: function() {},
              onHide: function() {},
              onMount: function() {},
              onShow: function() {},
              onShown: function() {},
              onTrigger: function() {},
              onUntrigger: function() {},
              onClickOutside: function() {},
              placement: "top",
              plugins: [],
              popperOptions: {},
              render: null,
              showOnCreate: !1,
              touch: !0,
              trigger: "mouseenter focus",
              triggerTarget: null
          }, Ye, {
              allowHTML: !1,
              animation: "fade",
              arrow: !0,
              content: "",
              inertia: !1,
              maxWidth: 350,
              role: "tooltip",
              theme: "",
              zIndex: 9999
          }),
          Ke = Object.keys(Je);

      function Qe(e) {
          var t = (e.plugins || []).reduce((function(t, n) {
              var i, r = n.name,
                  o = n.defaultValue;
              r && (t[r] = void 0 !== e[r] ? e[r] : null != (i = Je[r]) ? i : o);
              return t
          }), {});
          return Object.assign({}, e, t)
      }

      function Ze(e, t) {
          var n = Object.assign({}, t, {
              content: Ae(t.content, [e])
          }, t.ignoreAttributes ? {} : function(e, t) {
              return (t ? Object.keys(Qe(Object.assign({}, Je, {
                  plugins: t
              }))) : Ke).reduce((function(t, n) {
                  var i = (e.getAttribute("data-tippy-" + n) || "").trim();
                  if (!i) return t;
                  if ("content" === n) t[n] = i;
                  else try {
                      t[n] = JSON.parse(i)
                  } catch (e) {
                      t[n] = i
                  }
                  return t
              }), {})
          }(e, t.plugins));
          return n.aria = Object.assign({}, Je.aria, n.aria), n.aria = {
              expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
              content: "auto" === n.aria.content ? t.interactive ? null : "describedby" : n.aria.content
          }, n
      }
      var et = function() {
          return "innerHTML"
      };

      function tt(e, t) {
          e[et()] = t
      }

      function nt(e) {
          var t = Re();
          return !0 === e ? t.className = xe : (t.className = Te, je(e) ? t.appendChild(e) : tt(t, e)), t
      }

      function it(e, t) {
          je(t.content) ? (tt(e, ""), e.appendChild(t.content)) : "function" != typeof t.content && (t.allowHTML ? tt(e, t.content) : e.textContent = t.content)
      }

      function rt(e) {
          var t = e.firstElementChild,
              n = Oe(t.children);
          return {
              box: t,
              content: n.find((function(e) {
                  return e.classList.contains(ye)
              })),
              arrow: n.find((function(e) {
                  return e.classList.contains(xe) || e.classList.contains(Te)
              })),
              backdrop: n.find((function(e) {
                  return e.classList.contains(be)
              }))
          }
      }

      function ot(e) {
          var t = Re(),
              n = Re();
          n.className = "tippy-box", n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
          var i = Re();

          function r(n, i) {
              var r = rt(t),
                  o = r.box,
                  a = r.content,
                  s = r.arrow;
              i.theme ? o.setAttribute("data-theme", i.theme) : o.removeAttribute("data-theme"), "string" == typeof i.animation ? o.setAttribute("data-animation", i.animation) : o.removeAttribute("data-animation"), i.inertia ? o.setAttribute("data-inertia", "") : o.removeAttribute("data-inertia"), o.style.maxWidth = "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth, i.role ? o.setAttribute("role", i.role) : o.removeAttribute("role"), n.content === i.content && n.allowHTML === i.allowHTML || it(a, e.props), i.arrow ? s ? n.arrow !== i.arrow && (o.removeChild(s), o.appendChild(nt(i.arrow))) : o.appendChild(nt(i.arrow)) : s && o.removeChild(s)
          }
          return i.className = ye, i.setAttribute("data-state", "hidden"), it(i, e.props), t.appendChild(n), n.appendChild(i), r(e.props, e.props), {
              popper: t,
              onUpdate: r
          }
      }
      ot.$$tippy = !0;
      var at = 1,
          st = [],
          lt = [];

      function ct(e, t) {
          var n, i, r, o, a, s, l, c, u = Ze(e, Object.assign({}, Je, Qe(ke(t)))),
              d = !1,
              f = !1,
              p = !1,
              h = !1,
              g = [],
              m = Ce(X, u.interactiveDebounce),
              v = at++,
              y = (c = u.plugins).filter((function(e, t) {
                  return c.indexOf(e) === t
              })),
              b = {
                  id: v,
                  reference: e,
                  popper: Re(),
                  popperInstance: null,
                  props: u,
                  state: {
                      isEnabled: !0,
                      isVisible: !1,
                      isDestroyed: !1,
                      isMounted: !1,
                      isShown: !1
                  },
                  plugins: y,
                  clearDelayTimeouts: function() {
                      clearTimeout(n), clearTimeout(i), cancelAnimationFrame(r)
                  },
                  setProps: function(t) {
                      0;
                      if (b.state.isDestroyed) return;
                      R("onBeforeUpdate", [b, t]), V();
                      var n = b.props,
                          i = Ze(e, Object.assign({}, n, ke(t), {
                              ignoreAttributes: !0
                          }));
                      b.props = i, U(), n.interactiveDebounce !== i.interactiveDebounce && (P(), m = Ce(X, i.interactiveDebounce));
                      n.triggerTarget && !i.triggerTarget ? Se(n.triggerTarget).forEach((function(e) {
                          e.removeAttribute("aria-expanded")
                      })) : i.triggerTarget && e.removeAttribute("aria-expanded");
                      I(), k(), w && w(n, i);
                      b.popperInstance && (K(), Z().forEach((function(e) {
                          requestAnimationFrame(e._tippy.popperInstance.forceUpdate)
                      })));
                      R("onAfterUpdate", [b, t])
                  },
                  setContent: function(e) {
                      b.setProps({
                          content: e
                      })
                  },
                  show: function() {
                      0;
                      var e = b.state.isVisible,
                          t = b.state.isDestroyed,
                          n = !b.state.isEnabled,
                          i = Fe.isTouch && !b.props.touch,
                          r = _e(b.props.duration, 0, Je.duration);
                      if (e || t || n || i) return;
                      if (S().hasAttribute("disabled")) return;
                      if (R("onShow", [b], !1), !1 === b.props.onShow(b)) return;
                      b.state.isVisible = !0, C() && (T.style.visibility = "visible");
                      k(), B(), b.state.isMounted || (T.style.transition = "none");
                      if (C()) {
                          var o = L();
                          He([o.box, o.content], 0)
                      }
                      s = function() {
                              var e;
                              if (b.state.isVisible && !h) {
                                  if (h = !0, T.offsetHeight, T.style.transition = b.props.moveTransition, C() && b.props.animation) {
                                      var t = L(),
                                          n = t.box,
                                          i = t.content;
                                      He([n, i], r), $e([n, i], "visible")
                                  }
                                  j(), I(), De(lt, b), null == (e = b.popperInstance) || e.forceUpdate(), R("onMount", [b]), b.props.animation && C() && function(e, t) {
                                      W(e, t)
                                  }(r, (function() {
                                      b.state.isShown = !0, R("onShown", [b])
                                  }))
                              }
                          },
                          function() {
                              var e, t = b.props.appendTo,
                                  n = S();
                              e = b.props.interactive && t === Ee || "parent" === t ? n.parentNode : Ae(t, [n]);
                              e.contains(T) || e.appendChild(T);
                              b.state.isMounted = !0, K(), !1
                          }()
                  },
                  hide: function() {
                      0;
                      var e = !b.state.isVisible,
                          t = b.state.isDestroyed,
                          n = !b.state.isEnabled,
                          i = _e(b.props.duration, 1, Je.duration);
                      if (e || t || n) return;
                      if (R("onHide", [b], !1), !1 === b.props.onHide(b)) return;
                      b.state.isVisible = !1, b.state.isShown = !1, h = !1, d = !1, C() && (T.style.visibility = "hidden");
                      if (P(), q(), k(!0), C()) {
                          var r = L(),
                              o = r.box,
                              a = r.content;
                          b.props.animation && (He([o, a], i), $e([o, a], "hidden"))
                      }
                      j(), I(), b.props.animation ? C() && function(e, t) {
                          W(e, (function() {
                              !b.state.isVisible && T.parentNode && T.parentNode.contains(T) && t()
                          }))
                      }(i, b.unmount) : b.unmount()
                  },
                  hideWithInteractivity: function(e) {
                      0;
                      D().addEventListener("mousemove", m), De(st, m), m(e)
                  },
                  enable: function() {
                      b.state.isEnabled = !0
                  },
                  disable: function() {
                      b.hide(), b.state.isEnabled = !1
                  },
                  unmount: function() {
                      0;
                      b.state.isVisible && b.hide();
                      if (!b.state.isMounted) return;
                      Q(), Z().forEach((function(e) {
                          e._tippy.unmount()
                      })), T.parentNode && T.parentNode.removeChild(T);
                      lt = lt.filter((function(e) {
                          return e !== b
                      })), b.state.isMounted = !1, R("onHidden", [b])
                  },
                  destroy: function() {
                      0;
                      if (b.state.isDestroyed) return;
                      b.clearDelayTimeouts(), b.unmount(), V(), delete e._tippy, b.state.isDestroyed = !0, R("onDestroy", [b])
                  }
              };
          if (!u.render) return b;
          var x = u.render(b),
              T = x.popper,
              w = x.onUpdate;
          T.setAttribute("data-tippy-root", ""), T.id = "tippy-" + b.id, b.popper = T, e._tippy = b, T._tippy = b;
          var E = y.map((function(e) {
                  return e.fn(b)
              })),
              _ = e.hasAttribute("aria-expanded");
          return U(), I(), k(), R("onCreate", [b]), u.showOnCreate && ee(), T.addEventListener("mouseenter", (function() {
              b.props.interactive && b.state.isVisible && b.clearDelayTimeouts()
          })), T.addEventListener("mouseleave", (function() {
              b.props.interactive && b.props.trigger.indexOf("mouseenter") >= 0 && D().addEventListener("mousemove", m)
          })), b;

          function N() {
              var e = b.props.touch;
              return Array.isArray(e) ? e : [e, 0]
          }

          function A() {
              return "hold" === N()[0]
          }

          function C() {
              var e;
              return !(null == (e = b.props.render) || !e.$$tippy)
          }

          function S() {
              return l || e
          }

          function D() {
              var e = S().parentNode;
              return e ? Be(e) : document
          }

          function L() {
              return rt(T)
          }

          function O(e) {
              return b.state.isMounted && !b.state.isVisible || Fe.isTouch || o && "focus" === o.type ? 0 : _e(b.props.delay, e ? 0 : 1, Je.delay)
          }

          function k(e) {
              void 0 === e && (e = !1), T.style.pointerEvents = b.props.interactive && !e ? "" : "none", T.style.zIndex = "" + b.props.zIndex
          }

          function R(e, t, n) {
              var i;
              (void 0 === n && (n = !0), E.forEach((function(n) {
                  n[e] && n[e].apply(n, t)
              })), n) && (i = b.props)[e].apply(i, t)
          }

          function j() {
              var t = b.props.aria;
              if (t.content) {
                  var n = "aria-" + t.content,
                      i = T.id;
                  Se(b.props.triggerTarget || e).forEach((function(e) {
                      var t = e.getAttribute(n);
                      if (b.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
                      else {
                          var r = t && t.replace(i, "").trim();
                          r ? e.setAttribute(n, r) : e.removeAttribute(n)
                      }
                  }))
              }
          }

          function I() {
              !_ && b.props.aria.expanded && Se(b.props.triggerTarget || e).forEach((function(e) {
                  b.props.interactive ? e.setAttribute("aria-expanded", b.state.isVisible && e === S() ? "true" : "false") : e.removeAttribute("aria-expanded")
              }))
          }

          function P() {
              D().removeEventListener("mousemove", m), st = st.filter((function(e) {
                  return e !== m
              }))
          }

          function M(t) {
              if (!Fe.isTouch || !p && "mousedown" !== t.type) {
                  var n = t.composedPath && t.composedPath()[0] || t.target;
                  if (!b.props.interactive || !We(T, n)) {
                      if (Se(b.props.triggerTarget || e).some((function(e) {
                              return We(e, n)
                          }))) {
                          if (Fe.isTouch) return;
                          if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0) return
                      } else R("onClickOutside", [b, t]);
                      !0 === b.props.hideOnClick && (b.clearDelayTimeouts(), b.hide(), f = !0, setTimeout((function() {
                          f = !1
                      })), b.state.isMounted || q())
                  }
              }
          }

          function H() {
              p = !0
          }

          function $() {
              p = !1
          }

          function B() {
              var e = D();
              e.addEventListener("mousedown", M, !0), e.addEventListener("touchend", M, we), e.addEventListener("touchstart", $, we), e.addEventListener("touchmove", H, we)
          }

          function q() {
              var e = D();
              e.removeEventListener("mousedown", M, !0), e.removeEventListener("touchend", M, we), e.removeEventListener("touchstart", $, we), e.removeEventListener("touchmove", H, we)
          }

          function W(e, t) {
              var n = L().box;

              function i(e) {
                  e.target === n && (qe(n, "remove", i), t())
              }
              if (0 === e) return t();
              qe(n, "remove", a), qe(n, "add", i), a = i
          }

          function F(t, n, i) {
              void 0 === i && (i = !1), Se(b.props.triggerTarget || e).forEach((function(e) {
                  e.addEventListener(t, n, i), g.push({
                      node: e,
                      eventType: t,
                      handler: n,
                      options: i
                  })
              }))
          }

          function U() {
              var e;
              A() && (F("touchstart", G, {
                  passive: !0
              }), F("touchend", z, {
                  passive: !0
              })), (e = b.props.trigger, e.split(/\s+/).filter(Boolean)).forEach((function(e) {
                  if ("manual" !== e) switch (F(e, G), e) {
                      case "mouseenter":
                          F("mouseleave", z);
                          break;
                      case "focus":
                          F(ze ? "focusout" : "blur", Y);
                          break;
                      case "focusin":
                          F("focusout", Y)
                  }
              }))
          }

          function V() {
              g.forEach((function(e) {
                  var t = e.node,
                      n = e.eventType,
                      i = e.handler,
                      r = e.options;
                  t.removeEventListener(n, i, r)
              })), g = []
          }

          function G(e) {
              var t, n = !1;
              if (b.state.isEnabled && !J(e) && !f) {
                  var i = "focus" === (null == (t = o) ? void 0 : t.type);
                  o = e, l = e.currentTarget, I(), !b.state.isVisible && Ie(e) && st.forEach((function(t) {
                      return t(e)
                  })), "click" === e.type && (b.props.trigger.indexOf("mouseenter") < 0 || d) && !1 !== b.props.hideOnClick && b.state.isVisible ? n = !0 : ee(e), "click" === e.type && (d = !n), n && !i && te(e)
              }
          }

          function X(e) {
              var t = e.target,
                  n = S().contains(t) || T.contains(t);
              if ("mousemove" !== e.type || !n) {
                  var i = Z().concat(T).map((function(e) {
                      var t, n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
                      return n ? {
                          popperRect: e.getBoundingClientRect(),
                          popperState: n,
                          props: u
                      } : null
                  })).filter(Boolean);
                  (function(e, t) {
                      var n = t.clientX,
                          i = t.clientY;
                      return e.every((function(e) {
                          var t = e.popperRect,
                              r = e.popperState,
                              o = e.props.interactiveBorder,
                              a = Le(r.placement),
                              s = r.modifiersData.offset;
                          if (!s) return !0;
                          var l = "bottom" === a ? s.top.y : 0,
                              c = "top" === a ? s.bottom.y : 0,
                              u = "right" === a ? s.left.x : 0,
                              d = "left" === a ? s.right.x : 0,
                              f = t.top - i + l > o,
                              p = i - t.bottom - c > o,
                              h = t.left - n + u > o,
                              g = n - t.right - d > o;
                          return f || p || h || g
                      }))
                  })(i, e) && (P(), te(e))
              }
          }

          function z(e) {
              J(e) || b.props.trigger.indexOf("click") >= 0 && d || (b.props.interactive ? b.hideWithInteractivity(e) : te(e))
          }

          function Y(e) {
              b.props.trigger.indexOf("focusin") < 0 && e.target !== S() || b.props.interactive && e.relatedTarget && T.contains(e.relatedTarget) || te(e)
          }

          function J(e) {
              return !!Fe.isTouch && A() !== e.type.indexOf("touch") >= 0
          }

          function K() {
              Q();
              var t = b.props,
                  n = t.popperOptions,
                  i = t.placement,
                  r = t.offset,
                  o = t.getReferenceClientRect,
                  a = t.moveTransition,
                  l = C() ? rt(T).arrow : null,
                  c = o ? {
                      getBoundingClientRect: o,
                      contextElement: o.contextElement || S()
                  } : e,
                  u = {
                      name: "$$tippy",
                      enabled: !0,
                      phase: "beforeWrite",
                      requires: ["computeStyles"],
                      fn: function(e) {
                          var t = e.state;
                          if (C()) {
                              var n = L().box;
                              ["placement", "reference-hidden", "escaped"].forEach((function(e) {
                                  "placement" === e ? n.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? n.setAttribute("data-" + e, "") : n.removeAttribute("data-" + e)
                              })), t.attributes.popper = {}
                          }
                      }
                  },
                  d = [{
                      name: "offset",
                      options: {
                          offset: r
                      }
                  }, {
                      name: "preventOverflow",
                      options: {
                          padding: {
                              top: 2,
                              bottom: 2,
                              left: 5,
                              right: 5
                          }
                      }
                  }, {
                      name: "flip",
                      options: {
                          padding: 5
                      }
                  }, {
                      name: "computeStyles",
                      options: {
                          adaptive: !a
                      }
                  }, u];
              C() && l && d.push({
                  name: "arrow",
                  options: {
                      element: l,
                      padding: 3
                  }
              }), d.push.apply(d, (null == n ? void 0 : n.modifiers) || []), b.popperInstance = ve(c, T, Object.assign({}, n, {
                  placement: i,
                  onFirstUpdate: s,
                  modifiers: d
              }))
          }

          function Q() {
              b.popperInstance && (b.popperInstance.destroy(), b.popperInstance = null)
          }

          function Z() {
              return Oe(T.querySelectorAll("[data-tippy-root]"))
          }

          function ee(e) {
              b.clearDelayTimeouts(), e && R("onTrigger", [b, e]), B();
              var t = O(!0),
                  i = N(),
                  r = i[0],
                  o = i[1];
              Fe.isTouch && "hold" === r && o && (t = o), t ? n = setTimeout((function() {
                  b.show()
              }), t) : b.show()
          }

          function te(e) {
              if (b.clearDelayTimeouts(), R("onUntrigger", [b, e]), b.state.isVisible) {
                  if (!(b.props.trigger.indexOf("mouseenter") >= 0 && b.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0 && d)) {
                      var t = O(!1);
                      t ? i = setTimeout((function() {
                          b.state.isVisible && b.hide()
                      }), t) : r = requestAnimationFrame((function() {
                          b.hide()
                      }))
                  }
              } else q()
          }
      }

      function ut(e, t) {
          void 0 === t && (t = {});
          var n = Je.plugins.concat(t.plugins || []);
          document.addEventListener("touchstart", Ve, we), window.addEventListener("blur", Xe);
          var i = Object.assign({}, t, {
                  plugins: n
              }),
              r = Me(e).reduce((function(e, t) {
                  var n = t && ct(t, i);
                  return n && e.push(n), e
              }), []);
          return je(e) ? r[0] : r
      }
      ut.defaultProps = Je, ut.setDefaultProps = function(e) {
          Object.keys(e).forEach((function(t) {
              Je[t] = e[t]
          }))
      }, ut.currentInput = Fe;
      Object.assign({}, Z, {
          effect: function(e) {
              var t = e.state,
                  n = {
                      popper: {
                          position: t.options.strategy,
                          left: "0",
                          top: "0",
                          margin: "0"
                      },
                      arrow: {
                          position: "absolute"
                      },
                      reference: {}
                  };
              Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow)
          }
      });
      ut.setDefaultProps({
          render: ot
      });
      const dt = ut;
      var ft = n(6107);
      /*!
       *                      2023
       * All Rights Reserved for Oziku Technologies LLC
       *            https://www.oziku.tech/
       */
      async function pt(...e) {
          try {
              return await new Promise((t => chrome.storage.local.get(e.flat(), t)))
          } catch (e) {
              return {}
          }
      }
      async function ht(e) {
          try {
              await new Promise((t => chrome.storage.local.set(e, (() => {
                  t()
              }))))
          } catch (e) {}
      }

      function gt(e) {
          return new Promise((t => setTimeout(t, e)))
      }
      async function mt(e) {
          return new Promise((t => {
              chrome.runtime.sendMessage(e, (e => {
                  chrome.runtime.lastError;
                  t(e || {})
              }))
          }))
      }
      /*!
       *                      2023
       * All Rights Reserved for Oziku Technologies LLC
       *            https://www.oziku.tech/
       */
      chrome.i18n.getMessage("speed_normal"), chrome.i18n.getMessage("speed_slow"), chrome.i18n.getMessage("speed_fast"), chrome.i18n.getMessage("align_left"), chrome.i18n.getMessage("align_center"), chrome.i18n.getMessage("align_right"), chrome.i18n.getMessage("align_justify"), chrome.i18n.getMessage("light_contrast"), chrome.i18n.getMessage("dark_contrast"), chrome.i18n.getMessage("invert_colors"), chrome.i18n.getMessage("low_saturation"), chrome.i18n.getMessage("high_saturation"), chrome.i18n.getMessage("desaturate");
      const vt = ["#000000", "#e02b20", "#e09900", "#eef002", "#7cda24", "#0671c3", "#8300e9"];
      async function yt(e, t, n, i) {
          const {
              config: r = {}
          } = await pt(["config"]);
          !i && r[e] === t && n && (t = ""), r[e] = i ? !r[e] : t, await ht({
              config: r
          })
      }

      function bt(e, n) {
          return e = t()(e), n = t()(n), !!e.is(n) || e.parents().index(n) >= 0
      }

      function xt(e, n = !1) {
          try {
              (n ? t()(e).last() : t()(e))[0].scrollIntoView({
                  behavior: "smooth",
                  block: "nearest"
              })
          } catch (e) {}
      }
      /*!
       * MIT License
       * Copyright (c) 2016 Hai Phan
       *
       * https://github.com/ken107/read-aloud/blob/master/LICENSE
       */
      const Tt = /(?:\s*\r?\n\s*){2,}/;

      function wt() {
          var e = "h1, h2, h3, h4, h5, h6, p, a[href], select, textarea, button, label, audio, video, dialog, embed, menu, nav, noframes, noscript, object, script, style, svg, aside, footer, #footer, .no-read-aloud",
              n = function(e) {
                  return 3 == e.nodeType && e.nodeValue.trim().length >= 3
              },
              i = function(e) {
                  return 1 == e.nodeType && t()(e).is("p:visible") && _t(e).length >= 50
              },
              r = function(e) {
                  return Et(e, n) && _t(e).length >= 50
              },
              o = function(e) {
                  return Et(e, i)
              },
              a = function(n) {
                  var i = t()(n).children(":not(" + e + ")").get();
                  return i.some(r) || i.some(o) || i.some(a)
              },
              s = function(e, n) {
                  n && t()(e).data("read-aloud-multi-block", !0), c.push(e)
              },
              l = function() {
                  if (t()(this).is("dl")) s(this);
                  else if (t()(this).is("ol, ul")) {
                      var n = t()(this).children().get();
                      n.some(r) ? s(this) : (n.some(o) || n.some(a)) && s(this, !0)
                  } else if (t()(this).is("tbody")) {
                      var i = t()(this).children();
                      i.length > 3 || i.eq(0).children().length > 3 ? i.get().some(a) && s(this, !0) : i.each(l)
                  } else r(this) ? s(this) : o(this) ? s(this, !0) : t()(this).children(":not(" + e + ")").each(l)
              },
              c = [];
          return l.call(document.body), c.filter((function(e) {
              return t()(e).is(":visible") && t()(e).offset().left >= 0
          }))
      }

      function Et(e, t) {
          for (var n = e.firstChild; n;) {
              if (t(n)) return !0;
              n = n.nextSibling
          }
          return !1
      }

      function _t(e) {
          var t = e.innerText;
          return t ? t.trim() : ""
      }

      function Nt(e, n) {
          for (var i = [], r = At(t()(e).find("h1, h2, h3, h4, h5, h6, p").filter(":visible").get(0)), o = Ct(e, !0); o && o != n;) {
              var a = t()(o).is("select, textarea, button, label, audio, video, dialog, embed, menu, nav, noframes, noscript, object, script, style, svg, aside, footer, #footer, .no-read-aloud");
              if (!a && 1 == o.nodeType && t()(o).is(":visible")) {
                  var s = At(o);
                  s < r && (i.push(o), r = s)
              }
              o = Ct(o, a)
          }
          return i.reverse()
      }

      function At(e) {
          var t = e && /^H(\d)$/i.exec(e.tagName);
          return t ? Number(t[1]) : 100
      }

      function Ct(e, n) {
          return t()(e).is("body") ? null : 1 == e.nodeType && !n && e.lastChild ? e.lastChild : e.previousSibling ? e.previousSibling : Ct(e.parentNode, !0)
      }

      function St(e, n) {
          var i = t()(e).find(":visible").filter(Dt).hide();
          let r;
          return t()(e).find("ol, ul").addBack("ol, ul").each(Lt), r = t()(e).data("read-aloud-multi-block") ? t()(e).children(":visible").get().map(((e, t) => Ot(e, n, t))) : Ot(e, n, 0).split(Tt), t()(e).find(".read-aloud-numbering").remove(), i.show(), r
      }

      function Dt() {
          var e = t()(this).css("float"),
              n = t()(this).css("position");
          return t()(this).is(self.ignoreTags) || t()(this).is("sup") || "right" == e || "fixed" == n
      }

      function Lt() {
          var e = t()(this).children(),
              n = e.length ? _t(e.get(0)) : null;
          n && !n.match(/^[(]?(\d|[a-zA-Z][).])/) && e.each((function(e) {
              t()("<span>").addClass("read-aloud-numbering").text(e + 1 + ". ").prependTo(this)
          }))
      }

      function Ot(e, n, i) {
          const r = function(e) {
              return e.replace(/(\w)(\s*?\r?\n)/g, "$1.$2")
          }(e.innerText).trim();
          return t()(e).attr("data-read-aloud-highlight-index", `${n}-${i}`), r
      }
      /*!
       *                      2023
       * All Rights Reserved for Oziku Technologies LLC
       *            https://www.oziku.tech/
       */
      class kt {
          #e;
          #t;
          constructor() {
              this.#e = window?.speechSynthesis, this.#t = []
          }
          isTtsAvailable() {
              return void 0 !== this.#e
          }
          isSpeaking() {
              return !!this.#e?.speaking
          }
          isPaused() {
              return !!this.#e?.paused
          }
          resume() {
              this.#e?.resume()
          }
          speak(e) {
              this.#t.push(e), this.#e?.speak(e)
          }
          pause() {
              this.#e?.pause()
          }
          cancel(e) {
              e && this.#t.length > 0 && (this.#t[this.#t.length - 1].onend = this.#t[this.#t.length - 1].onerror = void 0), this.#e?.cancel()
          }
      }

      function Rt(e, t, n) {
          var i, r = n || {},
              o = r.noTrailing,
              a = void 0 !== o && o,
              s = r.noLeading,
              l = void 0 !== s && s,
              c = r.debounceMode,
              u = void 0 === c ? void 0 : c,
              d = !1,
              f = 0;

          function p() {
              i && clearTimeout(i)
          }

          function h() {
              for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
              var s = this,
                  c = Date.now() - f;

              function h() {
                  f = Date.now(), t.apply(s, r)
              }

              function g() {
                  i = void 0
              }
              d || (l || !u || i || h(), p(), void 0 === u && c > e ? l ? (f = Date.now(), a || (i = setTimeout(u ? g : h, e))) : h() : !0 !== a && (i = setTimeout(u ? g : h, void 0 === u ? e - c : e)))
          }
          return h.cancel = function(e) {
              var t = (e || {}).upcomingOnly,
                  n = void 0 !== t && t;
              p(), d = !n
          }, h
      }

      function jt(e, n, i, r, o) {
          if (!e) return;
          let a = 0,
              s = 0,
              l = 0,
              c = 0;

          function u(i) {
              i.preventDefault();
              const r = i.clientX,
                  u = i.clientY;
              if (r > 20 && u > 20 && r < window.innerWidth - 20 && u < window.innerHeight - 20 && l - r != 0) {
                  a = l - r, s = c - u, l = r, c = u;
                  const i = e.offsetTop - s + "px";
                  let d = parseInt(o()) + a + "px";
                  parseInt(d) > window.innerWidth - 20 && (d = window.innerWidth - 20 + "px"), t()(e).data("drag-pos-top", i), t()(e).data("drag-pos-right", d), n && n(t()(e).data("drag-pos-top"), t()(e).data("drag-pos-right")), t()(e).data("start-pos-top") || (t()(e).data("start-pos-top", t()(e).data("drag-pos-top")), t()(e).data("start-pos-right", t()(e).data("drag-pos-right")))
              }
          }

          function d(n) {
              n.preventDefault(), document.onmouseup = null, document.onmousemove = null, i && t()(e).data("drag-pos-top") && t()(e).data("drag-pos-right") && (Math.abs(parseInt(t()(e).data("drag-pos-top")) - parseInt(t()(e).data("start-pos-top"))) > 3 || Math.abs(parseInt(t()(e).data("drag-pos-right")) - parseInt(t()(e).data("start-pos-right"))) > 3) ? i(t()(e).data("drag-pos-top"), t()(e).data("drag-pos-right")) : r && r(n)
          }
          e.onmousedown = function(n) {
              n.preventDefault(), l = n.clientX, c = n.clientY, t()(e).removeData("drag-pos-top", "drag-pos-right"), document.onmouseup = d, document.onmousemove = u, t()(e).data("start-pos-top", document.documentElement.style.getPropertyValue("--widget-top")), t()(e).data("start-pos-right", document.documentElement.style.getPropertyValue("--widget-right"))
          }
      }
      /*!
       *                      2023
       * All Rights Reserved for Oziku Technologies LLC
       *            https://www.oziku.tech/
       */
      (e => {
          const {
              document: n,
              chrome: i,
              window: r
          } = e;
          if (null == n.doctype || "HTML" != n.documentElement.nodeName || r.innerWidth <= 2 || r.innerHeight <= 2) return;
          const {
              storage: o,
              i18n: a,
              runtime: s
          } = i, l = new kt;
          let c, u, d = !1,
              f = !1,
              p = !1,
              h = !1;
          const g = s.id,
              m = "tint-f3a23x80",
              v = "ruler-f3a23x80",
              y = `\n    <div id="${v}"></div>\n  `,
              b = "ruler-top-f3a23x80",
              x = `\n    <div id="${b}"></div>\n  `,
              T = "ruler-bottom-f3a23x80",
              w = `\n    <div id="${T}"></div>\n  `;
          let E = 0,
              _ = [],
              N = 0,
              A = 0;
          const C = s.getURL("../ui/sidebar.html"),
              S = "sidebar-iframe-f3a23x80",
              D = "widget-f3a23x80",
              L = `\n    <div>\n      <iframe id="${S}" src="${C}"></iframe>\n\n      <div id="${D}" style="--widget-display:none;">\n        <div class="reader-view toggle-btn widget-icon collapsable"></div>\n        <div class="dictionary toggle-btn widget-icon collapsable"></div>\n        <div class="mute-sounds toggle-btn widget-icon collapsable"></div>\n        <div class="tts-highlight toggle-btn widget-icon collapsable"></div>\n        <div class="tts-previous tts-btn widget-icon collapsable"></div>\n        <div class="tts-play tts-btn widget-icon collapsable"></div>\n        <div class="tts-pause tts-btn widget-icon collapsable"></div>\n        <div class="tts-stop tts-btn widget-icon collapsable"></div>\n        <div class="tts-next tts-btn widget-icon collapsable"></div>\n        <div class="main-icon widget-icon"></div>\n      </div>\n\n      <div class="backgroud-overlay"></div>\n\n      <div id="reader-view">\n        <div class="bg">\n          <h2 class="title"></h2>\n          <pre class="content"></pre>\n        </div>\n        <div class="close-btn"></div>\n      </div>\n    </div>\n  `,
              O = "tooltip-tag-f3a23x80",
              k = `\n  <div id="${O}"></div>\n  `;

          function R() {
              c && async function() {
                  const {
                      widgetIconTop: e,
                      widgetIconRight: i,
                      status: o = !0,
                      config: a = {},
                      showWidget: l = !0
                  } = await pt(["widgetIconTop", "widgetIconRight", "status", "config", "showWidget"]);
                  e && i ? (n.documentElement.style.setProperty("--widget-top", e), n.documentElement.style.setProperty("--widget-right", i)) : n.documentElement.style.setProperty("--widget-bottom", "20px");
                  let u;
                  o ? u = a : (u = {}, W(!1), F(!1));
                  const {
                      fontFamily: d = "",
                      ttsHighlight: f = !1,
                      boldText: p = !1,
                      italicText: g = !1,
                      fontColor: y = "",
                      lineSpacing: x = "",
                      wordSpacing: w = "",
                      letterSpacing: _ = "",
                      screenTintColor: N = "",
                      screenTintBrightness: A = 55,
                      maskMode: C,
                      maskHeight: S = 75,
                      maskBrightness: L = 30,
                      maskColor: O,
                      scaleValue: k = "",
                      alignText: R = "",
                      pauseAnim: j = !1,
                      hideImages: I = !1,
                      biggerCursor: P = "",
                      contrast: M = "",
                      saturation: H = "",
                      highlightLinks: B = !1,
                      muteSounds: q = !1,
                      dictionary: U = !1
                  } = u, V = O || vt[0];
                  h = U, t()(`#${D} > .dictionary`).toggleClass("active", h), t()(`#${D} > .mute-sounds`).toggleClass("active", q),
                      function(e) {
                          if (!c) return;
                          for (; c.cssRules.length > 0;) c.deleteRule(0);
                          t()("html").removeClass(`${m}`), n.documentElement.style.zoom = "initial", e && K(!1), e && Q(!1), t()(".has-bg-img").removeClass("has-bg-img")
                      }(!0), t()("body").toggleClass("tts-highlight-status", f), t()(`#${D} > .tts-highlight`).toggleClass("active", f), f && xt(t()(".read-aloud-highlight"));
                  c.insertRule(`* {\n      ${d?`font-family: ${d}, OpenDyslexic !important;`:""}\n      ${p?"font-weight: bold !important;":""}\n      ${g?"font-style: italic !important;":""}\n      ${y?`color: ${y} !important;`:""}\n      ${x?`line-height: ${x} !important;`:""}\n      ${w?`word-spacing: ${w} !important;`:""}\n      ${_?`letter-spacing: ${_} !important;`:""}\n    }`);
                  let G, X, z = "",
                      Y = "";
                  switch (M) {
                      case "light":
                          z = "background-color: white !important; color: black !important;";
                          break;
                      case "dark":
                          z = "background-color: black !important; color: white !important;";
                          break;
                      case "invert":
                          z = "invert(100%)"
                  }
                  switch (H) {
                      case "low":
                          Y = "saturate(0.5)";
                          break;
                      case "high":
                          Y = "saturate(3)";
                          break;
                      case "desaturate":
                          Y = "saturate(0)"
                  }(z || Y) && (c.insertRule(`html {\n        filter: ${"invert"===M?z:""} ${Y} !important;\n      }`), c.insertRule(`*:not(img):not(iframe):not(video):not(audio):not(#${v}):not(#${b}):not(#${T}):not(.${m}) {\n        ${"invert"!==M?z:""}\n      }`));
                  if (n.documentElement.style.removeProperty("--adhd-tint-color"), N) {
                      const e = Math.round(2.55 * A).toString(16);
                      n.documentElement.style.setProperty("--adhd-tint-color", `${N}${e}`), t()("html").addClass(`${m}`), c.insertRule(`html.${m}:after {\n        background: var(--adhd-tint-color, #ffa500${e}) !important;\n      }`)
                  }
                  "reversed" === C ? K(S, L) : "normal" === C && Q(S, L);
                  V ? n.documentElement.style.setProperty("--adhd-ruler-color", V + Math.floor(L / 100 * 256).toString(16)) : n.documentElement.style.removeProperty("--adhd-ruler-color");
                  k ? n.documentElement.style.setProperty("zoom", k) : n.documentElement.style.removeProperty("zoom");
                  R && c.insertRule(`\n        * {\n          text-align: ${R} !important;\n        }\n      `);
                  $(E), t()(`#${D}`).css("--widget-display", o && l ? "flex" : "none"), j && c.insertRule("\n        * {\n          -webkit-animation-play-state: paused !important;\n          -moz-animation-play-state: paused !important;\n          -o-animation-play-state: paused; !important;\n          animation-play-state: paused !important;\n\n          transition-timing-function: step-end !important;\n          transition-duration: 0s !important;\n          animation-timing-function: step-end !important;\n          animation-iteration-count: 1 !important;\n          animation-duration: 0s !important;\n        }\n      ");
                  I && (c.insertRule(`\n        picture,img,canvas,svg,video,.html5-video-player,.has-bg-img:not(#${D} *) {\n          opacity: 0 !important;\n        }\n      `), t()("*").filter(((e, t) => !!t && (t.currentStyle ? "none" !== t.currentStyle.backgroundImage : r.getComputedStyle ? "none" !== n.defaultView.getComputedStyle(t, null).getPropertyValue("background-image") : void 0))).each(((e, n) => {
                      const i = t()(n);
                      i.text() || i.html() || i.addClass("has-bg-img")
                  })));
                  "black" === P ? (G = s.getURL("assets/cursors/cursor_black.svg"), X = s.getURL("assets/cursors/cursor_black_select.svg")) : "white" === P && (G = s.getURL("assets/cursors/cursor_white.svg"), X = s.getURL("assets/cursors/cursor_white_select.svg"));
                  G && X && (c.insertRule(`* {\n          cursor: url("${G}"), auto !important;\n        }`), c.insertRule(`a, a *, button, #${D} {\n          cursor: url("${X}") 24 0, auto !important;\n        }`));
                  B && c.insertRule("a {\n        text-decoration: underline !important;\n        border: 1px solid black !important;\n        border-radius: 4px;\n      }")
              }()
          }

          function j() {
              n.documentElement.style.removeProperty("--widget-bottom")
          }

          function I(e, t) {
              n.documentElement.style.setProperty("--widget-top", e), n.documentElement.style.setProperty("--widget-right", t), j()
          }

          function P(e, t) {
              ht({
                  widgetIconTop: e,
                  widgetIconRight: t
              }), j()
          }

          function M(e) {
              const n = t()(e.target);
              n.hasClass("main-icon") ? t()(`#${S}`).addClass("showing") : n.hasClass("tts-highlight") ? yt("ttsHighlight", void 0, void 0, !0) : n.hasClass("tts-previous") ? z() : n.hasClass("tts-play") ? V() : n.hasClass("tts-pause") ? X() : n.hasClass("tts-stop") ? F(!1) : n.hasClass("tts-next") ? Y() : n.hasClass("reader-view") ? W(!f) : n.hasClass("dictionary") ? yt("dictionary", void 0, void 0, !0) : n.hasClass("mute-sounds") && yt("muteSounds", void 0, void 0, !0)
          }

          function H(e) {
              e.clientY !== E && (E = e.clientY, $(e.clientY))
          }

          function $(e) {
              const i = Math.min(n.documentElement.scrollHeight, n.documentElement.offsetHeight, n.documentElement.clientHeight);
              let r = e,
                  o = i;
              if (!isNaN(parseInt(n.documentElement.style.zoom)) && "100%" !== n.documentElement.style.zoom && (r = Math.round(100 * e / parseInt(n.documentElement.style.zoom)), o = Math.round(100 * o / parseInt(n.documentElement.style.zoom))), n.getElementById(v)) {
                  const a = n.getElementById(v);
                  let s = Math.max(i, o);
                  if (n.location.href.match(/google.com\/search/) && t()("html").css("zoom") && (s = Math.min(i, o)), Math.max(e, r) < a.offsetHeight / 2) a.style.top = 0;
                  else if (r > s - a.offsetHeight / 2) {
                      const e = s - a.offsetHeight;
                      a.style.top = `${e}px`
                  } else {
                      const e = Math.round(r - a.offsetHeight / 2);
                      a.style.top = Math.max(e, 0) + "px"
                  }
              } else if (n.getElementById(b)) {
                  const a = n.getElementById(b),
                      s = n.getElementById(T),
                      l = parseInt(a.dataset.rulerValue);
                  let c;
                  c = n.location.href.match(/google.com\/search/) && t()("html").css("zoom") ? Math.min(i, o) : Math.max(i, o), Math.max(e, r) < l / 2 ? (a.style.height = "0px", s.style.height = c - l + "px") : r > c - l / 2 ? (s.style.height = "0px", a.style.height = c - l + "px") : (a.style.height = Math.floor(r - l / 2) + "px", s.style.height = Math.min(c - r - l / 2, c - l) + "px")
              }
          }
          async function B(e) {
              if (R(), void 0 !== e.status) {
                  (e.status.newValue ?? !0) || (W(!1), await F(!1), X())
              } else void 0 !== e.config && e.config.newValue?.readingSpeed !== e.config.oldValue?.readingSpeed && (l.isPaused() ? J(!1) : l.isSpeaking() && (z(), U(), gt(50).then((() => {
                  Y()
              }))))
          }

          function q(e, t, n) {
              "closeSidebar" === e.m ? (ee(), n()) : "getReaderViewStatus" === e.m ? n({
                  status: f
              }) : "updateReaderView" === e.m ? (n({
                  success: !0
              }), W(e.status)) : "getTextToSpeechStatus" === e.m ? n({
                  status: p
              }) : "updateTextToSpeech" === e.m && (F(e.status), n())
          }

          function W(e) {
              if (e) {
                  const i = n.cloneNode(!0);
                  if ((0, ft.isProbablyReaderable)(i)) {
                      f = e, t()("body").toggleClass("reader-view-on", e);
                      let n = new ft.Readability(i, {
                          keepClasses: !0
                      }).parse();
                      t()("#reader-view > .bg > .title").text(n.title), t()("#reader-view > .bg > .content").append(n.content), t()(`#${D} > .reader-view`).addClass("active")
                  }
              } else f = e, t()("body").toggleClass("reader-view-on", e), t()("#reader-view > .bg > .content").empty(), t()(`#${D} > .reader-view`).removeClass("active")
          }
          async function F(e) {
              p = e, p ? V(!0) : (t()(`#${D}`).removeClass("playing tts-on"), X(), J(!0))
          }

          function U() {
              t()(".read-aloud-highlight").removeClass("read-aloud-highlight")
          }
          async function V(e) {
              if (t()(`#${D}`).addClass("playing tts-on"), p) {
                  if (!_ || 0 === _.length) {
                      J(!0);
                      const e = wt();
                      for (var n = [], i = 0; i < e.length; i++) n.push.apply(n, Nt(e[i], e[i - 1])), n.push(e[i]);
                      _ = n.map(St)
                  }
                  _ && 0 !== _.length ? (G(), e && (X(), await gt(1e3), await V())) : F(!1)
              } else F(!0)
          }
          async function G(e) {
              if (l.isTtsAvailable() && _ && !(_.length <= 0))
                  if (!e && l.isPaused()) {
                      t()(`#${D}`).addClass("playing tts-on"), l.resume(), U();
                      const e = t()(`*[data-read-aloud-highlight-index="${N}-${A}"]`);
                      t()("body").hasClass("tts-highlight-status") && xt(e), e.addClass("read-aloud-highlight"), gt(100).then((() => {
                          l.isPaused() && (J(!0), G(!0))
                      }))
                  } else if (!e && t()(`#${D}`).addClass("playing tts-on"), l.isSpeaking() && J(!0), N === _.length) N = 0, A = 0, t()(`#${D}`).removeClass("playing tts-on"), J(!0);
              else {
                  U();
                  const e = t()(`*[data-read-aloud-highlight-index="${N}-${A}"]`);
                  t()("body").hasClass("tts-highlight-status") && xt(e), e.addClass("read-aloud-highlight");
                  const n = await async function() {
                      let {
                          config: {
                              readingSpeed: e
                          } = {}
                      } = await pt(["config"]);
                      switch (e ||= "1", e) {
                          case "2":
                              return .75;
                          case "3":
                              return 1.2;
                          default:
                              return .9
                      }
                  }(), i = new SpeechSynthesisUtterance(_[N][A]);
                  i.rate = n, i.onend = i.onerror = () => {
                      p && (A === _[N].length - 1 ? (N++, A = 0) : A++, G())
                  }, l.speak(i)
              }
          }

          function X() {
              U(), t()(`#${D}`).removeClass("playing"), l.pause()
          }

          function z() {
              p && (A > 0 ? A-- : N > 0 && (N--, A = _[N].length - 1), J(!0), G())
          }

          function Y() {
              p && (A < _[N].length - 1 ? A++ : N < _.length - 1 && (N++, A = 0), J(!0), G())
          }

          function J(e) {
              U(), p && l.cancel(e)
          }

          function K(e, n) {
              (e = e || 0) ? (t()(`#${b}`).remove(), t()(`#${T}`).remove(), 0 === t()(`#${v}`).length && t()("body").append(y), t()(`#${v}`).css("height", e + "px"), t()(`#${v}`).css("background-color", `var(--adhd-ruler-color, rgba(0, 0, 0, ${n/100}))`), $(E)) : t()(`#${v}`).remove()
          }

          function Q(e, i) {
              if (!(e = e || 0)) return t()(`#${b}`).remove(), void t()(`#${T}`).remove();
              t()(`#${v}`).remove(), 0 === t()(`#${b}`).length && t()("body").append(x), 0 === t()(`#${T}`).length && t()("body").append(w), t()(`#${b}`).attr("data-ruler-value", e), t()(`#${b}`).css("background-color", `var(--adhd-ruler-color, rgba(0, 0, 0, ${i/100}))`), t()(`#${T}`).css("background-color", `var(--adhd-ruler-color, rgba(0, 0, 0, ${i/100}))`), t()(`#${b}`).css("height", "0"), t()(`#${T}`).css("height", Math.min(n.documentElement.scrollHeight, n.documentElement.offsetHeight, n.documentElement.clientHeight) - e + "px"), $(E)
          }

          function Z(e) {
              const i = t()(`#${S}`),
                  r = t()(`#${D}`);
              "mouseup" === e.type && (!async function() {
                  if (!h) return;
                  await gt(100);
                  const e = n.getSelection(),
                      t = e.toString().trim();
                  if (!t.match(/^\w+$/) || !u) return void u.hide();
                  const i = e.getRangeAt(0).getBoundingClientRect(),
                      r = {
                          x: i.x + i.width / 2,
                          y: i.y
                      };
                  n.documentElement.style.setProperty("--tooltip-tag-top", r.y + 4 + "px"), n.documentElement.style.setProperty("--tooltip-tag-left", r.x + "px"), u.show(), u.setProps({
                      content: `${a.getMessage("loading")}...`
                  }), async function(e) {
                      const t = `https://api.dictionaryapi.dev/api/v2/entries/en/${e}`;
                      let n = "";
                      try {
                          let e = await fetch(t).then((e => e.json()));
                          if ("object" == typeof e && e.length > 0 && (e = e[0]), e.word) {
                              const t = e.meanings.find((e => e.definitions.length > 0 && e.definitions[0].definition));
                              n = `<strong>${e.word}</strong> (${t.partOfSpeech??""})<br>${t.definitions[0].definition}`
                          } else n = e.title || a.getMessage("no_definition_found")
                      } catch (e) {
                          n = a.getMessage("failed_to_load_definition")
                      }
                      u.setProps({
                          content: n
                      })
                  }(t)
              }(), !i.hasClass("showing") || bt(e.target, i) || bt(e.target, r) ? f && bt(e.target, t()("#reader-view > .close-btn")) && (e.preventDefault(), W(!1)) : (e.preventDefault(), ee()))
          }

          function ee() {
              t()(`#${S}`).removeClass("showing")
          }
          t()((async () => {
              if (s.onMessage.addListener(q), t()(n).on("mouseup", Z), t()(n).on("mousemove", Rt(20, H)), o.onChanged.addListener(Rt(100, B)), r.onunload = () => {
                      F(!1)
                  }, d) return;
              d = !0, l.isSpeaking() && J(!0), t()(n.body).append(k), u = dt(`#${O}`, {
                      offset: [0, 20],
                      trigger: "manual",
                      allowHTML: !0,
                      appendTo: "parent"
                  }), "object" == typeof u && u.length > 0 && (u = u[0]),
                  function() {
                      t()("head").append(`<style title="${g}">`);
                      for (let e = 0; e < r.document.styleSheets.length; e++)
                          if (r.document.styleSheets[e].title === g) {
                              c = r.document.styleSheets[e];
                              break
                          }
                  }();
              const {
                  frameId: e
              } = await mt({
                  m: "getMyInfo"
              });
              0 === e && (t()("body > header").length > 0 ? t()("body > header").append(L) : t()("body").append(L), R(), jt(n.getElementById(D), I, P, M, (() => t()(n.body).css("--widget-right") || 20)))
          }))
      })(window)
  })()
})();