import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withFirebase } from "../../hoc/firebase";
import usePrevious from "../../../hooks/usePrevious";
import Slug from "../../../modules/slug";

import { selectPendingStatus } from "../../../state/selectors";
import { openModal, updateMetadata, close } from "../../../state/actions";
import {
  savePost,
  SAVE_CURRENT_POST
} from "../../../state/actions/async-actions";

import MetadataForm from "../../stateless/global/forms/metadata-form";
import Spinner from "../../stateless/generic/spinner";
import ExitControl from "./exit-control";
import PublishControl from "./publish-control";
import DeleteControl from "./delete-control";
import { StretchBtn } from "../../stateless/generic/util";

/**
 * Component manager for toolbar view when a post is selected
 */
function ChosenPostManager(props) {
  const [hasChanged, setHasChanged] = useState(false);
  const { data, chosenPost, savePending, dispatch, firebase } = props;
  const contextProps = { ...props, ...{ setHasChanged: setHasChanged } };

  // Track if any change has been made
  const prevChosenPost = usePrevious(chosenPost);
  const disableSave = hasChanged ? {} : { disabled: true };

  useEffect(() => {
    if (prevChosenPost && prevChosenPost !== chosenPost && !hasChanged) {
      setHasChanged(true);
    }
  }, [chosenPost, prevChosenPost, hasChanged]);

  // updates value in store after validation, and optionally "closes" afterwawrd
  function save(closePostAfterCompletion = false) {
    if (!validate(chosenPost.post.isPublished)) {
      return;
    }
    dispatch(savePost(firebase, chosenPost))
      .then(() => {
        setHasChanged(false);
        if (closePostAfterCompletion) {
          dispatch(close());
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Chosen post validation using 4 apis: HTML form, Slug, CMSPost, PostMetadata
  const formRef = useRef(null);

  function validate(willPublish) {
    if (!formRef.current.reportValidity()) {
      return false;
    }

    // Basic empty check before specialized validation logic
    let errs = chosenPost.post.validateBaseProps();
    if (!errs.length) {
      const isValidSlug = Slug.validateUniqueAndChanged(chosenPost, data);
      if (!isValidSlug) {
        errs.push("The slug already exists for the given date/title.");
      }
      if (willPublish) {
        errs = errs.concat(chosenPost.publishValidation());
      }
    }

    if (errs.length) {
      dispatch(openModal("validationError", { errors: errs }));
      return false;
    }
    return true;
  }

  // Sync chosen post in store with changes to form
  function onMetadataChange(e) {
    dispatch(updateMetadata(e.target.name, e.target.value));
  }

  return (
    <>
      <ExitControl save={save} hasChanged={hasChanged} {...contextProps} />

      <form ref={formRef}>
        <fieldset disabled={savePending}>
          <MetadataForm onInputChange={onMetadataChange} cmsPost={chosenPost} />
          <div className="my-3">
            <StretchBtn
              type="button"
              className="my-2 btn btn-success"
              onClick={() => {
                save(false);
              }}
              {...disableSave}
            >
              {savePending && <Spinner />}
              Save
            </StretchBtn>

            <PublishControl validate={validate} {...contextProps} />
            <DeleteControl {...contextProps} />
          </div>
        </fieldset>
      </form>
    </>
  );
}

const mapStateToProps = state => {
  return {
    chosenPost: state.chosenPost,
    data: state.data,
    savePending: selectPendingStatus(state, SAVE_CURRENT_POST)
  };
};
export default connect(mapStateToProps)(withFirebase(ChosenPostManager));
