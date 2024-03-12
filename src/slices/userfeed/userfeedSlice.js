import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPosts,
  deletePost,
  postLikeHandler,
  postBookMarkHandler,
  createNewPost,
  editPostContent,
  getBookmarks,
  uploadComment,
} from "./actions";

const resetUserfeedState = {
  createPost: {
    loading: false,
    showComposeComponent: false,
    createPostContent: "",
    createPostImage: "",
  },
  post: {
    postMenu: false,
    postId: "",
    editPost: false,
  },
  createComment: {
    isEnabled: false,
    data: {
      user: "",
      content: "",
    },
    postId: "",
  },
  error_Message: "",
};

export const userfeedSlice = createSlice({
  name: "userfeed",
  initialState: {
    allPosts: [],
    bookmarks: [],
    post: {
      postMenu: false,
      postId: "",
      editPost: false,
    },
    createPost: {
      loading: false,
      showComposeComponent: false,
      createPostContent: "",
      createPostImage: "",
    },
    createComment: {
      isEnabled: false,
      data: {
        user: "",
        content: "",
      },
      postId: "",
    },
    loadingPosts: false,
    loadingBookmarks: false,
    error: "",
  },
  reducers: {
    showCompose: (state, action) => {
      state.createPost.showComposeComponent =
        !state.createPost.showComposeComponent;
    },
    postInputData: (state, action) => {
      state.createPost[action.payload.type] = action.payload.data;
    },
    enablePostMenu: (state, action) => {
      state.post.postMenu =
        action.payload !== state.post.postId ? true : !state.post.postMenu;
      state.post.postId = action.payload;
    },
    enableEdit: (state, action) => {
      const getPostForEditing = state.allPosts.find(
        (post) => post._id === action.payload
      );
      state.createPost.showComposeComponent = true;
      state.createPost.createPostContent = getPostForEditing.content;
      state.createPost.createPostImage = getPostForEditing.image;
      state.post.postMenu = false;
      state.post.postId = action.payload;
      state.post.editPost = true;
    },
    discardCompose: (state, action) => {
      state.post = resetUserfeedState.post;
      state.createPost = resetUserfeedState.createPost;
    },
    enableCommentComponent: (state, action) => {
      state.createComment.isEnabled = true;
      state.createComment.postId = action.payload;
    },
    disableCommentContainer: (state, action) => {
      state.createComment = resetUserfeedState.createComment;
    },
    commentInputHandler: (state, action) => {
      state.createComment.data.content = action.payload.content;
      state.createComment.data.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllPosts.pending, (state) => {
        state.loadingPosts = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loadingPosts = false;
        state.allPosts = action.payload.posts;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.error_Message = action.error.message;
        state.loadingPosts = false;
      })
      //createNewPost
      .addCase(createNewPost.pending, (state, action) => {
        state.createPost.loading = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.allPosts = [...state.allPosts, action.payload.data];
        state.createPost.loading = false;
        state.error = "";
        state.createPost = resetUserfeedState.createPost;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.error_Message = action.error.message;
        state.createPost.loading = false;
      })
      //edit
      .addCase(editPostContent.pending, (state, action) => {
        state.createPost.loading = true;
      })
      .addCase(editPostContent.fulfilled, (state, action) => {
        state.allPosts = state.allPosts.map((post) => {
          if (post._id === action.payload.editedPost._id) {
            return Object.assign(post, action.payload.editedPost);
          }
          return post;
        });
        state.createPost = resetUserfeedState.createPost;
        state.post = resetUserfeedState.post;
      })
      .addCase(editPostContent.rejected, (state, action) => {
        state.error_Message = action.error.message;
        state.createPost.loading = false;
      })
      //delete
      .addCase(deletePost.pending, (state) => {})
      .addCase(deletePost.fulfilled, (state, action) => {
        state.allPosts = state.allPosts.filter(
          (post) => post._id !== action.payload.deletedPost._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error_Message = action.error.message;
      })
      //like/dislike
      .addCase(postLikeHandler.pending, (state) => {})
      .addCase(postLikeHandler.fulfilled, (state, action) => {
        state.allPosts = state.allPosts.map((post) => {
          if (post._id === action.payload.postId) {
            if (post.likedBy.includes(action.payload.likedBy)) {
              return {
                ...post,
                likedBy: post.likedBy.filter(
                  (user) => user !== action.payload.likedBy
                ),
              };
            } else {
              return {
                ...post,
                likedBy: [...post.likedBy, action.payload.likedBy],
              };
            }
          }
          return post;
        });
      })
      .addCase(postLikeHandler.rejected, (state, action) => {
        console.log("aa");
        state.error_Message = action.error.message;
      })
      //Add/Remove bookmark
      .addCase(postBookMarkHandler.pending, (state) => {})
      .addCase(postBookMarkHandler.fulfilled, (state, action) => {
        state.bookmarks = state.allPosts.filter((post) =>
          action.payload?.includes(post._id)
        );
      })
      .addCase(postBookMarkHandler.rejected, (state, action) => {
        state.error_Message = action.error.message;
      })
      // Get all bookmarks
      .addCase(getBookmarks.pending, (state, action) => {
        state.loadingBookmarks = true;
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.bookmarks = state.allPosts.filter((post) =>
          action.payload.bookmarks.includes(post._id)
        );
        state.loadingBookmarks = false;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.error_Message = action.payload.error.message;
        state.loadingBookmarks = false;
      })
      //Upload comment
      .addCase(uploadComment.pending, (state, action) => {})
      .addCase(uploadComment.fulfilled, (state, action) => {
        state.allPosts = state.allPosts.map((post) => {
          if (post._id === state.createComment.postId) {
            return {
              ...post,
              comment: action.payload.data,
            };
          }
          return post;
        });
        state.createComment.data.content = "";
      })
      .addCase(uploadComment.rejected, (state, action) => {
        state.error_Message = action.payload.error.message;
      });
  },
});

export const {
  enablePostMenu,
  enableEdit,
  showCompose,
  discardCompose,
  postInputData,
  enableCommentComponent,
  disableCommentContainer,
  commentInputHandler,
} = userfeedSlice.actions;
