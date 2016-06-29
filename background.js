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