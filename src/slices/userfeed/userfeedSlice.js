import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPosts,
  deletePost,
  postLikeHandler,
  postBookMarkHandler,
} from "./actions";

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
      enabled: false,
      createPostContent: "",
      createPostImage: "",
    },
    comment: {
      enabled: false,
    },
    status: "",
    error: "",
  },
  reducers: {
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
    enableComments: (state, action) => {
      state.comment.enabled = !state.comment.enabled;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPosts = action.payload.posts;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        console.log("1");
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPosts = state.allPosts.filter(
          (post) => post._id !== action.payload
        );
        console.log("2");
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("3");
      })
      //like/dislike
      .addCase(postLikeHandler.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postLikeHandler.fulfilled, (state, action) => {
        state.status = "succeeded";
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
        state.status = "failed";
        state.error = action.error.message;
      })
      //bookmark
      .addCase(postBookMarkHandler.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postBookMarkHandler.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarks = state.allPosts.filter((post) =>
          action.payload?.includes(post._id)
        );
      })
      .addCase(postBookMarkHandler.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { enablePostMenu, enableEdit, enableComments } =
  userfeedSlice.actions;
