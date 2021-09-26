console.log('js work')

const $containerCars = document.querySelector('.container-cars')

const getDataServerCar = async () => {
    const response = await fetch('http://109.236.74.74:9900/getdata')
    const dataFromServer = await response.json()
    try {
        const dataCarHTML = createDataCarHTML(dataFromServer)
        $containerCars.insertAdjacentHTML('afterbegin', dataCarHTML)

        const characteristicCar = dataFromServer.Item.KeyValues
        const characteristicCarArr = Object.entries(characteristicCar)
        characteristicCarFunc(characteristicCarArr)

        const CarOptions = dataFromServer.Item.Original.CarOptions
        const CarOptionsSelect = Object.entries(CarOptions)
        CarOptionsFunc(CarOptionsSelect)

        openWindowEditOwner()
        closeWindowEditOwner()

        document.querySelector('#nameUser').value = dataFromServer.Garage.Name
        document.querySelector('#userEmail').value = dataFromServer.Garage.Email
        document.querySelector('#userOwner').value = dataFromServer.Garage.Owner
    } catch {
        $containerCars.classList.add('not-data-car')
        $containerCars.innerText = 'Данных о машине нет.'
    }

}

getDataServerCar()

function createDataCarHTML(dataCar) {
    return `
    <section class="data-car">
        <h1 class="title-car">${dataCar.Item.Title}</h1>

        <div class="description-car first">
            <h2 class="title">Описание</h2>
            <p class="description">${dataCar.Item.Description}</p>
        </div>

        <div class="description-car">
            <h2 class="title">Характеристика</h2>
            <ul class="characteristic-car-list"></ul>
        </div>
        
        <div class="description-car">
            <h2 class="title">Модель: ${dataCar.Item.Original.Model}</h2>
            <h3 class="subtitle">Бренд: ${dataCar.Item.Original.Make}</h3>
            <ul class="car-options-list"></ul>
        </div>

        <div class="data-owner">
            <h2 class="title">Данные владельца</h2>
            <div class="wrapper-data-user">
                <div class="data-owner-item"><span class="text">Имя:</span> <span class="userName">${dataCar.Garage.Name}</span></div>
                <div class="data-owner-item"><span class="text">Email:</span> <span class="userEmail">${dataCar.Garage.Email}</span></div>
                <div class="data-owner-item"><span class="text">Владелец:</span> <span class="userOwner">${dataCar.Garage.Owner}</span></div>
            </div>
            <button class="edit-user-owner">Edit</button>
        </div>
    </section>
    `
}

function characteristicCarFunc(array) {

    for (let [key, value] of array) {
        const $characteristicCarList = document.querySelector('.characteristic-car-list')

        const characteristicCarSelect = document.createElement('li')
        characteristicCarSelect.classList.add('characteristic-car-item')

        const characteristicCarSelectName = document.createElement('span')
        characteristicCarSelectName.classList.add('characteristic-name')
        characteristicCarSelectName.innerText = key

        characteristicCarSelect.appendChild(characteristicCarSelectName)

        const characteristicCarSelectValues = document.createElement('span')
        characteristicCarSelectValues.classList.add('characteristic-value')
        characteristicCarSelectValues.innerText = value

        characteristicCarSelect.appendChild(characteristicCarSelectValues)

        $characteristicCarList.appendChild(characteristicCarSelect)
    }
}

function CarOptionsFunc(array) {

    for (let [key, value] of array) {
        const $carOptionsList = document.querySelector('.car-options-list')

        const carOptionsListItem = document.createElement('li')
        carOptionsListItem.classList.add('car-options-item')

        const carOptionstitle = document.createElement('span')
        carOptionstitle.classList.add('car-option-name')
        carOptionstitle.innerText = key

        carOptionsListItem.appendChild(carOptionstitle)

        const carOptionsListCode = document.createElement('span')
        carOptionsListCode.classList.add('car-option-value')
        carOptionsListCode.innerText = value

        carOptionsListItem.appendChild(carOptionsListCode)

        $carOptionsList.appendChild(carOptionsListItem)
    }
}

function openWindowEditOwner() {
    const $modalWindow = document.querySelector('#hidden')
    const $buttonEditUserData = document.querySelector('.edit-user-owner')

    $buttonEditUserData.addEventListener('click', () => {
        $modalWindow.style.opacity = '1';
        $modalWindow.style.zIndex = '1';
    })
}

function closeWindowEditOwner() {
    const $closeFormEdit = document.querySelector('.form-edit-user__closeForm')
    const $modalWindow = document.querySelector('#hidden')

    $closeFormEdit.addEventListener('click', () => {
        $modalWindow.style.opacity = '0';
        $modalWindow.style.zIndex = '-5';
    })
}



const $formEditUser = document.forms.formEditUser;
const $nameUser = document.querySelector('#nameUser')
const $userEmail = document.querySelector('#userEmail')
const $userOwner = document.querySelector('#userOwner')

const $modalWindow = document.querySelector('#hidden')


$formEditUser?.addEventListener('input', (event) => {
    if (event.target.classList.contains('necessarily')) {
        const lengthStringNameUser = $nameUser.value.trim().length
        const lengthStringUserEmail = $userEmail.value.trim().length
        const lengthStringUserOwner = $userOwner.value.trim().length
        if ((lengthStringNameUser >= 1) && (lengthStringUserEmail >= 1) && (lengthStringUserOwner >= 1)) {
            document.querySelector('.button-edit-userData').classList.add('active')
        } else {
            document.querySelector('.button-edit-userData').classList.remove('active')
        }
    }
})


$formEditUser?.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    if (!$nameUser.value) {
        $nameUser.classList.add('error')
    }
    if (!$userEmail.value) {
        $userEmail.classList.add('error')
    }
    if (!$userOwner.value) {
        $userOwner.classList.add('error')
    }
    if (($nameUser.value) && ($userEmail.value) && ($userOwner.value)) {
        document.querySelector('.button-edit-userData').classList.remove('active')
        document.querySelector('.userName').innerText = formData.nameUser
        document.querySelector('.userEmail').innerText = formData.userEmail
        document.querySelector('.userOwner').innerText = formData.userOwner

        $nameUser.value = formData.nameUser
        $userEmail.value = formData.userEmail
        $userOwner.value = formData.userOwner

        $modalWindow.style.opacity = '0';
        $modalWindow.style.zIndex = '-5';
        console.log(formData)
    }
})

$nameUser?.addEventListener('focus', () => {
    if ($nameUser.value !== ' ') {
        $nameUser.classList.remove('error')
    }
})
$userEmail?.addEventListener('focus', () => {
    if ($userEmail.value !== ' ') {
        $userEmail.classList.remove('error')
    }
})
$userOwner?.addEventListener('focus', () => {
    if ($userOwner.value !== ' ') {
        $userOwner.classList.remove('error')
    }
})



