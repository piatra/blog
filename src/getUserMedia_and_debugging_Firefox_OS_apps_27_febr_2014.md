# Video capture & debugging in Firefox OS 
----

In the nightly version of Firefox OS (_currently 1.4_) support for capturing video stream using getUserMedia has landed.
This article is about how to make a basic demo that does that and how you can debug your app.

The code for getting access to the phone camera is very straight forward ([GitHub gist](https://gist.github.com/piatra/9240045)) , we'll get to that in a minute. First you should know that you cannot get access without providing an [App Manifest file](https://developer.mozilla.org/en-US/Apps/Developing/App_permissions).

An **App Manifest** is a JSON file that tells the browser _how to interact with the web application_. An example can be found [here in the MDN](https://developer.mozilla.org/en-US/Apps/Developing/Manifest#Example_manifest) with more documentation, or grab the one provided in the [boilerplate Firefox OS app](https://github.com/robnyman/Firefox-OS-Boilerplate-App/blob/gh-pages/manifest.webapp). This should include the following:

````
....
"video-capture": {
    "description": "get video"
}
....
````

Now that we have that out of the way, the code that allows us to access the camera:


````
navigator.mozGetUserMedia({audio: true, video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
}, function(err) {
    console.log(err);
});
````

As you can see the code is very straight forward (notice the *moz* prefix) and this gets you very far.

![ScreenShot](http://imgur.com/GJ4WBQU.png)

We get a live stream into the browser from our camera! Awesome!
Current build of Firefox OS 1.4 has a bug that makes the video stream to be rotated 90deg.
We can easily fix that with CSS.

````
    video {
        -moz-transform:rotate(90deg);
        transform:rotate(90deg);
    }
````

![ScreenShot](http://imgur.com/ugUIxmv.png)

Fixed! Great. As you can see I've also included a capture button that takes a snapshot of the current frame in a `<canvas>` element. This also includes a fix to rotate the image. You can see the entire code [in this gist](https://gist.github.com/piatra/9240045) .

# Debugging your application

The main tool for debugging applications is the App Manager. This contains most of the tools in the Developer Tools (DOM Inspector, Console, Debugger, Style Editor) hooked up to your physical device or simulator.
Debugging your Firefox OS application is really easy once you have everything set up.

### Prerequisites
1. [ADB Helper add-on](https://ftp.mozilla.org/pub/mozilla.org/labs/fxos-simulator/) helps manage the connection between the browser and the device
2. (*) Optional. On Linux I had to set up udev correctly so that the system would detect the device. You need to create `/etc/udev/rules.d/51-android.rules` with the following content

````
SUBSYSTEM=="usb", ATTR{idVendor}=="05c6", MODE="0666", GROUP="plugdev"
````

Where idVendor is a device specific code, `05c6` is the code for the Keon device. Make sure to reboot the device if you have issues or [read more about troubleshooting](https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager#Troubleshooting)

### Using the App manager
The [App manager](https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager) allows you to load applications in the browser and the send them to your device or to the [Firefox OS simulator](https://ftp.mozilla.org/pub/mozilla.org/labs/fxos-simulator/).

To access the App manager type in `about:app-manager` or go to Tool > Web Developer > App Manager. Here you can load you application manifest which you could serve using a local server.

![ScreenShot](http://imgur.com/I98onp9.png)

Submitting the manifest should make your application available in the app manager. Here you have an update button that allows you to submit changes to your device every time you update.

You should be able to connect to your device

![ScreenShot](http://imgur.com/oFoLMFy.png)

There is also a debug button specific to each application that you can use to essentially have a Developer Tool instance connected to your phone which is an indispensable tool.
There are some features missing, like the Network tab, but other than that Console, Style Editor, Debugger, Inspector are all available, even hovering over DOM elements will be highlighting on the device :)

![ScreenShot](http://imgur.com/ZasBnvI.png)

![ScreenShot](http://imgur.com/U6LZMJR.png)

Happy hacking! :)


































