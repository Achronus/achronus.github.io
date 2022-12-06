document.addEventListener("DOMContentLoaded", function() {
  page_name = setActiveClass();
  setPortfolioTagFloats(page_name);

  if (document.getElementsByClassName('single-page').length > 0) {
    generateSidebarContents(4);
  }
  
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
          document.getElementById('mainNavBar').classList.remove('mt-4');
        } else {
          document.getElementById('site-navigation').classList.remove('sticky-nav');
          document.getElementById('mainNavBar').classList.add('mt-4');
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

$(document).ready(function() {
  // Add style to navbar toggler
  $(".navbar-toggler").click(function() {
    $("#site-navigation .container").toggleClass("toggler-bg");
  });

  $('.btn-previous').click(function() {
    $('.nav-item > .active').next('li').find('button').trigger('click');
  });

  $('.btn-next').click(function() {
    $('.nav-item > .active').next('li').find('button').trigger('click');
  });

  // Disable buttons in first and last tabs
  $('#tab-content .tab-pane:first-child .helper-btn .btn-previous').addClass('disabled');
  $('#tab-content .tab-pane:last-child .helper-btn .btn-next').addClass('disabled');
});


function setActiveClass() {
  // Get URL and convert into .nav-link format
  page_url = window.location.href;
  url_split = page_url.split('/')

  page_name = url_split[url_split.length - 1] // Last item
  page_name = '/' + page_name // homepage = '/', about = '/about', etc.

  // Get .nav-link href for comparsion
  nav_links = document.getElementById('mainNavBar').getElementsByClassName('nav-link');

  // Add active to correct link
  for (let i = 0; i < nav_links.length; i++) {
    if (page_name == nav_links[i].getAttribute('href')) {
      nav_links[i].classList.add('active');
    };
  };
  return page_name;
}

function setPortfolioTagFloats(page_name) {
  if (page_name == '/portfolio') {
    project_tags = document.getElementById('portfolio').getElementsByClassName('project-tag');
    for (let i = 0; i < project_tags.length; i++) {
      if (i % 2 == 0) {
        project_tags[i].classList.add('float-start');
      }
      else {
        project_tags[i].classList.add('float-end');	  
      }
    }
  }
}

function generateSidebarContents(n_words) {
  headers = $('.page-content .description h2, .page-content .description h3');
  toc = $('.sidebar #toc ul');

  // Create each header
  headers.each(function() {
    header_words = this.textContent.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ").split(' ');
    header_words = header_words.slice(0, n_words).join('-');
    
    var content = function(item, class_name) {
      toc.append('<li class="' + class_name + '"><a href="#' + header_words + '">' + item.textContent + '</a></li>');
    };

    if (this.tagName == 'H3') {
      content(this, 'subheading');
    }
    else {
      content(this, 'heading');
    }
    
    // Create anchor above header
    $('<div id="' + header_words + '" class="anchor"></div>').insertBefore(this);
  });
}