export const optionsSend = {
  loop: false,
  autoplay: false,
  animationData: require('./anims/send.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
export const optionsWaiting = {
  loop: true,
  autoplay: false,
  animationData: require('./anims/blobload.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const optionsWaitingAutoplay = {
  loop: true,
  autoplay: true,
  animationData: require('./anims/blobload.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
export const optionsBackgroundAnimPink = {
  loop: true,
  autoplay: true,
  animationData: require('./anims/backgroundpink.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
export const optionsBackgroundAnimGrey = {
  loop: true,
  autoplay: true,
  animationData: require('./anims/backgroundgrey.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
