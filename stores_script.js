window.addEventListener('load', () => {

    //проверяем надо ли показывать наш слайдер
    if (localStorage.getItem('showElement') === 'false'){
        return;
    }

    //время ожидания
    const hidden_time = 5000;

    //текст
    const main_info = [
        'Летучие мыши всегда поворачивают налево, вылетая из пещеры.',
        'Шум, который мы слышим, поднося морскую раковину к уху, вовсе не океан. Мы всего лишь слышим, как кровь в нашем ухе циркулирует по венам.',
        'Каждый раз, когда вы чихаете, некоторые мозговые клетки у вас в голове отмирают.',
        ' Кнут щелкает в воздухе из-за того, что его кончик двигается со скоростью большей скорости звука.',
        'Во сне дельфины закрывают только один глаз. У них всегда работает одно полушарие мозга, отвечающее за то, чтобы они не утонули.\n',
        'Colgate столкнулся с большой проблемой при рекламе в Испании. На испанском colgate переводится, как “иди повешайся”.',
        'У умных людей в волосах находиться больше цинка и меди.',
        'Если у тебя есть какой-то интересный факт и ты хочешь им поделиться, тогде пиши мне ------>'
    ];

    //объект нашего слайдера
    const element = document.querySelector('.back_element');

    //кнопка закрыть
    const closeButton = element.querySelector('.close_button');
    closeButton.addEventListener('click', hideElement);

    //левая и правая стрелка
    const [leftArrow, rightArrow] = element.querySelectorAll('.element_arrow');
    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', previousSlide);

    //"больше не показывать"
    const disableTips = document.getElementById('checkboxId');
    disableTips.addEventListener('click', function () {
        localStorage.setItem('showElement', !this.checked);
    });

    //окно с инфой
    const infoContainer = element.querySelector('.info_slider');
    infoContainer.textContent = main_info[0];

    //все достыпные слайды
    const pointsContainer = element.querySelector('.slider_points');

    const allPoints = [];
    let currentIndexInfo = 0;

    //функция добавления точки в контейнер
    function addPoint(pointIndex) {
        let point = document.createElement('span');
        point.addEventListener('click', () => {
            infoContainer.textContent = main_info[pointIndex];
            currentIndexInfo = pointIndex;
            setSlide(pointIndex);
        });
        pointsContainer.appendChild(point);
        return point;
    }

    //показ всех доступных слайдов
    //возможность переключение слайдов через нажатие на клавиши
    function showElement() {
        element.classList.remove('element_hidden');
        for (let i = 0; i < main_info.length; i++)
            allPoints.push(addPoint(i));
        allPoints[0].classList.add('selected_point_on');
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Escape':
                    hideElement();
                    break;
                case 'ArrowLeft':
                    previousSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
            }
        });
    }

    //выбор слайда
    function setSlide(slideIndex) {
        infoContainer.textContent = main_info[slideIndex];
        if (currentIndexInfo == main_info.length - 1) {
           setLink();
        }
        allPoints.forEach((point) => point.classList.remove('selected_point_on'));
        allPoints[slideIndex].classList.add('selected_point_on');
    }

    function setLink(){
        const img = document.createElement('img');
        img.addEventListener('click', function() {
            window.open('https://t.me/oneoKoz', '_blank');
        })
        img.width=80;
        img.src="images/me.jpeg";
        infoContainer.appendChild(img);
    }

    function nextSlide() {
        currentIndexInfo = ++currentIndexInfo % main_info.length;
        setSlide(currentIndexInfo);
    }

    function previousSlide() {
        currentIndexInfo = (--currentIndexInfo + main_info.length) % main_info.length;
        setSlide(currentIndexInfo);
    }

    function hideElement() {
        element.classList.add('element_hidden');
    }

    //вызываем один раз функцию после 5 секунд
    setTimeout(showElement, hidden_time);
});