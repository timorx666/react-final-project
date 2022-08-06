import { Component } from "react";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import userService from "../services/userService";

class Favorites extends Component {
  state = {cards: []};

  async componentDidMount() {
    const { data } = await userService.getFavorites();
    if (data.length) {
      this.setState({ cards: data });
    }
  }

  render() {
    const {
      state: { cards },
    } = this;

    return (
      <div className="container">
        <PageHeader titleText="Your Favorites Cards" />

        <div className="row">
          <div className="col-12">
            <p>Best cards ever</p>
          </div>
        </div>
        <div className="row">
          {!!cards.length &&
            cards.map((card) => <Card key={card._id} card={card} />)}
          {!cards.length && (
            <div className="row">
              <div className="col-12">
                <p className="text-primary">
                  There no favorites cards yet, go to All-Cards
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
