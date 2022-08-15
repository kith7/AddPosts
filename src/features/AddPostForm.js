import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "./users/usersSlice";

export const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setaddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUsers);

  let canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onPostClicked = () => {
    if (canSave) {
      try {
        setaddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setaddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Here you can add a new post</h2>
      <form>
        <label htmlFor='postTitle'>Enter the title</label>
        <input
          type='text'
          id='postTitle'
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor='postAuthor'>Author</label>
        <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {userOptions}
        </select>
        <label htmlFor='postContent'>Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChanged}
        />
        <button type='button' onClick={onPostClicked} disabled={!canSave}>
          Save post
        </button>
      </form>
    </section>
  );
};
