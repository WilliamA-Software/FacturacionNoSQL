function agregarCliente() {
        
    //Capturar en var los datos del campo
        var txtid = document.getElementById('txtID').value;
        var txtnombres = document.getElementById('txtNombres').value;
        var txtcorreo = document.getElementById('txtCorreo').value;

        var databaseService = firebase.database();
        var referencia = databaseService.ref('Cliente/' + txtid);

        // escribo en esa referencia
      referencia.set({
        ID: txtid,
        Nombre: txtnombres,
        Correo: txtcorreo
        }).then(function() {
            console.log('Cliente almacenado correctamente');
            document.getElementById('txtID').value='';
        document.getElementById('txtNombres').value='';
        document.getElementById('txtCorreo').value='';

        alert("Cliente agregado correctamente");
        })
        .catch(function(error) {
            console.log('detectado un error', error);
            alert("Detectado un error");
        });

    }