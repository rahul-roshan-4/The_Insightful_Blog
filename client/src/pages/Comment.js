import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

export default function Comment({ comment, postInfo }) {
  const [commentInfo, setCommentInfo] = useState("");
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(process.env.React_App_Host_Api + "/addComment/" + comment).then(
      (response) => {
        response.json().then((commentInfo) => {
          setCommentInfo(commentInfo);
        });
      }
    );
  }, [comment]);

  const deleteComment = () => {
    try {
      fetch(process.env.React_App_Host_Api + "/deletecomment/" + comment, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: postInfo._id }),
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment-container">
      <div className="comment-box">
        <p className="comment-text">{commentInfo.text}</p>
      </div>
      <div className="comment-author">@{commentInfo.author?.id.username}</div>
      {userInfo?.id && commentInfo.author?.id._id === userInfo?.id && (
        <button className="delete-button small-button" onClick={deleteComment}>
          Delete
        </button>
      )}
    </div>
  );
}
