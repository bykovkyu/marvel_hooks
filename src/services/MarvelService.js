import marvelIgm from '../resources/img/marvel.jpg';

class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=7bd4d4fb398e1cc8e6c3c7b2986fa573';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
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
    return {
      name: char.name,
      description,
      thumbnail,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
