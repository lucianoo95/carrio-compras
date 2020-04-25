//Variables 
const shoppingCart = document.querySelector('#carrito');
const courses = document.querySelector('#lista-cursos');
const listCourses = document.querySelector('#lista-carrito tbody');
const cleanCartBtn = document.querySelector('#vaciar-carrito');

//Funciones 

const loadEventListners = () => {
  //Dispara cuando se presiona el boton 'agregar carrito'.
  courses.addEventListener('click', buyCourse);

  //Elimina un courso del carrito.
  shoppingCart.addEventListener('click', removeCourse);

  //Vaciar carrito
  cleanCartBtn.addEventListener('click', cleanCart);

  //Mostrar localstorage al cargar pagina principal.agregar-carrito
  window.addEventListener('load', readLocalStorage);

}

//Añadir un curso al carrito.
const buyCourse = (e) => {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const course = e.target.parentElement.parentElement;

    readDataCourse(course);
  };
}

//Lee los datos del curso.
const readDataCourse = (course) => {
  const infoCourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').dataset.id
  };

  insertCart(infoCourse);
}

//Mostrar curso seleccionado en el carrito de compras.
const insertCart = (course) => {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
      <img src="${course.image}" width=100>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td>
      <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
  </td>
 `;

  listCourses.appendChild(row);
  addCourseToLocalStorage(course);
}

const removeCourse = (e) => {
  e.preventDefault();

  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
    const course = e.target.parentElement.parentElement;
    const idCourse = course.querySelector('a').dataset.id;

    removeCourseFromLocalStorage(idCourse);
  }

}

//Elimina los cursos del dom.
const cleanCart = () => {
  //Forma rapida(recomendada)
  while (listCourses.firstChild) {
    listCourses.removeChild(listCourses.firstChild);
  }
  //forma lenta.
  //listCourses.innnerHTML = '';

  //Limpiar local storage. 
  emptyLocalStorage();
}

//Agregar curso al LocalStorage.
const addCourseToLocalStorage = (course) => {
  const courses = getCoursesToLocalStorage();
  courses.push(course);

  localStorage.setItem('shoppingCart', JSON.stringify(courses));
}

//Comprueba que hay cursos en el localStorage.
const getCoursesToLocalStorage = () => {
  let courses = localStorage.getItem('shoppingCart');

  if (courses === null) {
    courses = [];
  } else {
    courses = JSON.parse(courses);
  }

  return courses;
}

//Imprime los cursos del localStorage en el carrito.
const readLocalStorage = () => {
  let courses = getCoursesToLocalStorage();

  for (let course of courses) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${course.image}" width=100>
    </td>
    <td>${course.title}</td>
    <td>${course.price}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
    </td>
   `;

    listCourses.appendChild(row);
  }

}

//Eliminar curso del localstorage.
const removeCourseFromLocalStorage = (id) => {
  const courses = getCoursesToLocalStorage();
  const indexCourse = courses.findIndex(item => item.id === id);
  //Elimino el curso del array.
  courses.splice(indexCourse, 1);
  //Guardo el carrito actualizado.
  localStorage.setItem('shoppingCart', JSON.stringify(courses));
}

//Vaciar local storage . 
const emptyLocalStorage = () => localStorage.clear();

//listeners
loadEventListners();