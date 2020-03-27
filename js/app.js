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


    //Comienza Vanilla JS

    var noticias = document.getElementById("nosotrosContenido");

    fetch('js/servicio.json')
      .then(res => res.json())
      .then(data => {
        // console.log(data.noticias);

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