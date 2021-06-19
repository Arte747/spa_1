import Dialogs from './Dialogs';
import {updateNewMessageTextAC, sendMessageAC} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

const mapStateToProps = (state) => ({
	dialogs: state.dialogsPage.dialogs,
	messages: state.dialogsPage.messages,
	newMessageText: state.dialogsPage.newMessageText
});
const mapDispatchToProps = (dispatch) => ({
	onMessageChange(text) {
	dispatch(updateNewMessageTextAC(text));
	},
	sendMessage() {
		dispatch(sendMessageAC());
	}
});

let AuthRedirectComponent = withAuthRedirect(Dialogs);

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;