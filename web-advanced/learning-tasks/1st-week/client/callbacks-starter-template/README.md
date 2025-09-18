# Callback/Promises/Async-Await demo
In this demo we will play around with the different concepts, by building our own "fetch" library for GET requests.

It is important to understand that the fetch API was introduced a couple of years ago, but that we had to use a different way before to load data with AJAX. This was rather error prone and required a lot of code for each call. This old method is still working and shown in the starter-template.

In this demo you will build your own fetch library (only for GET calls), using different techniques: callbacks, promises, async-await.

Important: this program is working with NodeJS. Please run `npm install` to make sure the XMLHttpRequest library is installed.

1. Create a function `fetchWithCallbacks(url, cb)` that is able to send a request to a given `url`. Make the sure callback is called when the request is finished. Please use the error-first callback convention (the first parameter of the callback is an error object, the rest of the parameters are the data). Test the function by passing in a valid and an invalid url.
2. Create a function `fetchWithPromise(url)` that returns a promise. Test the function by passing in a valid and an invalid url.
3. Each function that returns a promise can be used by async/await.
