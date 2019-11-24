<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Websocket Frontend</title>
  <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="container">
    <div class="users">
      <div class="profil">
        <div class="foto"></div>
        <h3 id="nama-profil"></h3>
      </div>
      <div class="users-online" id="users-online">

      </div>
    </div>
    <div class="wrapper-chat">
      <div class="chat-with">
        <div class="foto-thumbnail"></div>
        <div class="nama" id="chat-with">Nama</div>
      </div>
      <div class="chats" id="chats">
        <!-- <div class="chat right">
            <div class="yours">Hello</div>
          </div>
          <div class="chat">
            <div class="reply">Hai, what's up?</div>
          </div> -->
      </div>
      <div class="pesan">
        <div class="input">
          <input type="text" id="txtPesan">
        </div>
        <button id="btnKirim">Kirim</button>
      </div>
    </div>
  </div>

  <script src="websocket.js"></script>
  <script src="script.js"></script>
</body>

</html>