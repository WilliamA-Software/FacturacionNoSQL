function limpiar() {
  window.location.href = 'modificarCliente.html'
}

function modificarCliente() {
  var preObject = document.getElementById('object');
  var ulList = document.getElementById('list');
  var txtid = document.getElementById('txtID').value;

  // Tomar los nodos de la base de datos -- Tal cual esta el nombre en Firebase
  var dbRefObject = firebase.database().ref().child('Cliente');
  var dbRefList = dbRefObject.child(txtid);

  //INICIO DEL INTENTO
  var ref = firebase.database().ref().child('Cliente');

  // Retrieve new posts as they are added to our database
  ref.on("child_added", function (snapshot, prevChildKey) {
    var newPost = snapshot.val();
    console.log("Nombre: " + newPost.Nombre);
    console.log("Correo: " + newPost.Correo);
    console.log("Previous Post ID: " + prevChildKey);

    if (newPost.ID == txtid) {
      console.log("Esta es: " + newPost.ID);
      document.getElementById('txtIDc').value = newPost.ID;
      document.getElementById('txtNombre').value = newPost.Nombre;
      document.getElementById('txtCorreo').value = newPost.Correo;

    }
  });
}

function updateCliente() {
  document.getElementById("txtIDc").disabled = false;
  document.getElementById("txtNombre").disabled = false;
  document.getElementById("txtCorreo").disabled = false;
  document.getElementById("btnGuardarCambio").disabled = false;
  document.getElementById("btnEliminarCliente").disabled = false;
}

function DeleteCliente() {
  var txtid = document.getElementById('txtID').value;
  var databaseService = firebase.database();
  var referencia = databaseService.ref('Cliente/' + txtid);
  referencia.remove();
  alert("Cliente eliminado");
  document.getElementById("txtIDc").value = " ";
  document.getElementById("txtNombre").value = " ";
  document.getElementById("txtCorreo").value = " ";
}

function SaveCliente() {

  //Capturar en var los datos del campo
  var txtid = document.getElementById('txtIDc').value;
  var txtnombres = document.getElementById('txtNombre').value;
  var txtcorreo = document.getElementById('txtCorreo').value;

  var databaseService = firebase.database();
  var referencia = databaseService.ref('Cliente/' + txtid);

  // escribo en esa referencia
  referencia.update({
    ID: txtid,
    Nombre: txtnombres,
    Correo: txtcorreo
  }).then(function () {
    console.log('Cliente actualizado correctamente');
    document.getElementById('txtIDc').value = '';
    document.getElementById('txtNombre').value = '';
    document.getElementById('txtCorreo').value = '';

    alert("Cliente actualizado correctamente");
  })
    .catch(function (error) {
      console.log('detectado un error', error);
      alert("Detectado un error");
    });
}