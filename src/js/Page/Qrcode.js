import React, {Component} from 'react';
import QRCode from 'qrcode-react'

class Qrcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defalut : "TWQRP://個人轉帳/158/02/V1?",
      account : "0051548601126500",
      bank : "009",
    }
  }
  numJewelsInStones(J, S) {
    
  }
  render() {
    let result = "TWQRP://個人轉帳/158/02/V1?D6=0020992000083641&D5=806&D10=901";
    let b = "TWQRP://個人轉帳/158/02/V1?D6=0000182200383948&D5=008&D10=901";
    return (
      <div>
        <QRCode value={encodeURIComponent(b)}/>

      </div>
    )
  }
}

export default Qrcode;