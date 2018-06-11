(function() {
  const app = {
    layers: [],
    activeLayer: null,

    init() {
      const sequenceNode = document.getElementById('sequence');
      const sequencePath = sequenceNode.getAttribute('data-path');

      return new Promise(resolve => {
        fetch(sequencePath)
          .then(res => res.text())
          .then(svg => {
            sequenceNode.innerHTML = svg;
          })
          .then(() => {
            this.layers = Array.from(
              sequenceNode.querySelectorAll('[data-name^=sequence]')
            );
            resolve();
          });
      });
    },

    get scrollHeight() {
      return document.scrollingElement.scrollHeight - window.innerHeight;
    },

    get scrollTop() {
      return document.scrollingElement.scrollTop;
    },

    get position() {
      const step = this.scrollHeight / (this.layers.length - 1);
      return ~~(this.scrollTop / step);
    },

    render() {
      const newActiveLayer = this.layers[this.position];

      if (this.activeLayer === newActiveLayer) return;

      if (this.activeLayer) {
        this.activeLayer.classList.remove('is-active');
      }

      newActiveLayer.classList.add('is-active');
      this.activeLayer = newActiveLayer;
    },
  };

  app.init().then(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
  });

  function handleScroll() {
    app.render();
  }
})();
