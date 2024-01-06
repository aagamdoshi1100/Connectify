import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPosts,
  deletePost,
  postLikeHandler,
  postBookMarkHandler,
  createNewPost,
} from "./actions";

const resetUserfeedState = {
  postCreation: {
    loading: false,
    showComposeComponent: false,
    createPostContent: "",
    createPostImage: "",
  },
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
    loading: false,
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
      state.createPost.enabled = true;
      state.createPost.createPostContent = getPostForEditing.content;
      state.createPost.createPostImage = getPostForEditing.image;
      state.post.postMenu = false;
      state.post.postId = action.payload;
      state.post.editPost = true;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload.posts;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //createNewPost
      .addCase(createNewPost.pending, (state, action) => {
        state.createPost.loading = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.allPosts = [...state.allPosts, action.payload.data];
        state.createPost.loading = false;
        state.error = "";
        state.createPost = resetUserfeedState.postCreation;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //delete
      .addCase(deletePost.pending, (state) => {})
      .addCase(deletePost.fulfilled, (state, action) => {
        state.allPosts = state.allPosts.filter(
          (post) => post._id !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      //bookmark
      .addCase(postBookMarkHandler.pending, (state) => {})
      .addCase(postBookMarkHandler.fulfilled, (state, action) => {
        state.bookmarks = state.allPosts.filter((post) =>
          action.payload?.includes(post._id)
        );
      })
      .addCase(postBookMarkHandler.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { enablePostMenu, enableEdit, showCompose, postInputData } =
  userfeedSlice.actions;
