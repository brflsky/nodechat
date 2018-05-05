var socket = io();
let userID;

socket.on('connect', function () {
  const params = jQuery.deparam(window.location.search)

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('No error')
    }
  })
});

socket.on('userID', function (data) {
  userID = data.userID
  const formattedTime = moment(data.message.createdAt).format('hh:mm')
  const template = jQuery('#message-template').html()
  const html = Mustache.render(template, {
    text: data.message.text,
    from: data.message.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
})

socket.on('disconnect', function () {

  
});

socket.on('updateUserList', function (userList) {
  console.log('userList', userList)
  const ol = jQuery('<ol></ol>')
  userList.forEach(user => {
    ol.append(jQuery('<li></li>').text(user))
  })

  jQuery('#users').html(ol)
})

socket.on('newMessage', function (message) {

  const formattedTime = moment(message.createdAt).format('hh:mm')
  const template = jQuery('#message-template').html()
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
  // console.log('newMessage', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('hh:mm')
  const template = jQuery('#message-location-template').html()
  const html = Mustache.render(template, { ...message, createdAt: formattedTime })

  jQuery('#messages').append(html)

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');

  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    text: messageTextbox.val(),
    userID
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
