// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOlsiKiJdLCJpc3MiOiJmcm9udCIsInN1YiI6ImlzdGhpc2V2ZW5yZWFsMyJ9.JOoIWqEfwII13dzCrmlowqZILB4wZZN9Bv3jpX5RNTE";
// const authorization = "Bearer " + token;

var conversation;

var contacts = [];
var contacts_name = [];
var user_handles = [];

Front.on('conversation', function (data) {
    conversation = data.conversation;
    // console.log(conversation);
    if (!(contacts.indexOf(conversation.id) > -1)) {
        contacts.push(conversation.id);
        contacts_name.push(conversation.contact.name);
        user_handles.push(conversation.contact.handle);
    }
    updateTable();
})


function set_user_sleep() {
  for (var ind = 0; ind < user_handles.length; ind++){
      $.ajax({
        method: 'GET',
        url: '/sleep/' + user_handles[ind] + '/',
        success: function(data) {
          console.log(data);
        }
      });
  }
  return false;
}

function removeFrom(id) {
    console.log(contacts_name[contacts_name.indexOf(contacts_name[id])]);
    console.log(contacts[contacts.indexOf(contacts[id])]);
    contacts.splice(contacts.indexOf(contacts[id]), 1);
    contacts_name.splice(contacts_name.indexOf(contacts_name[id]), 1);
    updateTable();
}

function updateTable() {
    var table = $('<table></table>').addClass('table');
    for (var i = 0; i < contacts.length; i++) {
        var row = $('<tr></tr>').addClass('rowrow');
        var entry = $('<td></td>').addClass('entry').text(contacts_name[i]);
        row.append(entry).append($('<td></td>').append($('<button></button>').text('Remove').click(function(){
            removeFrom(i);
        })));
        table.append(row);
    }
    $('#jtable').empty();
    $('#jtable').append(table);
}
