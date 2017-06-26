var updateButton = document.getElementById('update');

updateButton.addEventListener('click', function() {
  // Make Fetch PUT request (at frontend public JS) - send JSON
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( {'name': 'Darth Vader', 'quote': 'I find your lack of faith disturbing.' } )
  }).then(res => {
      if (res.ok) return res.json();
    }).then(data => {
      console.log(data);
      window.location.reload(true);
    });
  });

var deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  }).
  then(data => {
    console.log(data);
    window.location.reload();
  });
});