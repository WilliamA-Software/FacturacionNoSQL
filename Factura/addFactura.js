function facturaID() {
    var txtid = document.getElementById('txtFacturaID').value;
    var txtclienteid = document.getElementById('generaFacutra').value;
    var databaseService = firebase.database();
    var referencia = databaseService.ref('Factura/' + txtid);
    var f = new Date();
    var fechaActural = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());

    // escribo en esa referencia
    referencia.set({
        FacturaID: txtid,
        UserID: txtclienteid,
        Fecha: fechaActural,
    }).then(function () {
        console.log('Factura correcta');
        document.getElementById('txtFacturaID').disabled = true;
        document.getElementById('btnFacturaID').disabled = true;

    })

}

function canastaProducto() {
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

function addRowFinal() {
    var txtid = document.getElementById("txtIDc").value;
    var txtnombre = document.getElementById("txtNombre").value;
    var txtprecio = document.getElementById("txtPrecio").value;
    var txtcantidad = document.getElementById("txtCantidad").value;
    var Resultado = (txtcantidad * txtprecio);



    var table = document.getElementById("tblGrid");
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = txtid;
    cell2.innerHTML = txtnombre;
    cell3.innerHTML = txtprecio;
    cell4.innerHTML = txtcantidad;
    cell5.innerHTML = Resultado;
    cell6.innerHTML = '<input type="button" value="Delete" onclick="removeRow(this)">'

    almacenar(txtid, txtnombre, txtcantidad, Resultado);



}


function removeRow(fila) {

    var i = fila.parentNode.parentNode.rowIndex;
    console.log('Este es el this: ' + i);
    document.getElementById("tblGrid").deleteRow(i);
    var txtid = document.getElementById("txtIDc").value;
    var txtfacturaid = document.getElementById('txtFacturaID').value;
    var databaseService = firebase.database();
    var referencia = databaseService.ref('Factura/' + txtfacturaid + '/Contenido/' + txtid);
    referencia.remove();
}

function almacenar(_id, _nombre, _cantidad, _resultado) {


    alert("Producto añadido");
    var txtfacturaid = document.getElementById('txtFacturaID').value;
    var databaseService = firebase.database();
    var referencia = databaseService.ref('Factura/' + txtfacturaid + '/Contenido/' + _id);

    // escribo en esa referencia
    referencia.set({
        ProductoID: _id,
        Nombre: _nombre,
        Resultado: _resultado,
        Cantidad: _cantidad,
    }).then(function () {
        console.log('Contenido correctamente');

        alert("Contenido correctamente");

    })
        .catch(function (error) {
            console.log('detectado un error', error);
            alert("Detectado un error");
        });

}


function generarFactura() {
    var txtgenerafactura = document.getElementById('generaFacutra').value;
    var txtfacturaid = document.getElementById('txtFacturaID').value;
    var databaseService = firebase.database();
    var referencia = databaseService.ref('Factura/' + txtfacturaid + '/');
    // escribo en esa referencia
    referencia.set({
        UserID: txtgenerafactura,

    }).then(function () {
        console.log('Cliente correctamente');

        alert("Cliente correctamente");
    })
        .catch(function (error) {
            console.log('detectado un error', error);
            alert("Detectado un error");
        });
    alert('Factura generada correctamente');
}