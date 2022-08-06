import cardService from "../services/cardService";
import { toast } from "react-toastify";
import { Component } from "react";

class Delete extends Component {
  state = {};

  async componentDidMount() {
    if(window.confirm("Are You Sure?")){
      const cardId = this.props.match.params.id;
      await cardService.deleteCard(cardId);
      toast("The card was deleted successfully");
    }
    this.props.history.replace("/my-cards");
  }

  render = () => null;
}
export default Delete;
