

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
    var listingGroupHTML = ""
    var accountListings = Listing.all.filter(listing => listing.vendor_id === this.id)
    accountListings.forEach(listing => {
      listingGroupHTML += this.listingHTML(listing)
    })
    var listingPage = `
    <main role="main">

      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Account Page</h1>
          <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
          <p>
            <a href="#" class="btn btn-primary my-2">Main call to action</a>
            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
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
