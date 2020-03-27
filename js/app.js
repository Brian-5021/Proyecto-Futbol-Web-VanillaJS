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