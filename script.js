const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu() {
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Відкрити меню');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileMenu.hidden = expanded;
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Відкрити меню' : 'Закрити меню');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const services = {
  tires: {
    title: 'Шиномонтаж',
    description: 'Сезонна заміна комплекту та встановлення нових шин. Уточни діаметр коліс і тип авто перед візитом.',
    items: ['Монтаж і демонтаж шин', 'Заміна сезонного комплекту', 'Обговорення стану шин перед установленням']
  },
  balance: {
    title: 'Балансування коліс',
    description: 'Перевірка та корекція дисбалансу колеса. Вібрація може мати різні причини — починаємо з огляду.',
    items: ['Балансування після заміни шин', 'Перевірка після ремонту колеса', 'Оцінка коліс при вібрації на швидкості']
  },
  repair: {
    title: 'Ремонт шин і камер',
    description: 'Робота з проколами та іншими пошкодженнями. Можливість і спосіб ремонту залежать від стану шини та місця пошкодження.',
    items: ['Огляд пошкодженої шини', 'Усунення проколів, якщо ремонт можливий', 'Ремонт камер']
  },
  rims: {
    title: 'Вирівнювання дисків',
    description: 'Прокатка та відновлення геометрії після удару. Не кожен пошкоджений диск підлягає ремонту — потрібен огляд майстра.',
    items: ['Перевірка стану та геометрії диска', 'Оцінка можливості відновлення', 'Прокатка та вирівнювання']
  },
  storage: {
    title: 'Зберігання шин',
    description: 'Зберігання сезонного комплекту. Уточни наявність місць, термін, умови передачі та вартість телефоном.',
    items: ['Сезонний комплект в одному місці', 'Узгодження терміну зберігання', 'Умови приймання уточнюються у майстра']
  }
};
const serviceDialog = document.querySelector('.service-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('#dialog-description');
const dialogList = document.querySelector('#dialog-list');
document.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => {
    const service = services[button.dataset.service];
    if (!service) return;
    dialogTitle.textContent = service.title;
    dialogDescription.textContent = service.description;
    dialogList.replaceChildren(...service.items.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    serviceDialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => serviceDialog.close());
serviceDialog.addEventListener('click', event => {
  if (event.target !== serviceDialog) return;
  const bounds = serviceDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) serviceDialog.close();
});
serviceDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
