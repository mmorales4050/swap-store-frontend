class Vendor {

  static all = []

  constructor(vendor) {
    this.userName = vendor.user_name
    this.email = vendor.email
    this.image = vendor.image
    this.id = vendor.id
    Vendor.all.push(this)
  }

  static fetchAll() {
    return fetch(URL + "/vendors").then(response => response.json())
    .then(vendors => {
      vendors.forEach(vendor => {
        new Vendor(vendor)
      })
    })
  }

  displayListings() {
    return fetch(URL + "/listings").then(response => response.json())
    .then(listings => {
      listings.forEach(listing => {
        new Listing(listing)
      })
    })
  }

  listingHTML(listing) {
    return `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img src="${listing.image}" alt="" width="100%" height="225" background="#55595c" color="#eceeef" class="card-img-top" text="Thumbnail">
        <div class="card-body">
          <p class="card-text">${listing.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small class="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
    `
  }
  displayAccountPage() {
    BODY.id = "listing-body"
    try{
      document.getElementById("create-account").innerText = "Account Page"
      try {document.querySelector(".nav-link.active").classList.remove("active")} catch {}
      document.getElementById("create-account").classList.add("active")
      document.getElementById("create-account").id = "account-page"
      document.getElementById("login").innerText = "Logout"
      document.getElementById("login").id = "logout"
    } catch {}
    var listingGroupHTML = ""
    var accountListings = Listing.all.filter(listing => listing.vendorId === this.id)
    accountListings.forEach(listing => {
      listingGroupHTML = this.listingHTML(listing) + listingGroupHTML
    })
    var listingPage = `
    <main role="main">

      <section class="jumbotron text-center bg-white">
        <div class="container">
          <h1 class="jumbotron-heading">${this.userName}</h1>
          <img src="${this.image}" alt="" width="140" height="140" background="#777" color="#777" class="rounded-circle">
          <p class="lead text-muted">We are dedicated to bringing you top quality service, great selection and guaranteed low prices. Quantity buying allows us to sell our vast selection of REPTILE SUPPLIES at unbelievably low prices. We also offer REPTILES and other exotic animals from around the world. We carry every supply needed to care, maintain, and breed healthy reptiles.</p>
          <p>
            <a href="#" class="btn btn-primary my-2" id="vendor-create-listing">Create New Listing</a>
            <a href="#" class="btn btn-secondary my-2">Edit Account</a>
          </p>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row" id="album-container">
          ${listingGroupHTML}
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
    content.innerHTML = listingPage
  }
}
