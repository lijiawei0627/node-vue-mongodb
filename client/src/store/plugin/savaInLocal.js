export default store => {
  console.log('store初始化');
  store.subscribe((mutations, state) => {
    console.log(mutations);
    console.log(state);
  })
}