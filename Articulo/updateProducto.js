function limpiar() {
    window.location.href = 'modificarCliente.html'
}

function modificarProducto() {
    var preObject = document.getElementById('object');
    var ulList = document.getElementById('list');
    var txtid = document.getElementById('txtID').value;

    // Tomar los nodos de la base de datos -- Tal cual esta el nombre en Firebase
    var dbRefObject = firebase.database().ref().child('Articulo');
    var dbRefList = dbRefObject.child(txtid);

    //INICIO DEL INTENTO
    var ref = firebase.database().ref().child('Articulo');

    // Retrieve new posts as they are added to our database
    ref.on("child_added", function (snapshot, prevChildKey) {
        var newPost = snapshot.val();
        console.log("Nombre: " + newPost.Nombre);
        console.log("Precio: " + newPost.Precio);
        console.log("Previous Post ID: " + prevChildKey);

        if (newPost.ID == txtid) {
            console.log("Esta es: " + newPost.ID);
            document.getElementById('txtIDc').value = newPost.ID;
            document.getElementById('txtNombre').value = newPost.Nombre;
            document.getElementById('txtPrecio').value = newPost.Precio;

        }
    });
}

function updateProducto() {
    document.getElementById("txtIDc").disabled = false;
    document.getElementById("txtNombre").disabled = false;
    document.getElementById("txtPrecio").disabled = false;
    document.getElementById("btnGuardarCambio").disabled = false;
    document.getElementById("btnEliminarProducto").disabled = false;
}

function DeleteProducto() {
    var txtid = document.getElementById('txtID').value;
    var databaseService = firebase.database();
    var referencia = databaseService.ref('Articulo/' + txtid);
    referencia.remove();
    alert("Producto eliminado");
    document.getElementById("txtIDc").value = " ";
    document.getElementById("txtNombre").value = " ";
    document.getElementById("txtPrecio").value = " ";
}

function saveProducto() {

    //Capturar en var los datos del campo
    var txtid = document.getElementById('txtIDc').value;
    var txtnombre = document.getElementById('txtNombre').value;
    var txtprecio = document.getElementById('txtPrecio').value;

    var databaseService = firebase.database();
    var referencia = databaseService.ref('Articulo/' + txtid);

    // escribo en esa referencia
    referencia.update({
        ID: txtid,
        Nombre: txtnombre,
        Precio: txtprecio
    }).then(function () {
        console.log('Precio actualizado correctamente');
        document.getElementById('txtIDc').value = '';
        document.getElementById('txtNombre').value = '';
        document.getElementById('txtPrecio').value = '';

        alert("Producto actualizado correctamente");
    })
        .catch(function (error) {
            console.log('detectado un error', error);
            alert("Detectado un error");
        });
}