ymaps.ready(init);

const cities = {
  mgn: {
    city: ['53.407163', '58.980291'],
    coordinates: ['53.436617', '58.955372'],
    address: 'Автомобилистов 16в',
    name: 'Ути-Пути'
  },
  askarovo: {
    city: ['53.336339', '58.511497'],
    coordinates: ['53.330219', '58.514398'],
    address: 'Рауфа Давлетова 6/3',
    name: 'Ути-Пути'
  },
  uchaly: {
    city: ['54.319181', '59.378640'],
    coordinates: ['54.316329', '59.377185'],
    address: 'Ленина 25а',
    name: 'Ути-Пути'
  },
  beloreck: {
    city: ['53.967621', '58.410023'],
    coordinates: ['53.968257', '58.410229'],
    address: 'Карла Маркса 72',
    name: 'Ути-Пути'
  }
}

let myMap = null;
function init() {
  myMap = new ymaps.Map("contacts__map", {
    center: cities.mgn.coordinates,
    zoom: 15,
    controls: ['geolocationControl']
  })
  myMap.behaviors.disable('scrollZoom')


  var zoomControl = new ymaps.control.ZoomControl({
    options: {
      size: "small"
    }
  });
  myMap.controls.add(zoomControl);

  const balloonContent = `
	  <h3>Магазин "${cities.mgn.name}"</h3>
    <div>Адрес: ${cities.mgn.address}</div>
  `
  const placemark = new ymaps.Placemark(cities.mgn.coordinates, {
    balloonContent,
  }, {
    iconLayout: 'default#image',
    balloonCloseButton: true,
    hideIconOnBalloonOpen: false
  })

  myMap.geoObjects.add(placemark);
}


const select = document.querySelector('.contacts__select')
const selectTitle = select.querySelector('.contacts__select-title')
const selectList = select.querySelector('.contacts__select-list')
const selectItems = selectList.querySelectorAll('.contacts__select-item')


//Клик вне select
document.addEventListener('click', (event) => {
  if (!select.contains(event.target))
    select.classList.remove('open')
})

//Клин на заголовок select
selectTitle.addEventListener('click', () => {
  select.classList.toggle('open')
})

//Выбор пункта в select
selectItems.forEach( selectItem => {
  selectItem.addEventListener('click', () => {
    const cityId = selectItem.dataset.city
    selectTitle.innerHTML = selectItem.innerHTML
    select.classList.remove('open')
    myMap.setCenter(cities[cityId].coordinates, 15)

    const balloonContent = `
    <h3>Магазин "${cities[cityId].name}"</h3>
    <div>Адрес: ${cities[cityId].address}</div>
  `;
    const placemark = new ymaps.Placemark(cities[cityId].coordinates, {
      balloonContent,
    }, {
      balloonCloseButton: true,
      hideIconOnBalloonOpen: false
    })
    myMap.geoObjects.removeAll();
    myMap.geoObjects.add(placemark);
  })
})

Maska.create('.partners__phone')

//Отправка сообщения
//Отправка сообщения
const partnersButton = document.querySelector('.partners__button')
const partnersPhone = document.querySelector('.partners__phone')
const partnersMessage = document.querySelector('.partners__message')
partnersButton.addEventListener('click', () => {
  if(!partnersButton.classList.contains('disabled')) {
    if (partnersPhone.value && partnersPhone.value.length === 18) {
      partnersMessage.classList.remove('error')
      partnersMessage.innerText = ''
      partnersButton.classList.add('disabled')

      const data = {
        phone: partnersPhone
      }

      //Имитируем аякс отправку заявки, нужно заменить этот блок реальными данными
      setTimeout( () => {
        partnersMessage.innerText = 'Ваша заявка успешно отправлена'
        partnersButton.classList.remove('disabled')
        partnersPhone.value = ''
      }, 3000)
    } else {
      partnersMessage.classList.add('error')
      partnersMessage.innerText = 'Необходимо заполнить форму'
    }
  }
})