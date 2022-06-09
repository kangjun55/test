class websocket {
  constructor(_endpoint) {
    this._endpoint = _endpoint;
    this.ws = new WebSocket(_endpoint);
  }

  open(onmessage) {
    this.ws.onopen = function(e) {
      console.log("onopen:", e);
      console.log("onopen: readyState:", this.ws.readyState); // readyState:1
    };

    this.ws.onmessage = function(e) {
      console.log("onmessage:", e.data); // data from server
      console.log("onmessage: readyState:", this.ws.readyState); // readyState:1
      
      onmessage();
    };

    this.ws.onerror = function(err) {
      console.log("onerror:", err);
      console.log("onerror: readyState:", this.ws.readyState);
      
      // reconnect:
      if (this.ws.readyState === 3) // if connection is closed... 
        this.ws = new WebSocket(this._endpoint);
    };

    this.ws.onclose = function(e) {
      console.log("onclose:", e);
      console.log("onclose: readyState:", this.ws.readyState); // readyState:3
    };
  }

  close() {
    console.log("closing...");
    this.ws.close();
  }
}
