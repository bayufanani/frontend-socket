//@ts-check
/** @type HTMLElement */
let chats = document.getElementById('chats');
let txtPesan = /** @type HTMLInputElement */ (document.getElementById('txtPesan'));

window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('btnKirim').addEventListener('click', function () {
    mengirim({
      pesan: txtPesan.value,
      aksi: 'kirim',
      penerima: activeWith
    });
  });
});

function mengirim(payload) {
  let chat = document.createElement('div');
  chat.className = 'chat right';
  let yours = document.createElement('div');
  yours.className = 'yours';
  let yoursText = document.createTextNode(payload.pesan);
  yours.appendChild(yoursText);
  chat.appendChild(yours);
  let shouldScroll = false;
  let scrolled = chats.scrollTop + chats.clientHeight;
  if (scrolled == chats.scrollHeight) {
    shouldScroll = true;
  }
  chats.appendChild(chat);
  if (shouldScroll) {
    chats.scrollTo(0, chats.scrollHeight);
  }
  txtPesan.value = "";
  masukkankeMyChats(payload.pesan, activeWith);
  connection.send(convertToPayload(payload));
}