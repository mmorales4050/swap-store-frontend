

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

  static rendorAll() {
    var html = ""
    Listing.all.forEach(listing => {
      html += listing.html()
    })
    document.getElementById("album-container").innerHTML = html
  }
}
