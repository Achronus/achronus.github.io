document.addEventListener("DOMContentLoaded", function() {
  if (document.body.id != 'homepage') {
    // Create back to top button
    const scrollToTopButton = document.querySelector('.top-link');

    const scrollFunc = () => {
      let y = window.scrollY;
      
      // Add and remove sticky navbar styles
      var cList = document.body.classList;
      if(cList.contains('wiki-articles-template') || cList.contains('projects-template') || cList.contains('error404')) {
      }
      else {
        if (window.scrollY > 20) {
          document.getElementById('site-navigation').classList.add('sticky-nav');
        } else {
          document.getElementById('site-navigation').classList.remove('sticky-nav');
        } 
      }

      // Display button after view-height reached
      if (y > 500) {
        scrollToTopButton.className = "top-link show";
      } else {
        scrollToTopButton.className = "top-link hide";
      }
    };

    window.addEventListener("scroll", scrollFunc);

    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      
      // Scroll back to top
      if (c > 200) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 1.8);
      }
    };

    scrollToTopButton.onclick = function(e) {
      e.preventDefault();
      scrollToTop();
    };
  };
});

jQuery(document).ready(function() {
  // Add style to navbar toggler
  jQuery(".navbar-toggler").click(function() {
    jQuery("#site-navigation .container").toggleClass("toggler-bg");
  });

  jQuery('.btn-previous').click(function() {
    jQuery('.nav-item > .active').next('li').find('button').trigger('click');
  });

  jQuery('.btn-next').click(function() {
    jQuery('.nav-item > .active').next('li').find('button').trigger('click');
  });

  // Disable buttons in first and last tabs
  jQuery('#tab-content .tab-pane:first-child .helper-btn .btn-previous').addClass('disabled');
  jQuery('#tab-content .tab-pane:last-child .helper-btn .btn-next').addClass('disabled');

  // Main navbar active
  var current = location.pathname;
  $('#mainNavBar li.nav-item a').each(function() {
      var $this = $(this);
      // if the current path is like this link, make it active
      if($this.attr('href').indexOf(current) !== -1){
          $this.addClass('active');
      }
  });
});
