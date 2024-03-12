import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const fetchAllPosts = createAsyncThunk(
  "userfeed/fetchAllPosts",
  async () => {
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");
    try {
      const fetchPosts = await fetch(`${API_URL}/posts?userId=${getUserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: getToken,
        },
      });
      const posts = await fetchPosts.json();
      if (!fetchPosts.ok) {
        throw posts;
      }
      return posts;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const createNewPost = createAsyncThunk(
  "userfeed/createNewPost",
  async (postDetails) => {
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");
    try {
      const newPostCreationResponse = await fetch(
        `${API_URL}/posts/${getUserId}/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: getToken,
          },
          body: JSON.stringify(postDetails),
        }
      );
      const newPostData = await newPostCreationResponse.json();
      if (!newPostCreationResponse.ok) {
        throw newPostData;
      }
      return newPostData;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const editPostContent = createAsyncThunk(
  "userfeed/editPostContent",
  async (details) => {
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");
    const postDetails = {
      userId: getUserId,
      data: details.body,
      postId: details.postId,
    };
    try {
      const editPostContentResponse = await fetch(
        `${API_URL}/posts/edit/${postDetails.postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: getToken,
          },
          body: JSON.stringify(postDetails),
        }
      );
      const edited = await editPostContentResponse.json();
      if (!editPostContentResponse.ok) {
        throw edited;
      }
      return edited;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const deletePost = createAsyncThunk(
  "userfeed/deletePost",
  async (postId) => {
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");
    try {
      const deleteRequestResponse = await fetch(
        `${API_URL}/posts/${postId}?userId=${getUserId}`,
        {
          method: "DELETE",
          headers: { authorization: getToken },
        }
      );
      const deleted = await deleteRequestResponse.json();
      if (!deleteRequestResponse.ok) {
        throw deleted;
      }
      return deleted;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const postLikeHandler = createAsyncThunk(
  "userfeed/postLikeHandler",
  async ({ postId, likedBy }) => {
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");
    try {
      const likeResponse = await fetch(
        `${API_URL}/posts/${postId}/likeHandler?userId=${getUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: getToken,
          },
          body: JSON.stringify({ likedBy }),
        }
      );
      const liked = await likeResponse.json();
      if (!likeResponse.ok) {
        throw liked;
      }
      return liked;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const postBookMarkHandler = createAsyncThunk(
  "userfeed/postBookMarkHandler",
  async (postId) => {
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");
    try {
      const bookmarkResponse = await fetch(
        `${API_URL}/bookmarks/${postId}/${getUserId}`,
        {
          method: "POST",
          headers: { authorization: getToken },
        }
      );
      const responseData = await bookmarkResponse.json();
      if (!bookmarkResponse.ok) {
        throw responseData;
      }
      return responseData.bookmarks;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const getBookmarks = createAsyncThunk(
  "userfeed/getBookmarks",
  async () => {
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");
    try {
      const allBookmarks = await fetch(`${API_URL}/bookmarks/${getUserId}`, {
        method: "GET",
        headers: { authorization: getToken },
      });
      const bookmarkData = await allBookmarks.json();
      if (!allBookmarks.ok) {
        throw bookmarkData;
      }
      return bookmarkData;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);

export const uploadComment = createAsyncThunk(
  "userfeed/uploadComment",
  async ({ postId, user, content, date, time }) => {
    const getToken = localStorage.getItem("token");
    const getUserId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `${API_URL}/posts/${postId}/comment?userId=${getUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: getToken,
          },
          body: JSON.stringify({
            user,
            content,
            date,
            time,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw responseData;
      }
      return responseData;
    } catch (err) {
      console.error({ Error_message: err.message });
      throw err;
    }
  }
);
