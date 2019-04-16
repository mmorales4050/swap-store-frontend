const URL = "http://localhost:3000/vendors"


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
    return fetch(URL).then(response => response.json())
    .then(vendors => {
      vendors.forEach(vendor => {
        new Vendor(vendor)
      })
    })
  }
}
