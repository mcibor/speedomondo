// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//   var patt = /.*endomondo.*users.*workouts.*/;
//   if(tab.active && changeInfo.url && patt.test(changeInfo.url)){
//     chrome.tabs.sendMessage(
//       tabId, 
//       {    
//         newWorkout: true
//       }, 
//       function(response){
//         console.log(response);
//       });
//   }
// });

// Data from endomondo toopltip: [duration,distance,speed,altitude]
// var lastData = null;

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if ("start" in request &&
//     "end" in request &&
//     request.start.length == 4 &&
//     request.end.length == 4) {
//       console.log(request);
//       sendResponse("OK");
//   }
//   else
//     sendResponse("Bad request.");
// })