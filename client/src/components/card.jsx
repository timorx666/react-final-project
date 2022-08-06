import React, { Component } from "react";

import { Link } from "react-router-dom";
import userService from "../services/userService";

class Card extends Component {
  state = {
    data: {
      card: {},
      user: {},
    },
    isFavorite: false,
  };

  async componentDidMount() {
    const { data } = await userService.getCurrentUserDetails();
    const { card }  = this.props;
    let isFavorite = data.favorites.find(cardId => cardId === card._id);

    this.setState({ data: { card, user: data }, isFavorite });
  }
  

  render() {
    const {
      state: {
        data: { card },
      },
    } = this;
    const {
      state: {
        data: { user },
      },
    } = this;
    const { state: {isFavorite} } = this;

    return (
      <div className="col-md-6 col-lg-4 mt-3">
        <div className="card">
          <img
            src={card.bizImage}
            height="100"
            width="150"
            alt={card.bizName}
            className="p-2"
          />
          <div className="card-body">
            <h5 className="card-title">{card.bizName}</h5>
            <p className="card-text">{card.bizDescription}</p>
            <p className="card-text border-top pt-2">
              <b>Tel: </b>
              {card.bizPhone}
              <br />
              {card.bizAddress}
            </p>

            {user && user?.biz && (
              <React.Fragment>
                <Link
                  className="btn btn-sm btn-secondary"
                  to={`/my-cards/edit/${card._id}`}
                >
                  Edit
                </Link>
                <Link
                  className="ml-2 btn btn-sm btn-danger"
                  to={`/my-cards/delete/${card._id}`}
                >
                  Delete
                </Link>
              </React.Fragment>
            )}
            {user && !user?.biz && !isFavorite && (
              <button
                className="btn border"
                onClick={async () => {
                  this.setState({isFavorite: true});
                  await userService.addToFav(card._id);
                }}>
                <i className="far fa-heart"></i>Add
              </button>
            )}
            {user && !user?.biz && isFavorite && (
              <button
                className="btn border"
                onClick={async () => {
                  this.setState({isFavorite: false });
                  await userService.removeFromFav(card._id);

                  //rerender the favorite page if removing card from favs
                  if(window.location.pathname.includes('/favorites'))
                  window.location.reload();
                }}>
                  {/* HTML heart code */}
                &#10084;
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
