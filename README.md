## url生成二维码，支持配置logo

依赖 `qrcodejs2` 

使用方式：

```js
import getCreateQrInstance from './url2Qrcode.js';
getCreateQrInstance().create(text, {
  logoImg: document.querySelector('.logo-img'), // logo的dom元素
  logoWidth: 62, // logo宽度
  logoHeight: 69, // logo高度
  logoScale: 0.5, // logo的缩放比例
  width: 256, // 二维码的宽
  height: 256 // 二维码高度
}).download('缴费二维码.png');
```

logoImg为空时，则不会在二维码中间加上logo