import { connect } from "react-redux";
import Poll from "./Poll";
import { fetchPoll } from "./../../redux/actions";

const mapStateToProps = state => ({
  poll: state.poll
});

const mapDispatchToProps = dispatch => ({
  fetchPoll: id => dispatch(fetchPoll(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);
