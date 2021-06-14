import MyPosts from './MyPosts';
import {updateNewPostTextAC, addPostAC} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';

// при каждом изменении запускается mapStateToProps
// формируется новый объект
// и сравнивается со старым
const mapStateToProps = (state) => ({
	posts: state.profilePage.posts,
	newPostText: state.profilePage.newPostText
});

const mapDispatchToProps = (dispatch) => ({
	onPostChange(text) {
		dispatch(updateNewPostTextAC(text));
	},
	addPost() {
		dispatch(addPostAC());
	}
});

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;