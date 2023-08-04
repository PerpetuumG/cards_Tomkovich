const CLIENT_ID = 'NcMjHTa__4twlLaP28avVF_ki52TgJiv0-y9-1iZvXQ';
const slider = document.getElementById('slider');

let state = [];
let currentSlide;

const fetchPhotos = async () => {
  try {
    const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=4&query=food`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.length) {
      state = data;
      currentSlide = data[0].id;
      setPhotos();
    }
  } catch (e) {
    console.error(e);
    console.log('Превышено количество запросов');
  }
};

const renderItem = () => {
  return state
    .map(({ urls: { regular }, user: { name }, id: { id } }) => {
      const isActive = currentSlide === id ? 'active' : '';
      return `<div class="slide ${isActive}" data-id="${id}" style="background-image: url(${regular})">
      <div class="slide-text" >
          <span>photo by</span>
          ${name}
      </div>
  </div>`;
    })
    .join('');
};

const handleClick = ({ currentTarget }) => {
  const slides = document.querySelectorAll('.slide');
  const { id } = currentTarget.dataset;

  if (id === currentSlide) return;

  slides.forEach(slide => slide.classList.remove('active'));
  currentTarget.classList.add('active');
  currentSlide = id;
};

const setPhotos = () => {
  slider.innerHTML = renderItem();

  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => {
    slide.addEventListener('click', handleClick);
  });
};

fetchPhotos();
