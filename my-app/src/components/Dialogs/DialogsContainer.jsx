import Dialogs from './Dialogs';
import {updateNewMessageTextAC, sendMessageAC} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

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


// закидываем целевой объект
// идем снизу вверх
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);