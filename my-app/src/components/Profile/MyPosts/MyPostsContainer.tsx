import MyPosts, {MapPropsType, DispatchPropsType} from './MyPosts';
import {actions} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';

// при каждом изменении запускается mapStateToProps
// формируется новый объект
// и сравнивается со старым
const mapStateToProps = (state: AppStateType) => ({
	posts: state.profilePage.posts
} as MapPropsType);

let MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostAC})(MyPosts);

export default MyPostsContainer;