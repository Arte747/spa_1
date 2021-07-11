import MyPosts from './MyPosts';
import {actions} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';

// при каждом изменении запускается mapStateToProps
// формируется новый объект
// и сравнивается со старым
const mapStateToProps = (state) => ({
	posts: state.profilePage.posts,
	newPostText: state.profilePage.newPostText
});

const mapDispatchToProps = (dispatch) => ({
	addPost(newPost) {
		dispatch(actions.addPostAC(newPost));
	}
});

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;