const ffi = require('ffi');
const ref = require('ref');
const path = require('path');
const hardware = {};
const stack = require('callsite');

function hazardous(location) {
  const electronRegex = /[\\/]electron\.asar[\\/]/;
  const asarRegex = /^(?:^\\\\\?\\)?(.*\.asar)[\\/](.*)/;
  /* convert path when use electron asar unpack
   */
  if (!path.isAbsolute(location)) {
    return location;
  }

  if (electronRegex.test(location)) {
    return location;
  }

  const matches = asarRegex.exec(location);
  if (!matches || matches.length !== 3) {
    return location;
  }

  /* Skip monkey patching when an electron method is in the callstack. */
  const skip = stack().some(site => {
    const siteFile = site.getFileName();
    return /^ELECTRON_ASAR/.test(siteFile) || electronRegex.test(siteFile);
  });

  return skip ? location : location.replace(/\.asar([\\/])/, '.asar.unpacked$1');
}


const libWechat = ffi.Library(hazardous(path.join(__dirname, './lib/WxpayFaceSDK')), {
  wxpayCallFaceService: [ 'int', [ 'string', 'int', ref.refType(ref.refType('char')), 'pointer' ]],
  wxpayReleaseResponse: [ 'void', [ 'pointer' ]],
});

hardware.wxpayCallFaceService = reqBuf => {
  try {
    const inData = reqBuf;
    const len = ref.alloc(ref.types.uint);
    const data = ref.alloc(ref.refType(ref.refType('char')));
    const res = libWechat.wxpayCallFaceService(inData, inData.length, data, len);
    const outData = ref.reinterpret(data.deref(), len.deref());
    if (res === 0) {
      const res = JSON.parse(outData.toString());
      if (res && res.return_code !== 'SUCCESS') {
        console.log(res);
        throw new Error(res);
      }
      return { error: 0, data: res };
    }
    return { error: -1 };
  } catch (e) {
    return { error: -1 };
  }
};

hardware.wxpayReleaseResponse = handle => {
  try {
    libWechat.wxpayReleaseResponse(handle);
  } catch (e) {
    return { error: -1 };
  }
};


module.exports = hardware;
