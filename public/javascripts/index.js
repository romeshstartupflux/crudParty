listAll(1);
party();
//angularFunction();

// $(document).ready(function(){
//   $("#create-party-form").on('submit', function(event){
//     event.preventDefault();
//     $.ajax({
//       url: "creatparty",
//       method: "POST",
//       data: $(this).serialize(),
//       dataType: "json",
//       beforeSend: function(){
//         $('#createparty').attr('disabled', 'disabled');
//       },
//       success: function(data){
//         $('#createparty').atttr('disabled', false);
//         if(data.name){
//           var html = '<tr>';
//           html += '<td>'+data.name+'</td>';
//           html += '<td>'+data.party+'</td></tr>';
//           $('#listall-table').append(html);
//           $('#create-party-form')[0].reset();
//         }
//       }
//     })
//   });
// });

/**   C R E A T E   P A R T Y    T A B    */
function party(){
  console.log("CREATE PARTY TAB CALLED.")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("partydashboard").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/createparty", true);
  xhttp.send();
}

/**   S E A R C H   P A R T Y   T A B   */
function searchparty(){
  console.log("SEARCH PARTY TAB CALLED")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("partydashboard").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/search", true);
  xhttp.send();
}

/**   A D D   P A R T Y   T A B  */
function addparty(){
  console.log("ADD PARTY TAB CALLED.")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("partydashboard").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/add", true);
  xhttp.send();
}

/**   D E L E T E    P A R T Y   T A B   */
function deletetab(){
  console.log("DELETE PARTY CALLED.")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("partydashboard").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/deletetab", true);
  xhttp.send();
}

// /**           C R E A T E          */
function createParty() {  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = "Success";
    }
  };
  
  var formData = {
    name : document.getElementById('name'),
    party : document.getElementById('party')
  };
  console.log(formData.name.value)
  xhttp.open("POST", "createParty", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("name="+ formData.name.value +"&party="+formData.party.value);
  // listAll();
}

/**     S E A R C H         */
function showParty(str) {
  var xhttp;  
  if (str == "") {
    document.getElementById("search").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("search").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/searchparty?name="+str, true);
  xhttp.send();
}


/**       L I S T     A L L               */
function listAll(str) {
  console.log("LIST ALL CALLED.")
  var xhttp;  
  if (str == "") {
    document.getElementById("listAll").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("listAll").innerHTML = this.responseText;
    }

  };
  xhttp.open("GET", "/listall/"+str, true);
  xhttp.send();
}

/**       D E L E T E    A L L               */
function deleteParty(str) {
  console.log("Delete Party Called.")
  var xhttp;  
  if (str == "") {
    document.getElementById("").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("").innerHTML = this.responseText;
    }

  };
  xhttp.open("GET", "/delete?name="+str, true);
  xhttp.send();
}

/**    D E L E T E    O N E     */
function deleteone(){
  console.log("DELETE ONE FUNCTION CALLED IN JS FILE");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = "Success";
    }
  };
  
  var formData = {
    name : document.getElementById('name'),
    partyValue : document.getElementById('partyValue')
  };
  console.log(formData.partyValue.value)
  xhttp.open("POST", "deleteone", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("name="+ formData.name.value +"&party="+formData.partyValue.value);
}

/**   L I S T   A L L   P A G I N A T I O N   */

