import { useHttp } from '../hooks/http.hook';

import marvelIgm from '../resources/img/marvel.jpg';

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=7bd4d4fb398e1cc8e6c3c7b2986fa573';
  const _baseOffset = 360;
  const _baseLimit = 9;

  const getAllCharacters = async (offset = _baseOffset, limit = _baseLimit) => {
    const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 100, limit = 8) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComic);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComic(res.data.results[0]);
  };

  const _transformComic = (comic) => {
    const id = comic.id;
    const href = comic.urls[0].url;
    const thumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    const name = comic.title;
    const description = comic.description ? comic.description : 'NO DESCRIPTION';
    const pageCount = comic.pageCount;
    const language =
      comic.textObjects.length > 0
        ? comic.textObjects.map((item) => item.language).join(', ')
        : 'NOT INFO';
    const price = +comic.prices[0].price === 0 ? 'NOT AVAILABLE' : comic.prices[0].price + '$';
    return { id, href, thumbnail, name, description, pageCount, language, price };
  };

  const _transformCharacter = (char) => {
    let description = char.description;
    if (!description) {
      description = 'NO DESCRIPTION';
    } else if (description.length > 200) {
      description = `${description.match(/.{180}.*?\b/)}...`;
    }

    let thumbnail = `${char.thumbnail.path}.${char.thumbnail.extension}`;

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
      thumbnail = marvelIgm;
    }

    let name = char.name;
    if (name.length > 30) {
      name = `${name.match(/.{25}.*?\b/)}...`;
    }

    return {
      id: char.id,
      name,
      description,
      thumbnail,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items.slice(0, 10),
    };
  };

  return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic };
};

export default useMarvelService;
