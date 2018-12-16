$(document).ready(function() {
  //-------------------------
  // Set blank localStorage
  //-------------------------
  // localStorage.clear();
  if(localStorage.getItem('Email Address') === null) { localStorage.setItem('Email Address', ''); }
  if(localStorage.getItem('Password') === null) { localStorage.setItem('Password', ''); }
  if(localStorage.getItem('File Name') === null) { localStorage.setItem('File Name', ''); }
  if(localStorage.getItem('Remember Email') === null) { localStorage.setItem('Remember Email', ''); }
  if(localStorage.getItem('Remember Password') === null) { localStorage.setItem('Remember Password', ''); }
  if(localStorage.getItem('Checkbox') === null) { localStorage.setItem('Checkbox', ''); }
  if(localStorage.getItem('Counter') === null) { localStorage.setItem('Counter', ''); }

  //------------------------
  // Variables
  //------------------------
  // localStorage variables
  var storedEmail = localStorage.getItem('Email Address');
  var storedPassword = localStorage.getItem('Password');
  var rEmail = localStorage.getItem('Remember Email');
  var rPass = localStorage.getItem('Remember Password');

  // Set profile values
  $('#profileEmail').val(storedEmail);
  $('#profilePassword').val(storedPassword);

  // Checking variables
  console.log("storedEmail: " + storedEmail);
  console.log("storedPassword: " + storedPassword);

  //------------------------
  // Remember Me Checkbox
  //------------------------
  if (localStorage.getItem('Checkbox') != '') {
    $('.form-check-input').attr('checked', 'checked');
    $('#loginEmail').val(rEmail);
    $('#loginPassword').val(rPass);
  } else {
    $('.form-check-input').removeAttr('checked');
    $('#loginEmail').val('');
    $('#loginPassword').val('');
  }

  // Click on input
  $('.form-check-input').click(function() {
    if ($('.form-check-input').is(':checked')) {
      // Save username and password
      localStorage.setItem('Remember Email', $('#loginEmail').val());
      localStorage.setItem('Remember Password', $('#loginPassword').val());
      localStorage.setItem('Checkbox', $('#rememberMe').val());
    } else {
      localStorage.setItem('Remember Email', '');
      localStorage.setItem('Remember Password', '');
      localStorage.setItem('Checkbox', '');
    }
  });

  //------------------------
  // Run functions
  //------------------------
  loginBtn();
  signupBtn();
  forgotPassBtn();
  sentEmailBtn(storedEmail);
  profileBtnChange();
  hamburgerMenu();
  loginFormValidation(storedEmail, storedPassword);
  getProducts();
  getBrandLogos();
  saveCustomizer();

  //-------------------------
  // Mini scripts
  //-------------------------
  // .main-btn styled buttons
  $(".main-btn").click(function() {
    window.location.href = './customizer.html';
  });

  // logout button
  $(".logout").click(function() {
    // logout & redirect to homepage
    window.location.href = './index.html';
  });

  // Sign up button
  $("#signupFormSubmit").click(function() {
    signupFormValidation();
  });

  // Change login information
  $("i.fas.fa-cog").click(function() {
    // Enable fields
    $("#profileEmail").prop('disabled', false);
    $("#profilePassword").prop('disabled', false);
    $(".details-content .alert-success").fadeIn().css('display', 'block');
    setTimeout(function() {
      $("#profileEmail").prop('disabled', true);
      $("#profilePassword").prop('disabled', true);
      $(".details-content .alert-success").fadeOut().css('display', 'none');
    }, 60000); // Unlocked for 1 minute

    // Profile Page - Change Email
    $("#profileEmail").change(function() {
      if($('#profileEmail').val() == '') {
        $(".details-content .alert-danger").toggle(function() {
          $("#reqProEmail").fadeIn().css('display', 'block');
        });
      } else if( $("#profileEmail").not(':contains("@")') ) {
        $(".details-content .alert-danger").toggle(function() {
          $("#invalidProEmail").fadeIn().css('display', 'block');
          $("#reqProEmail").fadeIn().css('display', 'none');
        });
      } else {
        $("#reqProEmail").fadeIn().css('display', 'none');
        $("#invalidProEmail").fadeIn().css('display', 'none');
        localStorage.setItem('Email Address', $('#profileEmail').val());
      }
    });
    // Profile Page - Change Password
    $("#profilePassword").change(function() {
      localStorage.setItem('Password', $('#profilePassword').val());
    });
  });

  // Change image colour
  $("#colourInput").change(function() {
    $("#colour-overlay").css('background-color', $("#colourInput").val());
  });

  // Set mask for customizer onload
  $('#colour-overlay').css('-webkit-mask-image', 'url("assets/products/product1.png")');
  $('#colour-overlay').css('-moz-mask-image', 'url("assets/products/product1.png")');
  $('#colour-overlay').css('-ms-mask-image', 'url("assets/products/product1.png")');
  $('#colour-overlay').css('mask-image', 'url("assets/products/product1.png")');

}); // End of document.ready()

//-------------------------
// Custom Functions
//-------------------------
// login function
function loginBtn() {
  // login button
  $(".login").click(function() {
    var effect = $("#loginModal").toggle("fold", "slow");
    $.when( effect ).done(function() {
      $("#loginModal").css('display', 'block');
    });
  });

  // login button (signup page)
  $(".loginBtn").click(function() {
    var effect = $("#signupModal").toggle("fold", "slow");
    $("#loginModal").css('display', 'block');
    $.when( effect ).done(function() {
      $("#signupModal").css('display', 'none');
    });
  });

  // back button
  $("#backBtn").click(function() {
    var effect = $("#forgotPassModal").toggle("fold", "slow");
    $("#loginModal").css('display', 'block');
    $.when( effect ).done(function() {
      $("#forgotPassModal").css('display', 'none');
    });
  });

  // done button
  $(".doneBtn").click(function() {
    var effect = $("#sentEmailModal").toggle("fold", "slow");
    $("#loginModal").css('display', 'block');
    $.when( effect ).done(function() {
      $("#sentEmailModal").css('display', 'none');
    });
  });

  // loginModal close
  $('#loginModal .close').click(function() {
    var effect = $("#loginModal").toggle("fold", "slow");
    $.when( effect ).done(function() {
      $("#loginModal").css('display', 'none');
    });
  });
}

// signup function
function signupBtn() {
  // signup button
  $(".signup").click(function() {
    var effect = $("#signupModal").toggle("fold", "slow");
    $.when( effect ).done(function() {
      $("#signupModal").css('display', 'block');
    });
  });

  // signupBtn (login page)
  $(".signupBtn").click(function() {
    var effect = $("#signupModal").toggle("fold", "slow");
    $("#signupModal").css('display', 'block');
    $.when( effect ).done(function() {
      $("#loginModal").css('display', 'none');
    });
  });

  // signupModal close
  $('#signupModal .close').click(function() {
    var effect = $("#signupModal").toggle("fold", "slow");
    $.when( effect ).done(function() {
      $("#signupModal").css('display', 'none');
    });
  });
}

// forgotPass function
function forgotPassBtn() {
  // forgotPass button
  $(".forgotPass").click(function() {
    var effect = $("#forgotPassModal").toggle("fold", "slow");
    $("#forgotPassModal").css('display', 'block');
    $.when( effect ).done(function() {
      $("#loginModal").css('display', 'none');
    });
  });

  // forgotPassModal close
  $('#forgotPassModal .close').click(function() {
    var effect = $("#forgotPassModal").toggle("fold", "slow");
    $.when( effect ).done(function() {
      $("#forgotPassModal").css('display', 'none');
    });
  });
}

// hamburger Menu function
function hamburgerMenu() {
  // Hamburger menu
  $(".hamburger-menu .toggle-container").click(function() {
    var effect = $(".hb-nav").toggle("fold", "slow");
    $("#header .logo").css('display', 'none');
    $(".toggle-container").css('display', 'none');
    $(".hb-content").css('background-color', '#1787C1');
    $("#header .hamburger-menu li").css('display', 'inherit');
    $.when( effect ).done(function() {
      $(".hb-nav").addClass('menu-show');
      $(".hb-nav").removeClass('menu-hide');
    });
  });

  // Hamburger menu close
  $('.hamburger-menu .close').click(function() {
    var effect = $(".hb-nav").toggle("fold", "slow");
    $(".hb-content").css('background-color', '#fff');
    $("#header .hamburger-menu li").css('display', 'none');
    $.when( effect ).done(function() {
      $(".hb-nav").removeClass('menu-show');
      $(".hb-nav").addClass('menu-hide');
      $("#header .logo").css('display', 'block');
      $(".toggle-container").css('display', 'block');
    });
  });
}

// sentEmail function
function sentEmailBtn(storedEmail) {
  // sentEmail button
  $("#sentEmail").click(function() {
    // sent email form validation
    console.log($("#forgotEmail").val());
    if($("#forgotEmail").val() == "") {
      $("#forgotPassForm .alert-danger").css('display', 'block');
      $("#errorNoEmailInput").css('display', 'block');
      $("#errorInvalidEmail").css('display', 'none');
    } else if($("#forgotEmail").val() != storedEmail && $("#forgotEmail").val() != "") {
      $("#errorNoEmailInput").css('display', 'none');
      $("#forgotPassForm .alert-danger").css('display', 'block');
      $("#errorInvalidEmail").css('display', 'block');
    } else {
      $("#forgotPassForm .alert-danger").css('display', 'none');
      // Animate to sentEmailModal
      var effect = $("#sentEmailModal").toggle("fold", "slow");
      $("#sentEmailModal").css('display', 'block');
      $.when( effect ).done(function() {
        $("#forgotPassModal").css('display', 'none');
      });
    }
  });

  // sendEmailModal close
  $('#sentEmailModal .close').click(function() {
    var effect = $("#sentEmailModal").toggle("fold", "slow");
    $.when( effect ).done(function() {
      $("#sentEmailModal").css('display', 'none');
    });
  });
}

// Profile page button styling change
function profileBtnChange() {
  // Main button click scroll 
  $("#primaryBtn").click(function() {
    $("html, body").animate({
      scrollTop: $("#my-details").offset().top - 150
    }, 1000);
  });

  // Secondary button click scroll
  $("#secondaryBtn").click(function() {
    //$(".line-break").scrollTop();
    $("html, body").animate({
      scrollTop: $(".line-break").offset().top - 80
    }, 1000);
  });

  var targetHeight = $('#profile #saved-work').outerHeight();
  // Scroll logic
  $(window).scroll(function() {
    /* 
    // Debugging purposes
    console.log(window.pageYOffset + ' > ' + targetHeight);
    console.log('window.pageYOffset Position: ' + window.pageYOffset);
    */

    if (window.pageYOffset > targetHeight) {
      // Change styling for secondary button
      $("#profile a#secondaryBtn").removeClass('secondary-btn');
      $("#profile a#secondaryBtn").addClass('profile-main-btn');
      // Change styling for main button
      $("#profile a#primaryBtn").removeClass('profile-main-btn');
      $("#profile a#primaryBtn").addClass('secondary-btn');
    } else {
      // Change styling for main button
      $("#profile a#primaryBtn").removeClass('secondary-btn');
      $("#profile a#primaryBtn").addClass('profile-main-btn');
      // Change styling for secondary button
      $("#profile a#secondaryBtn").removeClass('profile-main-btn');
      $("#profile a#secondaryBtn").addClass('secondary-btn');
    }
  });
}

// Login form validation function
function loginFormValidation(storedEmail, storedPassword) {
  $("#loginFormSubmit").click(function() {
    if($("#loginEmail").val() == "" || $("#loginPassword").val() == "") {
      $("#loginForm .alert-danger").css('display', 'block');
      $("#errorMissingField").css('display', 'block');
      $("#errorLogin").css('display', 'none');
    } else if($("#loginEmail").val() != storedEmail || $("#loginPassword").val() != storedPassword) {
      $("#errorMissingField").css('display', 'none');
      $("#loginForm .alert-danger").css('display', 'block');
      $("#errorLogin").css('display', 'block');
    } else {
      $("#loginForm .alert-danger").css('display', 'none');
      window.location.href = './profile.html';
    }
  });
}

// Signup form validation function
function signupFormValidation() {
  // signup form validation
  if($("#signupForm input").val() == "") {
    $("#signupForm .alert-danger").css('display', 'block');
    // Email input
    if($("#email").val() == "") {
      $(".email-input #emailRequired").css('display', 'block');
      $("#email").change(function() {
        $(".email-input .alert-danger").css('display', 'none');
      });
    }
    // Confirm email input
    if($("#confirmEmail").val() == "") {
      $(".confirmEmail-input #cEmailRequired").css('display', 'block');
      $(".confirmEmail-input #errorConfirmEmail").css('display', 'none');
      $("#confirmEmail").change(function() {
        if($("#confirmEmail").val() != $("#email").val()) {
          $(".confirmEmail-input #cEmailRequired").css('display', 'none');
          $(".confirmEmail-input #errorConfirmEmail").css('display', 'block');
        } else {
          $(".confirmEmail-input .alert-danger").css('display', 'none');
        }
      });
    }
    // Password input
    if($("#password").val() == "") {
      $(".password-input #passwordRequired").css('display', 'block');
      $("#password").change(function() {
        $(".password-input .alert-danger").css('display', 'none');
      });
    }
    // Confirm password input
    if($("#confirmPassword").val() == "") {
      $(".confirmPassword-input #cPasswordRequired").css('display', 'block');
      $(".confirmPassword-input #errorConfirmPassword").css('display', 'none');
      $("#confirmPassword").change(function() {
        if($("#confirmPassword").val() != $("#password").val()) {
          $(".confirmPassword-input #cPasswordRequired").css('display', 'none');
          $(".confirmPassword-input #errorConfirmPassword").css('display', 'block');
        } else {
          $(".confirmPassword-input .alert-danger").css('display', 'none');
        }
      });
    }
  } else {
    $("#signupForm .alert-danger").css('display', 'none');
    localStorage.setItem('Email Address', $("#email").val());
    localStorage.setItem('Password', $("#password").val());
    window.location.href = './profile.html';
  }
}

var pImg = '';
// Get products function - outputs product images into ul container
function getProducts() {
  for (i = 0; i < 2; i++) {
      var imgSrc = "assets/products/product" + (i + 1) + ".png",
          imgAlt = "product " + (i + 1),
          imgId = "product" + (i + 1),
          imgWidth = "100px",
          imgClass = "product-img";
    pImg += '<li><img id="' + imgId + '" class="' + imgClass + '" src="' + imgSrc + '" alt="' + imgAlt + '" width="' + imgWidth + '"></li>';
  }
  $(".product-selection ul").html(pImg);
  // console.log(img);
  addProduct();

  // On icon click
  $("#customize-sidebar .product-selection i.fas.fa-box-open").click(function() {
    $("#customize-sidebar .brand-selection div").css('display', 'none');
    $("#customize-sidebar .product-selection div").toggle(function() {
      $(this).removeClass("hide");
    });
  });
}

var bImg = '';
var button = '';
// Get brand logos function - outputs brand logos into ul container
function getBrandLogos() {
  for (i = 0; i < 8; i++) {
    var imgSrc = "assets/brands/customizer/brand" + (i + 1) + ".png",
        imgAlt = "brandLogo " + (i + 1),
        imgId = "brandLogo" + (i + 1),
        imgWidth = "100px",
        imgClass = "brand-img";
    bImg += '<li><img id="' + imgId + '" class="' + imgClass + '" src="' + imgSrc + '" alt="' + imgAlt + '" width="' + imgWidth + '"></li>';
  }
  button += '<button id="remove-brand">NO BRAND LOGO</button>';
  $(".brand-selection ul").html(bImg).append(button);
  addBrand();
  

  // On icon click
  $("#customize-sidebar .brand-selection i.fas.fa-tag").click(function() {
    $("#customize-sidebar .product-selection div").css('display', 'none');
    $("#customize-sidebar .brand-selection div").toggle(function() {
      $(this).removeClass("hide");
    });
  });
}

// Add product function - changes product image
function addProduct() {
  $('.product-img').click(function() {
    //console.log($(this).attr('src'));
    $('#swap-product').attr('src', $(this).attr('src'));
    $('#colour-overlay').css('-webkit-mask-image', 'url("' + $(this).attr('src') + '"');
    $('#colour-overlay').css('-moz-mask-image', 'url("' + $(this).attr('src') + '"');
    $('#colour-overlay').css('-ms-mask-image', 'url("' + $(this).attr('src') + '"');
    $('#colour-overlay').css('mask-image', 'url("' + $(this).attr('src') + '"');
    $("#customize-sidebar .product-selection div").css('display', 'none');
  });
}

// Add brand function - adds or removes brand image onto product
function addBrand() {
  $('.brand-img').click(function() {
    // Add brand image
    $('#swap-brand').attr('src', $(this).attr('src'));
    $('#swap-brand').css('display', 'block');
    $("#customize-sidebar .brand-selection div").css('display', 'none');
  });

  // Remove brand image
  $('#remove-brand').click(function() {
    $('#swap-brand').css('display', 'none');
    $("#customize-sidebar .brand-selection div").css('display', 'none');
  });
}

// Save customizer function - saves customizer elements within localStorage and outputs to profile page
function saveCustomizer() {
  i = localStorage.getItem('Counter');
  idTrack = localStorage.getItem('ID Track');

  // Date
  var dt = new Date();
  var day = dt.getDate();
  var month = dt.getMonth();
  var year = dt.getFullYear();
  var date = day + '/' + month + '/' + year;

  // On save button click
  $("#save").click(function() {
    i++;
    idTrack++;
    count = localStorage.setItem('Counter', i);
    localStorage.setItem('ID Track', idTrack);

    // Create JSON object of customizer
    JSONContainer = [];
    var fileName = $("#fileName").val();
    var divID = 'item' + localStorage.getItem('ID Track');

    ele = {};
    ele ['index'] = localStorage.getItem('ID Track');
    ele ['fileName'] = fileName;
    ele ['divID'] = divID;
    ele ['date'] = date;
    ele ['customizerObject'] = createJSONObject(JSONContainer);

    // Push items into the object
    JSONContainer.push(ele);

    // Set localStorage elements
    localStorage.setItem('Customizer Object ' + ele ['index'], JSON.stringify(JSONContainer));

    // Output to console
    console.log(JSON.stringify(JSONContainer));

    // Message box display
    $('#customize-nav .alert-success').fadeIn().css('display', 'block');
    setTimeout(function() {
      $('#customize-nav .alert-success').css('display', 'none');
    }, 5000);
  });

  // Initialise additional variables
  counter = parseInt(localStorage.getItem('Counter'));
  cItem = '';
  
  // Section on profile page for saved customizer states
  for(n = 1; n <= counter; n++) {
    // Create item
    cObj = JSON.parse(localStorage.getItem('Customizer Object ' + n));
    cItem += '<div id="' + cObj[3]['divID'] + '" class="custom-item"><div class="item-img sm-first-item"><img src="' + cObj[0]['src'] + '" alt="item ' + cObj[3]['index'] + '"></div><div class="item-num sm-second-item"><h4>Item Number:</h4><p>' + cObj[3]['index'] + '</p></div><div class="name sm-third-item"><h4>Name:</h4><p>' + cObj[3]['fileName'] +'</p></div><div class="date sm-fourth-item"><h4>Date Created:</h4><p>' + cObj[3]['date'] + '</p></div></div>';
    $('.saved-work-content').html(cItem);
  }
}

// CreateJSONObject function
function createJSONObject(JSONContainer) {
  // Get images within product-img container
  $(".jsonObject").each(function() {
    var id = $(this).attr("id");
    var src = $(this).attr("src");
    var alt = $(this).attr("alt");
    var display = $(this).css("display");
    var bgcolor = $(this).css("background-color");
    var mask = $(this).css("mask-image");
    var webkitMask = $(this).css("-webkit-mask-image");
    var mozMask = $(this).css("-moz-mask-image");
    var msMask = $(this).css("-ms-mask-image");

    // Item values
    item = {};
    item ["id"] = id;
    item ["src"] = src;
    item ["alt"] = alt;
    item ["display"] = display;
    item ["bgcolor"] = bgcolor;
    item ["mask-image"] = mask;
    item ["-webkit-mask-image"] = webkitMask;
    item ["-moz-mask-image"] = mozMask;
    item ["-ms-mask-image"] = msMask;

    // Push items into the object
    JSONContainer.push(item);
  });
}