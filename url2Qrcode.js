/**
 * 使用方式：
    import getCreateQrInstance from '本文件';
    getCreateQrInstance().create(text, {
      logoImg: document.querySelector('.logo-img'),
      logoWidth: 62,
      logoHeight: 69,
      logoScale: 0.5,
      width: 256,
      height: 256
    }).download('缴费二维码.png');
*/
import QRCode from 'qrcodejs2';
const defaultQrcodeStyle = {
  // 二维码图片宽度
  width: 256,
  // 二维码图片高度
  height: 256,
  // 二维码图片 border 大小
  border: 10,
  // 二维码 logo 图片 dom
  logoImg: null,
  // 二维码 logo 图片放大系数
  logoScale: 0.8,
  // 二维码 logo 图片宽度
  logoWidth: 0,
  // 二维码 logo 图片高度
  logoHeight: 0
};

class Qrcode {
  // 容器
  qrCodeContent = null
  qrCodeInstanse = null
  style = { ...defaultQrcodeStyle }
  create(text, style) {
    // debugger;
    this.style = {
      ...this.style,
      ...style
    };
    const content = document.getElementsByClassName('qrcode-content')[0] || document.createElement('div');
    content.className = 'qrcode-content';
    content.style.display = 'none';
    if (!this.qrCodeContent) {
      document.body.appendChild(content);
    }
    this.qrCodeContent = content;
    this.qrCodeInstanse = new QRCode(this.qrCodeContent, {
      text: '',
      width: this.style.width,
      height: this.style.height,
      colorDark: '#000000',
      colorLight: '#ffffff'
    });
    const qrCanvas = content.getElementsByTagName('canvas')[0];
    content.getElementsByTagName('img')[0].className = 'qrcode-img';
    this.setStyle(qrCanvas);
    this.qrCodeInstanse.makeCode(text);
    this.style.logoImg && this.drawLogoImg(qrCanvas);
    return this;
  }
  setStyle(canvas) {
    if (!canvas) return;
    const { border, width, height } = this.style;
    const ctx = canvas.getContext('2d');
    ctx.translate(border, border);
    ctx.scale((width - border * 2) / width, (height - border * 2) / height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-border, -border, width + border * 2, height + border * 2);
  }
  drawLogoImg(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height, logoImg, logoHeight, logoWidth, logoScale } = this.style;
    ctx.drawImage(logoImg, 0, 0, logoWidth, logoHeight, width / 2 - (logoWidth * logoScale) / 2, height / 2 - (logoHeight * logoScale) / 2, logoWidth * logoScale, logoHeight * logoScale);
  }
  download(downloadName) {
    const downloadTag = document.getElementsByClassName('qrcode-download')[0] || document.createElement('a');
    setTimeout(() => {
      downloadTag.href = document.getElementsByClassName('qrcode-img')[0].getAttribute('src');
      downloadTag.download = downloadName;
      downloadTag.style.display = 'none';
      downloadTag.className = 'qrcode-download';
      if (!document.getElementsByClassName('qrcode-download')[0]) {
        document.body.appendChild(downloadTag);
      }
      downloadTag.click();
      // 为了防止每次下载完毕后，还有下载的一直拿的第一个图片。
      document.getElementsByClassName('qrcode-content')[0].innerHTML = ''; // 重置
      this.qrCodeInstanse.clear();
      this.qrCodeInstanse = null;
    }, 0);
  }
}

export default function() {
  return new Qrcode();
};
