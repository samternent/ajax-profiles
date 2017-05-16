import './card.scss'
import hijax from './hijax.js'
import JSONFormatter from 'json-formatter-js'

const display = {
  length: null,
  name: null,
  duration: null,
  data: {},
};

const calls = {};

const start = (id, url, resp) => {
  performance.mark(`start_${id}`);
  const name = `${url}_${(new Date()).getTime()}`;

  calls[name] = Object.assign({}, display);

  return name;
}

const end = (id, name, url, data, xhr) => {
  performance.mark(`end_${id}`)
  performance.measure(name, `start_${id}`, `end_${id}`);

  const perf = performance.getEntriesByName(name, 'measure');
  const { duration } = perf[0];
  const length = xhr.response.length / 1024

  calls[ name ] = {
    duration, url, length, data
  }

  buildCard(calls[ name ]);
}


const buildCard = ({ duration, url, length, data }) => {

  const card = document.createElement('div')
  const title = document.createElement('div')
  const lengthView = document.createElement('div')
  const dataView = new JSONFormatter(data, 0, { theme: 'dark' });

  card.className = 'st-resp-card'
  title.className = 'st-resp-title'
  lengthView.className = 'st-resp-length'

  title.innerText = url;
  lengthView.innerText = `${length.toFixed(2)}kb loaded in ${duration.toFixed(2)}ms`;

  card.appendChild(title)
  card.appendChild(lengthView)
  const dataEl = dataView.render()
  dataEl.className += ' st-resp-data'
  card.appendChild(dataEl)

  wrapper.insertBefore(card, top.nextSibling);
}

const wrapper = document.createElement('div')
const top = document.createElement('div')
wrapper.className = 'st-resp-cards'

wrapper.appendChild(top)
document.body.appendChild(wrapper)

hijax(start, end);


$.get('https://jsonplaceholder.typicode.com/posts/1')
$.get('https://jsonplaceholder.typicode.com/posts/2')
$.get('https://jsonplaceholder.typicode.com/posts/3')
$.get('https://jsonplaceholder.typicode.com/posts/4')
$.get('https://jsonplaceholder.typicode.com/posts/5')
$.get('https://jsonplaceholder.typicode.com/posts/6')
