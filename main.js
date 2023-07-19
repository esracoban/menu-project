import menu from './db.js';
import { buttonsData } from './db.js';

// HTML'den gelenler
const menuContainer = document.getElementById('menu-container');
const buttonsArea = document.getElementById('buttons-area');

// sayfa yüklendiği anda elemanları listeleyen fonksiyonu çalıştır
document.addEventListener('DOMContentLoaded', () => {
  displayMenuItems(menu);
  showButtons('all');
});

// ekrana menü elemanlarını listeleyecek fonksiyon
function displayMenuItems(menuItems) {
  console.log(menuItems);

  // dizideki her bir obje için
  // bir menü elemanını temsil eden html oluştur
  // ve bu html'i  bir diziye aktar
  let displayMenu = menuItems.map(
    (item) => `
     <a href="productDetail.html?id=${item.id}" id="card" class="d-flex gap-3 flex-column flex-md-row text-decoration-none text-dark">
        <img class="rounded shadow" src=${item.img} />
        <div>
          <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success">$ ${item.price}</p>
          </div>

          <p class="lead">
            ${item.desc}
          </p>
        </div>
      </a>
 `
  );
  //   diziyi aralarındaki virgülü silerek stringe çevirme
  displayMenu = displayMenu.join(' ');

  //   oluşan menü elemanlarını HTML'e gönderme
  menuContainer.innerHTML = displayMenu;
}

// butonları html'den getirme
buttonsArea.addEventListener('click', searchCategeory);

// tıklanılan butona göre ekrana o kategorinni elemanlarını
// basmakla görevli fonksiyon
function searchCategeory(e) {
  const categeory = e.target.dataset.category;

  // tüm diziki elemanlardan yalnızca kategori değeri
  // tıkladığımız butonun kategori değetriyle aynı olanları
  // bir diziye aktrma
  const filtredMenu = menu.filter(
    (menuItem) => menuItem.category === categeory
  );

  //   eğerki hepsi seçildiyse o zaman bütün menuyu ekran bas
  if (categeory === 'all') {
    displayMenuItems(menu);
  } else {
    //  filtrenmiş diziyi ekrana basma
    displayMenuItems(filtredMenu);
  }

  //  butonları güncelle
  showButtons(categeory);
}

// ekrana menü butonlarını basacak fonksiyon
function showButtons(active) {
  // eski butonları temizleme
  buttonsArea.innerHTML = '';
  //   yeni butonları ekleme
  buttonsData.forEach((btn) => {
    // html butonu oluşturma
    const buttonElement = document.createElement('button');

    // gerekli classları verme
    buttonElement.className = 'btn btn-outline-dark filter-btn';

    // yazıyı değiştirme
    buttonElement.innerText = btn.text;

    // datasını tanımlama
    buttonElement.dataset.category = btn.data;

    // active olana ayrıca class verme
    if (buttonElement.dataset.category === active) {
      buttonElement.classList.add('bg-dark', 'text-light');
    }

    // HTML'e gönderme
    buttonsArea.appendChild(buttonElement);
  });
}