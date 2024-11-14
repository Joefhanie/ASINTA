// Display Username
document.getElementById("displayUsername").innerHTML = localStorage.getItem("username");

function dropDown() {
    document.getElementById("logOutBtn").classList.toggle("show");
    document.getElementById("changeDisplayBtn").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.user')) {
        let dropdowns = document.getElementsByClassName("userDropdown");
        let i;

        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Change Display Picture
let displayPic = document.getElementById("displayPic");
let dispPicture = document.getElementById("displayPicture");

dispPicture.onchange = function() {
    var formData = new FormData();
    formData.append('file', dispPicture.files[0]);
    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        if (result) {
            localStorage.setItem('profilePicture', result);
            displayPic.src = result;
        }
    })
    .catch(error => console.error('Error:', error));
};

window.onload = function() {
    var profilePicture = localStorage.getItem('profilePicture');
    if (profilePicture) {
        displayPic.src = profilePicture;
    }
};

// Log Out
document.getElementById('logOut').addEventListener('click', function() {
    fetch('./logout.php')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        window.location.href = './logout.php';
    })
    .catch(function() {
        console.log("An error occurred");
    });
 });

// Sidebar Transition
function openNav() {
    closeRecent();
    closeFeed();
    document.getElementById("mySidebar").style.border = "2px solid #e2e257";
    document.getElementById("mySidebar").style.width = "250px";    
    document.getElementById("markers").style.display = "none";
    document.getElementById("viewed").style.left = "250px";    
    document.getElementById("X").style.left = "250px";    
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.border = "none";
    document.getElementById("markers").style.display = "block";
    document.getElementById("viewed").style.left = "3vw"; 
    document.getElementById("X").style.left = "3vw"; 
}

// Recently Viewed Sidebar Transition
function openRecent() {
    closeNav();
    closeFeed();
    document.getElementById("viewedSidebar").style.border = "2px solid #e2e257";
    document.getElementById("viewedSidebar").style.width = "250px";    
    document.getElementById("viewed").style.display = "none";
    document.getElementById("markers").style.left = "293px"; 
    document.getElementById("X").style.left = "250px";   
}

function closeRecent() {
    document.getElementById("viewedSidebar").style.width = "0";
    document.getElementById("viewedSidebar").style.border = "none";
    document.getElementById("viewed").style.display = "block";
    document.getElementById("markers").style.left = "3vw";  
    document.getElementById("X").style.left = "3vw"; 
}

// Open & Close PUP Twitter Feed
function openFeed() {
    closeNav();
    closeRecent();
    document.getElementById("PUPXFeed").style.border = "2px solid #e2e257";
    document.getElementById("PUPXFeed").style.borderRadius = "11px";
    document.getElementById("PUPXFeed").classList.toggle("show");  
}

function closeFeed() {
    document.getElementById("PUPXFeed").style.border = "none";
    document.getElementById("PUPXFeed").classList.remove("show");   
} 

// Map
let map = L.map('map').setView([14.598156138391628, 121.01077258586885], 20);
let center = map.getCenter();
let popup = L.popup();

map.zoomControl.setPosition('bottomright');

// Map Display
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Map Icon
let mapIcon = L.icon({
    iconUrl: './images/icons8-map-pin-40.png',

    iconSize:     [35, 35],
    iconAnchor:   [20, 30],
    popupAnchor:  [0, -50]
});

// Map Bounds
let southWest = L.latLng(14.59743, 121.00317),
    northEast = L.latLng(14.59813, 121.01327),
    bounds = L.latLngBounds(southWest, northEast);

function error() {

    if(error.code === 1) {
        alert("Please allow geolocation access.");
    } else {
        alert("Cannot get current location.");
    }

}

// Map Recenter
document.getElementById('center').addEventListener('click', function() {
    map.panTo(new L.LatLng(14.598156138391628, 121.01077258586885));
    map.setView([14.598156138391628, 121.01077258586885], 20);
});
 
campusPlaces();

// Markers for places
function campusPlaces() {

    let obelisk = L.marker([14.598156138391628, 121.01077258586885], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP OBELISK</h4> <img src='./images/obelisk.jpg' />")
    .on('click', function() {
    document.getElementById('viewedSidebar').innerHTML += "<a>PUP OBELISK</a>"
    });

    let freedomPark = L.marker([14.59783329004622, 121.01095229387285], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>NEMESIO PRUDENTE FREEDOM PARK</h4> <h6>The Nemesio Prudente Freedom Park is not just a mere hangout place in our Sintang Paaralan. Dr. Nemesio Prudente, a progressive president at PUP, encouraged students to join movements against government abuses and excesses, an act that led to his arrest during the Martial Law. In honor of his memories and contributions, the Freedom Park was dedicated to serve as a constant reminder that amidst the darkness of Martial Law, there were PUP members who stood up and fought for the country, even at the cost of their lives and safety.</h6> <img src='./images/freedom park.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>NEMESIO PRUDENTE FREEDOM PARK</a>"
    });

    let mabiniShrine = L.marker([14.598192046540378, 121.01115077736], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>THE APOLINARIO MABINI SHRINE</h4> <h6>The Apolinario Mabini Shrine is a historic site in Santa Mesa, Manila, Philippines. It is noted for being the residence of Filipino military leader Apolinario Mabini who figured in the Philippine Revolution. Originally situated along the Nagtahan River, the structure was moved to the Polytechnic University of the Philippines main campus in Santa Mesa, Manila in the mid-2000s.</h6> <img src='./images/mabini.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>THE APOLINARIO MABINI SHRINE</a>"
    });

    let chapel = L.marker([14.59712260635423, 121.0114095287371], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP INTERFAITH CHAPEL</h4> <h6></br><div class='bldgName'>The Ecumenical Chapel</div>(known as the Interfaith Chapel) is a nondenominational Christian church located inside the PUP - A. Mabini Campus.<h6/> <img src='./images/chapel.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP INTERFAITH CHAPEL</a>"
    });
    
    let foodNutritionBuilding = L.marker([14.596887541044095, 121.01168990135194], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>NUTRITION AND FOOD SCIENCE BUILDING</h4> <h6>Nutrition and Food Science Building homes student under Bachelor of Science in Food Technology (BSFT) and Bachelor of Science in Nutrition and Dietetics (BSND).<h6/> <img src='./images/foodBuilding.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>NUTRITION AND FOOD SCIENCE BUILDING</a>"
    });

    let oval = L.marker([14.598163269529868, 121.01203920265445], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP TRACK AND FIELD OVAL</h4> <h6>PUP Track and Field Oval is a lawn, athletics track located in Manila. PUP Track and Field Oval - Manila on the map.<h6/> <img src='./images/oval.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP TRACK AND FIELD OVAL</a>"
    });

    let grandstand = L.marker([14.597997374984713, 121.01151823997499], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP GRANDSTAND</h4> <h6>PUP Grandstand is a bleacher in Sampaloc, Capital District, Metro Manila. PUP Grandstand is situated nearby to Apolinario Mabini Museum and the memorial Apolinario Mabini historical marker.<h6/> <img src='./images/grandstand.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP GRANDSTAND</a>"
    });

    let communityBuilding = L.marker([14.598094508001212, 121.01250529289247], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>COMMUNITY BUILDING</h4> <h6>The Community Building provides and oversees academic programs and administrative leadership, engages with stakeholders, ensures compliance, represents the campus, and maintains a positive environment for the campus community.<h6/> <img src='./images/community.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>COMMUNITY BUILDING</a>"
    });
    
    let basketballCourt = L.marker([14.598635886517906, 121.0108181834221], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>OUTDOOR BASKETBALL AND VOLLEYBALL COURT</h4> <h6>PUP has both indoor and outdoor basketball and volleyball courts. This outdoor court is located between PUP Gymnasium and Sports Center and PUP Swimming pool. Students can use this place to play basketball or volleyball.<h6/> <img src='./images/court.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>OUTDOOR BASKETBALL AND VOLLEYBALL COURT</a>"
    });
    
    let tennisCourt = L.marker([14.598919929839687, 121.0111427307129], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>TENNIS COURT</h4> <h6>PUP Tennis Court is located beside PUP Outdoor Basketball and Volleyball Court. Students who want to spend their time playing tennis can use this space.<h6/> <img src='./images/court2.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>TENNIS COURT</a>"
    });
    
    let gym = L.marker([14.599197213329116, 121.01096167395873], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP GYMNASIUM</h4> <h6>The University Gymnasium serves as the training ground for the student athletes that participate in the intercollegiate sports program.<h6/> <img src='./images/gym.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP GYMNASIUM</a>"
    });
    
    let library = L.marker([14.597803007870432, 121.00971410642437], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>NINOY AQUINO LEARNING RESOURCE CENTER</h4> <h6></br>It is the heart, the primary library and academic repository of Polytechnic University of the Philippines. It provides top-notch services for easier learning for everyone.<h6/> <img src='./images/nalrc.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>NINOY AQUINO LEARNING RESOURCE CENTER</a>"
    });

    let waterTank = L.marker([14.59781888923821, 121.00935637950899], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>R.C. OVERHEAD WATER TANK</h4> <h6></br>It is a facility, a water tank made of concrete and it houses the water supply of the campus.<h6/> <img src='./images/water tank.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>R.C. OVERHEAD WATER TANK</a>"
    });
    
    let alumni = L.marker([14.598562730927682, 121.01010739803316], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>TAHANAN NG ALUMNI</h4> <h6>Tahanan ng Alumni is an university building in Sampaloc, Capital District, Metro Manila. Tahanan ng Alumni is situated nearby to Ninoy Aquino Library and Learning Resources Center and PUP.<h6/> <img src='./images/alumni.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>TAHANAN NG ALUMNI</a>"
    });
    
    let pe = L.marker([14.598360054778654, 121.01012080907823], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PHYSICAL EDUCATION BUILDING</h4> <h6><div class='bldgName'>• The College of Human Kinetics (CHK)</div>is gearing towards the attainment of the vision and mission of its fore bearers and present leaders who persist in their views of a tomorrow in physical education, well-being and sports development.<h6/> <img src='./images/pe.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PHYSICAL EDUCATION BUILDING</a>"
    });

    let pool = L.marker([14.5987724809504, 121.01034343242647], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP SWIMMING POOL</h4> <h6>An olympic-sized swimming pool that is capable of handling several swimming classes and student athlete activities simultaneously.<h6/> <img src='./images/pool.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP SWIMMING POOL</a>"
    });

    let dome = L.marker([14.597007798871667, 121.01078867912294], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>MAIN BUILDING DOME</h4> <h6>The main academic building was originally intended to be a housing tenement.<br/><br/><div class='bldgName'>• College of Accountancy and Finance</div>5th Floor, Dome, Main Building</h6> <img src='./images/dome.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>MAIN BUILDING DOME</a>"
    });

    let northWing = L.marker([14.597367165198307, 121.01087450981142], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>NORTH WING</h4> <h6>The North Wing of PUP's main academic building is under construction as part of DPWH's school building project. The new 9-floor building to be constructed will replace the former 6-storey structure to accommodate its students and faculties.<br/><br/>This was the list of colleges previously located on 2nd floor, North Wing, Main Building:<br/><br/><div class='bldgName' style='text-align:left;'>• College of Business Administration<br/>• College of Education (N-205)<br/>• College of Computer and Information Sciences (N-207)<br/>• College of Political Science and Public Administration<br/>• College of Social Sciences and Development<br/>• College of Science</h6> <img src='./images/north.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>NORTH WING</a>"
    });
    
    let eastWing = L.marker([14.59673618302698, 121.01107299327852], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>EAST WING</h4> <h6><div class='bldgName'>• Admission Services</div>For admission inquiries<br/>Ground Floor, East Wing, Main Building<br/>(632) 5335-1798 or (632) 5335-1799<br/>(632) 5335-1787 or 5335-1777 local 287 or 322</h6> <img src='./images/east.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>EAST WING</a>"
    });
    
    let westWing = L.marker([14.596907494987134, 121.01039707660676], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>WEST WING</h4> <h6><div class='bldgName'>• Admission and Registration Services Section<br/>• Office of Scholarship and Financial Assistance</div></h6> <img src='./images/west.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>WEST WING</a>"
    });
    
    let southWing = L.marker([14.596564870933435, 121.01066261529924], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>SOUTH WING</h4> <h6><div class='bldgName'>• College of Arts and Letters</div>Room 601, 6th Floor, South Wing, Main Building<br/><br/><div class='bldgName'>• Office of the University Registrar</div>For inquiries regarding student records (transcript, diploma, certification)<br/>Ground Floor, South Wing, Main Building<br/>(632) 5335-1787 or 5335-1777 local 285<br/><br/><div class='bldgName'>• Office of the Vice President for Branches and Campuses</div>For inquiries regarding the PUP Branches and Campuses<br/>2nd Floor, South Wing Executive Offices, Main Building<br/>(632) 5310-0418<br/>(632) 5335-1787 or 5335-1777 local 205<br/><br/><div class='bldgName'>• Office of Counseling and Psychological Services</div>For tele-counseling services regarding academic, personal, and financial problems; spiritual, and moral concerns; intra–personal, and inter-personal relationships<br/>6th Floor, South Wing, Main Building</h6> <img src='./images/registrar.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>SOUTH WING</a>"
    });
    
    let lagoon = L.marker([14.597924981456014, 121.0105472803116], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP LAGOON</h4> <h6>The PUP Sta. Mesa Lagoon, often referred to as the \"PUP Lagoon,\" is a prominent feature of the campus. It is a man-made body of water, and it serves various purposes within the university. The lagoon is a beautiful and serene spot on the campus, providing a place for students and visitors to relax and enjoy nature. The lagoon area is sometimes used for hosting academic and cultural events. The PUP Lagoon is often considered a landmark of the university and is an integral part of the campus's identity. The PUP lagoon also has different stalls that sell food, beverages and school materials.<h6/> <img src='images/lagoon.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP LAGOON</a>"
    });
    
    let linearPark = L.marker([14.596677213396198, 121.0097587108612], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>LINEAR PARK</h4> <h6>Linear park is a type of urban park with a linear feature such as a river, stream, or a pathway. PUP linear park was designed to provide green spaces and recreational areas for the University staff and students. It has benches and seating areas that are scattered throughout the park, providing places for people to rest and enjoy the surroundings. Beside the PUP linear park, you can see the Pasig River.<h6/> <img src='./images/linear.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>LINEAR PARK</a>"
    });
    
    let ferry = L.marker([14.59608889719123, 121.0108369588852], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP STA. MESA FERRY STATION</h4> <h6>The Pasig River Ferry is a water-based public transportation system that operates along the Pasig River in Metro Manila, Philippines. It provides an alternative mode of transportation for commuters, especially those traveling between the cities and municipalities along the Pasig River. The Pasig River Ferry system connects several areas in Metro Manila, including Pasig, Mandaluyong, Makati, Manila, and other nearby locations. The ferry system has several stations or stops along the river, and of these is the PUP Sta. Mesa Station where can be found inside the University.<h6/> <img src='./images/ferry.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP STA. MESA FERRY STATION</a>"
    });
    
    let canteen = L.marker([14.596963713721264, 121.0097908973694], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>STUDENT CANTEEN</h4> <h6>The student canteen is where students and sometimes staff can purchase a variety of affordable meals, snacks, and beverages. It serves as essential facilities to cater to the dining needs of the university community. They offer a range of food options and tables and chairs where everyone can eat.<h6/> <img src='./images/canteen.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>STUDENT CANTEEN</a>"
    });
    
    let charlie = L.marker([14.597129266282073, 121.00975334644319], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>CHARLIE DEL ROSARIO BUILDING</h4> <h6>Its former name is \"Unyon ng Mag-aaral Building\", and it is where the Office of the Student Services located which provides student personnel services.<h6/> <img src='./images/charlie.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>CHARLIE DEL ROSARIO BUILDING</a>"
    });

    let condotel = L.marker([14.598143013658529, 121.00418508052827], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP CONDOTEL</h4> <h6>PUP Condotel is located at 1016, 19 Anonas, Santa Mesa, Manila near GSIS Metro Homes. PUP Condotel has rooms that can be used by the faculties and students to hold classes inside. This building helps with the shortage of classrooms and other learning facilities.<h6/> <img src='./images/condotel.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP CONDOTEL</a>"
    });
    
    let cea = L.marker([14.598982127392006, 121.00533843040468], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>COLLEGE OF ENGINEERING AND ARCHITECHTURE</h4> <h6></br><div class='bldgName'>• College of Engineering</div> is one of the constituent colleges of the University and one of the premier engineering schools in the Philippines. The College confer degrees in civil engineering,mechanical engineering, electrical engineering, electronics and communications engineering, industrial engineering, computer engineering, and railway engineering.<h6/> <img src='./images/cea.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>COLLEGE OF ENGINEERING AND ARCHITECHTURE</a>"
    });
    
    let coc = L.marker([14.598781535294258, 121.0069370269775], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>COLLEGE OF COMMUNICATIONS BUILDING</h4> <h6>The PUP College of Communication is committed to provide quality communication education for the development of globally competitive communication professionals both in the graduate and post graduate levels. The College of Communication (COC) upholds quality and excellence in moulding responsible communication students and producing competitive communication professionals. Yearly, its graduates are among the top of the thousands of graduating students the University produces. Majority of its alumni have successfully landed jobs immediately after graduation. The roster of faculty members teaching in the College is also well-equipped with professional experience in media industry and the academe. COC bears the distinction of being the first communication school in the country to have achieved Level III Accredited Status as awarded by the AACCUP. This recognition was achieved by the College in 2008 for its two programs – Broadcast Communication and Journalism.<h6/> <img src='./images/coc.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>COLLEGE OF COMMUNICATIONS BUILDING</a>"
    });
    
    let theater = L.marker([14.59877933686298, 121.00638449192049], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP THEATER</h4> <h6>The Tanghalang PUP is a proscenium theatre with a 650-seating capacity of balcony and orchestra spaces. Within its vicinity include the following spaces that can house intimate performances and art exhibitions: Outdoor Performance Space.<h6/> <img src='./images/theater.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP THEATER</a>"
    });
    
    let labHigh = L.marker([14.597403504005879, 121.0091096162796], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP LABORATORY HIGH SCHOOL</h4> <h6>One of the best high schools in the country, producing exceptional students. The four priorities of the Laboratory High School curriculum are discipline, academic excellence, nationalism, and commerce.<h6/> <img src='./images/lab high.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP LABORATORY HIGH SCHOOL</a>"
    });
    
    let souvenirShop = L.marker([14.598436568608198, 121.01123660802843], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP SOUVENIR SHOP</h4> <img src='./images/souvenir shop.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP SOUVENIR SHOP</a>"
    });
    
    let entrance = L.marker([14.599167220340236, 121.01184385201297], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP MAIN ENTRANCE</h4> <img src='./images/entrance.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP MAIN ENTRANCE </a>"
    });
    
    let pylon = L.marker([14.59916370999337, 121.01172745227815], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PYLON</h4> <h6>Located	near the entrance of PUP Main Campus, the triad of pillars in Pylon signifies wisdom, strength, and beauty.</h6> <img src='./images/pylon.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PYLON</a>"
    });
    
    let guardHouse = L.marker([14.599044366657123, 121.01186424493793], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP GUARD HOUSE</h4> <img src='./images/guard house.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP GUARD HOUSE</a>"
    });
    
    let visitorCenter = L.marker([14.59908848944233, 121.01158261299135], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>VISITOR INFORMATION CENTER</h4> <h6>Located near the entrance of the PUP main campus, the visitor information center assists guests who need to enter and have transactions inside the campus.</h6> <img src='./images/vass.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>VISITOR INFORMATION CENTER</a>"
    });
    
    let sculpture = L.marker([14.599111806608315, 121.01193130016328], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP BRASS SCULPTURE</h4> <h6>The sculpture (Cut and welded brass mural relief, 2.5 x 9.3 meters) was built by national artist Eduardo Castrillo in 1974. The theme of the artwork is Consolidated Growth through Education – the role of PUP in the educational development of the youth in preparation for their involvement in nation building. The mural illustrates the social, economic, industrial, technological, and cultural aspect of life with which man blends himself to develop an environment necessary to the progress of the nation.<br/><br/>The mural Is located at the main gate of the University Mabini Campus. The brass sculpture depicts the purposeful growth of the Filipino youth. It also signifies the role and responsibility of the youth in the progress and development of the nation, which the University recognizes. As an institution dutifully concerned in shaping the lives of the youth, the University pays tribute to the hope and builder of the world tomorrow through this artistic interpretation.<h6/> <img src='./images/sculpture.png' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP BRASS SCULPTURE</a>"
    });
    
    let amphitheater = L.marker([14.597366951335761, 121.01041651622002], {icon: mapIcon})
    .addTo(map)
    .bindPopup("<h4>PUP AMPITHEATER</h4> <h6>The PUP Amphitheater is an outdoor venue designed for performances, events, or gatherings, often characterized by a stage or platform with seating that may be arranged in a circular or semicircular fashion. it could be used for various purposes, including academic events, cultural performances, and public gatherings. The PUP Amphitheater can be found inside the PUP lagoon.<h6/> <img src='./images/ampi.jpg' />")
    .on('click', function() {
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP AMPITHEATER</a>"
    });

    document.getElementById('link-sculpture').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(sculpture.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP BRASS SCULPTURE</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = sculpture.getLatLng();
        routingControl.setWaypoints(waypoints);
        sculpture.openPopup();
        closeNav();
    });

    document.getElementById('link-entrance').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(entrance.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP MAIN ENTRANCE</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = entrance.getLatLng();
        routingControl.setWaypoints(waypoints);
        entrance.openPopup();
        closeNav();
    });

    document.getElementById('link-guardhouse').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(guardHouse.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP GUARD HOUSE</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = guardHouse.getLatLng();
        routingControl.setWaypoints(waypoints);
        guardHouse.openPopup();
        closeNav();
    });

    document.getElementById('link-pylon').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(pylon.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PYLON</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = pylon.getLatLng();
        routingControl.setWaypoints(waypoints);
        pylon.openPopup();
        closeNav();
    });

    document.getElementById('link-vic').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(visitorCenter.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>VISITOR INFORMATION CENTER</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = visitorCenter.getLatLng();
        routingControl.setWaypoints(waypoints);
        visitorCenter.openPopup();
        closeNav();
    });

    document.getElementById('link-oval').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(oval.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP TRACK AND FIELD OVAL</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = oval.getLatLng();
        routingControl.setWaypoints(waypoints);
        oval.openPopup();
        closeNav();
    });

    document.getElementById('link-community').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(communityBuilding.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>COMMUNITY BUILDING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = communityBuilding.getLatLng();
        routingControl.setWaypoints(waypoints);
        communityBuilding.openPopup();
        closeNav();
    });

    document.getElementById('link-tennis').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(tennisCourt.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>TENNIS COURT</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = tennisCourt.getLatLng();
        routingControl.setWaypoints(waypoints);
        tennisCourt.openPopup();
        closeNav();
    });

    document.getElementById('link-court').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(basketballCourt.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>OUTDOOR BASKETBALL AND VOLLEYBALL COURT</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = basketballCourt.getLatLng();
        routingControl.setWaypoints(waypoints);
        basketballCourt.openPopup();
        closeNav();
    });

    document.getElementById('link-souvenir').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(souvenirShop.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP SOUVENIR SHOP</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = souvenirShop.getLatLng();
        routingControl.setWaypoints(waypoints);
        souvenirShop.openPopup();
        closeNav();
    });

    document.getElementById('link-mabini').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(mabiniShrine.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>MABINI SHRINE</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = mabiniShrine.getLatLng();
        routingControl.setWaypoints(waypoints);
        mabiniShrine.openPopup();
        closeNav();
    });

    document.getElementById('link-grandstand').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(grandstand.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP GRANDSTAND</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = grandstand.getLatLng();
        routingControl.setWaypoints(waypoints);
        grandstand.openPopup();
        closeNav();
    });

    document.getElementById('link-obelisk').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(obelisk.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP OBELISK</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = obelisk.getLatLng();
        routingControl.setWaypoints(waypoints);
        obelisk.openPopup();
        closeNav();
    });

    document.getElementById('link-freedomPark').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(freedomPark.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>NEMESIO PRUDENTE FREEDOM PARK</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = freedomPark.getLatLng();
        routingControl.setWaypoints(waypoints);
        freedomPark.openPopup();
        closeNav();
    });

    document.getElementById('link-lagoon').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(lagoon.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP LAGOON</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = lagoon.getLatLng();
        routingControl.setWaypoints(waypoints);
        lagoon.openPopup();
        closeNav();
    });

    document.getElementById('link-ampi').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(amphitheater.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP AMPITHEATER</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = amphitheater.getLatLng();
        routingControl.setWaypoints(waypoints);
        amphitheater.openPopup();
        closeNav();
    });

    document.getElementById('link-dome').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(dome.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>MAIN BUILDING DOME</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = dome.getLatLng();
        routingControl.setWaypoints(waypoints);
        dome.openPopup();
        closeNav();
    });

    document.getElementById('link-north').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(northWing.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>NORTH WING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = northWing.getLatLng();
        routingControl.setWaypoints(waypoints);
        northWing.openPopup();
        closeNav();
    });

    document.getElementById('link-west').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(westWing.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>WEST WING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = westWing.getLatLng();
        routingControl.setWaypoints(waypoints);
        westWing.openPopup();
        closeNav();
    });

    document.getElementById('link-east').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(eastWing.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>EAST WING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = eastWing.getLatLng();
        routingControl.setWaypoints(waypoints);
        eastWing.openPopup();
        closeNav();
    });

    document.getElementById('link-south').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(southWing.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>SOUTH WING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = southWing.getLatLng();
        routingControl.setWaypoints(waypoints);
        southWing.openPopup();
        closeNav();
    });

    document.getElementById('link-chapel').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(chapel.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP INTERFAITH CHAPEL</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = chapel.getLatLng();
        routingControl.setWaypoints(waypoints);
        chapel.openPopup();
        closeNav();
    });

    document.getElementById('link-linear').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(linearPark.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>LINEAR PARK</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = linearPark.getLatLng();
        routingControl.setWaypoints(waypoints);
        linearPark.openPopup();
        closeNav();
    });

    document.getElementById('link-nfsb').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(foodNutritionBuilding.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>NUTRITION AND FOOD SCIENCE BUILDING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = foodNutritionBuilding.getLatLng();
        routingControl.setWaypoints(waypoints);
        foodNutritionBuilding.openPopup();
        closeNav();
    });

    document.getElementById('link-ferry').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(ferry.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP STA. MESA FERRY STATION</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = ferry.getLatLng();
        routingControl.setWaypoints(waypoints);
        ferry.openPopup();
        closeNav();
    });

    document.getElementById('link-canteen').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(canteen.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>STUDENT CANTEEN</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = canteen.getLatLng();
        routingControl.setWaypoints(waypoints);
        canteen.openPopup();
        closeNav();
    });

    document.getElementById('link-charlie').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(charlie.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>CHARLIE DEL ROSARIO BUILDING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = charlie.getLatLng();
        routingControl.setWaypoints(waypoints);
        charlie.openPopup();
        closeNav();
    });

    document.getElementById('link-labHigh').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(labHigh.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP LABORATORY HIGH SCHOOL</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = labHigh.getLatLng();
        routingControl.setWaypoints(waypoints);
        labHigh.openPopup();
        closeNav();
    });

    document.getElementById('link-nalrc').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(library.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>NINOY AQUINO LEARNING RESOURCE CENTER</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = library.getLatLng();
        routingControl.setWaypoints(waypoints);
        library.openPopup();
        closeNav();
    });

    document.getElementById('link-tank').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(waterTank.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>R.C. OVERHEAD WATER TANK</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = waterTank.getLatLng();
        routingControl.setWaypoints(waypoints);
        waterTank.openPopup();
        closeNav();
    });

    document.getElementById('link-gym').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(gym.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP GYMNASIUM</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = gym.getLatLng();
        routingControl.setWaypoints(waypoints);
        gym.openPopup();
        closeNav();
    });

    document.getElementById('link-pool').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(pool.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP SWIMMING POOL</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = pool.getLatLng();
        routingControl.setWaypoints(waypoints);
        pool.openPopup();
        closeNav();
    });

    document.getElementById('link-alumni').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(alumni.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>TAHANAN NG ALUMNI</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = alumni.getLatLng();
        routingControl.setWaypoints(waypoints);
        alumni.openPopup();
        closeNav();
    });

    document.getElementById('link-pe').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(pe.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PHYSICAL EDUCATION BUILDING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = pe.getLatLng();
        routingControl.setWaypoints(waypoints);
        pe.openPopup();
        closeNav();
    });

    document.getElementById('link-coc').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(coc.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>COLLEGE OF COMMUNICATIONS BUILDING</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = coc.getLatLng();
        routingControl.setWaypoints(waypoints);
        coc.openPopup();
        closeNav();
    });

    document.getElementById('link-theater').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(theater.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP THEATER</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = theater.getLatLng();
        routingControl.setWaypoints(waypoints);
        theater.openPopup();
        closeNav();
    });

    document.getElementById('link-cea').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(cea.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>COLLEGE OF ENGINEERING AND ARCHITECHTURE</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = cea.getLatLng();
        routingControl.setWaypoints(waypoints);
        cea.openPopup();
        closeNav();
    });

    document.getElementById('link-condotel').addEventListener('click', function(e) {
        e.preventDefault();
        map.flyTo(condotel.getLatLng(), map.getZoom());
        document.getElementById('viewedSidebar').innerHTML += "<a>PUP CONDOTEL</a>"
        let waypoints = routingControl.getWaypoints();
        waypoints[1].latLng = condotel.getLatLng();
        routingControl.setWaypoints(waypoints);
        condotel.openPopup();
        closeNav();
    });

    // Routing to Markers
    let routingControl = L.Routing.control({
        waypoints: [
            entrance.getLatLng(),
            entrance.getLatLng()
        ],
        draggableWaypoints: false,
        addWaypoints: false,
    }).addTo(map);    
    
    let markers = [obelisk, freedomPark, chapel, oval, gym, library, alumni, pe, pool, dome, northWing, eastWing, westWing, southWing, lagoon, linearPark, ferry, canteen, condotel, cea, coc, theater, labHigh, souvenirShop, entrance, guardHouse, sculpture, amphitheater, basketballCourt, tennisCourt, waterTank, charlie, pylon, visitorCenter, communityBuilding, grandstand, foodNutritionBuilding, mabiniShrine];
    
    markers.forEach(function(marker) {
        marker.on('click', function() {
            let waypoints = routingControl.getWaypoints();

            waypoints[1].latLng = marker.getLatLng();
            routingControl.setWaypoints(waypoints);
            map.setView([lat, lng], 18);
        });
    });  

}

// Map Click Event
map.on("click", function(e) {
    console.log(e)
});



