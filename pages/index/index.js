const sm4 = require('miniprogram-sm-crypto').sm4
const SecureRandom = 123123123123123;
// const keyPair = sm2.generateKeyPairHex(256, SecureRandom)
// const keyPair = sm2.generateKeyPairHex()
// const publicKey = keyPair.publicKey // 公钥
// const privateKey = keyPair.privateKey // 私钥
// const cipherMode = 1
const key = '0123456789abcdeffedcba9876543210'

Page({
  data: {
    encryptResult: '',
    decryptResult: '',
  },
  onShareAppMessage() {
    return {
      title: '来沟通吧',
      path: '/pages/index/index',
    }
  },
  bindEncryptInput(e) {
    this.encryptValue = e.detail.value
  },
  bindDecryptInput(e) {
    this.decryptValue = e.detail.value
  },
  encrypt() {
    // const encryptResult = sm2.doEncrypt(this.encryptValue, publicKey, cipherMode)
    const encryptResult = sm4.encrypt(this.encryptValue, key)
    this.setData({
      encryptResult
    })
  },
  decrypt() {
    console.log(this.decryptValue, 333)
    // const decryptResult = sm2.doDecrypt(this.decryptValue, privateKey, cipherMode)
    const decryptResult = sm4.decrypt(this.decryptValue, key)
    this.setData({
      decryptResult
    })
    console.log(decryptResult, 'de')
  },
  copy(e) {
    const type = e.currentTarget.dataset.type
    let data = ''
    if (type === 'encrypt') {
      data = this.data.encryptResult
    } else if (type === 'decrypt') {
      data = this.data.decryptResult
    }
    wx.setClipboardData({
      data,
      success() {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        })
      },
      fail() {
        wx.showToast({
          title: '复制成功',
          icon: 'error'
        })
      }
    })
  }
})
