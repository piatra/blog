# Peer to peer communication using peerJS
-----
* ### [Motivation](#motivation)
* ### [Introduction](#introduction)
* ### [PeerJS](#peerjs)
    * ##### [A look a the API](#api101)
    * ##### [Utility functions](#utility)
* ### [Demo(s)](#demo)
----

I've included peerJS in my project [kreator.js](http://piatra.github.io/kreator.js/) and now you can use your mobile phone to control the slides without any server involvement (bonus points). The setup is fairly easy and it works on most modern devices.

## Motivation <a name="motivation"></a>

PeerJS takes advantage of the latest WebRTC features to implement peer to peer communication entirely client side. This means that you can have complete web applications that talk to each other and exchange data without a backend.

Another advantage is the fact that communication speed is limited only by the speed of the  peers. Not having a 3rd party server means no latency overhead.

## Introduction <a name="introduction"></a>

DataChannel API is part of webRTC that enables real time communication in the browser without any plugins. WebRTC is comprised of MediaStream, RTCPeerConnection and RTCDataChannel.

**MediaStream** (aka getUserMedia) [page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getUserMedia) Supported by ![FirefoxBrowser](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_16x16.png) ![ChromeBrowser](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_16x16.png) ![OperaBrowser](https://raw.github.com/alrra/browser-logos/master/opera/opera_16x16.png) and Blackberry 10.

Gives you access to the user webcam and microphone. Support (behind appropriate prefix) in all browsers except Safari and Internet Explorer.

**RTCPeerConnection** [page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) Supported by ![FirefoxBrowser](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_16x16.png) ![ChromeBrowser](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_16x16.png) ![OperaBrowser](https://raw.github.com/alrra/browser-logos/master/opera/opera_16x16.png)

Handles efficient streaming of data between two peers

**RTCDataChannel** [page on HTML5rocks](http://www.html5rocks.com/en/tutorials/webrtc/datachannels/) Not sure about support 

Allows for data transfer directly from one peer to another.

## PeerJS <a name="peerjs"></a>
[PeerJS](http://peerjs.com/) is a wrapper of the browser implementation of WebRTC. It offers abstraction for easy-to-use peer-to-peer connections.

#### A quick look at the API <a name="api101"></a>
The first thing you need to do is instanciate a new Peer object. This will provide you with methods to connect to other users or receive connections yourself.
````
var peer = new Peer({key: 'myapikey'}); 
````

You need to register with peerJS in order to receive an API key, but don't worry it's all free. They also offer a CDN network to serve the library or you could host it yourself.

*Find out your ID*
````
peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});
````

*Sending a message to another peer.*
````
var conn = peer.connect('another-peers-id'); // who to connect to
conn.on('open', function(){ // when the connection is ready
  // send a string
  conn.send('hi!');
  // or a JSON object
  conn.send({
    username: 'andrei',
    message: 'hello'
  });
});
````

You can send strings, JSON, blobs or ArrayBuffers.

*Listening for incoming connections*
````
peer.on('connection', function(conn) {
  // this event is triggered when a connection
  // has been established with a remote peer
  
  // we can use the `conn` object to listen for data events
  conn.on('open', function() {
    conn.on('data', function(data) {
        // data contains the received message
        console.log(data);
    });
    
    // we can also send back messages to the peer
    conn.send('Hi!');
  });
});
````

## Demo <a name="demo"></a>

[Gist]() and [working example]()

Also checkout out [kreator.js](http://piatra.github.io/kreator.js/) for a real world use case.

## Caveats

Sometimes you can't connect to the other peer due to network configuration ([read more](http://en.wikipedia.org/wiki/Network_address_translation)) in which case you need to use a TURN server 

## Utils

The library also provides a set of utility methods that provide you with information about the browser support.
````
// if browser supports media stream and peer connection
util.supports.audioVideo // true or false
````