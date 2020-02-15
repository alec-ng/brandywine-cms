import { useEffect, useState } from 'react';
import isEqual from "react-fast-compare";

/**
 * uses deep equality to compare the chosenPost and dataPost (an entry in data 
 * corresponding to the chosenPost)
 * 
 * if different, it means the user modified the chosenPost and has not saved it yet
 */
export default function useHasChanged(chosenCMSPost, dataPost) {
  const [hasChanged, setHasChanged] = useState(false);

  const currChosenPostStr = chosenCMSPost ? JSON.stringify(chosenCMSPost) : null;
  const storedPostStr = dataPost ? JSON.stringify(dataPost) : null;

  useEffect(() => {
    if (!currChosenPostStr || !storedPostStr) {
      return;
    }
    // moment/firestore objects shouldn't be compared
    const currChosenPost = JSON.parse(currChosenPostStr);
    const storedPost = JSON.parse(storedPostStr);
    delete currChosenPost.lastModified; 
    delete storedPost.lastModified;
    setHasChanged(!isEqual(currChosenPost, storedPost));
  }, [currChosenPostStr, storedPostStr]);

  return hasChanged;
}

