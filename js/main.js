// loader
$(window).on('load', function () {
    $('.loader').fadeOut(7000);
});

// toggle icon for Sidebar
let toggleBtn = document.querySelector(".icon").onclick = function(){
    document.querySelector(".sidebar").classList.toggle("active");
}





// upload file
let uploadedImage = document.querySelector(".uploadFile");
if ( uploadedImage ){
    let ext = name[name.length - 3] + name[name.length - 2] + name[name.length - 1];
        const imgExt = ['jpg', 'JPG', 'PEG', 'peg', 'png', 'PNG', 'SVG', 'svg'];
        let src = null;

        uploadedImage.onchange = function (event) {
        if (event.target.files && event.target.files[0]) {
            selectedFilesCont.innerHTML = '';
            for (let i = 0; i < event.target.files.length; i++) {
                var name = event.target.files[i].name;
                let ext = name[name.length - 3] + name[name.length - 2] + name[name.length - 1];
                const imgExt = ['jpg', 'JPG', 'PEG', 'peg', 'png', 'PNG', 'SVG', 'svg' ];
                if (imgExt.indexOf(ext) > 0) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        src = e.target.result;
                        selectedFilesCont.innerHTML += '<div class="img-uploaded uploaded-image mt-2 mb-2 position-relative">' +
                            '<i onclick="deleteFile(this.parentElement ,\'' + name + '\')" class="fas fa-times remove-appendedd cp"></i>' +
                            '<img class="round0 img-uploded img-contain" src="' + src + '" alt="">' +
                            ' <input type="hidden" value="' + name + '" >   ' +
                            '</div>';
                    }
                    reader.readAsDataURL(event.target.files[i]);
                } else {
                    var name = event.target.files[i].name;
                    selectedFilesCont.innerHTML += '<div   class="file-container round m-1 ">' +
                        '<i onclick="deleteFile(this.parentElement ,\'' + name + '\')" class="fas fa-times remove-appendedd cp cp"></i>' +
                        '<img class="round img-cover overlay-dark" style="width: 100%; height:100%;" src="" alt="">' +
                        '<div style="overflow-wrap: break-word;" class="text-center siz-11 file-name-text m-0 w-75">' +
                        '<p class="uploadedName m-0">' + name + '</p>' +                    
                        '<input class="file-uploded" type="text" value="' + name + '" disabled hidden class="file-uploded m-0">' +
                        '</div>' +
                        '</div>'; 

                }
            }
        }
    }
    // deleteFile
    function deleteFile(ele, name) {
        const chat_files = document.querySelector(".uploadFile");
        let files = new DataTransfer();
        for (let i = 0; i < chat_files.files.length; i++) {
            if (chat_files.files[i].name == name) {
                continue;
            }
            files.items.add(chat_files.files[i]);
        }
        chat_files.files = files.files;
        $(ele).remove();
    }
}




// GooGle map api

        // full options => search & auto complelete & marker lat long
        function initMap1() {
  
            var map;
            var marker;
            var myLatlng = new google.maps.LatLng(24.774265, 46.738586);
            var geocoder = new google.maps.Geocoder();
            var infowindow = new google.maps.InfoWindow();
      
            var mapOptions = {
                zoom: 10,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
      
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
            marker = new google.maps.Marker({
                map: map,
                position: myLatlng,
                draggable: true
            });
      
      
            var input = document.getElementById('location');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });
            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();
                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    marker.setPosition(place.geometry.location);
                    $('#address').val(place.formatted_address);
                    $('#latitude').val(place.geometry.location.lat());
                    $('#longitude').val(place.geometry.location.lng());
                    if(place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    }else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
      
      
      
            geocoder.geocode({ 'latLng': myLatlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $('#latitude,#longitude').show();
                        $('#location').val(results[0].formatted_address);
                        $('#resultAddress').val(results[0].formatted_address);
                        $('#latitude').val(marker.getPosition().lat());
                        $('#longitude').val(marker.getPosition().lng());
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                    }
                }
            });
      
            google.maps.event.addListener(marker, 'dragend', function () {
      
                geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $('#location').val(results[0].formatted_address);
                            $('#resultAddress').val(results[0].formatted_address);
                            $('#latitude').val(marker.getPosition().lat());
                            $('#longitude').val(marker.getPosition().lng());
                            infowindow.setContent(results[0].formatted_address);
                            infowindow.open(map, marker);
                        }
                    }
                });
            });
      
            }
      
            google.maps.event.addDomListener(window, 'load', initMap1);