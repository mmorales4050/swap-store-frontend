const URL = "http://localhost:3000"
const CONTENT = document.querySelector("#content")
const BODY = document.querySelector("body")


document.addEventListener("DOMContentLoaded", ()=> {

  // Display home page when user first visits site
  Vendor.fetchAll().then(() => {
    activatePageLink("home")
    displayHomePage()
  })

  // Event Listeners
  document.addEventListener("submit", event => {
    if (event.target.id === "search-form") {
      event.preventDefault()
      if (document.getElementById("listing-title") === null) {
        activatePageLink("listings")
        displayListingPage()
        Listing.fetchAll()
        .then(response => Listing.displayFilteredListings(document.getElementById("search-field").value))
      }
      Listing.displayFilteredListings(document.getElementById("search-field").value)
      document.getElementById("search-field").value = ""
      document.getElementById("search-field").blur()
    }
  })
  document.addEventListener("input", event => {
    switch (event.target.id) {
      case "title":
        document.getElementById("card-title").innerText = event.target.value
        break;
      case "image":
        document.getElementById("card-image").src = event.target.value
        break;
      case "price":
        document.getElementById("card-price").innerText = `$${event.target.value}`
        break;
      case "description":
        document.getElementById("card-description").innerText = event.target.value
        break;
      default:
    }
  })
  document.addEventListener("click", event => {
    if (event.target.id === "create-account") {
      event.preventDefault()
      BODY.id = "signin-body"
      activatePageLink("create-account")
      currentVendor.displayAccountCreationPage()
    }
    else if (event.target.id === "vendor-create-listing") {
      event.preventDefault()
      Listing.displayCreateListingPage()
    }
    else if (event.target.id === "create-listing") {
      event.preventDefault()
      // Create new listing
      var title = document.getElementById("title").value
      var price = document.getElementById("price").value
      var image = document.getElementById("image").value
      var description = document.getElementById("description").value
      var newListing = {name: title, description: description, price: price, image: image, vendor_id: currentVendor.id}
      fetch(URL + "/listings", {
        method: "POST",
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(newListing)
      }).then(()=>currentVendor.displayAccountPage())
    }
    else if (event.target.id === "gallery-btn") {
      event.preventDefault()
      activatePageLink("listings")

      displayListingPage()
      Listing.fetchAll()
      .then(Listing.rendorAll)
    }
    else if (event.target.id === "login") {
      event.preventDefault()
      BODY.id = "signin-body"
      activatePageLink("login")

      displayLoginPage()
    }
    else if (event.target.id === "home") {
      event.preventDefault()
      activatePageLink("home")

      Vendor.fetchAll().then(() => {
        displayHomePage()
      })
    }
    else if (event.target.id === "events") {
      event.preventDefault()
      activatePageLink("events")

      displayEventsPage()
    }
    else if (event.target.id === "account-page") {
      event.preventDefault()
      activatePageLink("account-page")

      Vendor.fetchAll().then(() => {
        currentVendor.displayAccountPage()
      })
    }
    else if (event.target.id === "home") {
      event.preventDefault()
      activatePageLink("home")

      Vendor.fetchAll().then(() => {
        displayHomePage()
      })
    }
    else if (event.target.id === "listings") {
      event.preventDefault()
      BODY.id = "listing-body"
      activatePageLink("listings")

      displayListingPage()
      Listing.fetchAll()
      .then(Listing.rendorAll)
    }
    else if (event.target.id === "sign-in") {
      event.preventDefault()
      var email = document.getElementById("inputEmail").value
      var username = document.getElementById("inputUsername").value
      Vendor.fetchAll()
      .then(() => {
        Vendor.all.forEach(vendor => {
          if (vendor.userName === username && vendor.email === email) {

            Listing.fetchAll()
            .then(() => {

              vendor.displayAccountPage()
              currentVendor = vendor
            })
          }
        })
      })
    }
  })
  // Automatically login user for testing
  document.querySelector("#login").click()
  document.querySelector("#inputEmail").value = "lm@email.com"
  document.querySelector("#inputUsername").value = "LizardsandMore"
  document.querySelector("#sign-in").click()

})

function activatePageLink(id) {
  try {document.querySelector(".nav-link.active").classList.remove("active")} catch {}
  document.getElementById(id).classList.add("active")
}

function displayEventsPage() {
  // Event Name, Date/Time, Description, Cost, Hours, Location, Phone, contact email, website
  var eventsPage = `<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Event</th>
      <th scope="col">Location</th>
      <th scope="col">Date</th>
      <th scope="col">Hours</th>
      <th scope="col">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">All Maryland Reptile Show</th>
      <td>Community Center
100 Lagaret Lane
Havre de Grace, MD
</td>
      <td>May 4, 2019</td>
      <td>09:00 AM until 03:00 PM</td>
      <td>$8.00</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>`
 CONTENT.innerHTML = eventsPage
}
function displayListingPage() {
  var listingPage = `
  <div class="nav-scroller bg-white shadow-sm sticky-top">
  <nav class="nav nav-underline">
    <a class="nav-link" href="#" id="sort-newest">Most Recent</a>
    <a class="nav-link" href="#">Distance</a>
    <a class="nav-link" href="#">Price</a>
  </nav>
</div>
  <main role="main">



    <div class="album py-5 bg-light">
      <div class="container">

        <div class="row" id="album-container">
      </div>
    </div>

  </main>

  <footer class="text-muted">
    <div class="container">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
      <p>New to Bootstrap? <a href="{{ site.url }}/">Visit the homepage</a> or read our <a href="{{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/introduction/">getting started guide</a>.</p>
    </div>
  </footer>`
  CONTENT.innerHTML = listingPage
}

function displayLoginPage() {
  var loginForm = `
  <form class="form-signin">
  <img class="mb-4" src="https://cdn6.aptoide.com/imgs/1/6/d/16d5d8047a00e337c0a79cf2bd622793_icon.png?w=1000" alt="" width="72" height="72">
  <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
  <label for="inputUsername" class="sr-only">Password</label>
  <input type="username" id="inputUsername" class="form-control" placeholder="Username" required>
  <div class="checkbox mb-3">
  </div>
  <button class="btn btn-lg btn-primary btn-block" type="submit" id="sign-in">Sign in</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
</form>`
  CONTENT.innerHTML = loginForm
}

function displayAccountCreationPage() {
  var loginForm = `
  <form class="form-signin">
  <img class="mb-4" src="https://cdn6.aptoide.com/imgs/1/6/d/16d5d8047a00e337c0a79cf2bd622793_icon.png?w=1000" alt="" width="72" height="72">
  <h1 class="h3 mb-3 font-weight-normal">Create Account</h1>
  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
  <label for="inputUsername" class="sr-only">Username</label>
  <input type="username" id="inputUsername" class="form-control" placeholder="Username" required>
  <div class="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me"> Vendor Account
    </label>
  </div>
  <button class="btn btn-lg btn-primary btn-block" type="submit" id="create-account">Create Account</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
</form>`
  CONTENT.innerHTML = loginForm
}

function displayHomePage() {
  // Choose three unique vendors to feature
  var featuredVendors = [Vendor.all[0], Vendor.all[2], Vendor.all[3]]
  var homePage = `
  <!-- Custom Style Sheets -->
  <main role="main">

    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://images.pexels.com/photos/2062316/pexels-photo-2062316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" >
          <div class="container">
            <div class="carousel-caption text-left">
              <h1>Leading online reptile market.</h1>
              <p>The best selection of reptiles, exotic animals and supplies at the best prices.</p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button" id="create-account">Sign up today</a></p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://images.pexels.com/photos/36448/snake-snape-reptile.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="">
          <div class="container">
            <div class="carousel-caption">
              <h1>Become on of our trusted vendors today.</h1>
              <p>We work with the lots of top vendors and would love for you to join our team.</p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://images.pexels.com/photos/751676/pexels-photo-751676.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="">
          <div class="container">
            <div class="carousel-caption text-right">
              <h1>See the latest reptile listings.</h1>
              <p>We have a huge selection of exotcis.</p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button" id="gallery-btn">Browse gallery</a></p>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>

    </div>
    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->
    <center><h1>Our Featured Vendors</h1></center>
    <div class="container marketing">
      <!-- Three columns of text below the carousel -->
      <div class="row">
        <div class="col-lg-4">
          <img src="${featuredVendors[0].image}" alt="" width="140" height="140" background="#777" color="#777" class="rounded-circle">
          <h2>${featuredVendors[0].userName}</h2>
          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
          <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img src="${featuredVendors[1].image}" alt="" width="140" height="140" background="#777" color="#777" class="rounded-circle">
          <h2>${featuredVendors[1].userName}</h2>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
          <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img src="${featuredVendors[2].image}" alt="" width="140" height="140" background="#777" color="#777" class="rounded-circle">
          <h2>${featuredVendors[2].userName}</h2>
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->


      <!-- START THE FEATURETTES -->

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
          <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
        </div>
        <div class="col-md-5">
          {% include icons/placeholder.svg width="500" height="500" background="#eee" color="#aaa" class="bd-placeholder-img-lg featurette-image img-fluid mx-auto" %}
        </div>
      </div>

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading">Oh yeah, it’s that good. <span class="text-muted">See for yourself.</span></h2>
          <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
        </div>
        <div class="col-md-5 order-md-1">
          {% include icons/placeholder.svg width="500" height="500" background="#eee" color="#aaa" class="bd-placeholder-img-lg featurette-image img-fluid mx-auto" %}
        </div>
      </div>

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
          <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
        </div>
        <div class="col-md-5">
          {% include icons/placeholder.svg width="500" height="500" background="#eee" color="#aaa" class="bd-placeholder-img-lg featurette-image img-fluid mx-auto" %}
        </div>
      </div>

      <hr class="featurette-divider">

      <!-- /END THE FEATURETTES -->

    </div><!-- /.container -->

    <!-- FOOTER -->
    <footer class="container">
      <p class="float-right"><a href="#">Back to top</a></p>
      <p>&copy; 2019 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
    </footer>
  </main>`
  CONTENT.innerHTML = homePage
}
