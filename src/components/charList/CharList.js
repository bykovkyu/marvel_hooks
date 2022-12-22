import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
  state = {
    chars: [],
    offset: 109,
  };

  marvelService = new MarvelService();

  onCharsLoaded(chars) {
    this.setState((state) => ({ chars, offset: state.offset + 9 }));
  }

  onMoreCharsLoaded(chars) {
    this.setState((state) => ({
      chars: [...state.chars, ...chars],
      offset: state.offset + 9,
    }));
  }

  updateCharList = async () => {
    const res = await this.marvelService.getAllCharacters(this.state.offset);
    this.onCharsLoaded(res);
  };

  loadMoreChars = async () => {
    const res = await this.marvelService.getAllCharacters(this.state.offset);
    this.onMoreCharsLoaded(res);
  };

  componentDidMount() {
    this.updateCharList();
  }

  render() {
    const chars = this.state.chars.map((char) => (
      <li
        key={char.name}
        className='char__item'>
        <img
          src={char.thumbnail}
          alt={char.name}
        />
        <div className='char__name'>{char.name}</div>
      </li>
    ));

    return (
      <div className='char__list'>
        <ul className='char__grid'>{chars}</ul>
        <button
          className='button button__main button__long'
          onClick={this.loadMoreChars}>
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
