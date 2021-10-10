let clicky = document.querySelector('.clicky');
let put = document.querySelector('.put');
let sub = document.querySelector('#sub');
let got = document.querySelector('.got');
let api = 'https://api.github.com/users/';
clicky.addEventListener('click', function(){

  result();
});

sub.addEventListener('submit', function(e){
  e.preventDefault();
  result();
})

function result(){
  let final = put.value;
  if(!final){
    return;
  }
  else {
      getUser(final);
      put.value = '';
  }
}

async function getUser(user){
  
    let fet = await fetch(api + user);
    let respData = await fet.json();
    
    createCard(respData);
} 



function createCard(user){
  for (let member in user) {
    if (user[member] == null || user[member] == ''){
      user[member] = 'not avaliable';
    }
  }

  if(user.login == undefined){
    got.innerHTML = "<h2 class='text-center'>User Not Found!</h2>"
  } else {
    got.innerHTML = `
  <div class="profile">
    <div class="img" style="text-align: center;">
      <img class="custom" src='${user.avatar_url}' alt="profile">
    </div>

    <div class="content ">
      <h2 class="mt-3 text-center">${user.login}</h2>
      <p class="text-center">Bio -${user.bio}</p>

      <ul class="list lh-lg">
        <li>Id- ${user.id}</li>
        <li>Type- ${user.type}</li>
        <li>Public repo- ${user.public_repos}</li>
        <li>Create date- ${user.created_at}</li>
        <li>Follower- ${user.followers}</li>
        <li>Following- ${user.following}</li>
      </ul>

      <a href='${user.html_url}' class="pb-5">See this dude on github page</a>
    </div>
  </div>
  `;
  }
  
}

