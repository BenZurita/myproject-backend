(function ($) {

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  //navigation
  $('.navigation').onePageNav({
    scrollOffset: 0
  });

  $(".navbar-collapse a").on('click', function () {
    $(".navbar-collapse.collapse").removeClass('in');
  });

  //

  // Smooth scroll for the get started button
  $('.btn-get-started').on('click', function(e) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top 
        }, 700);
      }
  });

  // Fixed navbar
  $(window).scroll(function () {

    var scrollTop = $(window).scrollTop();

    if (scrollTop > 200) {
      $('.navbar-default').css('display', 'block');
      $('.navbar-default').addClass('fixed-to-top');

    } else if (scrollTop == 0) {

      $('.navbar-default').removeClass('fixed-to-top');
    }
  });

  // Intro carousel
  var introCarousel = $("#introCarousel");
  var introCarouselIndicators = $("#intro-carousel-indicators");
  introCarousel.find(".carousel-inner").children(".item").each(function(index) {
    (index === 0) ?
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

    $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') +"')");
    $(this).children('.carousel-background').remove();
  });

  // introCarousel.on('slid.bs.carousel', function (e) {
  //   $(this).find('h2').addClass('animated fadeInDown');
  //   $(this).find('p').addClass('animated fadeInUp');
  //   $(this).find('.btn-get-started').addClass('animated fadeInUp');
  // });


  //parallax
  if ($('#parallax1').length || $('#parallax2').length) {

    $(window).stellar({
      responsive: true,
      scrollProperty: 'scroll',
      parallaxElements: false,
      horizontalScrolling: false,
      horizontalOffset: 0,
      verticalOffset: 0
    });

  }

  function navbar() {

    if ($(window).scrollTop() > 1) {
      $('#navigation').addClass('show-nav');
    } else {
      $('#navigation').removeClass('show-nav');
    }

  }

  $(document).ready(function () {

    var browserWidth = $(window).width();

    if (browserWidth > 560) {

      $(window).scroll(function () {
        navbar();
      });
    }

  });


  $(window).resize(function () {

    var browserWidth = $(window).width();

    if (browserWidth > 560) {

      $(window).scroll(function () {
        navbar();
      });
    }

  });


  // Carousel
  $('.service .carousel').carousel({
    interval: 4000
  })

  //works
  $(function () {
    Grid.init();
  });

  //animation
  new WOW().init();

})(jQuery);
function enviar(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Obtener todos los elementos input del formulario
  var inputs = document.querySelectorAll('input');

  // Verificar si todos los campos obligatorios están llenos
  var todosLlenos = true;
  var valores = {};
  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].required && inputs[i].value === '') {
          todosLlenos = false;
          break;
      }
      valores[inputs[i].name] = inputs[i].value;
  }

  // Si todos los campos están llenos, enviar el formulario y mostrar mensaje de éxito
  if (todosLlenos) {
      document.getElementById('sendmessage').style.display = 'block';
      document.getElementById('errormessage').style.display = 'none';

      // Limpiar los campos del formulario
      for (var i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
      }

      // Cambiar el texto del botón "Enviar"
      var botonEnviar = document.querySelector('button[type="submit"]');
      botonEnviar.textContent = 'Enviado correctamente';
      botonEnviar.disabled = true; // Deshabilitar el botón para evitar múltiples envíos

      // Simular la acción de envío del formulario (puedes reemplazar esto con la lógica real de envío)
      setTimeout(function() {
          botonEnviar.textContent = 'Enviar';
          botonEnviar.disabled = false;
      }, 2000); // Esperar 2 segundos antes de volver a habilitar el botón

      // Generar un número basado en la combinación única de datos
      var hash = generarHash(Object.values(valores).join(''));
      var numeroAleatorio = Math.abs(hash % 100) + 1;
      document.getElementById('numeroAleatorio').textContent = numeroAleatorio;

      // Enviar los datos al servidor
      fetch('https://congresosoftalmi.vercel.app/enviar', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(valores)
      })
      .then(response => response.text())
      .then(data => {
          console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
          console.error('Error al enviar los datos:', error);
      });
  } else {
      // Mostrar mensaje de error si algún campo está vacío
      document.getElementById('sendmessage').style.display = 'none';
      document.getElementById('errormessage').style.display = 'block';
      document.getElementById('errormessage').textContent = 'Por favor, completa todos los campos obligatorios.';
  }
}

function generarHash(str) {
  var hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contactForm');
  form.addEventListener('submit', enviar);

  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
      input.addEventListener('input', function() {
          if (input.checkValidity()) {
              input.classList.remove('invalid');
              input.classList.add('valid');
          } else {
              input.classList.remove('valid');
              input.classList.add('invalid');
          }
      });
  });
});
