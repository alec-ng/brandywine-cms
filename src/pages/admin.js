import React, { useState } from "react";
import { withAuthorization } from "../components/session";
import BrandywineCMS from "../components/brandywine-cms";
import GroupingButtons from "../components/brandywine-cms/components/grouping-buttons";
import LoadingOverlay from "../components/brandywine-cms/components/loading-overlay";
import {
  createPost,
  deletePost,
  publish,
  unpublish,
  updatePost
} from "../util/firebase-post-util";

import Image from "react-brandywine-editor/lib/plugins/image/";
import Markdown from "react-brandywine-editor/lib/plugins/markdown/";
import CoverPhoto from "react-brandywine-editor/lib/plugins/cover-photo/";
import Spacer from "react-brandywine-editor/lib/plugins/spacer/";
import Carousel from "react-brandywine-editor/lib/plugins/carousel/";
import EmbeddedVideo from "react-brandywine-editor/lib/plugins/embedded-video/";
import HTMLVideo from "react-brandywine-editor/lib/plugins/html-video/";

const Admin = function(props) {
  const [loading, setLoading] = useState(true);
  const [cmsPostData, setCmsPostData] = useState(null);
  const [postGroup, setPostGroup] = useState(null);

  // read all cms-posts in from database that match post grouping chosen
  function onPostGroupClick(e) {
    let postGroup = e.currentTarget.dataset.post;
    setPostGroup(postGroup);

    let data = {};
    props.firebase
      .cmsPosts()
      .where("post.grouping", "==", e.currentTarget.dataset.post)
      .get()
      .then(snapshot => {
        // create mapping between each id and and the cms-post
        snapshot.forEach(doc => {
          data[doc.id] = doc.data();
        });
        setCmsPostData(data);
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // fired whenever the editor needs to synchronize CRUD actions with the database
  // this should return a promise.
  const onCMSAction = function(action, payload) {
    switch (action) {
      case "create":
        return createPost(payload, props.firebase);
      case "update":
        return updatePost(payload, props.firebase, postGroup);
      case "publish":
        return publish(payload, props.firebase, postGroup);
      case "unpublish":
        return unpublish(payload, props.firebase, postGroup);
      case "delete":
        return deletePost(payload, props.firebase);
      default:
        throw new Error(`Unrecognized action: ${action}`);
    }
  };

  return (
    <>
      {!postGroup && <GroupingButtons onClick={onPostGroupClick} />}
      {postGroup && (
        <>
          {loading ? (
            <LoadingOverlay type="linear" visible={loading} />
          ) : (
            <div className="container-fluid p-0">
              <BrandywineCMS
                onAction={onCMSAction}
                data={cmsPostData}
                plugins={plugins}
                showPluginDescription={false}
                postGroup={postGroup}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

const condition = authUser =>
  authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, HTMLVideo, EmbeddedVideo];
