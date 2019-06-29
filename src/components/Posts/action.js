
export function addPostRedux(data) {
  return{
    type: 'ADD_POST',
    payload: data,
  }
}

export function delPostRedux(data) {
  return{
    type: 'DELETE_POST',
    payload: data,
  }
}
