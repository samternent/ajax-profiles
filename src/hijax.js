export default (start, end) => {
  const proxied = window.XMLHttpRequest.prototype.send;

  window.XMLHttpRequest.prototype.send = function () {
      console.log('send')
      const pointer = this;
      const id = 'id' + (new Date()).getTime();
      //
      // // start
      const measure = start(id, pointer.responseURL, pointer);
      //
      const intervalId = window.setInterval(() => {
              if (pointer.readyState != 4) return;

              // end
              try {
                end(id, measure, pointer.responseURL, JSON.parse(pointer.response), pointer);
              }
              catch (err) {

              }
              finally {
                clearInterval(intervalId);
              }
      }, 1);
      //
      return proxied.apply(this, [].slice.call(arguments));
  };
}
