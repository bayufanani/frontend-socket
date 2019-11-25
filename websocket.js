let connection = new WebSocket('wss://websocket-jajalan.herokuapp.com');
// let connection = new WebSocket('ws://127.0.0.1:3000');
let myUsername;
let activeWith;
let myChats = {};

document.addEventListener("DOMContentLoaded", function (event) {
  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  connection.onopen = function () {
    // connection is opened and ready to use
    tanyakanUsername();
  };

  connection.onerror = function (error) {
    // an error occurred when sending/receiving data
    alert('errro:' + error);
    console.log(error);
  };

  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    console.log(message.data);
    let jsonMessage = JSON.parse(message.data);
    switch (jsonMessage.aksi) {
      case 'refreshUserOnline':
        refreshUserOnline(jsonMessage.usernames);
        break;
      case 'terima':
        terimaPesan(jsonMessage.pesan, jsonMessage.pengirim);
        break;
      case 'tanyaLagi':
        tanyakanUsername(true);
        break;
      default:
        console.log('no action needed!');

        break;
    }

    /* try {
      var json = JSON.parse(message.data);
      console.log(json);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ',
        message.data);
      return;
    } */
    // handle incoming message
  };
});
/**
 * 
 * @param {array} usernames 
 */
function refreshUserOnline(usernames) {
  let el = document.getElementById('users-online');
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  usernames.forEach(function (username) {
    if (myUsername != username) {
      let elUser = document.createElement('div');
      elUser.className = 'user';
      elUser.onclick = function () {
        let el = document.getElementById('chat-with');
        el.innerHTML = username;
        activeWith = username;

        document.getElementsByClassName('empty')[0].classList.add('hidden');
        document.getElementsByClassName('chat-with')[0].classList.remove('hidden');
        document.getElementById('chats').classList.remove('hidden');
        document.getElementsByClassName('pesan')[0].classList.remove('hidden');

        loadMyChats(activeWith);
      };
      let elFotoThumbnail = document.createElement('div');
      elFotoThumbnail.className = 'foto-thumbnail';
      let h4 = document.createElement('h4');
      let h4Text = document.createTextNode(username);
      h4.appendChild(h4Text);
      elUser.appendChild(elFotoThumbnail);
      elUser.appendChild(h4);
      el.appendChild(elUser);
    }
  });
}

function loadMyChats(from) {
  let el = document.getElementById('chats');
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  if (myChats[from] == undefined) {
    myChats[from] = [];
  }
  myChats[from].forEach(function (chat) {
    console.log(chat);
    if (chat.tipe == 'reply') {
      addReply(chat.pesan);
    } else {
      addMyMessage(chat.pesan);
    }
  })
}

function terimaPesan(pesan, dari) {
  if (activeWith == dari) {
    addReply(pesan);
  }
  masukkankeMyChats(pesan, dari);
}

function addReply(pesan) {
  let el = document.getElementById('chats');
  let chat = document.createElement('div');
  chat.className = 'chat';
  let reply = document.createElement('div');
  reply.className = 'reply';
  let replyText = document.createTextNode(pesan);
  reply.appendChild(replyText);
  chat.appendChild(reply);
  el.appendChild(chat);
}

function addMyMessage(pesan) {
  let chat = document.createElement('div');
  chat.className = 'chat right';
  let yours = document.createElement('div');
  yours.className = 'yours';
  let yoursText = document.createTextNode(pesan);
  yours.appendChild(yoursText);
  chat.appendChild(yours);
  chats.appendChild(chat);
}

function masukkankeMyChats(pesan, dari) {
  if (myChats[dari] == undefined) {
    myChats[dari] = [];
  }

  let tipe = 'yours';
  let username = myUsername;
  if (dari != myUsername) {
    tipe = 'reply';
  }


  myChats[dari].push({
    pesan: pesan,
    tipe: tipe,
  });
}

function tanyakanUsername(lagi) {
  let greeting = 'Halo, masukkan nama anda:';
  if (lagi) {
    greeting = 'Username sudah digunakan, gunakan username lain:';
  }
  let username = prompt(greeting);
  daftarkanUsername(connection, username);
}

function daftarkanUsername(con, username) {
  let payload = convertToPayload({
    username: username,
    aksi: 'daftar'
  });
  con.send(payload);
  myUsername = username;
  document.getElementById('nama-profil').innerHTML = myUsername;
}

function convertToPayload(json) {
  return JSON.stringify(json);
}