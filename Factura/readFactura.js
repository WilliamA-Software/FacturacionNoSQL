function generarFactura() {

    var preObject = document.getElementById('object');
    var ulList = document.getElementById('list');
    var txtUID = document.getElementById('txtID').value;

    //INICIO DEL INTENTO
    var ref = firebase.database().ref().child('Factura');

    // Retrieve new posts as they are added to our database
    ref.on("child_added", function (snapshot, prevChildKey) {
        var newPost = snapshot.val();
        console.log("FacturaID: " + newPost.FacturaID);
        console.log("Fecha: " + newPost.Fecha);
        console.log("Previous Post ID: " + prevChildKey);

        if (newPost.FacturaID == txtUID) {
            console.log("Esta es: " + newPost.FacturaID);

            document.writeln('ID de Factura es: ' + newPost.FacturaID + '<br>');
            document.writeln('Su fecha es: ' + newPost.Fecha + '<br>');
            document.writeln('ID de Cliente es: ' + newPost.UserID + '<br>');
            document.writeln('Su compra es: ' + newPost.Contenido + '<br>');

            consultaNueva(newPost.UserID);
        }
    });
}


//FUNCION A LA QUE SI SE ESTA LLAMANDO
function consultaNueva() {

    //CONSULTANDO DATOS INICIALES
    var txtUID = document.getElementById('txtID').value;
    var dbRefObject = firebase.database().ref().child('Factura');
    var miCliente;

    dbRefObject.on("child_added", function (snapshot, prevChildKey) {
        var newPost = snapshot.val();
        console.log("FacturaID: " + newPost.FacturaID);
        console.log("Fecha: " + newPost.Fecha);
        console.log("Previous Post ID: " + prevChildKey);

        if (newPost.FacturaID == txtUID) {
            console.log("Esta es: " + newPost.FacturaID);

            document.writeln('<br><br> ID de Factura es: ' + newPost.FacturaID + '<br>');
            document.writeln('Su fecha es: ' + newPost.Fecha + '<br>');
            document.writeln('ID de Cliente es: ' + newPost.UserID + '<br>');
            miCliente = newPost.UserID;
            document.writeln('Su compra es: ' + newPost.Contenido + '<br>');
            
        }
    });

    

    

    //CONSULTANDO LOS PRODUCTOS
    var ref = firebase.database().ref().child('Factura/' + txtUID + '/Contenido/');

    ref.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            console.log("llave:" + childKey);

            var refer = firebase.database().ref().child('Factura/' + txtUID + '/Contenido/' + childKey);
            refer.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey2 = childSnapshot.key;
                    var childData2 = childSnapshot.val()
                    console.log("llave de la llave:" + childKey2);
                    console.log("valor de la llave de la llave:" + childData2);
                    document.writeln(childKey2 + ' : ' + childData2 + '<br>');
                });
            });

        });
    });

    // CONSULTANDO AL CLIENTE
    //INICIO DEL INTENTO
    var refer = firebase.database().ref().child('Cliente');

    // Retrieve new posts as they are added to our database
    refer.on("child_added", function (snapshot, prevChildKey) {
        var newPost = snapshot.val();
        console.log("Correo: " + newPost.Correo);
        console.log("Nombre: " + newPost.Nombre);
        console.log("Previous Post ID: " + prevChildKey);
        console.log("Esta es: " + newPost.ID);
        if (newPost.ID == miCliente) {
            document.writeln('Su nombre es: ' + newPost.Nombre + '<br>');
            document.writeln('Su correo es: ' + newPost.Correo + '<br>');    
        }

        

    });

}