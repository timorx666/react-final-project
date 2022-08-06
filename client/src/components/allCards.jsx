import { Component } from "react";
import cardService from "../services/cardService";
import PageHeader from "./common/pageHeader";
import Card from "./card";

class AllCards extends Component {
  state = { cards: [] };

  async componentDidMount() {
    const { data } = await cardService.getAllCards();
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
        <div className="row">
          <div className="col-12 mb-4">
            <PageHeader titleText="All Business Cards" />
          </div>
        </div>

        <div className="row">
          {!!cards.length &&
            cards.map((card) => <Card key={card._id} card={card} />)}
          {!cards.length &&
            <div className="row">
              <div className="col-12">
              <p className="text-primary">There no cards yet</p>
              </div>
            </div>
            }
        </div>
      </div>
    );
  }
}

export default AllCards;
