var socket = io();
// const { connect } = require("../../routes");

// var peer = new Peer(undefined,{
//   path:'/peerjs',
//   host:'/',
//   port:'3000'
// });
let user_name = prompt("What's your Name");


const peer = new Peer({
  host: "0.peerjs.com",
  port: 443,
  path: "/",
  pingInterval: 5000,
});

// const conn = peer.connect("other-peer-id");
// conn.on("open", () => {
//   conn.send("Hello World!");
// });
// conn.on("data", (data) => {
//   console.log("Received data", data);
// });


peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id) ;
 
})



var videoGrid=document.querySelector("#video-grid");
var myVideo=document.createElement('video')
myVideo.muted=true;

let myVideoStream;
navigator.mediaDevices.getUserMedia({
  video:true,
  audio:true
}).then(function(stream){
  myVideoStream=stream;
  addVideoStream(myVideo,stream);

   peer.on('call',call=>{
    call.answer(stream)
    const video =document.createElement('video')
    call.on('stream',userVideoStream=>{
      addVideoStream(video,userVideoStream)
   })
  })
 
  socket.on('user-connected',(userId)=>{
    connecToNewUser(userId,stream);
  })

    let text =$('input')
  $('html').keydown((e)=>{
    if(e.which==13 && text.val().length!==0){
      console.log(text.val())
      socket.emit('message',text.val());
      text.val('')
    }
  })


  socket.on('createMessage',message=>{
  $('ul').append(`<li class="message"><b>user</b><br/>${message}</li>`)
  scrollToBottom()
  })

}) 




const connecToNewUser =(userId,stream)=>{
  // console.log(userId);
  const call = peer.call(userId,stream)
  const video =document.createElement('video')
  call.on('stream',userVideoStream=>{
    addVideoStream(video,userVideoStream)
  })
  
}

var addVideoStream =function(video,stream){
  video.srcObject=stream;
  video.addEventListener('loadedmetadata',function(){
    video.play();
  })
  videoGrid.append(video);
}

// socket.on('msg', function(data){
//  console.log("hey")
//    })
const scrollToBottom =()=>{
   let d =$('.main__chat_window')
   d.scrollTop(d.prop("scrollHeight"))
}



const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}

const playStop = () => {
  console.log('object')
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function() {
  // Function to handle leaving the meeting
  function leaveMeeting() {
    // Here you can add the code to leave the meeting, such as disconnecting from the video conference or redirecting the user to another page
    console.log("Leaving the meeting...");
    // For example, you might want to redirect the user to another page
    window.location.href = "review.ejs";
  }

  // Add click event listener to the "Leave Meeting" span
  document.querySelector(".leave_meeting").addEventListener("click", leaveMeeting);
});
document.addEventListener("DOMContentLoaded", function() {
  // Array to store participant names
  const participants = [];

  // Function to handle leaving the meeting
  function leaveMeeting() {
      console.log("Leaving the meeting...");
      // Add logic to leave the meeting
  }

  // Function to handle sending chat message
  function sendMessage() {
      // const userName = document.getElementById("user_name").value;
      const userName =  user_name;
      const messageInput = document.getElementById("chat_message").value;

      // Display the message with the user's name
      // const message = `<li><span class="user">${user_name}:</span> ${messageInput}</li>`;
      const message = `<li><span class="user" style="color: ;">${user_name}:</span> ${messageInput}</li>`;

      document.querySelector(".messages").innerHTML += message;

      // Clear the message input field
      document.getElementById("chat_message").value = "";
  }

  // Function to handle showing participants
  function showParticipants() {
      alert(`Participants (${participants.length}): ${participants.join(", ")}`);
  }

  // Add click event listener to the "Leave Meeting" span
  document.querySelector(".leave_meeting").addEventListener("click", leaveMeeting);

  // Add click event listener to the send message button
  document.querySelector(".main__message_container input[type='text']").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
          sendMessage();
      }
  });

  // Add click event listener to the participants button
  document.getElementById("participants_button").addEventListener("click", showParticipants);
});
document.addEventListener("DOMContentLoaded", function() {
  // Array to store participant names
  const participants = [];

  // Function to handle leaving the meeting
  function leaveMeeting() {
      console.log("Leaving the meeting...");
      // Add logic to leave the meeting
  }

  // Function to handle sending chat message
  function sendMessage() {
      const userName = document.getElementById("user_name").value;
      const messageInput = document.getElementById("chat_message").value;

      // Display the message with the user's name
      const message = `<li><span class="user">${userName}:</span> ${messageInput}</li>`;
      document.querySelector(".messages").innerHTML += message;

      // Clear the message input field
      document.getElementById("chat_message").value = "";
  }

  // Function to handle showing participants
  function showParticipants() {
      alert(`Participants (${participants.length}): ${participants.join(", ")}`);
  }

  // Add click event listener to the "Leave Meeting" span
  document.querySelector(".leave_meeting").addEventListener("click", leaveMeeting);

  // Add click event listener to the send message button
  document.querySelector(".main__message_container input[type='text']").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
          sendMessage();
      }
  });

  // Add click event listener to the participants button
  document.getElementById("participants_button").addEventListener("click", showParticipants);
});
// Function to open the chat popup
function openChatPopup() {
  document.getElementById("chatPopup").style.display = "block";
}

// Function to close the chat popup
function closeChatPopup() {
  document.getElementById("chatPopup").style.display = "none";
}
// Function to open the chat popup (only for small screens)

