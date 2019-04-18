

class Listing {

  static all = []

  constructor(listing) {
    this.name = listing.name
    this.description = listing.description
    this.price = listing.price
    this.image = listing.image
    this.vendorId = listing.vendor_id
    this.id = listing.id
    this.createdAt = listing.created_at
    Listing.all.push(this)
  }

  timePosted() {
    var datePosted = new Date(this.createdAt)
    var currentDate = new Date()
    var difference = currentDate - datePosted
    if (difference < 1000) {
      return `1 second`
    } else if (difference < 60000) {
      return `${Math.floor(difference/1000)} seconds`
    } else if (difference < 3600000) {
      return `${Math.floor(difference/60000)} minutes`
    } else if (difference < (86400 * 86400000)) {
      return `${Math.floor(difference/3600000)} hours`
    } else {
      return `${Math.floor(difference/(86400 * 86400000))} days`
    }
  }

  static fetchAll() {
    return fetch(URL + "/listings").then(response => response.json())
    .then(listings => {
      listings.forEach(listing => {
        new Listing(listing)
      })
    })
  }

  html() {
    this.timePosted()
    return `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img src="${this.image}" alt="" width="100%" height="225" background="#55595c" color="#eceeef" class="card-img-top" text="Thumbnail">
        <div class="card-body">
        <h3 class="card-text">${this.name}</h3>
        <h4 class="card-text">$${this.price}0</h4>
          <p class="card-text">${this.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            </div>
            <small class="text-muted">${this.timePosted()}</small>
          </div>
        </div>
      </div>
    </div>
    `
  }

  static displayFilteredListings(value) {
    var filteredListings = Listing.all.filter(listing => listing.name.toLowerCase().includes(value.toLowerCase()))
    Listing.renderListings(filteredListings)
  }

  static renderListings(listings) {
    var html = ""
    listings.forEach(listing => {
      html += listing.html()
    })
    document.getElementById("album-container").innerHTML = html
  }
  static rendorAll() {
    Listing.renderListings(Listing.all)
  }

  static displayCreateListingPage() {
    BODY.id = "signin-body"
    var loginForm = `
    <center>
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img src="" alt="" width="100%" height="225" background="#55595c" color="#eceeef" class="card-img-top" text="Thumbnail" id="card-image">
        <div class="card-body">
        <h3 class="card-text" id="card-title"></h3>
        <h4 class="card-text" id="card-price">$0</h4>
          <p class="card-text" id="card-description"></p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            </div>
            <small class="text-muted"></small>
          </div>
        </div>
      </div>
    </div>
    </center>
    <form class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">New Listing</h1>
    <label for="listingTitle" class="sr-only">Listing Title</label>
    <input type="title" id="image" class="form-control" placeholder="Image URL" required autofocus>
    <label for="listingTitle" class="sr-only">Listing Title</label>
    <input type="title" id="title" class="form-control" placeholder="Listing Title" required autofocus>
    <label for="price" class="sr-only">Price</label>
    <input type="price" id="price" class="form-control" placeholder="Price" required>
    <label for="listingTitle" class="sr-only">Listing Title</label>
    <textarea type="title" id="description" class="form-control" placeholder="Description" required autofocus></textarea>
    <div class="checkbox mb-3">
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit" id="create-listing">Create</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
  </form>`
    CONTENT.innerHTML = loginForm

  }


}
