console.log('js work')

const $containerCars = document.querySelector('.container-cars')

const getDataServerCarKia = async () => {
    const response = await fetch('http://109.236.74.74:9900/getdata')

    const dataFromServer = await response.json()

    const dataCarHTML = createDataCarHTML(dataFromServer)

    $containerCars.insertAdjacentHTML('afterbegin', dataCarHTML)

    function createDataCarHTML(dataCar) {
        return `
        <h1 class="title-car">${dataCar.Item.Title}</h1>

        <section class="description-car">
            <h2 class="description-car-title">Описание</h2>
            <p class="description">${dataCar.Item.Description}</p>
        </section>

        <section class="characteristic-car">
            <h2 class="characteristic-car-title">Характеристика машины</h2>
            <ul class="characteristic-car-list"></ul>
        </section>
        
        <section class="section-car-options">
            <h2 class="car-options-brand">Бренд: ${dataCar.Item.Original.Make}</h2>
            <h3 class="car-options-model">Модель: ${dataCar.Item.Original.Model}</h3>
            <ul class="car-options-list"></ul>
        </section>

        <section class="section-data-owner">
            <h2 class="">Данные владельца</h2>
            <div class="wrapper-data-user>
                <div class="data-owner-item name">Имя: ${dataCar.Garage.Name}</div>
                <div class="data-owner-item Email">Email: ${dataCar.Garage.Email}</div>
                <div class="data-owner-item owner">Владелец: ${dataCar.Garage.Owner}</div>
            </div>
        </section>
        `
    }

    const KeyValues = dataFromServer.Item.KeyValues

    const characteristicCar = Object.entries(KeyValues)

    for (let [key, value] of characteristicCar) {
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


    const CarOptions = dataFromServer.Item.Original.CarOptions
    console.log(CarOptions)

    const CarOptionsSelect = Object.entries(CarOptions)

    for (let [key, value] of CarOptionsSelect) {
        const $carOptionsList = document.querySelector('.car-options-list')

        const carOptionsListItem = document.createElement('li')
        carOptionsListItem.classList.add('car-options-list-item')

        const carOptionsListItemName = document.createElement('span')
        carOptionsListItemName.classList.add('car-option-list-item-name')
        carOptionsListItemName.innerText = key

        carOptionsListItem.appendChild(carOptionsListItemName)

        const carOptionsListItemValue = document.createElement('span')
        carOptionsListItemValue.classList.add('car-option-list-item-value')
        carOptionsListItemValue.innerText = value

        carOptionsListItem.appendChild(carOptionsListItemValue)
        
        $carOptionsList.appendChild(carOptionsListItem)
    }

    console.log(dataFromServer)

}

getDataServerCarKia()