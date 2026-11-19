// Fill in the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Force the download buttons to actually download the file instead of
// opening it in the browser tab. This works when the page is served over
// http/https (your local server or Firebase Hosting).
document.querySelectorAll("a[download]").forEach(function (link) {
  link.addEventListener("click", function (event) {
    var url = link.getAttribute("href");
    var filename = link.getAttribute("download") || url;

    // fetch() only works over http/https, not file://. If it fails we let
    // the browser handle the click normally.
    if (location.protocol === "file:") return;

    event.preventDefault();
    fetch(url)
      .then(function (res) { return res.blob(); })
      .then(function (blob) {
        var objectUrl = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      })
      .catch(function () {
        // Something went wrong — fall back to a normal navigation.
        window.location.href = url;
      });
  });
});
