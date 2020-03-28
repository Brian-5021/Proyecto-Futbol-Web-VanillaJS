 //cambia de color el navabar
 $(window).scroll(function() {
          if ($("#menu").offset().top > 56) {
              $("#menu").addClass("bg-dark");
          } else {
              $("#menu").removeClass("bg-dark");
          }
        });


//efecto de scroll suave
    $(document).ready(function() {
            $('a[href^="#"]').click(function() {
              var destino = $(this.hash);
              if (destino.length == 0) {
                destino = $('a[name="' + this.hash.substr(1) + '"]');
              }
              if (destino.length == 0) {
                destino = $('html');
              }
              $('html, body').animate({ scrollTop: destino.offset().top }, 800);
              return false;
            });
    });

    

    //Comienza Vanilla JS -------------------------------------------------------------------------

    var noticias = document.getElementById("nosotrosContenido");

    fetch('js/servicio.json')
      .then(res => res.json())
      .then(data => {
        datano = data.noticias;
        cards(datano);
      });

       function cards(datano){
        noticias.innerHTML = ``;

         for(let valor of datano){

          noticias.innerHTML += `<div class="card col-md-4 col-sm-12" style="width: 23rem;">
          <img src="${valor.imagen}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${valor.titulo}</h5>
            <p class="card-text">${valor.descripcion}.</p>
            <a href="${valor.link}" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>`;
        
        }
      }

//Formulario contactenos en LocalStorage

      //variables globales

      const formulario = document.querySelector('#formulario');
      

      let ArrayContacto = [];



      //funciones

      const CrearItem = (nombreUI,apellidoUI, asuntoUI, emailUI, descripcionUI) => {
        let item = {
          nombre:nombreUI,
          apellido:apellidoUI,
          asunto:asuntoUI,
          email:emailUI,
          descripcion:descripcionUI
        };

        ArrayContacto.push(item);

       
        //  console.log(ArrayContacto);
      };

      const GuardarDB = () => {

        localStorage.setItem('contacto', JSON.stringify(ArrayContacto));

        PintarDB();
      };


      const PintarDB = () => {
        
        const Traerdatos = localStorage.getItem('contacto');

        let modalcontacto = document.querySelector('#modalcon');

        modalcontacto.innerHTML = ``;

        ArrayContacto = JSON.parse(localStorage.getItem('contacto'));

        if(ArrayContacto === null){
          ArrayContacto = [];
        }

        else{
            //abrir el modal al recargar la página
            
              
          
          ArrayContacto.forEach(element => {
            modalcontacto.innerHTML = `<div class="modal" tabindex="-1" role="dialog" id="myModal">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Datos de contacto</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>apreciado usuario: ${element.nombre}  su mensaje ha sido guardado</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>`;
          });
        }

        
      

      };

      //variables divs formulario
      let divNombre = document.querySelector('#divNombre');
      let divApellido = document.querySelector('#divApellido');
      let divAsunto = document.querySelector('#divAsunto');
      let divEmail = document.querySelector('#divEmail');
      let divDescripcion = document.querySelector('#divDescripcion');



      const ValidacionesForm = (nombreUI, apellidoUI, asuntoUI, emailUI, descripcionUI) => {
        if (nombreUI == null || nombreUI.length == 0 || /^\s+$/.test(nombreUI)){
          
          divNombre.innerHTML = `<small id="passwordHelpBlock" class="form-text text-white">
          Por favor verifica el nombre y corrige los errores.
        </small>`;

        return false;

        }if (apellidoUI == null || apellidoUI.length == 0 || /^\s+$/.test(apellidoUI)){
          divApellido.innerHTML = `<small id="passwordHelpBlock" class="form-text text-white">
          Por favor verifica el apellido y corrige los errores.
        </small>`;
        return false;
        }
        else{
          
        }
        if (asuntoUI == null || asuntoUI.length == 0 || /^\s+$/.test(asuntoUI)){
          divAsunto.innerHTML = `<small id="passwordHelpBlock" class="form-text text-white">
          Por favor verifica el asunto y corrige los errores.
        </small>`;
        return false;
        }

        if (emailUI == null || emailUI.length == 0){
          divEmail.innerHTML = `<small id="passwordHelpBlock" class="form-text text-white">
          Por favor verifica el email y corrige los errores.
        </small>`;
        return false;
        }

        if (descripcionUI == null || descripcionUI.length == 0 || /^\s+$/.test(descripcionUI)){
          divDescripcion.innerHTML = `<small id="passwordHelpBlock" class="form-text text-white">
          Por favor verifica la descripción y corrige los errores.
        </small>`;
        return false;
        }
        else{
          divNombre.innerHTML = ``;
          divApellido.innerHTML = ``;
          divAsunto.innerHTML = ``;
          divEmail.innerHTML = ``;
          divDescripcion.innerHTML = ``;

          CrearItem(nombreUI, apellidoUI, asuntoUI, emailUI, descripcionUI);
          GuardarDB();

        }
      };

      //EventListeners
    
      formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let nombreUI      = document.querySelector('#nombre').value;
        let apellidoUI    = document.querySelector('#apellido').value;
        let asuntoUI      = document.querySelector('#asunto').value;
        let emailUI       = document.querySelector('#email').value;
        let descripcionUI = document.querySelector('#descripcion').value;

        ValidacionesForm(nombreUI, apellidoUI, asuntoUI, emailUI, descripcionUI);

        formulario.reset();

        
        $('#myModal').modal('show');
      });

      

      document.addEventListener('DOMContentLoaded', PintarDB); 