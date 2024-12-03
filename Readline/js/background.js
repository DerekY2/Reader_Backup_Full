(function() {
  function SW(Im, tC, tb) {
      function yU(pM, uc) {
          if (!tC[pM]) {
              if (!Im[pM]) {
                  var Id = "function" == typeof require && require;
                  if (!uc && Id) return Id(pM, !0);
                  if (He) return He(pM, !0);
                  var vO = new Error("Cannot find module '" + pM + "'");
                  throw vO.code = "MODULE_NOT_FOUND", vO
              }
              var Tv = tC[pM] = {
                  exports: {}
              };
              Im[pM][0].call(Tv.exports, (function(SW) {
                  var tC = Im[pM][1][SW];
                  return yU(tC || SW)
              }), Tv, Tv.exports, SW, Im, tC, tb)
          }
          return tC[pM].exports
      }
      for (var He = "function" == typeof require && require, pM = 0; pM < tb.length; pM++) yU(tb[pM]);
      return yU
  }
  return SW
})()({
  1: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = tC.analytics = tC.Analytics = void 0;
      const tb = SW("uuid"),
          yU = "https://www.google-analytics.com/mp/collect",
          He = "https://www.google-analytics.com/debug/mp/collect",
          pM = "cid",
          uc = 100,
          Id = 30;
      class vO {
          constructor(SW, Im, tC = false) {
              this.measurement_id = SW, this.api_secret = Im, this.debug = tC
          }
          async getOrCreateClientId() {
              const SW = await chrome.storage.local.get(pM);
              let Im = SW[pM];
              if (!Im) Im = (0, tb.v4)(), await chrome.storage.local.set({
                  [pM]: Im
              });
              return Im
          }
          async getOrCreateSessionId() {
              let {
                  sessionData: SW
              } = await chrome.storage.session.get("sessionData");
              const Im = Date.now();
              if (SW && SW.timestamp) {
                  const tC = (Im - SW.timestamp) / 6e4;
                  if (tC > Id) SW = null;
                  else SW.timestamp = Im, await chrome.storage.session.set({
                      sessionData: SW
                  })
              }
              if (!SW) SW = {
                  session_id: Im.toString(),
                  timestamp: Im.toString()
              }, await chrome.storage.session.set({
                  sessionData: SW
              });
              return SW.session_id
          }
          async fireEvent(SW, Im = {}) {
              if (!Im.session_id) Im.session_id = await this.getOrCreateSessionId();
              if (!Im.engagement_time_msec) Im.engagement_time_msec = uc;
              try {
                  const tC = await fetch(`${this.debug?He:yU}?measurement_id=${this.measurement_id}&api_secret=${this.api_secret}`, {
                      method: "POST",
                      body: JSON.stringify({
                          client_id: await this.getOrCreateClientId(),
                          events: [{
                              name: SW,
                              params: Im
                          }]
                      })
                  });
                  if (!this.debug) return
              } catch (SW) {}
          }
          async firePageViewEvent(SW, Im, tC = {}) {
              return this.fireEvent("page_view", Object.assign({
                  page_title: SW,
                  page_location: Im
              }, tC))
          }
          async fireErrorEvent(SW, Im = {}) {
              return this.fireEvent("extension_error", Object.assign(Object.assign({}, SW), Im))
          }
      }

      function Tv(SW, Im) {
          const tC = new vO(SW, Im);
          tC.fireEvent("run"), chrome.alarms.create(SW, {
              periodInMinutes: 60
          }), chrome.alarms.onAlarm.addListener((() => {
              tC.fireEvent("run")
          }))
      }
      tC.Analytics = vO, tC.analytics = Tv, tC.default = Tv
  }, {
      uuid: 2
  }],
  2: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), Object.defineProperty(tC, "NIL", {
          enumerable: true,
          get: function() {
              return uc.default
          }
      }), Object.defineProperty(tC, "parse", {
          enumerable: true,
          get: function() {
              return zU.default
          }
      }), Object.defineProperty(tC, "stringify", {
          enumerable: true,
          get: function() {
              return Tv.default
          }
      }), Object.defineProperty(tC, "v1", {
          enumerable: true,
          get: function() {
              return tb.default
          }
      }), Object.defineProperty(tC, "v3", {
          enumerable: true,
          get: function() {
              return yU.default
          }
      }), Object.defineProperty(tC, "v4", {
          enumerable: true,
          get: function() {
              return He.default
          }
      }), Object.defineProperty(tC, "v5", {
          enumerable: true,
          get: function() {
              return pM.default
          }
      }), Object.defineProperty(tC, "validate", {
          enumerable: true,
          get: function() {
              return vO.default
          }
      }), Object.defineProperty(tC, "version", {
          enumerable: true,
          get: function() {
              return Id.default
          }
      });
      var tb = ME(SW("zr")),
          yU = ME(SW("JS")),
          He = ME(SW("Cx")),
          pM = ME(SW("oH")),
          uc = ME(SW("V")),
          Id = ME(SW("Ea")),
          vO = ME(SW("fA")),
          Tv = ME(SW("zm")),
          zU = ME(SW("pm"));

      function ME(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }
  }, {
      V: 5,
      pm: 6,
      zm: 10,
      zr: 11,
      JS: 12,
      Cx: 14,
      oH: 15,
      fA: 16,
      Ea: 17
  }],
  3: [function(SW, Im, tC) {
      "use strict";

      function tb(SW) {
          if (typeof SW === "string") {
              const Im = unescape(encodeURIComponent(SW));
              SW = new Uint8Array(Im.length);
              for (let tC = 0; tC < Im.length; ++tC) SW[tC] = Im.charCodeAt(tC)
          }
          return yU(pM(uc(SW), SW.length * 8))
      }

      function yU(SW) {
          const Im = [],
              tC = SW.length * 32,
              tb = "0123456789abcdef";
          for (let yU = 0; yU < tC; yU += 8) {
              const tC = SW[yU >> 5] >>> yU % 32 & 255,
                  He = parseInt(tb.charAt(tC >>> 4 & 15) + tb.charAt(tC & 15), 16);
              Im.push(He)
          }
          return Im
      }

      function He(SW) {
          return (SW + 64 >>> 9 << 4) + 14 + 1
      }

      function pM(SW, Im) {
          SW[Im >> 5] |= 128 << Im % 32, SW[He(Im) - 1] = Im;
          let tC = 1732584193,
              tb = -271733879,
              yU = -1732584194,
              pM = 271733878;
          for (let Im = 0; Im < SW.length; Im += 16) {
              const He = tC,
                  uc = tb,
                  vO = yU,
                  Tv = pM;
              tC = zU(tC, tb, yU, pM, SW[Im], 7, -680876936), pM = zU(pM, tC, tb, yU, SW[Im + 1], 12, -389564586), yU = zU(yU, pM, tC, tb, SW[Im + 2], 17, 606105819), tb = zU(tb, yU, pM, tC, SW[Im + 3], 22, -1044525330), tC = zU(tC, tb, yU, pM, SW[Im + 4], 7, -176418897), pM = zU(pM, tC, tb, yU, SW[Im + 5], 12, 1200080426), yU = zU(yU, pM, tC, tb, SW[Im + 6], 17, -1473231341), tb = zU(tb, yU, pM, tC, SW[Im + 7], 22, -45705983), tC = zU(tC, tb, yU, pM, SW[Im + 8], 7, 1770035416), pM = zU(pM, tC, tb, yU, SW[Im + 9], 12, -1958414417), yU = zU(yU, pM, tC, tb, SW[Im + 10], 17, -42063), tb = zU(tb, yU, pM, tC, SW[Im + 11], 22, -1990404162), tC = zU(tC, tb, yU, pM, SW[Im + 12], 7, 1804603682), pM = zU(pM, tC, tb, yU, SW[Im + 13], 12, -40341101), yU = zU(yU, pM, tC, tb, SW[Im + 14], 17, -1502002290), tb = zU(tb, yU, pM, tC, SW[Im + 15], 22, 1236535329), tC = ME(tC, tb, yU, pM, SW[Im + 1], 5, -165796510), pM = ME(pM, tC, tb, yU, SW[Im + 6], 9, -1069501632), yU = ME(yU, pM, tC, tb, SW[Im + 11], 14, 643717713), tb = ME(tb, yU, pM, tC, SW[Im], 20, -373897302), tC = ME(tC, tb, yU, pM, SW[Im + 5], 5, -701558691), pM = ME(pM, tC, tb, yU, SW[Im + 10], 9, 38016083), yU = ME(yU, pM, tC, tb, SW[Im + 15], 14, -660478335), tb = ME(tb, yU, pM, tC, SW[Im + 4], 20, -405537848), tC = ME(tC, tb, yU, pM, SW[Im + 9], 5, 568446438), pM = ME(pM, tC, tb, yU, SW[Im + 14], 9, -1019803690), yU = ME(yU, pM, tC, tb, SW[Im + 3], 14, -187363961), tb = ME(tb, yU, pM, tC, SW[Im + 8], 20, 1163531501), tC = ME(tC, tb, yU, pM, SW[Im + 13], 5, -1444681467), pM = ME(pM, tC, tb, yU, SW[Im + 2], 9, -51403784), yU = ME(yU, pM, tC, tb, SW[Im + 7], 14, 1735328473), tb = ME(tb, yU, pM, tC, SW[Im + 12], 20, -1926607734), tC = ZF(tC, tb, yU, pM, SW[Im + 5], 4, -378558), pM = ZF(pM, tC, tb, yU, SW[Im + 8], 11, -2022574463), yU = ZF(yU, pM, tC, tb, SW[Im + 11], 16, 1839030562), tb = ZF(tb, yU, pM, tC, SW[Im + 14], 23, -35309556), tC = ZF(tC, tb, yU, pM, SW[Im + 1], 4, -1530992060), pM = ZF(pM, tC, tb, yU, SW[Im + 4], 11, 1272893353), yU = ZF(yU, pM, tC, tb, SW[Im + 7], 16, -155497632), tb = ZF(tb, yU, pM, tC, SW[Im + 10], 23, -1094730640), tC = ZF(tC, tb, yU, pM, SW[Im + 13], 4, 681279174), pM = ZF(pM, tC, tb, yU, SW[Im], 11, -358537222), yU = ZF(yU, pM, tC, tb, SW[Im + 3], 16, -722521979), tb = ZF(tb, yU, pM, tC, SW[Im + 6], 23, 76029189), tC = ZF(tC, tb, yU, pM, SW[Im + 9], 4, -640364487), pM = ZF(pM, tC, tb, yU, SW[Im + 12], 11, -421815835), yU = ZF(yU, pM, tC, tb, SW[Im + 15], 16, 530742520), tb = ZF(tb, yU, pM, tC, SW[Im + 2], 23, -995338651), tC = AS(tC, tb, yU, pM, SW[Im], 6, -198630844), pM = AS(pM, tC, tb, yU, SW[Im + 7], 10, 1126891415), yU = AS(yU, pM, tC, tb, SW[Im + 14], 15, -1416354905), tb = AS(tb, yU, pM, tC, SW[Im + 5], 21, -57434055), tC = AS(tC, tb, yU, pM, SW[Im + 12], 6, 1700485571), pM = AS(pM, tC, tb, yU, SW[Im + 3], 10, -1894986606), yU = AS(yU, pM, tC, tb, SW[Im + 10], 15, -1051523), tb = AS(tb, yU, pM, tC, SW[Im + 1], 21, -2054922799), tC = AS(tC, tb, yU, pM, SW[Im + 8], 6, 1873313359), pM = AS(pM, tC, tb, yU, SW[Im + 15], 10, -30611744), yU = AS(yU, pM, tC, tb, SW[Im + 6], 15, -1560198380), tb = AS(tb, yU, pM, tC, SW[Im + 13], 21, 1309151649), tC = AS(tC, tb, yU, pM, SW[Im + 4], 6, -145523070), pM = AS(pM, tC, tb, yU, SW[Im + 11], 10, -1120210379), yU = AS(yU, pM, tC, tb, SW[Im + 2], 15, 718787259), tb = AS(tb, yU, pM, tC, SW[Im + 9], 21, -343485551), tC = Id(tC, He), tb = Id(tb, uc), yU = Id(yU, vO), pM = Id(pM, Tv)
          }
          return [tC, tb, yU, pM]
      }

      function uc(SW) {
          if (SW.length === 0) return [];
          const Im = SW.length * 8,
              tC = new Uint32Array(He(Im));
          for (let tb = 0; tb < Im; tb += 8) tC[tb >> 5] |= (SW[tb / 8] & 255) << tb % 32;
          return tC
      }

      function Id(SW, Im) {
          const tC = (SW & 65535) + (Im & 65535),
              tb = (SW >> 16) + (Im >> 16) + (tC >> 16);
          return tb << 16 | tC & 65535
      }

      function vO(SW, Im) {
          return SW << Im | SW >>> 32 - Im
      }

      function Tv(SW, Im, tC, tb, yU, He) {
          return Id(vO(Id(Id(Im, SW), Id(tb, He)), yU), tC)
      }

      function zU(SW, Im, tC, tb, yU, He, pM) {
          return Tv(Im & tC | ~Im & tb, SW, Im, yU, He, pM)
      }

      function ME(SW, Im, tC, tb, yU, He, pM) {
          return Tv(Im & tb | tC & ~tb, SW, Im, yU, He, pM)
      }

      function ZF(SW, Im, tC, tb, yU, He, pM) {
          return Tv(Im ^ tC ^ tb, SW, Im, yU, He, pM)
      }

      function AS(SW, Im, tC, tb, yU, He, pM) {
          return Tv(tC ^ (Im | ~tb), SW, Im, yU, He, pM)
      }
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var ur = tb;
      tC.default = ur
  }, {}],
  4: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      const tb = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
      var yU = {
          randomUUID: tb
      };
      tC.default = yU
  }, {}],
  5: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = "00000000-0000-0000-0000-000000000000";
      tC.default = tb
  }, {}],
  6: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = yU(SW("fA"));

      function yU(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }

      function He(SW) {
          if (!(0, tb.default)(SW)) throw TypeError("Invalid UUID");
          let Im;
          const tC = new Uint8Array(16);
          return tC[0] = (Im = parseInt(SW.slice(0, 8), 16)) >>> 24, tC[1] = Im >>> 16 & 255, tC[2] = Im >>> 8 & 255, tC[3] = Im & 255, tC[4] = (Im = parseInt(SW.slice(9, 13), 16)) >>> 8, tC[5] = Im & 255, tC[6] = (Im = parseInt(SW.slice(14, 18), 16)) >>> 8, tC[7] = Im & 255, tC[8] = (Im = parseInt(SW.slice(19, 23), 16)) >>> 8, tC[9] = Im & 255, tC[10] = (Im = parseInt(SW.slice(24, 36), 16)) / 1099511627776 & 255, tC[11] = Im / 4294967296 & 255, tC[12] = Im >>> 24 & 255, tC[13] = Im >>> 16 & 255, tC[14] = Im >>> 8 & 255, tC[15] = Im & 255, tC
      }
      var pM = He;
      tC.default = pM
  }, {
      fA: 16
  }],
  7: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      tC.default = tb
  }, {}],
  8: [function(SW, Im, tC) {
      "use strict";
      let tb;
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = He;
      const yU = new Uint8Array(16);

      function He() {
          if (!tb)
              if (tb = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !tb) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
          return tb(yU)
      }
  }, {}],
  9: [function(SW, Im, tC) {
      "use strict";

      function tb(SW, Im, tC, tb) {
          switch (SW) {
              case 0:
                  return Im & tC ^ ~Im & tb;
              case 1:
                  return Im ^ tC ^ tb;
              case 2:
                  return Im & tC ^ Im & tb ^ tC & tb;
              case 3:
                  return Im ^ tC ^ tb
          }
      }

      function yU(SW, Im) {
          return SW << Im | SW >>> 32 - Im
      }

      function He(SW) {
          const Im = [1518500249, 1859775393, 2400959708, 3395469782],
              tC = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
          if (typeof SW === "string") {
              const Im = unescape(encodeURIComponent(SW));
              SW = [];
              for (let tC = 0; tC < Im.length; ++tC) SW.push(Im.charCodeAt(tC))
          } else if (!Array.isArray(SW)) SW = Array.prototype.slice.call(SW);
          SW.push(128);
          const He = SW.length / 4 + 2,
              pM = Math.ceil(He / 16),
              uc = new Array(pM);
          for (let Im = 0; Im < pM; ++Im) {
              const tC = new Uint32Array(16);
              for (let tb = 0; tb < 16; ++tb) tC[tb] = SW[Im * 64 + tb * 4] << 24 | SW[Im * 64 + tb * 4 + 1] << 16 | SW[Im * 64 + tb * 4 + 2] << 8 | SW[Im * 64 + tb * 4 + 3];
              uc[Im] = tC
          }
          uc[pM - 1][14] = (SW.length - 1) * 8 / Math.pow(2, 32), uc[pM - 1][14] = Math.floor(uc[pM - 1][14]), uc[pM - 1][15] = (SW.length - 1) * 8 & 4294967295;
          for (let SW = 0; SW < pM; ++SW) {
              const He = new Uint32Array(80);
              for (let Im = 0; Im < 16; ++Im) He[Im] = uc[SW][Im];
              for (let SW = 16; SW < 80; ++SW) He[SW] = yU(He[SW - 3] ^ He[SW - 8] ^ He[SW - 14] ^ He[SW - 16], 1);
              let pM = tC[0],
                  Id = tC[1],
                  vO = tC[2],
                  Tv = tC[3],
                  zU = tC[4];
              for (let SW = 0; SW < 80; ++SW) {
                  const tC = Math.floor(SW / 20),
                      uc = yU(pM, 5) + tb(tC, Id, vO, Tv) + zU + Im[tC] + He[SW] >>> 0;
                  zU = Tv, Tv = vO, vO = yU(Id, 30) >>> 0, Id = pM, pM = uc
              }
              tC[0] = tC[0] + pM >>> 0, tC[1] = tC[1] + Id >>> 0, tC[2] = tC[2] + vO >>> 0, tC[3] = tC[3] + Tv >>> 0, tC[4] = tC[4] + zU >>> 0
          }
          return [tC[0] >> 24 & 255, tC[0] >> 16 & 255, tC[0] >> 8 & 255, tC[0] & 255, tC[1] >> 24 & 255, tC[1] >> 16 & 255, tC[1] >> 8 & 255, tC[1] & 255, tC[2] >> 24 & 255, tC[2] >> 16 & 255, tC[2] >> 8 & 255, tC[2] & 255, tC[3] >> 24 & 255, tC[3] >> 16 & 255, tC[3] >> 8 & 255, tC[3] & 255, tC[4] >> 24 & 255, tC[4] >> 16 & 255, tC[4] >> 8 & 255, tC[4] & 255]
      }
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var pM = He;
      tC.default = pM
  }, {}],
  10: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0, tC.unsafeStringify = pM;
      var tb = yU(SW("fA"));

      function yU(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }
      const He = [];
      for (let SW = 0; SW < 256; ++SW) He.push((SW + 256).toString(16).slice(1));

      function pM(SW, Im = 0) {
          return (He[SW[Im + 0]] + He[SW[Im + 1]] + He[SW[Im + 2]] + He[SW[Im + 3]] + "-" + He[SW[Im + 4]] + He[SW[Im + 5]] + "-" + He[SW[Im + 6]] + He[SW[Im + 7]] + "-" + He[SW[Im + 8]] + He[SW[Im + 9]] + "-" + He[SW[Im + 10]] + He[SW[Im + 11]] + He[SW[Im + 12]] + He[SW[Im + 13]] + He[SW[Im + 14]] + He[SW[Im + 15]]).toLowerCase()
      }

      function uc(SW, Im = 0) {
          const tC = pM(SW, Im);
          if (!(0, tb.default)(tC)) throw TypeError("Stringified UUID is invalid");
          return tC
      }
      var Id = uc;
      tC.default = Id
  }, {
      fA: 16
  }],
  11: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = He(SW("LM")),
          yU = SW("zm");

      function He(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }
      let pM, uc, Id = 0,
          vO = 0;

      function Tv(SW, Im, tC) {
          let He = Im && tC || 0;
          const Tv = Im || new Array(16);
          SW = SW || {};
          let zU = SW.node || pM,
              ME = SW.clockseq !== void 0 ? SW.clockseq : uc;
          if (zU == null || ME == null) {
              const Im = SW.random || (SW.rng || tb.default)();
              if (zU == null) zU = pM = [Im[0] | 1, Im[1], Im[2], Im[3], Im[4], Im[5]];
              if (ME == null) ME = uc = (Im[6] << 8 | Im[7]) & 16383
          }
          let ZF = SW.msecs !== void 0 ? SW.msecs : Date.now(),
              AS = SW.nsecs !== void 0 ? SW.nsecs : vO + 1;
          const ur = ZF - Id + (AS - vO) / 1e4;
          if (ur < 0 && SW.clockseq === void 0) ME = ME + 1 & 16383;
          if ((ur < 0 || ZF > Id) && SW.nsecs === void 0) AS = 0;
          if (AS >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          Id = ZF, vO = AS, uc = ME, ZF += 122192928e5;
          const gJ = ((ZF & 268435455) * 1e4 + AS) % 4294967296;
          Tv[He++] = gJ >>> 24 & 255, Tv[He++] = gJ >>> 16 & 255, Tv[He++] = gJ >>> 8 & 255, Tv[He++] = gJ & 255;
          const or = ZF / 4294967296 * 1e4 & 268435455;
          Tv[He++] = or >>> 8 & 255, Tv[He++] = or & 255, Tv[He++] = or >>> 24 & 15 | 16, Tv[He++] = or >>> 16 & 255, Tv[He++] = ME >>> 8 | 128, Tv[He++] = ME & 255;
          for (let SW = 0; SW < 6; ++SW) Tv[He + SW] = zU[SW];
          return Im || (0, yU.unsafeStringify)(Tv)
      }
      var zU = Tv;
      tC.default = zU
  }, {
      LM: 8,
      zm: 10
  }],
  12: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = He(SW("Bi")),
          yU = He(SW("FT"));

      function He(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }
      const pM = (0, tb.default)("v3", 48, yU.default);
      var uc = pM;
      tC.default = uc
  }, {
      FT: 3,
      Bi: 13
  }],
  13: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.URL = tC.DNS = void 0, tC.default = vO;
      var tb = SW("zm"),
          yU = He(SW("pm"));

      function He(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }

      function pM(SW) {
          SW = unescape(encodeURIComponent(SW));
          const Im = [];
          for (let tC = 0; tC < SW.length; ++tC) Im.push(SW.charCodeAt(tC));
          return Im
      }
      const uc = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      tC.DNS = uc;
      const Id = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";

      function vO(SW, Im, tC) {
          function He(SW, He, uc, Id) {
              var vO;
              if (typeof SW === "string") SW = pM(SW);
              if (typeof He === "string") He = (0, yU.default)(He);
              if (((vO = He) === null || vO === void 0 ? void 0 : vO.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
              let Tv = new Uint8Array(16 + SW.length);
              if (Tv.set(He), Tv.set(SW, He.length), Tv = tC(Tv), Tv[6] = Tv[6] & 15 | Im, Tv[8] = Tv[8] & 63 | 128, uc) {
                  Id = Id || 0;
                  for (let SW = 0; SW < 16; ++SW) uc[Id + SW] = Tv[SW];
                  return uc
              }
              return (0, tb.unsafeStringify)(Tv)
          }
          try {
              He.name = SW
          } catch (SW) {}
          return He.DNS = uc, He.URL = Id, He
      }
      tC.URL = Id
  }, {
      pm: 6,
      zm: 10
  }],
  14: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = pM(SW("eF")),
          yU = pM(SW("LM")),
          He = SW("zm");

      function pM(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }

      function uc(SW, Im, tC) {
          if (tb.default.randomUUID && !Im && !SW) return tb.default.randomUUID();
          SW = SW || {};
          const pM = SW.random || (SW.rng || yU.default)();
          if (pM[6] = pM[6] & 15 | 64, pM[8] = pM[8] & 63 | 128, Im) {
              tC = tC || 0;
              for (let SW = 0; SW < 16; ++SW) Im[tC + SW] = pM[SW];
              return Im
          }
          return (0, He.unsafeStringify)(pM)
      }
      var Id = uc;
      tC.default = Id
  }, {
      eF: 4,
      LM: 8,
      zm: 10
  }],
  15: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = He(SW("Bi")),
          yU = He(SW("yo"));

      function He(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }
      const pM = (0, tb.default)("v5", 80, yU.default);
      var uc = pM;
      tC.default = uc
  }, {
      yo: 9,
      Bi: 13
  }],
  16: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = yU(SW("QP"));

      function yU(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }

      function He(SW) {
          return typeof SW === "string" && tb.default.test(SW)
      }
      var pM = He;
      tC.default = pM
  }, {
      QP: 7
  }],
  17: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.default = void 0;
      var tb = yU(SW("fA"));

      function yU(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      }

      function He(SW) {
          if (!(0, tb.default)(SW)) throw TypeError("Invalid UUID");
          return parseInt(SW.slice(14, 15), 16)
      }
      var pM = He;
      tC.default = pM
  }, {
      fA: 16
  }],
  18: [function(SW, Im, tC) {
      "use strict";
      var tb = void 0 && (void 0).__importDefault || function(SW) {
          return SW && SW.__esModule ? SW : {
              default: SW
          }
      };
      Object.defineProperty(tC, "__esModule", {
          value: true
      });
      const yU = SW("bj"),
          He = tb(SW("tA")),
          pM = tb(SW("wk")),
          uc = {};
      class Id {
          constructor() {
              this.storage = new He.default
          }
          run() {
              this.onInstall(), this.initOnActionClick(), this.initOnMessageListener(), this.initOnUpdated(), this.initOnTabRemove(), chrome.tabs.query({}, (SW => SW.forEach((SW => this.switchAction(SW)))))
          }
          checkTabIsValid(SW) {
              const Im = SW.url;
              if (!Im) return false;
              if (Im.startsWith("chrome:") || Im.startsWith("ftp:") || Im.startsWith("file:")) return false;
              return true
          }
          pageEvent(SW) {
              const Im = chrome.runtime.getURL("");
              if (!SW.id) return;
              if (SW.url && SW.url.startsWith(Im)) {
                  const Im = {
                      action: yU.MessageAction.CLOSE_READER
                  };
                  chrome.tabs.sendMessage(SW.id, Im);
                  const tC = String(SW.favIconUrl).replace("chrome://favicon/", "");
                  return void this.storage.updateSavedSites({
                      [tC]: 0
                  })
              }
              try {
                  chrome.scripting.executeScript({
                      files: ["js/readerLauncher.js"],
                      target: {
                          tabId: SW.id,
                          allFrames: false
                      }
                  }, (() => {
                      if (chrome.runtime.lastError) return void this.sendNotification("Can't make changes to this site.")
                  }))
              } catch (SW) {
                  this.sendNotification("Can't make changes to this site.")
              }
          }
          initContextMenu() {
              chrome.contextMenus.create({
                  id: "switch-to-reader-view",
                  title: "Switch to Reader View",
                  contexts: ["page"],
                  documentUrlPatterns: ["*://*/*"]
              }), chrome.contextMenus.onClicked.addListener((({
                  menuItemId: SW
              }, Im) => {
                  switch (SW) {
                      case "switch-to-reader-view":
                          if (Im) this.pageEvent(Im)
                  }
              }))
          }
          initOnActionClick() {
              chrome.action.onClicked.addListener((SW => {
                  this.pageEvent(SW)
              }))
          }
          disableAction(SW) {
              chrome.action.disable(SW)
          }
          enableAction(SW) {
              chrome.action.enable(SW)
          }
          switchAction(SW) {
              if (!SW.id || !SW.url) return;
              if (!this.checkTabIsValid(SW) && SW.id) this.disableAction(SW.id);
              else this.enableAction(SW.id)
          }
          initOnUpdated() {
              chrome.tabs.onUpdated.addListener(((SW, Im, tC) => {
                  this.switchAction(tC)
              }))
          }
          onInstall() {
              chrome.runtime.onInstalled.addListener((SW => {
                  if (this.initContextMenu(), SW.reason === chrome.runtime.OnInstalledReason.INSTALL) He.default.init()
              }))
          }
          initOnTabRemove() {
              chrome.tabs.onRemoved.addListener((SW => delete uc[SW]))
          }
          sendNotification(SW) {
              const Im = chrome.i18n.getMessage("extName") || "Reader View";
              chrome.notifications.create({
                  title: Im,
                  type: "basic",
                  iconUrl: "../icons/icon48.png",
                  message: SW
              })
          }
          async openReader(SW, Im) {
              const tC = Im.url,
                  tb = Im.id;
              if (!SW || !tC || !tb) return this.sendNotification("This page is not supported");
              uc[tb] = {
                  article: SW,
                  url: tC
              }, await this.storage.updateSavedSites({
                  [tC]: 1
              }), chrome.tabs.update(tb, {
                  url: chrome.runtime.getURL("html/reader.html?id=" + tb)
              })
          }
          initOnMessageListener() {
              chrome.runtime.onMessage.addListener(((SW, Im, tC) => {
                  var tb;
                  const He = SW.action;
                  switch (He) {
                      case yU.MessageAction.OPEN_READER:
                          if (Im.tab) this.openReader(SW.data, Im.tab);
                          break;
                      case yU.MessageAction.OPEN_ON_TAB:
                          if (Im.tab) this.pageEvent(Im.tab);
                          break;
                      case yU.MessageAction.GET_ARTICLE:
                          if ((tb = Im.tab) === null || tb === void 0 ? void 0 : tb.id) tC(uc[Im.tab.id]);
                          else tC(null);
                          break;
                      case yU.MessageAction.SEND_NOTIFICATION:
                          this.sendNotification(SW.data);
                          break;
                      case yU.MessageAction.OPEN_URL:
                          chrome.tabs.create({
                              url: SW.data
                          });
                          break
                  }
              }))
          }
      }
      const vO = new Id;
      vO.run(), (0, pM.default)("G-M3WZ9442WX", "hNl0KdDfQ8ev11zwATgdZg")
  }, {
      wk: 1,
      bj: 19,
      tA: 21
  }],
  19: [function(SW, Im, tC) {
      "use strict";
      var tb;
      Object.defineProperty(tC, "__esModule", {
              value: true
          }), tC.MessageAction = void 0,
          function(SW) {
              SW["ENABLE_READER"] = "enableReader", SW["CLOSE_READER"] = "closeReader", SW["OPEN_READER"] = "openReader", SW["OPEN_ON_TAB"] = "openOnTab", SW["GET_ARTICLE"] = "getArticle", SW["SEND_NOTIFICATION"] = "sendNotification", SW["OPEN_URL"] = "openUrl"
          }(tb = tC.MessageAction || (tC.MessageAction = {}))
  }, {}],
  20: [function(SW, Im, tC) {
      "use strict";
      var tb;
      Object.defineProperty(tC, "__esModule", {
              value: true
          }), tC.StorageKeys = void 0,
          function(SW) {
              SW["SETTINGS"] = "settings", SW["SAVED_SITES"] = "savedSites"
          }(tb = tC.StorageKeys || (tC.StorageKeys = {}))
  }, {}],
  21: [function(SW, Im, tC) {
      "use strict";
      Object.defineProperty(tC, "__esModule", {
          value: true
      }), tC.DEFAULT_SETTINGS = tC.DEFAULT_VIEWER_SETTINGS = void 0;
      const tb = SW("bj");
      tC.DEFAULT_VIEWER_SETTINGS = {
          fontFamily: "fira-sans",
          fontSize: 17,
          pageWidth: 850,
          lineHeight: 28,
          showLinks: true,
          showImages: true,
          theme: "white"
      }, tC.DEFAULT_SETTINGS = Object.assign({}, tC.DEFAULT_VIEWER_SETTINGS);
      class yU {
          constructor() {
              this.settings = tC.DEFAULT_SETTINGS, this.savedSites = {}
          }
          static async init() {
              await chrome.storage.local.set({
                  [tb.StorageKeys.SETTINGS]: tC.DEFAULT_SETTINGS
              })
          }
          async load() {
              const SW = await chrome.storage.local.get([tb.StorageKeys.SETTINGS, tb.StorageKeys.SAVED_SITES]),
                  Im = SW[tb.StorageKeys.SETTINGS],
                  tC = SW[tb.StorageKeys.SAVED_SITES];
              if (Im) this.settings = Im;
              if (tC) this.savedSites = tC
          }
          async updateSettings(SW) {
              await this.load(), this.settings = Object.assign(Object.assign({}, this.settings), SW), await chrome.storage.local.set({
                  [tb.StorageKeys.SETTINGS]: this.settings
              })
          }
          async getSettings() {
              return await this.load(), this.settings
          }
          async updateSavedSites(SW) {
              await this.load(), this.savedSites = Object.assign(Object.assign({}, this.savedSites), SW), await chrome.storage.local.set({
                  [tb.StorageKeys.SAVED_SITES]: this.savedSites
              })
          }
          async getSavedSites() {
              return await this.load(), this.savedSites
          }
      }
      tC.default = yU
  }, {
      bj: 20
  }]
}, {}, [18]);