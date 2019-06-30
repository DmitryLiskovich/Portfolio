
const initialState = [{
  id: 0,
  title: 'A first note',
  note: 'Need create server and get data from MongoDB. But i will not do it :). I don`t know how this will work at GH page. Created with Redux.'
}];

export default function reducer(state = initialState, action){
  switch(action.type){
    case 'ADD_POST': return [...state, action.payload];
    case 'DELETE_POST': {
      let newPost = state.filter((item) => {
        if(item.id === parseInt(action.payload.id)){
          return false;
        }
        return true;
      });
      return newPost;
    };
    default: return state;
  }
}