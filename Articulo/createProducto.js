function agregarProducto() {
        
    //Capturar en var los datos del campo
        var txtid = document.getElementById('txtID').value;
        var txtnombre = document.getElementById('txtNombre').value;
        var txtprecio = document.getElementById('txtPrecio').value;

        var databaseService = firebase.database();
        var referencia = databaseService.ref('Articulo/' + txtid);

        // escribo en esa referencia
      referencia.set({
        ID: txtid,
        Nombre: txtnombre,
        Precio: txtprecio
        }).then(function() {
            console.log('Producto agregado correctamente');
            document.getElementById('txtID').value='';
        document.getElementById('txtNombre').value='';
        document.getElementById('txtPrecio').value='';

        alert("Producto agregado correctamente");
        })
        .catch(function(error) {
            console.log('detectado un error', error);
            alert("Detectado un error");
        });

    }