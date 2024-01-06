import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

export const fetchAllPosts = createAsyncThunk(
  "userfeed/fetchAllPosts",
  async () => {
    try {
      const fetchPosts = await fetch(`${API_URL}/posts`);
      if (!fetchPosts.ok) {
        throw new Error("Failed to fetch posts");
      }
      const posts = await fetchPosts.json();
      return posts;
    } catch (e) {
      console.error("Error fetching posts:", e);
      throw e;
    }
  }
);

export const createNewPost = createAsyncThunk(
  "userfeed/createNewPost",
  async (postDetails) => {
    try {
      const newPostCreationResponse = await fetch(
        `${API_URL}/posts/${userId}/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(postDetails),
        }
      );
      if (!newPostCreationResponse.ok) {
        throw newPostCreationResponse;
      }
      const newPostData = await newPostCreationResponse.json();
      return newPostData;
    } catch (e) {
      console.error("Error while creating post:", e);
      throw e;
    }
  }
);

export const editPostContent = createAsyncThunk(
  "userfeed/editPostContent",
  async (postDetails) => {
    try {
      const editPostContentResponse = await fetch(
        `${API_URL}/posts/edit/${postDetails.postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(postDetails.body),
        }
      );
      if (!editPostContentResponse.ok) {
        throw editPostContentResponse;
      }
      const edited = await editPostContentResponse.json();
      return edited;
    } catch (e) {
      console.error("Error while editing post:", e);
      throw e;
    }
  }
);

export const deletePost = createAsyncThunk(
  "userfeed/deletePost",
  async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: { authorization: token },
      });
      if (!response.ok) {
        throw response;
      }
      const responseData = await response.json();
      return responseData;
    } catch (e) {
      console.error("Error while deleting post:", e);
      throw e;
    }
  }
);

export const postLikeHandler = createAsyncThunk(
  "userfeed/postLikeHandler",
  async ({ postId, likedBy }) => {
    const response = await fetch(`${API_URL}/posts/${postId}/likeHandler`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({ likedBy }),
    });
    const responseData = await response.json();
    return responseData;
  }
);

export const postBookMarkHandler = createAsyncThunk(
  "userfeed/postBookMarkHandler",
  async (postId) => {
    const response = await fetch(`${API_URL}/bookmarks/${postId}/${userId}`, {
      method: "POST",
      headers: { authorization: token },
    });
    const responseData = await response.json();
    return responseData.bookmarks;
  }
);

export const getBookmarks = createAsyncThunk(
  "userfeed/getBookmarks",
  async () => {
    try {
      const bookmarks = await fetch(`${API_URL}/bookmarks/${userId}`);
      if (!bookmarks.ok) {
        throw bookmarks;
      }
      const bookmarkData = await bookmarks.json();
      return bookmarkData;
    } catch (e) {
      console.error("Error while fetching bookmarks: ", e);
      throw e;
    }
  }
);
