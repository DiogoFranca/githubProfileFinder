const input = document.querySelector('input')
const result = document.querySelector('.result')

document.addEventListener('click', e => {
  const el = e.target

  if (el.classList.contains('btn-search')) {
    if (!input.value) return

    cleanInformation()
    userSearch(input.value)
    cleanInput()
  }
})

async function userSearch(user) {
  const url = `https://api.github.com/users/${user}`

  try {
    const profileOBJ = await axios(url);

    if(profileOBJ.status < 200 && profileOBJ.status >= 300) {
      throw new Error(`Usuário ${user} não encontrado, tente novamente!`)
    }

    result.style.backgroundColor = '#5a189a'
    addDataOnScreen(profileOBJ.data)
  } catch(e) {
    alert(e);
  }
}

function cleanInput() {
  input.value = ''
}

function cleanInformation() {
  const avatar = document.querySelector('.avatar')
  const personalData = document.querySelector('.personal-data')
  const numericalData = document.querySelector('.numerical-data')

  avatar.innerHTML = ''
  personalData.innerHTML = ''
  numericalData.innerHTML = ''
}

function addDataOnScreen(obj) {
  const {
    avatar_url,
    login,
    bio,
    created_at,
    public_repos,
    followers,
    following
  } = obj

  addAvatar(avatar_url)
  addPersonalData(login, bio, created_at)
  addNumericalData(public_repos, followers, following)
}

function createTag(tagName) {
  const tag = document.createElement(tagName)
  return tag
}

function addAvatar(avatar_url) {
  const avatar = document.querySelector('.avatar')

  const img = createTag('img')

  img.src = avatar_url
  img.setAttribute('class', 'avatar')

  avatar.appendChild(img)
}

function addPersonalData(userName, bio, joined) {
  const personalData = document.querySelector('.personal-data')

  const div = createTag('div')
  const p = createTag('p')

  const spanUserName = createTag('span')
  const spanJoined = createTag('span')

  spanUserName.innerText = userName
  spanJoined.innerText =
    'Joined ' +
    ' ' +
    new Date(joined).toLocaleDateString('pt-BR', {
      timeZone: 'UTC'
    })

  p.innerText = bio

  div.appendChild(spanUserName)
  div.appendChild(spanJoined)

  spanUserName.setAttribute('class', 'spanUserName')
  spanJoined.setAttribute('class', 'spanJoined')
  p.setAttribute('class', 'bio')
  div.setAttribute('class', 'user-joined')

  personalData.appendChild(div)
  personalData.appendChild(p)
}

function addNumericalData(repos, followers, following) {
  const numericalData = document.querySelector('.numerical-data')

  const reposBox = createCountingBoxes('Repos', repos)
  const followersBox = createCountingBoxes('Followers', followers)
  const followingBox = createCountingBoxes('Following', following)

  reposBox.setAttribute('class', 'counter-box')
  followersBox.setAttribute('class', 'counter-box')
  followingBox.setAttribute('class', 'counter-box')

  numericalData.appendChild(reposBox)
  numericalData.appendChild(followersBox)
  numericalData.appendChild(followingBox)

  numericalData.style.backgroundColor = '#ff6d00'
}

function createCountingBoxes(text, counter) {
  const span = createTag('span')
  const p = createTag('p')
  const div = createTag('div')

  span.innerText = text
  p.innerText = counter

  div.appendChild(span)
  div.appendChild(p)

  return div
}
