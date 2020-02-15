export const UPDATE_CURRENT_POSTDATA = "UPDATE_CURRENT_POSTDATA";
export function updatePost(editorData) {
  return { type: UPDATE_CURRENT_POSTDATA, editorData }
}

export const UPDATE_CURRENT_POST = "UPDATE_CURRENT_POST";
export function updateMetadata(property, value) {
  return { type: UPDATE_CURRENT_POST, property, value }
}

export const CLOSE_CURRENT_POST = "CLOSE_CURRENT_POST";
export function close() {
  return { type: CLOSE_CURRENT_POST }
}

export const SELECT_POST = "SELECT_POST";
export function selectPost(key) {
  return { type: SELECT_POST, key }
}

export const OPEN_MODAL = 'OPEN_MODAL';
export function openModal(modalType, payload) {
  return { type: OPEN_MODAL, modalType, payload }
}

export const CLOSE_MODAL = 'CLOSE_MODAL';
export function closeModal() {
  return { type: CLOSE_MODAL }
}

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export function showSnackbar(message) {
  return { type: SHOW_SNACKBAR, message }
}

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export function closeSnackbar() {
  return { type: CLOSE_SNACKBAR }
}