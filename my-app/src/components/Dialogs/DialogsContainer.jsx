import Dialogs from './Dialogs';
import {updateNewMessageTextAC, sendMessageAC} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
	dialogs: state.dialogsPage.dialogs,
	messages: state.dialogsPage.messages,
	newMessageText: state.dialogsPage.newMessageText,
	isAuth: state.auth.isAuth
});
const mapDispatchToProps = (dispatch) => ({
	onMessageChange(text) {
	dispatch(updateNewMessageTextAC(text));
	},
	sendMessage() {
		dispatch(sendMessageAC());
	}
});

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;