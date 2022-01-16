const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyBo-AWi-4rfwgSatlIT1TPTNgRbcVdRB6c";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    //console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="videos" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        fetch(`${searchLink} ${searchInput.value}&key=${api_key}`)
        .then((data) => data.json())
        .then((res) => {
            res.channelThumbnail = res.items[0].snippet.thumbnails.default.url;
            
            console.log(res);
             });
            }
})

// const searchVideoCard = (data) => {
//   videoCardContainer.innerHTML += `
//   <div class="videos" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
//       <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
//       <div class="content">
//           <img src="${data.channelThumbnail}" class="channel-icon" alt="">
//           <div class="info">
//               <h4 class="title">${data.snippet.title}</h4>
//               <p class="channel-name">${data.snippet.channelTitle}</p>
//           </div>
//       </div>
//   </div>
//   `;
// }


const SignInbtn = document.querySelector('.btn');
SignInbtn.addEventListener('click', () => SignIn()) 
var YOUR_CLIENT_ID = '801961436405-oihum3tqup0s1gjri7ih451p3ljs2igd.apps.googleusercontent.com';
var YOUR_REDIRECT_URI = 'https://ecstatic-lovelace-b91bf5.netlify.app/';
var fragmentString = location.hash.substring(1);

// Parse query string to see if page request is coming from OAuth 2.0 server.
var params = {};
var regex = /([^&=]+)=([^&]*)/g, m;
while (m = regex.exec(fragmentString)) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0) {
  localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
  if (params['state'] && params['state'] == 'SignIn') {
    SignIn();
  }
}

// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function SignIn() {
  var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
        'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&' +
        'access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response);
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        // Token invalid, so prompt for user permission.
        oauth2SignIn();
      }
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': YOUR_CLIENT_ID,
                'redirect_uri': YOUR_REDIRECT_URI,
                'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
                'state': 'try_sample_request',
                'include_granted_scopes': 'true',
                'response_type': 'token'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit(getPosts());
}

// Getting Values from Youtube Api
const baseUrl = "https://www.googleapis.com/youtube/v3/";
const access_token = "ya29.A0ARrdaM8fsbNHztu6IYKWdVZV4otine_zHKmYX03llGH35UhAtbILg8nbbIKgQGdk717abWrg1_zDAbO2M_7ZMYKz54PQR3a8DxZw9jmQzURyY1qxRMYMjkShs7yVro0ElQarcRbOdk5uXxEirgatVMNHsqoEaw"

// Read | Http Method : GET
const getPosts = () => {
  fetch(`${baseUrl}channels?part=contentDetails&mine=true&key=${api_key}`)
    .then((data) => data.json())
    .then((res) => console.log(res));
};

 

