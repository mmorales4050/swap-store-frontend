const URL = "http://localhost:3000"
const CONTENT = document.querySelector("#content")
const BODY = document.querySelector("body")


document.addEventListener("DOMContentLoaded", ()=> {

  // Display home page when user first visits site
  Vendor.fetchAll().then(() => {
    activatePageLink("home")
    Listing.fetchAll()
    .then(()=>displayHomePage())
  })

  // Event Listeners
  document.addEventListener("submit", event => {
    if (event.target.id === "search-form") {
      event.preventDefault()
      if (document.getElementById("album-container") === null) {
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
    }
  })
  document.addEventListener("click", event => {
    if (event.target.id === "create-account") {
      event.preventDefault()
      BODY.id = "signin-body"
      activatePageLink("create-account")
      displayAccountCreationPage()
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
    else if (event.target.id === "logout") {
      event.preventDefault()
      activatePageLink("home")
      document.getElementById("account-page").innerText = "Create Account"
      document.getElementById("account-page").id = "create-account"
      document.getElementById("logout").innerText = "Login"
      document.getElementById("logout").id = "login"
      displayHomePage()
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
  //Automate website flow for presentation
  // sleep(2000).then(()=> {
  //   scroll(4000, "-240")
  //   sleep(6000).then(()=> {
  //     document.querySelector("#login").click()
  //     scroll(0, "0")
  //     sleep(2000).then(()=> {
  //       document.querySelector("#inputEmail").value = "lm@email.com"
  //       sleep(2000).then(()=> {
  //         document.querySelector("#inputUsername").value = "LizardsandMore"
  //         sleep(2000).then(()=> {
  //           document.querySelector("#sign-in").click()
  //           sleep(2000).then(()=> {
  //
  //           })
  //         })
  //       })
  //     })
  //   })
  // })

  // sleep(2000).then(()=> {
  //   scroll(4000, "-240")})
  //
  // .then(()=>{sleep(6000).then(()=> {
  //   document.querySelector("#login").click()
  //   scroll(0, "0")})})
  //template
  //.then(()=>action(500, ()=>{}))
  var newName = "Lizard"
  var newImage = "https://images.pexels.com/photos/584165/pexels-photo-584165.jpeg?cs=srgb&dl=animal-chameleon-close-up-584165.jpg&fm=jpg"
  var newPrice = "100"
  var newDescription = "The largest lizard is the Komodo monitor. It can grow longer than a person. The smallest lizard is a tiny gecko."
  action(2000, ()=>{scroll(0, "-50");banner("Welcome to Snake Swap!", "- Checkout what local vendors are selling - See what reptile expos are happing near you! - Make an account to post reptile listings - Take a look at our featured vendors")})
  .then(()=>action(500, ()=>{scroll(3000, "-400")}))
  .then(()=>action(5000, ()=>{scroll(0, "0");}))
  .then(()=>action(300, ()=>{banner("Login Page", "Vendors can sign into their account to see their posted listing and to post new listings");document.querySelector("#login").click();}))
  .then(()=>action(300, ()=>{document.querySelector("#inputEmail").value = "lm@email.com";document.querySelector("#inputUsername").value = "LizardsandMore";}))
  .then(()=>action(3000, ()=>{document.querySelector("#sign-in").click();}))
  .then(()=>action(0, ()=>{banner("Account Page", "On your account page you can see all the listings that you have posted and you can post new listings")}))
  .then(()=>action(3000, ()=>{scroll(6000, "-2000")}))
  .then(()=>action(7000, ()=>{banner("New Listing!", "Lets make a new listing for LizardsandMore");scroll(3000, 0, -2000)}))
  .then(()=>action(3500, ()=>{document.querySelector("#vendor-create-listing").click();banner("Create Listing Page", "Lets enter an image, title, price, and description to make our new listing")}))
  .then(()=>action(3000, ()=>{document.querySelector("#image").value = newImage;document.querySelector("#title").value = newName;document.querySelector("#price").value = newPrice;document.querySelector("#description").value = newDescription}))
  .then(()=>action(3000, ()=>{document.querySelector("#create-listing").click()}))
  .then(()=>action(3000, ()=>{banner("Listing Made!", "One more listing for our customers to checkout")}))
  .then(()=>action(3000, ()=>{banner("Listing Page", "Now lets checkout all the listings!")}))
  .then(()=>action(3000, ()=>{document.querySelector("#listings").click()}))
  .then(()=>action(3000, ()=>{banner("Search feature", "Now lets search for our listing")}))
  .then(()=>action(3000, ()=>{document.querySelector("#search-field").value = "lizard"}))
  .then(()=>action(3000, ()=>{document.querySelector("#search-btn").click()}))
  .then(()=>action(3000, ()=>{scroll(4000, "-1000")}))
  .then(()=>action(7000, ()=>{banner("Events Page", "Now Lets take a look at all the reptile events happening")}))
  .then(()=>action(3000, ()=>{scroll(0, 0);document.querySelector("#events").click()}))
  .then(()=>action(3000, ()=>{scroll(5000, "-2000")}))
  .then(()=>action(6000, ()=>{scroll(0, "0");document.querySelector("#home").click();banner("Snake Swap", "Thanks for checking out the website, feel free to take a look around")}))
  .then(()=>action(4000, ()=>{clearBanner()}))

  //.then(()=>action(6000, ()=>{document.querySelector("#login").click();document.querySelector(".mb-4").click();scroll(0, "0")}))


})// End of DOMContentLoaded

function banner(title, content) {
  document.getElementById("content-container").style = "top-padding:0;"
  document.getElementById("banner").innerHTML = `<div class="alert alert-success sticky-top" role="alert">
  <h4>${title}</h4>
  ${content}
</div>`
}

function clearBanner() {
  document.getElementById("banner").innerHTML = ""
}

function action(time, cb) {
  return sleep(time).then(()=>{
    cb()
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function scroll(duration, finish, start=0) {
  document.getElementById("content").animate([
  // keyframes
  { transform: `translateY(${start}px)` },
  { transform: `translateY(${finish}px)` }
], {
  // timing options
  duration: duration,
  iterations: 1,
fill:"forwards"
});
}
function activatePageLink(id) {
  try {document.querySelector(".nav-link.active").classList.remove("active")} catch {}
  document.getElementById(id).classList.add("active")
}

function displayEventsPage() {
  BODY.id = "listing-body"
  fetch(URL + "/events").then(response => response.json())
  .then(reptileEvents => {
    var eventsHTML = ""

    reptileEvents.forEach(reptileEvent => {
      var formattedCost = reptileEvent.cost
      if (formattedCost.length === 1) {
        formattedCost = "$" + formattedCost + ".00"
      }
      else if (!formattedCost.includes("$")) {
        formattedCost = "$" + formattedCost
      }
      var eventHTML = `<tr id="${reptileEvent.id}-event">
        <th scope="row">${reptileEvent.name}</th>
        <td>${reptileEvent.location}</td>
        <td>${reptileEvent.date}</td>
        <td>${reptileEvent.hours}</td>
        <td>${formattedCost}</td>
      </tr>`
      eventsHTML += eventHTML
    })
    var eventsPage = `
    <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Event</th>
        <th scope="col">Location</th>
        <th scope="col">Date</th>
        <th scope="col">Hours</th>
        <th scope="col">Cost</th>
      </tr>
    </thead>
    <tbody>
    ${eventsHTML}
    </tbody>
  </table>`
    CONTENT.innerHTML = eventsPage
  })
  // Event Name, Date/Time, Description, Cost, Hours, Location, Phone, contact email, website


}
function displayListingPage() {
  var listingPage = `
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
  BODY.id = "listing-body"
  //<img src="https://images.pexels.com/photos/2062316/pexels-photo-2062316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" >

  // Choose three unique vendors to feature
  var featuredVendors = [Vendor.all[0], Vendor.all[2], Vendor.all[3]]
  var images = ""
  Listing.all.forEach(listing => images +=`<img src=${listing.image} alt="" width="140" height="140" class="">`)
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
        <div style="min-width:2000px;">
        ${images}
        </div>
          <div class="container">
            <div class="carousel-caption text-left">
              <h1>Leading online reptile market.</h1>
              <p>The best selection of reptiles, exotic animals and supplies at the best prices.</p>
              <p><a class="btn btn-lg btn-primary" href="#" role="button" id="create-account">Sign up today</a></p>
            </div>
          </div>
        </div>
      </div>
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
          <p>Our animals are bred and raised by a compassionate team of the best reptile breeders we have to offer. We have over 30 years of experience in the reptile business, and we pack and ship all of our animals ourselves, directly from our facility to your home or business. With over 300 varieties of reptiles, amphibians and exotic mammals, we supply zoos, pet stores, and hobbyists all over the world with quality animals.</p>
          <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img src="${featuredVendors[1].image}" alt="" width="140" height="140" background="#777" color="#777" class="rounded-circle">
          <h2>${featuredVendors[1].userName}</h2>
          <p>We are dedicated to bringing you top quality service, great selection and guaranteed low prices. Quantity buying allows us to sell our vast selection of REPTILE SUPPLIES at unbelievably low prices. We also offer REPTILES and other exotic animals from around the world. We carry every supply needed to care, maintain, and breed healthy reptiles.</p>
          <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img src="${featuredVendors[2].image}" alt="" width="140" height="140" background="#777" color="#777" class="rounded-circle">
          <h2>${featuredVendors[2].userName}</h2>
          <p>We specialize in the exotic, hard to find reptiles, spiders, hermit crabs
and animals that you'd have a tough time finding anywhere.
Take a minute and let us know... we'll take a look around for you!</p>
          <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->
    </div><!-- /.container -->

    <!-- FOOTER -->
    <footer class="container">
      <p class="float-right"><a href="#">Back to top</a></p>
      <p>&copy; 2019 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
    </footer>
  </main>`
  CONTENT.innerHTML = homePage
}
