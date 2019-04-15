document.addEventListener("DOMContentLoaded", ()=> {
  Listing.fetchAll()
  .then(Listing.rendorAll)
})
