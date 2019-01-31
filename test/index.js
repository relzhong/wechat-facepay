const assert = require('assert');

const cvr = require('../index');
const config = require('./config.json');

describe('test wechat facepay', () => {
  it('should initWxpayface successfully', () => {
    const req = {
      cmd: 'initWxpayface',
      version: '1',
      now: Math.floor((new Date()).getTime() / 1000),
    };
    const res = cvr.wxpayCallFaceService(JSON.stringify(req));
    console.log(res.data);
    assert(res.error === 0);
  });
  it('should getWxpayfaceRawdata successfully', () => {
    const req = {
      cmd: 'getWxpayfaceRawdata',
      version: '1',
      now: Math.floor((new Date()).getTime() / 1000),
    };
    const res = cvr.wxpayCallFaceService(JSON.stringify(req));
    console.log(res);
    assert(res.error === 0);
  });

  it('should getWxpayfaceCode successfully', () => {
    const req = {
      cmd: 'getWxpayfaceCode',
      version: '1',
      now: Math.floor((new Date()).getTime() / 1000),
      appid: config.appid,
      mch_id: config.mch_id,
      store_id: 'LIANXIAN',
      out_trade_no: 'W15626448268',
      total_fee: '1',
      face_authtype: 'FACEPAY',
      authinfo: '/JtqNGKpfFRcLYcVe/UF3b6+9/sLYAp5OIIu+Ps9F8anF/HmTQ14UEbkjiAIZgXZpHBiMJXj5peCDvBjBdBhKKoKlLxThdnWPxESN4eDPAQb4M/UFjuGS6cBlwuOXOySAhu4nO6pjC2esYYEag2r1mLdtnh7lyplJzJn5OWOBNoCKWG/fvFlVEwiYFNIyna+ORKCmSR+BDiJ17CaPiA2BiLf93gw3d0YDgShDYO23GsjosIodTZYxuJpMWO3L9ChlwNFZgGLk54kVUeInXvbHgc7Ol4+CGLiVTAOFoHIwk+9Npni98pp3EArpXmDpmbujOpljr/5PDCI8W/K1pwH4Ee+b4vUiiQpD7tYxM0T1/Ar4NPKP/wTqKJn8TRriQmrUEqdybNRWjEvg3SzspXxDIu4t5VrwLHA/cNnjZECJwuH8hFkvjmmhd9ROxWfnBRZJ4NliKBetGEMREhiXeMeKl4JBeJX53sz9i6FMxn9eexJmzgWNnTW+8tHpaitSRL39zaji4AUCB8tXYNa92gHEXgKvcSrQ5HOSHZmNfaKXUsEqMyLvQh9sPOyyFHuBrMZBpz+AhTuiYPaEwQHQ2CW4/wr6vPhgo68Jj/YLRqlOZDGUy2B9JTf48RGIYCY0tGk9WQjjn4v6CuZRhzaruO6SZAGJYnFrFJAZ4HLnePPqt6aTqSoqann6INKsjxA2w4I+kzAW8IO',
    };
    console.log(req);
    const res = cvr.wxpayCallFaceService(JSON.stringify(req));
    console.log(res);
    assert(res.error === 0);
  });
  it('should updateWxpayfacePayResult successfully', () => {
    const req = {
      cmd: 'updateWxpayfacePayResult',
      version: '1',
      now: Math.floor((new Date()).getTime() / 1000),
      appid: config.appid,
      mch_id: config.mch_id,
      store_id: 'LIANXIAN',
      authinfo: '/JtqNGKpfFRcLYcVe/UF3b6+9/sLYAp5OIIu+Ps9F8anF/HmTQ14UEbkjiAIZgXZpHBiMJXj5peCDvBjBdBhKKoKlLxThdnWPxESN4eDPAQb4M/UFjuGS6cBlwuOXOySAhu4nO6pjC2esYYEag2r1mLdtnh7lyplJzJn5OWOBNoCKWG/fvFlVEwiYFNIyna+ORKCmSR+BDiJ17CaPiA2BiLf93gw3d0YDgShDYO23GsjosIodTZYxuJpMWO3L9ChlwNFZgGLk54kVUeInXvbHgc7Ol4+CGLiVTAOFoHIwk+9Npni98pp3EArpXmDpmbujOpljr/5PDCI8W/K1pwH4Ee+b4vUiiQpD7tYxM0T1/Ar4NPKP/wTqKJn8TRriQmrUEqdybNRWjEvg3SzspXxDIu4t5VrwLHA/cNnjZECJwuH8hFkvjmmhd9ROxWfnBRZJ4NliKBetGEMREhiXeMeKl4JBeJX53sz9i6FMxn9eexJmzgWNnTW+8tHpaitSRL39zaji4AUCB8tXYNa92gHEXgKvcSrQ5HOSHZmNfaKXUsEqMyLvQh9sPOyyFHuBrMZBpz+AhTuiYPaEwQHQ2CW4/wr6vPhgo68Jj/YLRqlOZDGUy2B9JTf48RGIYCY0tGk9WQjjn4v6CuZRhzaruO6SZAGJYnFrFJAZ4HLnePPqt6aTqSoqann6INKsjxA2w4I+kzAW8IO',
      payresult: 'SUCCESS',
    };
    const res = cvr.wxpayCallFaceService(JSON.stringify(req));
    console.log(res);
    assert(res.error === 0);
  });
  it('should releaseWxpayface successfully', () => {
    const req = {
      cmd: 'releaseWxpayface',
      version: '1',
      now: Math.floor((new Date()).getTime() / 1000),
    };
    const res = cvr.wxpayCallFaceService(JSON.stringify(req));
    console.log(res);
    assert(res.error === 0);
  });
  after(() => {
    cvr.wxpayReleaseResponse();
  });
});

