define(['firebase'], function(Firebase){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBM5_kF7QC78dQNFN6knyUaiItWUwsPmEA",
    authDomain: "nhg-toolkit.firebaseapp.com",
    databaseURL: "https://nhg-toolkit.firebaseio.com",
    projectId: "nhg-toolkit",
    storageBucket: "nhg-toolkit.appspot.com",
    messagingSenderId: "446279695669"
  };
  var app = Firebase.initializeApp(config);
  return app;
});