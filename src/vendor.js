

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
}
