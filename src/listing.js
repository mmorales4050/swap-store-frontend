const URL = "http://localhost:3000/listings"

class Listing {

  static all = []

  constructor(listing) {
    this.name = listing.name
    this.description = listing.description
    this.price = listing.price
    this.image = listing.image
    this.vendor_id = listing.vendor_id
    this.id = listing.id
    Listing.all.push(this)
  }

  static fetchAll() {
    return fetch(URL).then(response => response.json())
    .then(listings => {
      listings.forEach(listing => {
        new Listing(listing)
      })
    })
  }

  html() {
    return `
    <div class="col-sm">
    <div class="card" style="width: 18rem;" >
      <img src="${this.image}" class="card-img-top" alt="..." style="max-width: 100%; min-height: 14rem;">
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text">${this.description}</p>
        <a href="#" class="btn btn-primary">Learn More</a>
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
    document.getElementById("container").innerHTML = html
  }
}
